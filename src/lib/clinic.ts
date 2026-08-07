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

export const CLINICAL_VOLUME = [
  { figure: "18", label: "Years in clinical practice" },
  { figure: "80,000+", label: "Obstetrics and gynecology patients" },
  { figure: "6,789+", label: "IUI procedures" },
  { figure: "3,764+", label: "Fertility surgeries" },
  { figure: "2,046+", label: "IVF cycles" },
  { figure: "728+", label: "Deliveries" },
] as const;

export const QUALIFICATIONS = [
  { year: "2005", title: "MBBS", institution: "MGM Medical College, Jamshedpur" },
  { year: "2011", title: "DGO, Obstetrics and Gynecology", institution: "RIMS, Ranchi" },
  { year: "2014", title: "DNB, Diplomate of National Board", institution: "Sagar Apollo, Bangalore" },
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
