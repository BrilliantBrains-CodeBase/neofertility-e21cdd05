import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { CLINIC, track } from "@/lib/clinic";
import { FERTILITY_MENU, GYNECOLOGY_MENU, ROUTES, type NavGroup } from "@/data/navigation";
import { cn } from "@/lib/utils";

type MenuKey = "fertility" | "gynecology" | null;

function MegaPanel({ groups, columns }: { groups: NavGroup[]; columns: string }) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 w-max max-w-[min(72rem,calc(100vw-3rem))] rounded-xl border border-line bg-white p-6 shadow-rail",
        columns,
      )}
    >
      {groups.map((group) => (
        <div key={group.heading}>
          <p className="eyebrow">{group.heading}</p>
          <ul className="mt-3 space-y-2">
            {group.links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  hash={link.hash}
                  className="block text-[0.9375rem] text-ink hover:text-teal-600 hover:underline"
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
        className="flex w-full items-center justify-between text-[1.0625rem] font-medium text-teal-900"
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
                      hash={link.hash}
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

export function Header() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const trigger =
    "flex items-center gap-1 py-2 text-[0.9375rem] font-medium text-teal-900 hover:text-teal-600";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-sand/95 backdrop-blur">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Link to={ROUTES.home} className="flex flex-col leading-none">
          <span className="font-display text-[1.375rem] font-semibold text-teal-900">
            Neo Fertility
          </span>
          <span className="text-[0.6875rem] tracking-[0.18em] text-teal-600 uppercase">
            Clinic · Marathahalli
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("fertility")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              className={trigger}
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
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              className={trigger}
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

          <Link to={ROUTES.about} className={trigger}>
            About Dr. Payal
          </Link>
          <Link to={ROUTES.blogs} className={trigger}>
            Blogs
          </Link>
          <Link to={ROUTES.contact} className={trigger}>
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={CLINIC.phoneHref}
            onClick={() => track("call_click", { source_page: "header" })}
            className="flex items-center gap-2 text-[0.9375rem] font-medium text-teal-900 hover:text-teal-600"
          >
            <Phone className="size-4" />
            {CLINIC.phoneDisplay}
          </a>
          <AppointmentSheet sourcePage="header">
            <Button variant="cta">Book appointment</Button>
          </AppointmentSheet>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="text-teal-900 lg:hidden"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-sand lg:hidden">
          <div className="container-page flex h-[4.5rem] items-center justify-between">
            <span className="font-display text-[1.375rem] font-semibold text-teal-900">
              Neo Fertility
            </span>
            <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="size-6 text-teal-900" />
            </button>
          </div>
          <div className="container-page pb-28">
            <MobileGroup title="Fertility Solutions" groups={FERTILITY_MENU} />
            <MobileGroup title="Gynecology Treatments" groups={GYNECOLOGY_MENU} />
            <Link
              to={ROUTES.about}
              className="block border-b border-line py-3 text-[1.0625rem] font-medium text-teal-900"
            >
              About Dr. Payal
            </Link>
            <Link
              to={ROUTES.patientStories}
              className="block border-b border-line py-3 text-[1.0625rem] font-medium text-teal-900"
            >
              Patient Stories
            </Link>
            <Link
              to={ROUTES.blogs}
              className="block border-b border-line py-3 text-[1.0625rem] font-medium text-teal-900"
            >
              Blogs
            </Link>
            <Link
              to={ROUTES.contact}
              className="block border-b border-line py-3 text-[1.0625rem] font-medium text-teal-900"
            >
              Contact
            </Link>
            <p className="mt-6 text-[0.9375rem] text-ink-muted">
              {CLINIC.hours}
              <br />
              <a className="text-teal-700 underline" href={CLINIC.phoneHref}>
                {CLINIC.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
