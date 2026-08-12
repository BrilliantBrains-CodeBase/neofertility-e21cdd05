import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { CLINIC, track } from "@/lib/clinic";

export type TreatmentItem = {
  tag: string;
  title: string;
  copy: string;
  linkText: string;
  to: string;
  icon: LucideIcon;
};

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
        <div className="max-w-[70ch]">
          <p className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-teal-600">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[1.75rem] leading-[1.12] text-teal-900 sm:text-[2.25rem] lg:text-[2.75rem]">
            <span className="font-semibold">Advanced Fertility Treatments </span>
            <span className="italic font-normal text-teal-700">for Every Path to Parenthood</span>
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-muted">{intro}</p>
        </div>

        <ol className="mt-14 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-16">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="relative flex">
                {/* Ghost numeral */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-11 left-2 select-none font-display text-[5.5rem] font-semibold leading-none text-clay-50 lg:-top-14 lg:text-[7rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10 flex h-full w-full flex-col rounded-[1.5rem] border border-line bg-white p-6 shadow-[0_18px_40px_-30px_rgba(1,49,55,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-[0_28px_60px_-30px_rgba(1,49,55,0.4)]">
                  <span className="grid size-11 place-items-center rounded-full bg-teal-900 text-white">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-teal-600">
                    {item.tag}
                  </p>
                  <h3 className="mt-2 font-display text-[1.0625rem] font-semibold leading-snug text-teal-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-muted">{item.copy}</p>
                  <Link
                    to={item.to}
                    className="group mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-teal-700"
                  >
                    <span className="group-hover:underline">{item.linkText}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Closing band */}
        <div className="mt-16 rounded-[1.75rem] bg-teal-900 p-8 text-white lg:p-12">
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
                <Button variant="cta" size="lg">
                  Book a Consultation
                </Button>
              </AppointmentSheet>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
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
