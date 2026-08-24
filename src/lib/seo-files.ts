import { SITE_PAGES, PAGE_SECTIONS, type SitePage } from "@/data/site-pages";
import { POSTS, postPath } from "@/content/blog";
import { CLINIC } from "@/lib/clinic";
import { SITE_URL } from "@/data/navigation";
import { absoluteUrl } from "@/lib/seo";

/**
 * /sitemap.xml and /llms.txt, generated from SITE_PAGES + POSTS.
 *
 * These replaced a hand-written public/sitemap.xml. That file was accurate, but only
 * because someone remembered to edit it; nothing connected it to the routes it listed.
 */

type Entry = Pick<SitePage, "route" | "title" | "summary" | "priority" | "changeFrequency">;

/** Blog posts, shaped like SITE_PAGES entries so both outputs can treat them uniformly. */
function postEntries(): Entry[] {
  return POSTS.map((post) => ({
    route: postPath(post.slug),
    title: post.title,
    summary: post.excerpt,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * `lastmod` is the deploy date, not a per-page edit date.
 *
 * There is no per-page timestamp anywhere in this codebase to draw on, and the same
 * reasoning that keeps invented dates out of BlogPosting applies here: a plausible-looking
 * per-page date that is not real is worse than a coarse one that is. Build date is true
 * for every page in the bundle, because every page ships in every deploy.
 */
const BUILD_DATE = new Date().toISOString().slice(0, 10);

export function buildSitemap(): string {
  const entries = [...SITE_PAGES, ...postEntries()];
  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(absoluteUrl(entry.route))}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function bullet(entry: Entry): string {
  return `- [${entry.title}](${absoluteUrl(entry.route)}): ${entry.summary}`;
}

/**
 * llms.txt, per the llmstxt.org convention: an H1, a blockquote summary, then linked
 * sections. Written for an assistant answering "where can I get IVF in Marathahalli" —
 * so the facts it most needs (where, when, who, how to reach) are above the link lists,
 * not buried in them.
 */
export function buildLlmsTxt(): string {
  const sections = PAGE_SECTIONS.map((section) => {
    const pages = SITE_PAGES.filter((page) => page.section === section.id).sort(
      (a, b) => b.priority - a.priority,
    );
    if (pages.length === 0) return "";
    return `## ${section.heading}\n\n${pages.map(bullet).join("\n")}`;
  }).filter(Boolean);

  const posts = postEntries();
  const articles = `## Articles\n\n${posts.map(bullet).join("\n")}`;

  return `# ${CLINIC.name}

> ${CLINIC.alternateName} is a fertility, IVF and gynecology clinic in Marathahalli, Bengaluru, led by ${CLINIC.doctor} (${CLINIC.credentials}), with ${CLINIC.experience}. It treats infertility with IVF, IUI, ICSI, egg freezing and donor programmes, and provides gynecology, pregnancy and delivery care. Patients travel to it from Marathahalli, Whitefield, Bellandur and the surrounding east Bengaluru neighbourhoods.

## Clinic details

- Name: ${CLINIC.name}
- Doctor: ${CLINIC.doctor}, ${CLINIC.credentials}
- Address: ${CLINIC.addressLine}
- Phone: ${CLINIC.phoneDisplay}
- Email: ${CLINIC.email}
- Hours: ${CLINIC.hours}
- Book an appointment: ${CLINIC.bookingUrl}
- Directions: ${CLINIC.directionsUrl}
- Google Business Profile: ${CLINIC.google.businessProfile}
- Website: ${SITE_URL}/

${sections.join("\n\n")}

${articles}

## Notes

- Content on this site is general information about treatments offered at this clinic. It is not a substitute for a consultation, and outcomes described are not a guarantee of results in any individual case.
- Every URL above is canonical and carries a trailing slash.
`;
}
