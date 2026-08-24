import { CLINIC, QUALIFICATIONS, MEMBERSHIPS, isConfigured } from "@/lib/clinic";
import { SITE_URL } from "@/data/navigation";

import ogDefaultAsset from "@/assets/og/og-default.jpg";
import ogDoctorAsset from "@/assets/og/og-doctor.jpg";
import ogClinicAsset from "@/assets/og/og-clinic.jpg";
import logoAsset from "@/assets/neo-logo.png";
import receptionAsset from "@/assets/clinic-reception.webp";
import waitingAreaAsset from "@/assets/clinic-waiting-area.webp";
import consultRoomAsset from "@/assets/clinic-consult-room.jpg";

type Meta = Record<string, string>;

/** Stable @ids, so every schema block on every page points at ONE clinic and ONE doctor. */
const CLINIC_ID = `${SITE_URL}/#clinic`;
const DOCTOR_ID = `${SITE_URL}/#doctor`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Absolute URL for a ROUTES path.
 *
 * Every value in ROUTES already carries its trailing slash, so the old
 * `${SITE_URL}${path}/` here appended a second one and emitted `/blogs//` as the
 * canonical and og:url of every page. Normalise instead of assuming either shape.
 */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.endsWith("/") ? path : `${path}/`}`;
}

/**
 * Absolute URL for a bundled asset. Vite rewrites the import to `/assets/<hash>.jpg` at
 * build time, so this must never be hand-written — crawlers reject relative og:image.
 */
export function absoluteAsset(src: string): string {
  return `${SITE_URL}${src}`;
}

function defined<T>(values: (T | undefined | false)[]): T[] {
  return values.filter((v): v is T => Boolean(v));
}

export type OgImage = { src: string; width: number; height: number; alt: string };

/*
 * Share cards, cropped from real photographs.
 *
 * 1200x630 is what Facebook, WhatsApp, LinkedIn and X all render best, but only
 * newborn-hands is shot wide enough to reach it. The clinic and doctor cards keep their
 * source's native width rather than being upscaled: 768x403 and 650x341 both clear the
 * 600x315 crawler minimum, and a real photograph at native size beats a soft enlargement.
 * Higher-resolution originals of those two are the only thing that improves them.
 *
 * Sourcing rule: no AI-generated or stale campaign imagery here. hero-banner-pink and
 * hero-banner-teal are old marketing creative with copy baked into the artwork, unused
 * everywhere else on the site; dr-payal-portrait.jpg depicts a different woman from the
 * real photographs (see the note in the about route, which leaves it unused for exactly
 * this reason). None of the three belongs on a card representing this clinic or naming
 * this doctor.
 */
export const OG_DEFAULT: OgImage = {
  src: ogDefaultAsset,
  width: 1200,
  height: 630,
  alt: `${CLINIC.name} — fertility and IVF care in Marathahalli, Bengaluru`,
};

export const OG_DOCTOR: OgImage = {
  src: ogDoctorAsset,
  width: 650,
  height: 341,
  alt: `${CLINIC.doctor}, fertility specialist at ${CLINIC.name}`,
};

export const OG_CLINIC: OgImage = {
  src: ogClinicAsset,
  width: 768,
  height: 403,
  alt: `Reception at ${CLINIC.name}, Marathahalli Bridge Service Road, Bengaluru`,
};

/** Build head() meta tags for a content route. */
export function pageMeta({
  title,
  description,
  path,
  image = OG_DEFAULT,
  type = "website",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  /**
   * Defaults to the site card. Passing nothing is the common case and is deliberate —
   * before this default existed, 44 of 45 routes shipped with no og:image at all and
   * shared as a bare text link.
   */
  image?: OgImage;
  /** Blog posts pass "article"; everything else takes the default. */
  type?: "website" | "article";
  /** Thin or duplicate pages only. Nothing on this site sets it today. */
  noindex?: boolean;
}) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteAsset(image.src);

  const meta: Meta[] = [
    { title },
    { name: "description", content: description },
    {
      name: "robots",
      content: noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },

    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:site_name", content: CLINIC.name },
    { property: "og:locale", content: "en_IN" },
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: String(image.width) },
    { property: "og:image:height", content: String(image.height) },
    { property: "og:image:alt", content: image.alt },

    /* twitter:title and twitter:description are set explicitly rather than left to fall
       back to the og:* pair — the fallback is honoured inconsistently by the non-X
       crawlers (Slack, Teams) that also read these tags. */
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: image.alt },

    /* Local signals, on every page rather than just the home page. */
    { name: "geo.region", content: "IN-KA" },
    { name: "geo.placename", content: `${CLINIC.city}, ${CLINIC.region}` },
    { name: "geo.position", content: `${CLINIC.geo.latitude};${CLINIC.geo.longitude}` },
    { name: "ICBM", content: `${CLINIC.geo.latitude}, ${CLINIC.geo.longitude}` },
  ];

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}

export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: CLINIC.addressStreet,
  addressLocality: CLINIC.city,
  addressRegion: CLINIC.region,
  postalCode: CLINIC.postalCode,
  addressCountry: "IN",
};

const SOCIAL_PROFILES = [
  CLINIC.social.facebook,
  CLINIC.social.instagram,
  CLINIC.social.linkedin,
  CLINIC.social.youtube,
];

export const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": CLINIC_ID,
  name: CLINIC.name,
  alternateName: CLINIC.alternateName,
  url: `${SITE_URL}/`,
  telephone: CLINIC.phoneDisplay,
  email: CLINIC.email,
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  /* Google requires image on a LocalBusiness for local rich results, and treats logo as
     the entity's mark. Absent before — the listing had no imagery to draw on. */
  image: [receptionAsset, waitingAreaAsset, consultRoomAsset].map(absoluteAsset),
  logo: absoluteAsset(logoAsset),
  /* The Business Profile URL is a better hasMap than a directions deep-link: it names the
     listing itself rather than a route to it. Falls back while the CID is unset. */
  hasMap: isConfigured(CLINIC.google.businessProfile)
    ? CLINIC.google.businessProfile
    : CLINIC.directionsUrl,
  /* The GBP link is the strongest signal tying this domain to the Google listing, so it
     leads sameAs once it is filled in. */
  sameAs: defined([
    isConfigured(CLINIC.google.businessProfile) && CLINIC.google.businessProfile,
    ...SOCIAL_PROFILES,
  ]),
  areaServed: [
    { "@type": "City", name: "Bengaluru" },
    { "@type": "Place", name: "Marathahalli" },
    { "@type": "Place", name: "Whitefield" },
    { "@type": "Place", name: "Bellandur" },
  ],
  address: POSTAL_ADDRESS,
  geo: {
    "@type": "GeoCoordinates",
    latitude: CLINIC.geo.latitude,
    longitude: CLINIC.geo.longitude,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:30",
    closes: "18:30",
  },
  founder: { "@id": DOCTOR_ID },
  employee: { "@id": DOCTOR_ID },
  availableService: [
    "IVF",
    "IUI",
    "ICSI",
    "Egg freezing",
    "Male infertility treatment",
    "PCOS treatment",
    "Pregnancy care",
  ].map((name) => ({ "@type": "MedicalProcedure", name })),
  medicalSpecialty: ["Obstetrics", "Gynecologic", "Reproductive"],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: CLINIC.name,
  publisher: { "@id": CLINIC_ID },
  inLanguage: "en-IN",
  /* Targets the ?q= param that /blogs/ already validates via parseBlogSearch. */
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blogs/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const doctorSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": DOCTOR_ID,
  name: CLINIC.doctor,
  image: absoluteAsset(ogDoctorAsset),
  url: `${SITE_URL}/best-gynecologist-and-fertility-doctor-in-marathahalli/`,
  telephone: CLINIC.phoneDisplay,
  medicalSpecialty: ["Reproductive", "Gynecologic"],
  worksFor: { "@id": CLINIC_ID },
  address: POSTAL_ADDRESS,
  sameAs: SOCIAL_PROFILES,
  /* Derived from the arrays in clinic.ts rather than restated, so the credentials shown
     on the about page and the ones in structured data cannot drift apart. */
  alumniOf: QUALIFICATIONS.map((q) => ({
    "@type": "EducationalOrganization",
    name: q.institution,
  })),
  memberOf: MEMBERSHIPS.map((name) => ({ "@type": "Organization", name })),
  knowsAbout: [
    "In-vitro fertilisation (IVF)",
    "Intrauterine insemination (IUI)",
    "Intracytoplasmic sperm injection (ICSI)",
    "Egg freezing and fertility preservation",
    "Male infertility",
    "PCOS and PCOD",
    "Pregnancy care and natural delivery",
  ],
};

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * The page-level entity for a treatment or condition page.
 *
 * MedicalWebPage is what tells Google the page is health content ABOUT something,
 * rather than a generic WebPage; `about` names the condition or procedure so the page
 * can be matched to a query about it.
 */
export function medicalWebPageSchema({
  title,
  description,
  path,
  about,
  image = OG_DEFAULT,
}: {
  title: string;
  description: string;
  path: string;
  /** The condition or procedure this page covers, e.g. "In-vitro fertilisation". */
  about: string;
  image?: OgImage;
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    image: absoluteAsset(image.src),
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@type": "MedicalEntity", name: about },
    /* Named reviewer is what Google's health-content guidance asks for. */
    reviewedBy: { "@id": DOCTOR_ID },
    lastReviewed: new Date().toISOString().slice(0, 10),
    provider: { "@id": CLINIC_ID },
  };
}

/** A procedure offered at the clinic, linked back to the single clinic entity. */
export function serviceSchema({
  name,
  description,
  path,
  procedureType = "MedicalTherapy",
}: {
  name: string;
  description: string;
  path: string;
  procedureType?: "MedicalTherapy" | "SurgicalProcedure" | "DiagnosticProcedure";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `${absoluteUrl(path)}#procedure`,
    name,
    description,
    procedureType: `https://schema.org/${procedureType}`,
    url: absoluteUrl(path),
    provider: { "@id": CLINIC_ID },
    performer: { "@id": DOCTOR_ID },
    availableService: { "@id": CLINIC_ID },
  };
}

/**
 * A catchment-area page (Whitefield, Bellandur).
 *
 * Deliberately NOT a second MedicalClinic: the clinic has one physical address, and
 * publishing a second business entity per area is the classic way to get a local listing
 * suppressed for NAP inconsistency. This describes a WebPage about the same `@id`.
 */
export function locationSchema({
  area,
  title,
  description,
  path,
}: {
  area: string;
  title: string;
  description: string;
  path: string;
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": CLINIC_ID },
    mainEntity: { "@id": CLINIC_ID },
    significantLink: CLINIC.directionsUrl,
    spatialCoverage: {
      "@type": "Place",
      name: `${area}, ${CLINIC.city}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: CLINIC.city,
        addressRegion: CLINIC.region,
        addressCountry: "IN",
      },
    },
  };
}

export function contactPageSchema({ path }: { path: string }) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}#webpage`,
    url,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": CLINIC_ID },
    mainEntity: { "@id": CLINIC_ID },
  };
}

export function imageGallerySchema({
  path,
  title,
  description,
  images,
}: {
  path: string;
  title: string;
  description: string;
  images: { src: string; alt: string; width: number; height: number }[];
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": CLINIC_ID },
    image: images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: absoluteAsset(img.src),
      caption: img.alt,
      width: img.width,
      height: img.height,
    })),
  };
}

/** Hub pages that exist to route to a set of child pages. */
export function itemListSchema({
  path,
  title,
  items,
}: {
  path: string;
  title: string;
  items: { name: string; path: string }[];
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": CLINIC_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

/**
 * BlogPosting for the article template.
 *
 * No datePublished/dateModified: this site has never carried publish dates for its
 * articles, and a fabricated date in structured data is worse than an absent one. Add
 * both here once real dates exist on BlogPostMeta.
 */
export function articleSchema({
  title,
  description,
  path,
  image,
  author,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  author: string;
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(image ? { image } : {}),
    author: { "@type": "Person", name: author },
    publisher: { "@id": CLINIC_ID },
    inLanguage: "en-IN",
  };
}
