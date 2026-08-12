import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone, ChevronDown, MapPin, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { CLINIC, track } from "@/lib/clinic";
import { FERTILITY_MENU, GYNECOLOGY_MENU, ROUTES, type NavGroup } from "@/data/navigation";
/* Trimmed copy of neo-logo.png. The original sits on a 500×500 canvas whose artwork
   fills only 47% of the height, so any `h-*` rendered the mark at half the size it
   looked like it should be. Cropping to the content bbox makes h-* mean what it says. */
import logoAsset from "@/assets/neo-logo-trimmed.png";
import { cn } from "@/lib/utils";

type MenuKey = "fertility" | "gynecology" | null;

function AnnouncementBar({ onHero }: { onHero: boolean }) {
  return (
    <div
      className={cn(
        "border-b transition-colors duration-300 ease-out",
        onHero
          ? "border-white/20 bg-transparent text-sand"
          : "border-line/70 bg-secondary text-teal-700",
      )}
    >
      <div className="flex h-12 items-center justify-between px-4 text-[0.8125rem] tracking-[0.02em] lg:h-11 lg:px-8">
        <span className="flex min-w-0 items-center gap-2">
          <MapPin className="size-4 shrink-0" aria-hidden />
          <span className="hidden truncate lg:inline">
            Scorpio House, Marathahalli Bridge Service Road, opposite Purva Apartments, Bengaluru
            560037
          </span>
          <span className="truncate lg:hidden">Marathahalli, Bengaluru</span>
        </span>
        <span className="flex items-center gap-7">
          <span className="hidden items-center gap-2 lg:flex">
            <Clock className="size-4" aria-hidden />
            Mon to Sun · 09:30 to 18:30
          </span>
          <a
            href={CLINIC.phoneHref}
            onClick={() => track("call_click", { source_page: "announcement_bar" })}
            className="flex min-h-11 items-center gap-2 hover:opacity-70"
          >
            <Phone className="size-4" aria-hidden />
            {CLINIC.phoneDisplay}
          </a>
          <a
            href={`mailto:${CLINIC.email}`}
            className="hidden min-h-11 items-center gap-2 hover:opacity-70 lg:flex"
          >
            <Mail className="size-4" aria-hidden />
            {CLINIC.email}
          </a>
        </span>
      </div>
    </div>
  );
}

function MegaPanel({
  groups,
  columns,
  align = "left",
}: {
  groups: NavGroup[];
  columns: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "absolute top-full z-50 w-max max-w-[calc(100vw-3rem)] rounded-2xl border border-line bg-background p-8 shadow-rail",
        "rise-in",
        align === "left" ? "left-0" : "right-0",
        columns,
      )}
    >
      {groups.map((group) => (
        <div key={group.heading}>
          <p className="text-[0.75rem] tracking-[0.12em] text-muted-foreground uppercase">
            {group.heading}
          </p>
          <ul className="mt-3 space-y-1">
            {group.links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  {...(link.hash ? { hash: link.hash } : {})}
                  className="block rounded-md px-2 py-1.5 text-[0.9375rem] text-ink hover:bg-muted hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function MobileGroup({ title, groups }: { title: string; groups: NavGroup[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line py-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-[1.125rem] font-medium text-teal-900"
      >
        {title}
        <ChevronDown className={cn("size-5 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="mt-3 space-y-4 pl-1">
          {groups.map((group) => (
            <div key={group.heading}>
              <p className="eyebrow">{group.heading}</p>
              <ul className="mt-2 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      {...(link.hash ? { hash: link.hash } : {})}
                      className="block text-[0.9375rem] text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Logo({ compact, onHero = false }: { compact: boolean; onHero?: boolean }) {
  return (
    <Link
      to={ROUTES.home}
      aria-label="Neo Fertility Clinic home"
      className="flex flex-col items-center leading-none"
    >
      <img
        src={logoAsset}
        alt="Neo Fertility Clinic"
        width={413}
        height={240}
        className={cn(
          "w-auto object-contain transition-all duration-300 ease-out",
          compact ? "h-12" : "h-15.5 lg:h-19",
          /* The mark is near-black artwork on transparent, so it disappears against the
             video. Flattening it to solid white keeps it legible over the hero; it
             returns to full colour the moment the bar turns solid. */
          onHero && "brightness-0 invert",
        )}
      />
    </Link>
  );
}

export function Header() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroBehind, setHeroBehind] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  /* Only the home route renders a hero for the bar to sit on. Deriving this from the
     route (rather than probing the DOM) keeps the server and first client render
     identical, so the bar never flashes solid before turning transparent. */
  const hasHero = pathname === ROUTES.home;

  /* Transparent, light-on-dark bar while the hero is still under it. */
  const onHero = hasHero && !heroBehind;

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track the bar's own height so the observer can flip exactly as the hero's bottom
     edge passes under it. This only feeds the observer, never layout. */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const measure = () => setHeaderHeight(el.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Hero visibility drives the colour change — no scroll-pixel threshold. The negative
     top inset shrinks the observed area by the bar's height, so the switch happens the
     moment the hero stops sitting behind the bar rather than when it leaves the screen. */
  useEffect(() => {
    if (!hasHero) {
      setHeroBehind(false);
      return;
    }
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) {
      setHeroBehind(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setHeroBehind(!entry?.isIntersecting), {
      rootMargin: `-${Math.max(1, Math.round(headerHeight))}px 0px 0px 0px`,
      threshold: 0,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [hasHero, headerHeight, pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const link = cn(
    "relative py-2 text-[1rem] font-semibold tracking-[0.01em] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-200 hover:after:w-full",
    onHero
      ? "text-sand hover:text-white after:bg-sand"
      : "text-teal-700 hover:text-teal-600 after:bg-teal-600",
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        "top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out",
        /* On the hero route the bar overlays the video instead of sitting above it, so
           it is taken out of flow. Elsewhere it keeps its original sticky behaviour. */
        hasHero ? "fixed inset-x-0" : "sticky",
        onHero
          ? "border-transparent bg-transparent"
          : cn("bg-background", scrolled ? "border-border shadow-rail" : "border-transparent"),
      )}
    >
      <AnnouncementBar onHero={onHero} />

      {/* Desktop row */}
      <nav
        aria-label="Main"
        className="relative hidden h-[4.5rem] items-center justify-between px-10 lg:flex"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("fertility")}
            onFocus={() => setOpenMenu("fertility")}
          >
            <button
              type="button"
              className={cn(link, "flex items-center gap-1")}
              aria-expanded={openMenu === "fertility"}
              onClick={() => setOpenMenu(openMenu === "fertility" ? null : "fertility")}
            >
              Fertility Solutions
              <ChevronDown className="size-4" />
            </button>
            {openMenu === "fertility" && (
              <MegaPanel groups={FERTILITY_MENU} columns="grid grid-cols-3 gap-10" />
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("gynecology")}
            onFocus={() => setOpenMenu("gynecology")}
          >
            <button
              type="button"
              className={cn(link, "flex items-center gap-1")}
              aria-expanded={openMenu === "gynecology"}
              onClick={() => setOpenMenu(openMenu === "gynecology" ? null : "gynecology")}
            >
              Gynecology Treatments
              <ChevronDown className="size-4" />
            </button>
            {openMenu === "gynecology" && (
              <MegaPanel groups={GYNECOLOGY_MENU} columns="grid grid-cols-2 gap-x-12 gap-y-6" />
            )}
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 flex justify-center",
            scrolled ? "items-center h-[4.5rem]" : "items-start pt-2",
          )}
        >
          <div className="pointer-events-auto">
            <Logo compact={scrolled} onHero={onHero} />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <Link to={ROUTES.about} className={link}>
            About Dr. Payal
          </Link>
          <Link to={ROUTES.blogs} className={link}>
            Blogs
          </Link>
          <Link to={ROUTES.contact} className={link}>
            Contact
          </Link>
          <AppointmentSheet sourcePage="header">
            <Button
              variant="cta"
              className="rounded-full px-7 py-3.5 transition-transform hover:-translate-y-0.5"
            >
              Book appointment
            </Button>
          </AppointmentSheet>
        </div>
      </nav>

      {/* Mobile row */}
      <div className="flex h-[4.5rem] items-center justify-between px-4 lg:hidden">
        <Logo compact onHero={onHero} />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className={cn(
            "flex size-11 items-center justify-center rounded-[10px] border transition-colors duration-300 ease-out",
            onHero
              ? "border-white/40 bg-white/10 text-sand backdrop-blur-sm"
              : "border-line bg-card text-teal-900",
          )}
        >
          <Menu className="size-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(22rem,92vw)] flex-col bg-background shadow-rail">
            <div className="flex items-center justify-between px-5 py-4">
              <Logo compact />
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="size-6 text-teal-900" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-4">
              <MobileGroup title="Fertility Solutions" groups={FERTILITY_MENU} />
              <MobileGroup title="Gynecology Treatments" groups={GYNECOLOGY_MENU} />
              {[
                { label: "About Dr. Payal", to: ROUTES.about },
                { label: "Patient Stories", to: ROUTES.patientStories },
                { label: "Blogs", to: ROUTES.blogs },
                { label: "Contact", to: ROUTES.contact },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block border-b border-line py-4 text-[1.125rem] font-medium text-teal-900"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-line px-5 py-4">
              <AppointmentSheet sourcePage="header_mobile">
                <Button variant="cta" className="w-full rounded-full">
                  Book appointment
                </Button>
              </AppointmentSheet>
              <a
                href={CLINIC.phoneHref}
                onClick={() => track("call_click", { source_page: "header_mobile" })}
                className="mt-3 block text-center text-[0.9375rem] text-teal-700 underline"
              >
                Call {CLINIC.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
