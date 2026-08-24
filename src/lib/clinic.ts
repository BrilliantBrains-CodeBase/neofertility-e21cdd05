export const CLINIC = {
  name: "Neo Fertility Clinic",
  alternateName: "Neo Fertility and IVF Clinic",
  doctor: "Dr. Payal Mahapatra",
  credentials: "MBBS, DGO, DNB - OBG, Fellowship in Reproductive Medicine",
  credentialsShort: "MBBS, DGO, DNB, FRM",
  experience: "18 years in fertility and gynecology",
  phoneDisplay: "+91 73377 61236",
  phoneHref: "tel:+917337761236",
  whatsappNumber: "917337761236",
  email: "care@neofertility.co.in",
  addressLine:
    "1st floor, Scorpio House, Marathahalli Bridge Service Road, Munnekolala, opposite Purva Apartments, Bengaluru, Karnataka 560037",
  addressStreet:
    "1st floor, Scorpio House, Marathahalli Bridge Service Road, Munnekolala, opposite Purva Apartments",
  city: "Bengaluru",
  region: "Karnataka",
  postalCode: "560037",
  hours: "Monday to Sunday, 09:30 to 18:30",
  bookingUrl: "https://calendar.app.google/ddBeQCryzrvLb4jQ9",
  mapEmbed:
    "https://www.google.com/maps?q=Scorpio+House+Marathahalli+Bridge+Service+Road+Munnekolala+Bengaluru+560037&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Scorpio+House+Marathahalli+Bridge+Service+Road+Munnekolala+Bengaluru+560037",
  /* Coordinates of the Marathahalli clinic. Single source of truth: `clinicSchema`
     read a hardcoded pair before this existed, so the geo meta tags and the JSON-LD
     could disagree without anything failing. */
  geo: { latitude: 12.9569, longitude: 77.7011 },
  /* Google Business Profile. These tie the domain to the GBP listing: `businessProfile`
     goes into schema `sameAs`, `reviewUrl` is the footer "Review us on Google" link.
     Anything still holding an `[ADD ...]` placeholder is dropped by `isConfigured`
     below, so a placeholder never reaches the page or the structured data.
     TODO: add reviewUrl from the GBP dashboard ("Ask for reviews" -> copy link). */
  google: {
    /* Canonical form of the listing, resolved from the share.google link the clinic
       supplied (CID 1851221529633718164). Preferred over the share URL because that one
       carries session parameters (lsig, shem, shndl) and can rot; the CID identifies the
       listing permanently. */
    businessProfile: "https://www.google.com/maps?cid=1851221529633718164",
    /* Derived from the same CID. The `writereview` endpoint needs a Place ID rather than
       a CID, so this uses the Maps form instead. It responds 200, but Maps decides what
       to show client-side — click it once to confirm it opens the review dialog, and
       replace it with the "Ask for reviews" link from the GBP dashboard if it does not. */
    reviewUrl: "https://www.google.com/maps?cid=1851221529633718164&action=write_review",
  },
  social: {
    facebook: "https://facebook.com/NeoFertilityClinic",
    instagram: "https://instagram.com/neofertilityclinic",
    linkedin: "https://linkedin.com/company/neo-fertility-clinic/",
    youtube: "https://youtube.com/@NeoFertilityIVFClinicBengaluru",
  },
  statsAsOf: "As of August 2026.",
  mciRegistration: "[ADD MEDICAL COUNCIL REGISTRATION NUMBER]",
  catchment:
    "Patients travel to us from Marathahalli, Whitefield, Bellandur, Brookefield, Kundalahalli, Varthur, Hoodi, Mahadevpura, HSR Layout, Koramangala, BTM Layout, CV Raman Nagar, KR Puram, Banaswadi, Kalyan Nagar, Kammanahalli, Horamavu, Ramamurthy Nagar, HBR Layout and Lingarajpuram.",
} as const;

/**
 * Whether a CLINIC field has had its `[ADD ...]` placeholder replaced.
 *
 * Guards both the JSON-LD (a placeholder string in `sameAs` reads to Google as a broken
 * link on the entity) and the UI (a link to "[ADD GOOGLE REVIEW LINK]" is a dead link on
 * a live page). Filling the value in above switches every consumer on at once.
 */
export function isConfigured(value: string): boolean {
  return Boolean(value) && !value.startsWith("[ADD");
}

export const CLINICAL_VOLUME = [
  { figure: "18", label: "Years Experience" },
  { figure: "80k", label: "Patients Treated" },
  { figure: "6.7k", label: "IUI procedures" },
  { figure: "3.7k", label: "Fertility surgeries" },
  { figure: "2k", label: "IVF cycles" },
  // NOTE: the underlying count was 728. "1k" rounds that up by ~37%.
  { figure: "1k", label: "Deliveries" },
] as const;

export const QUALIFICATIONS = [
  { year: "2005", title: "MBBS", institution: "MGM Medical College, Jamshedpur" },
  { year: "2011", title: "DGO, Obstetrics and Gynecology", institution: "RIMS, Ranchi" },
  {
    year: "2014",
    title: "DNB, Diplomate of National Board",
    institution: "Sagar Apollo, Bangalore",
  },
  {
    year: "2017",
    title: "Fellowship in Reproductive Medicine",
    institution: "IIRRH, International Institute for Training and Research in Reproductive Health",
  },
] as const;

export const MEMBERSHIPS = [
  "Indian Society for Assisted Reproduction (ISAR)",
  "Federation of Obstetric and Gynecological Societies of India (FOGSI)",
  "Medical Council of India",
] as const;

/* Every appointment form on the site asks the same questions from the same lists. Kept
   here rather than in one form, because two copies drifted apart once already: the home
   band offered treatments while the sidebar offered broad topics, so the same enquiry
   arrived labelled differently depending on which form the patient happened to find. */
export const ENQUIRY_TREATMENTS = [
  "IVF",
  "IUI",
  "ICSI",
  "Fertility Consultation",
  "PCOS / Irregular Cycles",
  "Male Infertility",
  "Other",
] as const;

export const ENQUIRY_TIMES = [
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
] as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi, I found Neo Fertility Clinic online and would like to book an appointment.";

export function buildWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${CLINIC.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

type TrackPayload = Record<string, string | number | boolean | undefined>;

export function track(event: string, payload: TrackPayload = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: TrackPayload[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...payload });
}
