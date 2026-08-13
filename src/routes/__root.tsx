import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/conversion/MobileActionBar";
import { WhatsAppFloat } from "@/components/conversion/WhatsAppFloat";
import { DEFAULT_WHATSAPP_MESSAGE } from "@/lib/clinic";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl">404</h1>
        <h2 className="mt-4">Page not found</h2>
        <p className="mt-2 text-ink-muted">
          This page has moved or never existed. Start again from the home page, or call the clinic
          and we will point you to the right place.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-pink-600 px-5 py-2.5 text-[0.9375rem] font-medium text-paper hover:bg-pink-700"
          >
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl">This page didn't load</h1>
        <p className="mt-2 text-ink-muted">
          Something went wrong on our end. Try again, or call us and we will help directly.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-pink-600 px-5 py-2.5 text-[0.9375rem] font-medium text-paper hover:bg-pink-700"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-pink-600 px-5 py-2.5 text-[0.9375rem] font-medium text-pink-700"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Neo Fertility Clinic — IVF and Fertility Care in Marathahalli" },
      {
        name: "description",
        content:
          "Fertility and gynecology care led by Dr. Payal Mahapatra in Marathahalli, Bengaluru. IVF, IUI, ICSI, PCOS and pregnancy care.",
      },
      { name: "author", content: "Neo Fertility Clinic" },
      { property: "og:site_name", content: "Neo Fertility Clinic" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      /* Fonts are self-hosted via Fontsource and imported in styles.css — no font CDN. */
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-plum-900 focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar sourcePage={pathname} whatsappMessage={DEFAULT_WHATSAPP_MESSAGE} />
      <WhatsAppFloat sourcePage={pathname} whatsappMessage={DEFAULT_WHATSAPP_MESSAGE} />
    </QueryClientProvider>
  );
}
