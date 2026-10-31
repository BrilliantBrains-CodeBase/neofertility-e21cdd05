// Postbuild step for `npm run build`.
//
// The prerender step writes one folder per route directly at the root of dist/client/
// (contact/, best-ivf-treatment-.../, ...48 of them), which makes the top level of the
// build noisy to browse. This moves all of them under dist/client/pages/ instead, leaving
// only a handful of items at the root. The URLs themselves don't change — public/.htaccess
// has a matching internal rewrite that serves pages/<path>/index.html for a request to
// /<path>/ without changing the visible URL.
import { readdir, mkdir, rename } from "node:fs/promises";
import path from "node:path";

const CLIENT_DIR = path.resolve("dist/client");
const PAGES_DIR = path.join(CLIENT_DIR, "pages");

// Everything else at the root — the per-route folders — gets moved into pages/.
const KEEP_AT_ROOT = new Set([
  "assets",
  "pages",
  "index.html",
  "sitemap.xml",
  "llms.txt",
  "robots.txt",
  "favicon.png",
  ".htaccess",
]);

async function main() {
  const entries = await readdir(CLIENT_DIR, { withFileTypes: true });
  const routeDirs = entries.filter((entry) => entry.isDirectory() && !KEEP_AT_ROOT.has(entry.name));

  if (routeDirs.length === 0) {
    console.log("[organize-static-build] No route folders found to move — nothing to do.");
    return;
  }

  await mkdir(PAGES_DIR, { recursive: true });
  for (const dir of routeDirs) {
    await rename(path.join(CLIENT_DIR, dir.name), path.join(PAGES_DIR, dir.name));
  }
  console.log(`[organize-static-build] Moved ${routeDirs.length} route folders into dist/client/pages/`);
}

main();
