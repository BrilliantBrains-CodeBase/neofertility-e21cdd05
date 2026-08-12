import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone, ChevronDown, MapPin, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { CLINIC, track } from "@/lib/clinic";
import { FERTILITY_MENU, GYNECOLOGY_MENU, ROUTES, type NavGroup } from "@/data/navigation";
import logoAsset from "@/assets/neo-logo.png.asset.json";
import { cn } from "@/lib/utils";

type MenuKey = "fertility" | "gynecology" | null;

function AnnouncementBar() {
  return (
    <div className="border-b border-line/70 bg-secondary text-muted-foreground">
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
            className="flex items-center gap-2 hover:opacity-70"
          >
            <Phone className="size-4" aria-hidden />
            {CLINIC.phoneDisplay}
          </a>
          <a
            href={`mailto:${CLINIC.email}`}
            className="hidden items-center gap-2 hover:opacity-70 lg:flex"
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

function Logo({ compact }: { compact: boolean }) {
  return (
    <Link
      to={ROUTES.home}
      aria-label="Neo Fertility Clinic home"
      className="flex flex-col items-center leading-none"
    >
      <img
        src={logoAsset.url}
        alt="Neo Fertility Clinic"
        width={520}
        height={520}
        className={cn(
          "w-auto object-contain transition-all duration-300 ease-out",
          compact ? "h-[52px]" : "h-[100px] lg:h-[130px]",
        )}
      />
      <span
        className={cn(
          "-mt-2 text-[0.6875rem] tracking-[0.18em] text-teal-600 uppercase transition-opacity duration-300",
          compact && "hidden",
        )}
      >
        Clinic · Marathahalli
      </span>
    </Link>
  );
}

export function Header() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const link =
    "relative py-2 text-[1rem] font-semibold tracking-[0.01em] text-foreground transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300 ease-out",
        scrolled
          ? "border-b border-border bg-background shadow-rail"
          : "border-b border-transparent bg-background/0",
      )}
    >
      <AnnouncementBar />

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

          <Link to={ROUTES.about} className={link}>
            About Dr. Payal
          </Link>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 flex justify-center",
            scrolled ? "items-center h-[4.5rem]" : "items-start pt-2",
          )}
        >
          <div className="pointer-events-auto">
            <Logo compact={scrolled} />
          </div>
        </div>

        <div className="flex items-center gap-8">
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
        <Logo compact />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="flex size-11 items-center justify-center rounded-[10px] border border-line bg-card text-teal-900"
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
