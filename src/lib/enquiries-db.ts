/**
 * Lazy access to the Supabase client for the enquiry forms.
 *
 * The client (auth, realtime, postgrest) is the single heaviest dependency on the site,
 * and before this module it was statically imported by LeadForm and AppointmentMapForm.
 * Both sit under the root layout (AppointmentSheet, Book Now tab), so every page view
 * downloaded and parsed it during hydration even though only a form submit uses it.
 *
 * Now it is fetched on demand: `warmEnquiriesDb()` runs on the first focus inside a form,
 * so by the time a patient presses submit the chunk is already in cache and the submit
 * is not slowed down. `insertEnquiry()` never throws, it resolves `false` on any failure,
 * matching the dual-write contract in the forms (the sheet leg can still save the lead).
 */
import type { Database } from "@/integrations/supabase/types";

type EnquiryInsert = Database["public"]["Tables"]["enquiries"]["Insert"];

let clientModule: Promise<typeof import("@/integrations/supabase/client")> | undefined;

function loadClient() {
  clientModule ??= import("@/integrations/supabase/client");
  return clientModule;
}

/** Start downloading the client without waiting for it. Safe to call repeatedly. */
export function warmEnquiriesDb() {
  if (typeof window === "undefined") return;
  loadClient().catch(() => {
    /* A failed prefetch is retried by insertEnquiry on submit. */
    clientModule = undefined;
  });
}

/** Insert one enquiry row. Resolves true when saved, false on any error. */
export async function insertEnquiry(row: EnquiryInsert): Promise<boolean> {
  try {
    const { supabase } = await loadClient();
    const { error } = await supabase.from("enquiries").insert(row);
    return !error;
  } catch {
    clientModule = undefined;
    return false;
  }
}
