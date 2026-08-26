# Form capture — Google Apps Script

One deployed Web App receives every form on the site and appends it to a
Google Sheet the clinic works from. `Code.gs` is the whole backend;
[`src/lib/leads.ts`](../../src/lib/leads.ts) is the only client that talks to it.

## Tabs

| Tab | Fed by | Notes |
|---|---|---|
| `Leads` | `LeadForm` (all four variants) + `AppointmentMapForm` | The call list. Both forms ask the same questions, so they share a tab; `Variant` says which one. |
| `Assessment` | Fertility self-assessment | Opt-in only — see *Sensitive data* below. |
| `Ovulation` | Ovulation calculator | Opt-in only. |
| `Spam` | Rejected submissions | Kept, not dropped, so a false positive is visible. |
| `Errors` | Anything that threw | Check this first when leads stop arriving. |

## Deploy

The token is hardcoded in two places and they must match:
`CONFIG.SHARED_SECRET` in `Code.gs` and `TOKEN` in `src/lib/leads.ts`. Both
currently hold `3487ff3d20b2760aaba9a19fb6d5000a`. Only `SHEET_ID` stays in
Script Properties — it is the one value a leaked token cannot reach.

1. Create the spreadsheet. Note its id from the URL
   (`docs.google.com/spreadsheets/d/`**`<id>`**`/edit`).
2. In it: **Extensions → Apps Script**. Delete the stub and paste `Code.gs`.
3. Fill `SHEET_ID` at the top of `setup()`, run it once (accept the OAuth
   prompt), then blank the value and save.
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**

   "Anyone" is required — the patient's browser is not signed in to Google.
5. Copy the `/exec` URL the deployment dialog gives you and paste it into
   `ENDPOINT` in [`src/lib/leads.ts`](../../src/lib/leads.ts).
6. Open that URL in a browser. It must answer `{"ok":true,…,"configured":true}`.
   `"configured":false` means step 3 did not take.
7. Run `selfTest()` from the editor. A row appears in `Leads` and the clinic
   inbox gets one email. Delete the row.

Currently deployed: `…/macros/s/AKfycbzQve077dA9…vJ3foDMj8_Ghsw/exec`,
health check passing.

## Web app URL vs library URL

The Apps Script editor hands out two addresses for the same project and only
one accepts a POST. Worth knowing because they are easy to mix up:

| | Shape | Use |
|---|---|---|
| **Web app** | `script.google.com/macros/s/<deploymentId>/exec` | What the forms post to |
| **Library** | `script.google.com/macros/library/d/<scriptId>/<version>` | Including this project as a dependency in *another* Apps Script |

They are not interconvertible: a library URL carries the **script id**, a web
app URL the **deployment id**, which only exists once the project has been
deployed as a web app.

## Testing with curl

Apps Script answers a POST with a 302 to `script.googleusercontent.com`. Do
**not** pass `-X POST` — it forces the method through the redirect, and the
follow-up request comes back as a Drive "unable to open the file" HTML page
that looks exactly like a broken deployment. Let curl handle the method itself:

```sh
U="https://script.google.com/macros/s/<deploymentId>/exec"
curl -sS -L -H 'Content-Type: text/plain;charset=utf-8' \
  --data '{"token":"…","form":"lead","sourcePage":"probe","fillMs":30000,
           "data":{"name":"Probe","mobile":"9000000000","consent":true}}' "$U"
```

Safe probes that write nothing: an unknown `form` value, or a wrong `token`.
Setting `"honeypot":"bot"` writes to the `Spam` tab and sends no email — a good
way to confirm the sheet connection without touching the call list.

## Redeploying

Editing the script is not enough — Apps Script serves the last *deployment*.
After any change: **Deploy → Manage deployments → edit (pencil) → Version: New
version → Deploy.** This keeps the same `/exec` URL, so nothing needs changing
in `src/lib/leads.ts`. Creating a *new* deployment instead mints a new URL and silently
strands the site on the old code.

## The CORS constraint

Apps Script does not answer a CORS preflight (`OPTIONS`). The client therefore
posts with `Content-Type: text/plain;charset=utf-8`, which keeps it a *simple
request*, and `doPost` reads `e.postData.contents` and parses it as JSON.

Switching to `application/json` is the failure mode to watch for: it works in
curl and in Postman, and fails in every browser. `src/lib/leads.ts` is the only
place that sets it.

## Sensitive data

The self-assessment and the ovulation calculator collect reproductive health
answers. Under the DPDP Act that is sensitive personal data, and the current
pages collect it with no consent step because nothing leaves the browser.

Both stay that way unless a patient ticks an explicit opt-in ("email me my
result") on the results panel. Wiring them to post unconditionally would turn
two anonymous calculators into a health-data collection point — the pages would
need a consent checkbox, a privacy-policy line covering it, and a retention
rule first.

## Quotas

The relevant free-tier limits, per day: 20,000 URL fetches, 100 emails
(`MailApp`), 90 minutes total runtime. A clinic site sending a few dozen leads a
day is nowhere near any of them. The one to watch is email: if `Errors` fills
with quota failures, the rows are still safe — only the notification was lost.

## Troubleshooting

| Symptom | Cause |
|---|---|
| Every submit fails, console shows a CORS error | `ENDPOINT` is still the library URL, the content type is not `text/plain`, or the deployment is not "Anyone" |
| `{"ok":false,"error":"unauthorised"}` | `TOKEN` in `leads.ts` and `CONFIG.SHARED_SECRET` in `Code.gs` disagree |
| `{"ok":false,"error":"unknown_form"}` | `form` in the envelope is not a key of `FORMS` |
| Rows stopped arriving, no errors | Script edited but not redeployed — see *Redeploying* |
| Mobile shows as `9.00E+09` | The leading apostrophe from `formatMobile_` was stripped by a manual paste |
