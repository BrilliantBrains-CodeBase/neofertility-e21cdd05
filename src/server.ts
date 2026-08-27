import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { buildSitemap, buildLlmsTxt } from "./lib/seo-files";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

/**
 * /sitemap.xml and /llms.txt, served from the route map rather than from static files.
 *
 * Handled here, in the worker entry, rather than as a TanStack route: this runs before
 * anything else touches the request, so there is no ordering question with the static
 * asset handler or the SSR router. public/sitemap.xml was deleted when this landed —
 * a static file at the same path would have shadowed this handler.
 */
function seoFileResponse(pathname: string): Response | undefined {
  if (pathname === "/sitemap.xml") {
    return new Response(buildSitemap(), {
      headers: {
        "content-type": "application/xml; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  }
  if (pathname === "/llms.txt") {
    return new Response(buildLlmsTxt(), {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  }
  return undefined;
}

/**
 * URLs the old WordPress site ranked for that have no route here.
 *
 * The new site takes over neofertility.co.in itself, so these are not stale addresses on
 * a domain we are leaving — they are live, indexed URLs that would start 404ing the day
 * the platform swaps. Every one is recorded in docs/legacy-seo/pages.json.
 *
 * Deliberately absent: /maintenance-mode/, a WordPress artifact that was indexable by
 * accident. It is left to 404 rather than pointed somewhere it never belonged.
 */
export const LEGACY_REDIRECTS: Record<string, string> = {
  /* Already a 301 on the WordPress site. Re-created here because that redirect dies with
     WordPress, and with it whatever links point at the old slug. */
  "/low-amh-can-you-still-get-pregnant-2": "/ivf-treatment-in-bangalore/",
  /* Two posts that were not carried over. Each goes to the service page covering the same
     subject — the closest equivalent, not the blog index, so the visitor lands on content
     that answers the query they clicked. */
  "/icsi-treatment-for-male-infertility": "/icsi-treatment-in-marathahalli-whitefield-bangalore/",
  "/iui-treatment-a-complete-guide":
    "/intrauterine-insemination-iui-treatment-marathahalli-whitefield-in-bangalore/",
  /* WordPress taxonomy and author archives. No counterpart by design. */
  "/category/uncategorized": "/blogs/",
  "/author/priyanka": "/blogs/",
};

/**
 * 301s for the legacy URLs above.
 *
 * Runs in the worker entry, ahead of the router, for the same reason seoFileResponse does:
 * the $slug catch-all in src/routes/ would otherwise claim these paths and answer 404
 * before any route-level redirect could fire.
 *
 * Keys are stored without a trailing slash and matched both ways — the old site linked
 * these with the slash and external sites link them both ways.
 */
function legacyRedirectResponse(pathname: string, url: URL): Response | undefined {
  const key = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const target = LEGACY_REDIRECTS[key];
  if (!target) return undefined;

  /* Query strings are preserved: these URLs are linked from campaigns and email with
     utm_* attached, and dropping them would blind the analytics on arrival. */
  const location = `${target}${url.search}`;
  return new Response(null, {
    status: 301,
    headers: { location, "cache-control": "public, max-age=3600" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      const seoFile = seoFileResponse(url.pathname);
      if (seoFile) return seoFile;

      const legacyRedirect = legacyRedirectResponse(url.pathname, url);
      if (legacyRedirect) return legacyRedirect;

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
