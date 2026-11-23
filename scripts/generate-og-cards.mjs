// Postbuild step for `npm run build`: a branded share card (og:image) for every page.
//
// Why: every page shared the same untitled photograph, so a WhatsApp or Facebook preview
// of the IVF page looked identical to one of the PCOS page, and none of them showed the
// clinic's name, doctor, phone number or locations. The SEO audit flagged exactly that.
//
// How: runs after the prerender, on the finished HTML, so it needs no list of pages of
// its own — a new route or blog post gets a card the first time it is built. For each
// indexable page it reads
//   - the <h1>, as the card's headline (the <title> is written for search results and
//     reads awkwardly on a card: "Neo Fertility - Egg Freezing Clinic Marathahalli ...");
//   - the og:image the page already declares, as the card's photograph (blog covers,
//     the doctor and clinic photos, or the default newborn photo);
// renders a 1200x630 JPEG with satori (layout -> SVG) and sharp (SVG -> JPEG), writes it
// to assets/og/<slug>-<hash>.jpg, and points og:image / twitter:image at it.
//
// The hash in the filename is what lets assets/ keep its one-year cache: a changed
// headline is a new file, never a stale cached one.
//
// Run with: node --experimental-strip-types scripts/generate-og-cards.mjs
// (the flag lets it import src/lib/clinic.ts, so the card's phone number, doctor and
// locations come from the same place as the rest of the site.)
import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";
import { CLINIC, LOCATIONS } from "../src/lib/clinic.ts";

const CLIENT_DIR = path.resolve("dist/client");
const OUT_DIR = path.join(CLIENT_DIR, "assets", "og");
const SITE_URL = "https://neofertility.co.in";
const WIDTH = 1200;
const HEIGHT = 630;

/* Brand palette, from src/styles.css. */
const PLUM = "#3D203F";
const PINK = "#DB479D";
const PINK_TEXT = "#BF2A85";
const MUTED = "#5E5560";

/* Headlines where the page's <h1> works on the page but not on its own on a card. */
const HEADLINE_OVERRIDES = {
  "/": "Fertility & IVF Clinic in Marathahalli and Whitefield",
  "/best-gynecologist-and-fertility-doctor-in-marathahalli/":
    "Fertility Specialist and Gynecologist, Marathahalli",
  "/gallery/": "Our Success Stories",
  "/blogs/": "Fertility & Gynecology Articles",
};

const fontDir = path.resolve("node_modules/@fontsource/poppins/files");
const fonts = await Promise.all(
  [
    [400, "poppins-latin-400-normal.woff"],
    [600, "poppins-latin-600-normal.woff"],
    [700, "poppins-latin-700-normal.woff"],
  ].map(async ([weight, file]) => ({
    name: "Poppins",
    weight,
    style: "normal",
    data: await readFile(path.join(fontDir, file)),
  })),
);

/* The header logo (a trimmed copy of neo-logo.png), converted to PNG because satori
   does not decode WebP. */
const logo = await sharp(path.resolve("src/assets/neo-logo-trimmed.webp")).png().toBuffer();
const logoMeta = await sharp(logo).metadata();
const LOGO_HEIGHT = 96;
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
const logoWidth = Math.round((logoMeta.width / logoMeta.height) * LOGO_HEIGHT);

/* ---------- tiny element helpers (satori takes React-shaped objects) ---------- */
const h = (type, style, children) => ({
  type,
  props: { style: { display: "flex", ...style }, children },
});
const img = (src, style, width, height) => ({
  type: "img",
  props: { src, width, height, style },
});
const icon = (pathData, color, size) =>
  img(
    `data:image/svg+xml;base64,${Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${pathData}</svg>`,
    ).toString("base64")}`,
    { width: size, height: size },
    size,
    size,
  );
/* Lucide's phone and map-pin glyphs, the icons the site itself uses. */
const PHONE_ICON =
  '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>';
const PIN_ICON =
  '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>';

function headlineSize(text) {
  if (text.length <= 28) return 56;
  if (text.length <= 44) return 48;
  if (text.length <= 62) return 42;
  return 36;
}

function card({ headline, photoSrc }) {
  const left = h(
    "div",
    /* Stops 120px short of the photo, so a long headline wraps instead of running into
       it. */
    {
      flexDirection: "column",
      width: 760,
      padding: "48px 120px 0 64px",
      height: HEIGHT - 92,
      boxSizing: "border-box",
    },
    [
      img(logoSrc, { width: logoWidth, height: LOGO_HEIGHT }, logoWidth, LOGO_HEIGHT),
      h(
        "div",
        {
          marginTop: 34,
          fontSize: headlineSize(headline),
          fontWeight: 700,
          color: PLUM,
          lineHeight: 1.15,
        },
        headline,
      ),
      h("div", { marginTop: 26, width: 88, height: 6, borderRadius: 3, backgroundColor: PINK }),
      h("div", { marginTop: 22, flexDirection: "column" }, [
        h("div", { fontSize: 30, fontWeight: 600, color: PLUM }, CLINIC.doctor),
        h(
          "div",
          { marginTop: 4, fontSize: 21, fontWeight: 400, color: MUTED },
          `${CLINIC.credentialsShort} · Fertility & IVF Specialist`,
        ),
      ]),
    ],
  );

  const photo = h(
    "div",
    { position: "absolute", top: 0, right: 0, width: 440, height: HEIGHT - 92 },
    [
      img(photoSrc, { width: 440, height: HEIGHT - 92, objectFit: "cover" }, 440, HEIGHT - 92),
      /* Fades the photo's left edge into the white panel. */
      h("div", {
        position: "absolute",
        top: 0,
        left: 0,
        width: 140,
        height: HEIGHT - 92,
        backgroundImage: "linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)",
      }),
    ],
  );

  const band = h(
    "div",
    {
      position: "absolute",
      left: 0,
      bottom: 0,
      width: WIDTH,
      height: 92,
      backgroundColor: PLUM,
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 56px 0 64px",
      boxSizing: "border-box",
      color: "#FFFFFF",
    },
    [
      h("div", { alignItems: "center", fontSize: 29, fontWeight: 600 }, [
        icon(PHONE_ICON, "#E89DC2", 28),
        h("div", { marginLeft: 14 }, CLINIC.phoneDisplay),
      ]),
      h(
        "div",
        { alignItems: "center", fontSize: 21, fontWeight: 400 },
        LOCATIONS.flatMap((location, index) => [
          ...(index > 0 ? [h("div", { margin: "0 14px", color: "#E89DC2" }, "|")] : []),
          icon(PIN_ICON, "#E89DC2", 22),
          h("div", { marginLeft: 8 }, `${location.area}, Bengaluru`),
        ]),
      ),
    ],
  );

  return h(
    "div",
    {
      position: "relative",
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: "#FFFFFF",
      fontFamily: "Poppins",
      /* Thin brand rule along the top edge. */
      borderTop: `8px solid ${PINK}`,
    },
    [photo, left, band],
  );
}

/* ---------- HTML helpers ---------- */
const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  ndash: "–",
  mdash: "—",
};
function decode(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name] ?? match);
}
function escapeAttr(text) {
  return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function metaContent(html, attr, key) {
  const match = html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"\\s*/?>`));
  return match ? decode(match[1]) : undefined;
}
function setMeta(html, attr, key, value) {
  const pattern = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*("\\s*/?>)`);
  if (!pattern.test(html)) throw new Error(`no <meta ${attr}="${key}"> to replace`);
  return html.replace(pattern, (_, start, end) => `${start}${escapeAttr(value)}${end}`);
}

async function htmlFiles() {
  const files = [{ file: path.join(CLIENT_DIR, "index.html"), route: "/" }];
  const pagesDir = path.join(CLIENT_DIR, "pages");
  for (const entry of await readdir(pagesDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      files.push({
        file: path.join(pagesDir, entry.name, "index.html"),
        route: `/${entry.name}/`,
      });
    }
  }
  return files;
}

async function photoFor(ogImageUrl) {
  if (!ogImageUrl?.startsWith(`${SITE_URL}/assets/`)) {
    throw new Error(`og:image is not a built asset: ${ogImageUrl}`);
  }
  const file = path.join(CLIENT_DIR, decodeURIComponent(ogImageUrl.slice(SITE_URL.length + 1)));
  /* Normalised to a JPEG at the size the card shows it, which keeps the embedded data
     URI small and sidesteps formats satori cannot read.

     The blog covers (og-blog-*) are designed banners with their title set on the left
     and the artwork on the right, so they are cropped from the right edge: a centred
     crop cut their lettering mid-word. Plain photographs keep the saliency crop. */
  const position = /\/og-blog-/.test(ogImageUrl) ? "right" : "attention";
  const buffer = await sharp(file)
    .resize(880, 1076, { fit: "cover", position })
    .jpeg({ quality: 85 })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  let made = 0;
  for (const { file, route } of await htmlFiles()) {
    let html = await readFile(file, "utf8");
    if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;

    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const headline =
      HEADLINE_OVERRIDES[route] ??
      (h1 &&
        decode(h1[1].replace(/<[^>]+>/g, " "))
          .replace(/\s+/g, " ")
          .replace(/\s+([,.:;?!])/g, "$1")
          .trim());
    if (!headline) throw new Error(`${route}: no <h1> to use as the card headline`);

    const photoSrc = await photoFor(metaContent(html, "property", "og:image"));
    const svg = await satori(card({ headline, photoSrc }), { width: WIDTH, height: HEIGHT, fonts });
    const jpeg = await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toBuffer();

    const slug = route === "/" ? "home" : route.replace(/^\/|\/$/g, "");
    const hash = createHash("sha256").update(jpeg).digest("base64url").slice(0, 8);
    const name = `${slug}-${hash}.jpg`;
    await writeFile(path.join(OUT_DIR, name), jpeg);

    const url = `${SITE_URL}/assets/og/${name}`;
    const alt = `${headline} | ${CLINIC.name}, ${CLINIC.doctor} | ${CLINIC.phoneDisplay}`;
    html = setMeta(html, "property", "og:image", url);
    html = setMeta(html, "property", "og:image:width", String(WIDTH));
    html = setMeta(html, "property", "og:image:height", String(HEIGHT));
    html = setMeta(html, "property", "og:image:alt", alt);
    html = setMeta(html, "name", "twitter:image", url);
    html = setMeta(html, "name", "twitter:image:alt", alt);
    await writeFile(file, html);
    made += 1;
  }
  console.log(`[generate-og-cards] Wrote ${made} share cards to dist/client/assets/og/`);
}

await main();
