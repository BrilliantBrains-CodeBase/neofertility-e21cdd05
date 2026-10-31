// Vite config for the dev server (`npm run dev`) and the production build (`npm run build`).
//
// The build is fully static: every route is rendered to a real .html file at build time,
// so no Node server is needed at request time. The output, dist/client/, is uploaded to
// GoDaddy's public_html by .github/workflows/deploy.yml.
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Bake VITE_* values from .env into both the client and the SSR/prerender bundles.
  const envDefine = Object.fromEntries(
    Object.entries(loadEnv(mode, process.cwd(), "VITE_")).map(([key, value]) => [
      `import.meta.env.${key}`,
      JSON.stringify(value),
    ]),
  );

  return {
    define: envDefine,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
    server: { host: "::", port: 8080 },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        // Fail the build if client code imports server-only modules.
        importProtection: {
          behavior: "error",
          client: { files: ["**/server/**"], specifiers: ["server-only"] },
        },
        // TanStack Start's bundled server entry is redirected to src/server.ts (our SSR
        // error wrapper, plus the /sitemap.xml and /llms.txt handler).
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
      }),
      viteReact(),
    ],
  };
});
