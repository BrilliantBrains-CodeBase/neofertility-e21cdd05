/**
 * Neo Fertility Clinic — form capture Web App
 * ===========================================
 *
 * One deployment serves every form on the site. The client posts a normalised
 * envelope; this script routes it to a tab, appends a row, and emails the clinic.
 *
 *   { token, form, sourcePage, sourceVariant, pageUrl, referrer,
 *     honeypot, fillMs, data: { ...form specific fields } }
 *
 * IMPORTANT — Apps Script cannot answer a CORS preflight (OPTIONS). The client
 * must post with `Content-Type: text/plain;charset=utf-8` so the browser treats
 * it as a *simple request* and skips preflight. Read the body from
 * `e.postData.contents` and JSON.parse it. Never switch this to
 * application/json: it will pass in curl and fail in every browser.
 *
 * Deploy: Extensions > Apps Script, then Deploy > New deployment >
 *   Type: Web app · Execute as: Me · Who has access: Anyone
 * See README.md in this folder for the full runbook.
 */

/* ────────────────────────── CONFIG ──────────────────────────
 * SHEET_ID is read from Script Properties — set it once via `setup()` below,
 * or Project Settings > Script Properties. It is the one value worth keeping
 * out of this file, because it is the only thing a leaked token cannot reach.
 * ──────────────────────────────────────────────────────────── */

var CONFIG = {
  /** Must stay identical to TOKEN in src/lib/leads.ts. Hardcoded by request:
      it ships in the site's JS bundle either way, so it is a junk filter, not a
      secret. The sheet's real protection is that SHEET_ID lives only here. */
  SHARED_SECRET: '3487ff3d20b2760aaba9a19fb6d5000a',
  /** Clinic inbox(es) notified for the forms listed in NOTIFY_FORMS. */
  NOTIFY_EMAILS: ['care@neofertility.co.in'],
  /** Which forms email the clinic. A calculator opt-in is a patient asking to be
      contacted, so it belongs here; anonymous tool usage never reaches this code
      at all, because nothing is posted without the tick. */
  NOTIFY_FORMS: ['lead', 'assessment', 'ovulation'],
  /** A human cannot fill a lead form this fast. Below it, the row goes to Spam. */
  MIN_FILL_MS: 2500,
  /** Same person + same form inside this window is one submission, not two. */
  DEDUPE_WINDOW_S: 120,
  TIMEZONE: 'Asia/Kolkata',
  DATE_FORMAT: 'yyyy-MM-dd HH:mm:ss',
};

/* ───────────────────────── FORM REGISTRY ─────────────────────
 * One entry per form. `columns` is the tab's header row, in order: `header`
 * is what the clinic reads, `key` is the payload field it maps to.
 *
 * Adding a field = add a column here and redeploy. Existing rows keep their
 * values because rows are written by header name, not by position, so a column
 * inserted in the middle does not shift historical data.
 * ─────────────────────────────────────────────────────────── */

var COMMON_TAIL = [
  { header: 'Source Page', key: '_sourcePage' },
  { header: 'Variant', key: '_sourceVariant' },
  { header: 'UTM Source', key: 'utmSource' },
  { header: 'UTM Medium', key: 'utmMedium' },
  { header: 'UTM Campaign', key: 'utmCampaign' },
  { header: 'Page URL', key: '_pageUrl' },
  { header: 'Referrer', key: '_referrer' },
  { header: 'Fill (s)', key: '_fillSeconds' },
];

var FORMS = {
  /**
   * Every appointment/callback form on the site. LeadForm's four variants
   * (inline, rail, sheet, hero) and the home page's AppointmentMapForm all land
   * here — they ask the same questions, so splitting them across tabs would
   * just give the front desk two call lists to work through.
   */
  lead: {
    sheet: 'Leads',
    columns: [
      { header: 'Received', key: '_received' },
      { header: 'Name', key: 'name' },
      { header: 'Mobile', key: '_mobile' },
      { header: 'Email', key: 'email' },
      { header: 'Treatment', key: 'topic' },
      { header: 'Preferred Day', key: 'preferredDay' },
      { header: 'Message', key: 'message' },
      { header: 'Consent', key: '_consent' },
      { header: 'Status', key: '_status' },
      { header: 'Called By', key: '_blank' },
      { header: 'Notes', key: '_blank' },
    ].concat(COMMON_TAIL),
  },

  /**
   * Fertility self-assessment. Reproductive health answers are sensitive
   * personal data under the DPDP Act — only send this when the patient has
   * ticked an explicit opt-in on the results panel. Without a name or mobile
   * the row is anonymous and useful only as aggregate demand signal.
   */
  assessment: {
    sheet: 'Assessment',
    columns: [
      { header: 'Received', key: '_received' },
      { header: 'Age Band', key: 'age' },
      { header: 'Trying For', key: 'months' },
      { header: 'Cycle', key: 'cycle' },
      { header: 'Known Diagnosis', key: 'diagnosis' },
      { header: 'Male Tested', key: 'maleTested' },
      { header: 'Recommendation', key: 'recommendation' },
      { header: 'Name', key: 'name' },
      { header: 'Mobile', key: '_mobile' },
      { header: 'Email', key: 'email' },
      { header: 'Consent', key: '_consent' },
    ].concat(COMMON_TAIL),
  },

  /**
   * Ovulation calculator. Same sensitivity caveat as `assessment`: opt-in only,
   * and the calculator works fine without ever posting anything.
   */
  ovulation: {
    sheet: 'Ovulation',
    columns: [
      { header: 'Received', key: '_received' },
      { header: 'Last Period', key: 'lastPeriod' },
      { header: 'Cycle Length', key: 'cycleLength' },
      { header: 'Est. Ovulation', key: 'ovulationDay' },
      { header: 'Fertile Window', key: 'fertileWindow' },
      { header: 'Name', key: 'name' },
      { header: 'Mobile', key: '_mobile' },
      { header: 'Email', key: 'email' },
      { header: 'Consent', key: '_consent' },
    ].concat(COMMON_TAIL),
  },
};

/** Rejected submissions, kept rather than dropped so a false positive is visible. */
var SPAM_SHEET = 'Spam';
/** Anything that threw. Without it a broken deploy loses leads silently. */
var ERROR_SHEET = 'Errors';

/* ─────────────────────────── ENTRY POINTS ─────────────────────────── */

/**
 * Health check. Visit the /exec URL in a browser after deploying — anything
 * other than `{"ok":true}` means the deployment or the properties are wrong.
 */
function doGet() {
  var configured = Boolean(props_().getProperty('SHEET_ID'));
  return json_({
    ok: configured,
    service: 'neo-fertility-forms',
    forms: Object.keys(FORMS),
    configured: configured,
  });
}

function doPost(e) {
  try {
    var body = parseBody_(e);
    if (!body) return json_({ ok: false, error: 'empty_body' });

    if (!checkToken_(body.token)) {
      return json_({ ok: false, error: 'unauthorised' });
    }

    var form = FORMS[body.form];
    if (!form) return json_({ ok: false, error: 'unknown_form' });

    var record = buildRecord_(body);

    var reason = spamReason_(body, record);
    if (reason) {
      /* Answer ok either way. A bot that learns it was blocked comes back with
         the honeypot left alone; a real patient tripped by a false positive
         still sees the thank-you, and the row is in Spam for the clinic. */
      appendRow_(SPAM_SHEET, spamColumns_(), extend_(record, { _status: reason }));
      return json_({ ok: true, spam: true });
    }

    if (isDuplicate_(body.form, record._mobile, record.email)) {
      return json_({ ok: true, duplicate: true });
    }

    appendRow_(form.sheet, form.columns, record);

    if (CONFIG.NOTIFY_FORMS.indexOf(body.form) !== -1) {
      notify_(body.form, form, record);
    }

    return json_({ ok: true });
  } catch (err) {
    logError_(err, e);
    return json_({ ok: false, error: 'server_error' });
  }
}

/* ─────────────────────────── PIPELINE ─────────────────────────── */

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) return null;
  return JSON.parse(e.postData.contents);
}

/**
 * Constant-time-ish comparison is overkill here — the token only keeps casual
 * junk out of the sheet. It is shipped in client JS and is not a real secret;
 * the sheet's real protection is that the script, not the browser, holds the
 * Sheet ID.
 */
function checkToken_(token) {
  var expected = CONFIG.SHARED_SECRET;
  if (!expected) return true; // blank = open, for first-run smoke testing
  return String(token || '') === expected;
}

/**
 * Flattens the envelope into one lookup the column mapping reads from.
 * Underscore-prefixed keys are computed here; the rest come straight off
 * `data` so a new form field needs no code change beyond its column.
 */
function buildRecord_(body) {
  var data = body.data || {};
  var record = {};
  for (var k in data) {
    if (Object.prototype.hasOwnProperty.call(data, k)) record[k] = data[k];
  }

  record._received = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, CONFIG.DATE_FORMAT);
  record._sourcePage = body.sourcePage || '';
  record._sourceVariant = body.sourceVariant || '';
  record._pageUrl = body.pageUrl || '';
  record._referrer = body.referrer || '';
  record._fillSeconds = typeof body.fillMs === 'number' ? Math.round(body.fillMs / 100) / 10 : '';
  record._mobile = formatMobile_(data.mobile);
  record._consent = data.consent ? 'Yes' : 'No';
  record._status = 'New';
  record._blank = '';
  return record;
}

/**
 * Stores as a leading-apostrophe string. Without it Sheets reads a 10-digit
 * number as a number, drops the leading digit's significance in the display
 * format, and the front desk dials a mangled number.
 */
function formatMobile_(raw) {
  if (!raw) return '';
  var digits = String(raw).replace(/[^\d]/g, '').replace(/^0+/, '');
  if (digits.length > 10 && digits.indexOf('91') === 0) digits = digits.slice(2);
  return digits ? "'+91 " + digits : '';
}

function spamReason_(body, record) {
  if (body.honeypot) return 'Honeypot';
  if (typeof body.fillMs === 'number' && body.fillMs < CONFIG.MIN_FILL_MS) return 'Too fast';
  /* A lead with neither a mobile nor an email cannot be called back. */
  if (body.form === 'lead' && !record._mobile && !record.email) return 'No contact';
  return '';
}

/**
 * Swallows the double-submit — a patient double-tapping the button, or a form
 * retried after a flaky network. Keyed on the contact detail rather than the
 * whole payload so a retry with one character changed still collapses.
 */
function isDuplicate_(form, mobile, email) {
  var handle = mobile || email;
  if (!handle) return false;
  var cache = CacheService.getScriptCache();
  var key = 'dedupe:' + form + ':' + handle;
  if (cache.get(key)) return true;
  cache.put(key, '1', CONFIG.DEDUPE_WINDOW_S);
  return false;
}

/* ─────────────────────────── SHEET I/O ─────────────────────────── */

function props_() {
  return PropertiesService.getScriptProperties();
}

function book_() {
  var id = props_().getProperty('SHEET_ID');
  if (!id) throw new Error('SHEET_ID script property is not set — run setup()');
  return SpreadsheetApp.openById(id);
}

/**
 * Appends one row, creating the tab and header if needed.
 *
 * Values are placed by matching the sheet's *live* header row against the
 * column definition, so a header the clinic has renamed or reordered by hand
 * does not scatter data into the wrong columns — it simply stops receiving it,
 * which is visible, rather than corrupting neighbouring columns, which is not.
 *
 * The lock matters: two submissions landing in the same second both read the
 * same last row and one overwrites the other without it.
 */
function appendRow_(sheetName, columns, record) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = ensureSheet_(sheetName, columns);
    var header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    var byHeader = {};
    for (var i = 0; i < columns.length; i++) {
      var col = columns[i];
      var value = col.key === '_blank' ? '' : record[col.key];
      byHeader[col.header] = value === undefined || value === null ? '' : value;
    }

    var row = header.map(function (name) {
      return Object.prototype.hasOwnProperty.call(byHeader, name) ? byHeader[name] : '';
    });

    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

function ensureSheet_(name, columns) {
  var book = book_();
  var sheet = book.getSheetByName(name);
  var headers = columns.map(function (c) {
    return c.header;
  });

  if (!sheet) {
    sheet = book.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet
      .getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#f6e6ef')
      .setVerticalAlignment('middle');
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, headers.length, 150);
    return sheet;
  }

  /* Tab exists but is empty (someone cleared it) — put the header back. */
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    return sheet;
  }

  /* New columns added to the registry since the tab was created get appended
     to the right rather than inserted, so existing rows stay aligned. */
  var live = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var missing = headers.filter(function (h) {
    return live.indexOf(h) === -1;
  });
  if (missing.length) {
    sheet.getRange(1, live.length + 1, 1, missing.length).setValues([missing]);
    sheet
      .getRange(1, live.length + 1, 1, missing.length)
      .setFontWeight('bold')
      .setBackground('#f6e6ef');
  }
  return sheet;
}

function spamColumns_() {
  return [
    { header: 'Received', key: '_received' },
    { header: 'Reason', key: '_status' },
    { header: 'Name', key: 'name' },
    { header: 'Mobile', key: '_mobile' },
    { header: 'Email', key: 'email' },
  ].concat(COMMON_TAIL);
}

function logError_(err, e) {
  try {
    var sheet = ensureSheet_(ERROR_SHEET, [
      { header: 'Received', key: '_received' },
      { header: 'Error', key: 'error' },
      { header: 'Stack', key: 'stack' },
      { header: 'Raw Body', key: 'body' },
    ]);
    sheet.appendRow([
      Utilities.formatDate(new Date(), CONFIG.TIMEZONE, CONFIG.DATE_FORMAT),
      String(err && err.message ? err.message : err),
      String((err && err.stack) || ''),
      e && e.postData ? String(e.postData.contents).slice(0, 4000) : '',
    ]);
  } catch (ignored) {
    /* The sheet itself is unreachable. Stackdriver is the last resort. */
    console.error(err);
  }
}

/* ─────────────────────────── NOTIFICATION ─────────────────────────── */

/**
 * Plain-text email so it renders in every client the front desk might use, and
 * so a phone notification preview shows the name and number without opening it.
 */
function notify_(formName, form, record) {
  if (!CONFIG.NOTIFY_EMAILS.length) return;

  var lines = form.columns
    .filter(function (c) {
      return c.key !== '_blank' && record[c.key] !== '' && record[c.key] !== undefined;
    })
    .map(function (c) {
      return c.header + ': ' + String(record[c.key]).replace(/^'/, '');
    });

  var who = record.name || 'Someone';
  var subject =
    'New enquiry: ' +
    who +
    (record.topic ? ' — ' + record.topic : '') +
    (record._sourceVariant ? ' (' + record._sourceVariant + ')' : '');

  var body =
    who +
    ' asked to be called back.\n\n' +
    lines.join('\n') +
    '\n\nOpen the sheet: ' +
    book_().getUrl();

  /* One failed send must not fail the submission — the row is already saved. */
  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAILS.join(','),
      subject: subject,
      body: body,
      name: 'Neo Fertility website',
      replyTo: record.email || undefined,
    });
  } catch (err) {
    logError_(err, null);
  }
}

/* ─────────────────────────── HELPERS ─────────────────────────── */

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function extend_(base, extra) {
  var out = {};
  for (var a in base) if (Object.prototype.hasOwnProperty.call(base, a)) out[a] = base[a];
  for (var b in extra) if (Object.prototype.hasOwnProperty.call(extra, b)) out[b] = extra[b];
  return out;
}

/* ─────────────────────────── ONE-TIME SETUP ───────────────────────────
 * Fill in the two values, run `setup()` once from the editor, then clear them
 * again before saving — they live in Script Properties from that point on.
 * ─────────────────────────────────────────────────────────────────── */

function setup() {
  var SHEET_ID = ''; // the spreadsheet's id, from its URL

  if (!SHEET_ID) throw new Error('Fill in SHEET_ID before running setup()');
  props_().setProperty('SHEET_ID', SHEET_ID);

  /* Creates every tab up front so the clinic can see the shape before the
     first real lead arrives. */
  for (var name in FORMS) {
    if (Object.prototype.hasOwnProperty.call(FORMS, name)) {
      ensureSheet_(FORMS[name].sheet, FORMS[name].columns);
    }
  }
  ensureSheet_(SPAM_SHEET, spamColumns_());
  Logger.log('Setup complete: ' + book_().getUrl());
}

/** Writes one fake lead end to end. Delete the row afterwards. */
function selfTest() {
  var result = doPost({
    postData: {
      contents: JSON.stringify({
        token: CONFIG.SHARED_SECRET,
        form: 'lead',
        sourcePage: 'self-test',
        sourceVariant: 'script',
        pageUrl: 'https://neofertility.co.in/',
        fillMs: 30000,
        data: {
          name: 'Self Test',
          mobile: '9000000000',
          email: 'test@example.com',
          topic: 'IVF',
          preferredDay: '20 Aug 2026 · 15:30',
          message: 'Ignore me.',
          consent: true,
        },
      }),
    },
  });
  Logger.log(result.getContent());
}
