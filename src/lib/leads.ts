/**
 * Google Apps Script form capture.
 *
 * One deployed Web App receives every form on the site (see
 * `scripts/apps-script/Code.gs`). This module is the only thing that talks to
 * it, so the envelope shape, the spam signals and the CORS constraint live in
 * one place rather than being re-derived in each form.
 */

/* Hardcoded rather than read from import.meta.env, by request. Both values are
   visible to anyone who opens the site's JS bundle either way — the token only
   keeps casual junk out of the sheet, and the sheet id itself never leaves the
   Apps Script project. TOKEN must stay identical to CONFIG.SHARED_SECRET in
   scripts/apps-script/Code.gs; change one and every submit is rejected.

   ENDPOINT is the Web App deployment URL (/macros/s/<deploymentId>/exec), not
   the library URL (/macros/library/d/<scriptId>/<version>) — only the former
   accepts a POST. Redeploying an existing deployment as a new *version* keeps
   this URL; creating a *new* deployment mints a different one and strands the
   site on the old code. */
const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzQve077dA9xzCIk6iPJjCrjYsD35orgDCKJDfcq4n1TxmquM0S41_2vJ3foDMj8_Ghsw/exec";
const TOKEN = "3487ff3d20b2760aaba9a19fb6d5000a";

/** Tabs in the clinic's spreadsheet. Must match the `FORMS` registry in Code.gs. */
export type LeadFormName = "lead" | "assessment" | "ovulation";

export type LeadEnvelope = {
  form: LeadFormName;
  /** The route the form was filled on, e.g. "contact", "home_band". */
  sourcePage: string;
  /** Which form instance, e.g. "rail", "sheet", "map_form". */
  sourceVariant?: string;
  /** Milliseconds between the form rendering and the submit. */
  fillMs?: number;
  /** Contents of the hidden field. Non-empty means a bot filled it. */
  honeypot?: string;
  data: Record<string, unknown>;
};

export function isLeadEndpointConfigured() {
  return Boolean(ENDPOINT);
}

/**
 * UTM parameters, page and referrer, read at submit time.
 *
 * Read from the live URL rather than captured on mount, because a patient can
 * arrive on a campaign link and navigate before submitting — TanStack Router
 * keeps the tab, so `window.location` is current and the original entry
 * parameters are gone by then. Attribution beyond the current URL needs a
 * first-touch cookie, which is GTM's job, not this module's.
 */
function context() {
  if (typeof window === "undefined") {
    return { utmSource: null, utmMedium: null, utmCampaign: null, pageUrl: "", referrer: "" };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    pageUrl: window.location.href,
    referrer: document.referrer,
  };
}

/**
 * Posts one submission to the Web App.
 *
 * Resolves `false` instead of throwing — the caller decides whether a failure
 * here is worth showing the patient. For forms that also write to Supabase it
 * is not: the lead is already saved, and telling someone their enquiry failed
 * when it did not costs the clinic a booking.
 *
 * The `text/plain` content type is load-bearing. Apps Script serves no response
 * to a CORS preflight, so anything that triggers one — including
 * `application/json` — fails in the browser while working fine in curl.
 */
export async function submitToSheet(envelope: LeadEnvelope): Promise<boolean> {
  if (!ENDPOINT) return false;

  const { utmSource, utmMedium, utmCampaign, pageUrl, referrer } = context();

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      /* Lets the request finish if the patient navigates away or closes the tab
         the moment they hit submit. */
      keepalive: true,
      body: JSON.stringify({
        token: TOKEN,
        form: envelope.form,
        sourcePage: envelope.sourcePage,
        sourceVariant: envelope.sourceVariant ?? "",
        pageUrl,
        referrer,
        honeypot: envelope.honeypot ?? "",
        fillMs: envelope.fillMs,
        data: { ...envelope.data, utmSource, utmMedium, utmCampaign },
      }),
    });
    if (!response.ok) return false;
    /* The script answers `{ ok: false }` with a 200 for a rejected token or an
       unknown form — a transport-level check alone would call those a success. */
    const body = (await response.json().catch(() => null)) as { ok?: boolean } | null;
    return body?.ok !== false;
  } catch {
    return false;
  }
}
