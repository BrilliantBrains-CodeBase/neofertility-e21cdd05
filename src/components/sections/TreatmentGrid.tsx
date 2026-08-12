import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, CalendarCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { CLINIC, track } from "@/lib/clinic";
import { cn } from "@/lib/utils";

export type TreatmentItem = {
  tag: string;
  title: string;
  copy: string;
  linkText: string;
  to: string;
  icon: LucideIcon;
  image?: string;
};

const TINTS = [
  "bg-gradient-to-b from-teal-50 to-white",
  "bg-gradient-to-b from-clay-50 to-white",
];

export function TreatmentGrid({
  eyebrow,
  title,
  intro,
  items,
  closing,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: TreatmentItem[];
  closing: { heading: string; copy: string };
}) {
  return (
    <section className="relative overflow-hidden bg-white section-y">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-[26rem] rounded-full bg-clay-50 blur-3xl"
      />
      <div className="container-page relative">
        {/* Header: heading left, intro + CTA right */}
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-14">
          <div>
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-teal-600">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[1.875rem] leading-[1.08] text-teal-900 sm:text-[2.5rem] lg:text-[3rem]">
              <span className="font-semibold">Advanced Fertility Treatments </span>
              <span className="italic font-normal text-teal-700">for Every Path to Parenthood</span>
            </h2>
          </div>
          <div>
            <p className="text-[1.0625rem] leading-relaxed text-ink-muted">{intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <AppointmentSheet sourcePage="home_treatments_header">
                <Button variant="cta" size="lg" className="rounded-full">
                  <CalendarCheck /> Book Appointment
                </Button>
              </AppointmentSheet>
              <Button variant="outlineTeal" size="lg" className="rounded-full" asChild>
                <a
                  href={CLINIC.phoneHref}
                  onClick={() => track("call_click", { source_page: "home_treatments_header" })}
                >
                  <Phone /> {CLINIC.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Cards: horizontal snap carousel on mobile, grid on desktop */}
        <ul
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 lg:gap-6"
          role="list"
        >
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="min-w-[80%] shrink-0 snap-center sm:min-w-0 sm:shrink"
              >
                <div
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line shadow-[0_18px_40px_-30px_rgba(1,49,55,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-[0_28px_60px_-30px_rgba(1,49,55,0.4)]",
                    TINTS[i % TINTS.length],
                  )}
                >
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full bg-white/80 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-teal-700">
                        {item.tag}
                      </span>
                      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-teal-300 text-teal-700">
                        <Icon className="size-4" />
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[1.25rem] font-semibold leading-[1.15] text-teal-900">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-ink-muted">
                      {item.copy}
                    </p>
                  </div>

                  <div className="relative m-3 mt-0 overflow-hidden rounded-[1.375rem]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-44 w-full bg-teal-50" />
                    )}
                    <Link
                      to={item.to}
                      aria-label={item.linkText}
                      className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-teal-900/90 px-3.5 py-2 text-[0.75rem] font-medium text-white backdrop-blur transition-colors hover:bg-teal-900"
                    >
                      Read More
                      <span className="grid size-5 place-items-center rounded-full bg-white text-teal-900">
                        <ArrowRight className="size-3" />
                      </span>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Closing band */}
        <div className="mt-14 rounded-[1.75rem] bg-teal-900 p-8 text-white lg:p-12">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
            <div>
              <h3 className="font-display text-[1.375rem] leading-snug text-white sm:text-[1.75rem]">
                {closing.heading}
              </h3>
              <p className="mt-3 max-w-[62ch] text-[0.9375rem] leading-relaxed text-white/80">
                {closing.copy}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <AppointmentSheet sourcePage="home_treatments_band">
                <Button variant="cta" size="lg" className="rounded-full">
                  Book a Consultation
                </Button>
              </AppointmentSheet>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <a
                  href={CLINIC.phoneHref}
                  onClick={() => track("call_click", { source_page: "home_treatments_band" })}
                >
                  <Phone /> Call {CLINIC.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
