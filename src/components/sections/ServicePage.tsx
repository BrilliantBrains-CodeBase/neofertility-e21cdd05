import type { ReactNode } from "react";
import { Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { BookingRail } from "@/components/conversion/BookingRail";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import {
  PageHero,
  FaqBlock,
  RelatedLinks,
  StatStrip,
  SectionHeading,
} from "@/components/sections/blocks";
import { CLINIC, DEFAULT_WHATSAPP_MESSAGE, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";

export type Faq = { q: string; a: string };
export type RelatedLink = { label: string; to: string; hash?: string };

/**
 * Standard treatment / service page shell:
 * hero -> two column body with sticky booking rail -> FAQs -> related links -> closing CTA.
 */
export function ServicePage({
  eyebrow,
  title,
  intro,
  trail,
  sourcePage,
  whatsappMessage = DEFAULT_WHATSAPP_MESSAGE,
  children,
  faqs,
  related,
  closing,
  showStats = true,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  trail: { name: string; to?: string }[];
  sourcePage: string;
  whatsappMessage?: string;
  children: ReactNode;
  faqs: Faq[];
  related: RelatedLink[];
  closing: { heading: string; copy: string };
  showStats?: boolean;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} trail={trail}>
        <div className="flex flex-wrap gap-3">
          <AppointmentSheet sourcePage={sourcePage}>
            <Button variant="cta" size="lg">
              <CalendarCheck /> Book a consultation
            </Button>
          </AppointmentSheet>
          <Button variant="outlineTeal" size="lg" asChild>
            <a
              href={CLINIC.phoneHref}
              onClick={() => track("call_click", { source_page: sourcePage })}
            >
              <Phone /> Call {CLINIC.phoneDisplay}
            </a>
          </Button>
        </div>
      </PageHero>

      <div className="container-page flex gap-14 py-14 lg:py-16">
        <div className="min-w-0 flex-1 space-y-12">{children}</div>
        <BookingRail sourcePage={sourcePage} whatsappMessage={whatsappMessage} />
      </div>

      {showStats && (
        <section className="border-y border-line bg-white py-12">
          <div className="container-page">
            <SectionHeading
              eyebrow="Clinical volume"
              title={`Treated by ${CLINIC.doctor}`}
              copy={`${CLINIC.credentials}. ${CLINIC.statsAsOf}`}
            />
            <div className="mt-8">
              <StatStrip />
            </div>
          </div>
        </section>
      )}

      <FaqBlock items={faqs} />

      <RelatedLinks links={related} />

      <ClosingCta
        heading={closing.heading}
        copy={closing.copy}
        sourcePage={sourcePage}
        whatsappMessage={whatsappMessage}
      />
    </>
  );
}

/** Body prose block used inside ServicePage. */
export function Prose({ id, title, children }: { id?: string; title?: string; children: ReactNode }) {
  return (
    <section {...(id ? { id } : {})}>
      {title && <h2 className="text-[1.625rem]">{title}</h2>}
      <div className="prose-measure mt-4 space-y-4 text-ink-muted [&_strong]:text-teal-900">
        {children}
      </div>
    </section>
  );
}

export function DataTable({
  caption,
  head,
  rows,
}: {
  caption?: string;
  head: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full text-left text-[0.9375rem]">
        {caption && <caption className="p-4 text-left text-ink-muted">{caption}</caption>}
        <thead className="bg-teal-50">
          <tr>
            {head.map((cell) => (
              <th key={cell} className="px-4 py-3 font-medium text-teal-900">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className="border-t border-line">
              {row.map((cell, index) => (
                <td
                  key={index}
                  className={index === 0 ? "px-4 py-3 font-medium text-teal-900" : "px-4 py-3 text-ink-muted"}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const COMMON_RELATED: RelatedLink[] = [
  { label: "Infertility evaluation and treatment", to: ROUTES.infertility },
  { label: "IVF treatment", to: ROUTES.ivf },
  { label: "IUI treatment", to: ROUTES.iui },
  { label: "IVF cost in Bangalore", to: ROUTES.ivfCost },
  { label: "About Dr. Payal Mahapatra", to: ROUTES.about },
  { label: "Contact and directions", to: ROUTES.contact },
];
