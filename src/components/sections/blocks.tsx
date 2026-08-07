import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CLINIC, CLINICAL_VOLUME } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import portrait from "@/assets/dr-payal-portrait.jpg";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ trail }: { trail: { name: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-ink-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((item, index) => (
          <li key={item.name} className="flex items-center gap-1.5">
            {item.to ? (
              <Link to={item.to} className="hover:text-teal-600 hover:underline">
                {item.name}
              </Link>
            ) : (
              <span className="text-teal-900">{item.name}</span>
            )}
            {index < trail.length - 1 && <ChevronRight className="size-3.5 opacity-60" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  trail,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  trail?: { name: string; to?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-teal-50/60 pt-8 pb-12 lg:pt-10 lg:pb-16">
      <div className="container-page">
        {trail && <Breadcrumbs trail={trail} />}
        <p className="eyebrow mt-6">{eyebrow}</p>
        <h1 className="mt-3 max-w-[24ch]">{title}</h1>
        <p className="mt-5 max-w-[62ch] text-[1.125rem] text-ink-muted">{intro}</p>
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  centered = false,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <div className={cn(centered && "text-center")}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={cn("mt-2", light && "text-sand")}>{title}</h2>
      {copy && (
        <p
          className={cn(
            "mt-4 max-w-[62ch] text-ink-muted",
            centered && "mx-auto",
            light && "text-sand/80",
          )}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

export function StatStrip({ light = false }: { light?: boolean }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6",
        light && "text-sand",
      )}
    >
      {CLINICAL_VOLUME.map((stat) => (
        <div key={stat.label}>
          <p
            className={cn(
              "font-display text-[1.75rem] leading-none font-semibold",
              light ? "text-sand" : "text-teal-900",
            )}
          >
            {stat.figure}
          </p>
          <p className={cn("mt-2 text-[0.8125rem]", light ? "text-sand/70" : "text-ink-muted")}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function CheckList({
  items,
  light = false,
  columns = 1,
}: {
  items: string[];
  light?: boolean;
  columns?: 1 | 2;
}) {
  return (
    <ul className={cn("space-y-3", columns === 2 && "sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0")}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check className={cn("mt-1 size-4 shrink-0", light ? "text-teal-300" : "text-teal-600")} />
          <span className={cn("text-[1rem]", light ? "text-sand/85" : "text-ink")}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function StepList({ steps }: { steps: { title: string; copy: string }[] }) {
  return (
    <ol className="mt-8 space-y-6">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-900 font-display text-[0.9375rem] text-sand">
            {index + 1}
          </span>
          <div>
            <h3>{step.title}</h3>
            <p className="mt-1.5 max-w-[62ch] text-ink-muted">{step.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function InfoCard({
  title,
  copy,
  to,
  hash,
}: {
  title: string;
  copy: string;
  to?: string;
  hash?: string;
}) {
  const body = (
    <>
      <h3>{title}</h3>
      <p className="mt-2 text-[0.9375rem] text-ink-muted">{copy}</p>
      {to && (
        <span className="mt-4 inline-flex items-center gap-1 text-[0.9375rem] font-medium text-teal-700">
          Read more <ChevronRight className="size-4" />
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        {...(hash ? { hash } : {})}
        className="block rounded-xl border border-line bg-white p-6 transition-shadow hover:shadow-rail"
      >
        {body}
      </Link>
    );
  }
  return <div className="rounded-xl border border-line bg-white p-6">{body}</div>;
}

export function FaqBlock({
  items,
  heading = "Questions patients ask",
  copy,
}: {
  items: { q: string; a: string }[];
  heading?: string;
  copy?: string;
}) {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading eyebrow="FAQ" title={heading} copy={copy} />
        <Accordion type="single" collapsible className="mt-8 max-w-[68ch]">
          {items.map((item, index) => (
            <AccordionItem key={item.q} value={`item-${index}`} className="border-line">
              <AccordionTrigger className="text-left text-[1.0625rem] font-medium text-teal-900 hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[1rem] text-ink-muted">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function DoctorNote({ quote }: { quote: string }) {
  return (
    <figure className="rounded-xl border border-line bg-white p-6">
      <blockquote className="font-display text-[1.25rem] leading-snug text-teal-900">
        “{quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <img
          src={portrait}
          alt={CLINIC.doctor}
          width={48}
          height={48}
          loading="lazy"
          className="size-12 rounded-full object-cover object-top"
        />
        <span className="text-[0.9375rem] text-ink-muted">
          <Link to={ROUTES.about} className="font-medium text-teal-900 hover:underline">
            {CLINIC.doctor}
          </Link>
          <br />
          {CLINIC.credentialsShort}
        </span>
      </figcaption>
    </figure>
  );
}

export function RelatedLinks({
  title = "Related reading",
  links,
}: {
  title?: string;
  links: { label: string; to: string; hash?: string }[];
}) {
  return (
    <section className="border-t border-line bg-teal-50/50 py-12">
      <div className="container-page">
        <p className="eyebrow">{title}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                {...(link.hash ? { hash: link.hash } : {})}
                className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-4 py-3 text-[0.9375rem] text-teal-900 hover:border-teal-300"
              >
                {link.label}
                <ChevronRight className="size-4 shrink-0 text-teal-600" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SafetyNote({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border-l-4 border-alert bg-clay-50 p-5">
      <p className="text-[0.9375rem] text-ink">{children}</p>
    </div>
  );
}
