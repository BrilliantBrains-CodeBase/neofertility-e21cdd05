// Static-hosting build config, used only by `npm run build:static`.
//
// This does NOT replace vite.config.ts (which Lovable's own pipeline builds with,
// targeting Cloudflare via nitro's default preset). It produces a second, independent
// build: every route rendered to a real .html file at build time (no Node/Workers
// server needed at request time), suitable for plain Apache shared hosting
// (Hostinger, GoDaddy) or any static file host.
//
// Output: dist/client/  (upload the *contents* of that folder to public_html or equivalent)
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    // Renders every static route (all file-based routes with no path params) to
    // an .html file, then follows <a href> links found in that HTML to also
    // reach dynamic routes like the blog's /$slug articles.
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
      retryCount: 2,
      // Never prerender query-string URLs. The crawler follows the blog's category chips
      // (/blogs/?category=ivf, ...) but writes every one of them to the same file as
      // /blogs/ (the query is dropped from the output path, and the trailing slash it
      // appends lands inside the query, so the filter matches nothing). Whichever finished
      // last won, and /blogs/index.html shipped as "No articles match your filters": no
      // links to any post in the static HTML crawlers read, plus a React hydration
      // mismatch that threw away the server render and re-rendered the page client-side.
      // Filtered views are client-side state on top of /blogs/ and canonicalise to it.
      filter: ({ path }) => !path.includes("?"),
    },
    // TanStack's built-in sitemap generator would fight with the hand-built one this app
    // already serves from src/lib/seo-files.ts — /sitemap.xml and /llms.txt below hit that
    // same handler (see the seoFileResponse early-return in src/server.ts) and capture its
    // real output as static files instead.
    sitemap: { enabled: false },
    pages: [{ path: "/sitemap.xml" }, { path: "/llms.txt" }],
  },
  // nitro disabled entirely for this build. TanStack Start's own prerender step (enabled
  // above) looks for the SSR bundle at the fixed path dist/server/server.js, which is
  // where a plain (non-nitro) Vite build puts it — nitro relocates the server build to
  // .output/server/index.mjs instead, which breaks prerendering ("Cannot find module
  // dist/server/server.js"). We don't need a running server for a static site anyway —
  // only dist/client, which prerender fills with real .html per route.
  nitro: false,
});
