import { CLINIC } from "@/lib/clinic";
import { SITE_URL } from "@/data/navigation";

type Meta = Record<string, string>;

/** Build head() meta tags for a content route. */
export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const url = `${SITE_URL}${path === "/" ? "/" : `${path}/`}`;
  const meta: Meta[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}

export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${SITE_URL}/#clinic`,
  name: CLINIC.name,
  alternateName: CLINIC.alternateName,
  url: `${SITE_URL}/`,
  telephone: CLINIC.phoneDisplay,
  email: CLINIC.email,
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  hasMap: CLINIC.directionsUrl,
  sameAs: [
    CLINIC.social.facebook,
    CLINIC.social.instagram,
    CLINIC.social.linkedin,
    CLINIC.social.youtube,
  ],
  areaServed: [
    { "@type": "City", name: "Bengaluru" },
    { "@type": "Place", name: "Marathahalli" },
    { "@type": "Place", name: "Whitefield" },
    { "@type": "Place", name: "Bellandur" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC.addressStreet,
    addressLocality: CLINIC.city,
    addressRegion: CLINIC.region,
    postalCode: CLINIC.postalCode,
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 12.9569, longitude: 77.7011 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:30",
    closes: "18:30",
  },
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
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: CLINIC.name,
  publisher: { "@id": `${SITE_URL}/#clinic` },
  inLanguage: "en-IN",
};


export const doctorSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: CLINIC.doctor,
  medicalSpecialty: ["Reproductive", "Gynecologic"],
  worksFor: { "@type": "MedicalClinic", name: CLINIC.name },
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC.addressStreet,
    addressLocality: CLINIC.city,
    addressRegion: CLINIC.region,
    postalCode: CLINIC.postalCode,
    addressCountry: "IN",
  },
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
      item: `${SITE_URL}${item.path === "/" ? "/" : `${item.path}/`}`,
    })),
  };
}
