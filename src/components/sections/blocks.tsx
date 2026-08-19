import { useEffect, useRef, useState, type ReactNode } from "react";
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
import { Reveal } from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ trail }: { trail: { name: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-ink-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((item, index) => (
          <li key={item.name} className="flex items-center gap-1.5">
            {item.to ? (
              <Link to={item.to} className="hover:text-pink-600 hover:underline">
                {item.name}
              </Link>
            ) : (
              <span className="text-plum-900">{item.name}</span>
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
    <section className="border-b border-line bg-pink-50/60 pt-8 pb-12 lg:pt-10 lg:pb-16">
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
  eyebrow?: string | undefined;
  title: string;
  copy?: string | undefined;
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <Reveal className={cn(centered && "text-center")}>
      {/* The eyebrow's default Dusty Turquoise is only 2.6:1 on the Midnight Teal
          bands, so the light variant lifts it to the pale brand tint. */}
      {eyebrow && <p className={cn("eyebrow", light && "text-pink-300")}>{eyebrow}</p>}
      <h2 className={cn("mt-2", light && "text-paper")}>{title}</h2>
      {copy && (
        <p
          className={cn(
            "mt-4 max-w-[62ch] text-ink-muted",
            centered && "mx-auto",
            light && "text-paper/80",
          )}
        >
          {copy}
        </p>
      )}
    </Reveal>
  );
}

const COUNT_MS = 1800;

/**
 * Counts a figure like "80,000+" up from zero, preserving its separators and suffix.
 *
 * It renders the final figure on the server and until mount, so the real numbers are
 * in the initial HTML rather than a row of zeros; the reset to zero happens in an
 * effect, by which point the strip is below the fold.
 */
function CountUpFigure({ figure, active }: { figure: string; active: boolean }) {
  /* Split the leading number off its suffix: "6.7k" → 6.7 + "k", "80,000+" → 80000 +
     "+". The decimal point has to survive — stripping every non-digit turned "6.7k"
     into 67 with a ".k" suffix, which rendered as "67.k". */
  const [, numeric = "", suffix = ""] = /^([\d.,]*)(.*)$/.exec(figure) ?? [];
  const decimals = (numeric.split(".")[1] ?? "").length;
  const target = Number(numeric.replace(/,/g, ""));
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(target);

  const format = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  useEffect(() => {
    if (!reduced) setDisplay(0);
  }, [reduced]);

  useEffect(() => {
    if (reduced) {
      setDisplay(target);
      return;
    }
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      /* Not rounded to an integer here — a figure like 6.7 needs its fraction to
         survive the count, and `format` applies the right precision at render. */
      setDisplay(target * (1 - Math.pow(1 - t, 3))); // ease-out cubic
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduced, target]);

  // Figures with no leading number are left exactly as authored.
  if (numeric === "" || !Number.isFinite(target)) return <>{figure}</>;

  return (
    <>
      {format(display)}
      {suffix}
    </>
  );
}

export function StatStrip({ light = false }: { light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  /* Count starts when the strip scrolls into view, once. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 sm:gap-y-12">
      {CLINICAL_VOLUME.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "flex flex-col items-center gap-2.5 px-4 text-center sm:border-l sm:first:border-l-0 sm:[&:nth-child(3n+1)]:border-l-0",
            light ? "sm:border-paper/15" : "sm:border-line",
          )}
        >
          {/* tabular-nums keeps the figure from jittering in width as it counts. Poppins
              700 is the one place a second family appears — big numerals in a different
              face read as deliberate, and Poppins has lining figures so every digit sits
              on the baseline at a uniform height. */}
          <p
            className={cn(
              "font-stat text-[length:clamp(2.75rem,6vw,4rem)] leading-none font-bold tabular-nums",
              light ? "text-pink-300" : "text-pink-600",
            )}
          >
            <CountUpFigure figure={stat.figure} active={inView} />
          </p>
          <span
            aria-hidden
            className={cn("h-0.5 w-8 rounded-full", light ? "bg-pink-300" : "bg-pink-600")}
          />
          <p
            className={cn(
              "text-[0.8125rem] font-semibold tracking-[0.12em] uppercase",
              light ? "text-paper/85" : "text-plum-900",
            )}
          >
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
    <ul
      className={cn("space-y-3", columns === 2 && "sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0")}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check
            className={cn("mt-1 size-4 shrink-0", light ? "text-pink-300" : "text-pink-600")}
          />
          <span className={cn("text-[1rem]", light ? "text-paper/85" : "text-ink")}>{item}</span>
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
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-plum-900 font-semibold text-[0.9375rem] text-paper">
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
        <span className="mt-4 inline-flex items-center gap-1 text-[0.9375rem] font-medium text-pink-700">
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

/**
 * FAQ accordion. Pass `image` to get the two-column treatment — picture on the
 * leading side, questions on the trailing side. Without it the block stays a plain
 * single column, which is what the service pages use.
 */
export function FaqBlock({
  items,
  heading = "Questions patients ask",
  copy,
  image,
}: {
  items: { q: string; a: string }[];
  heading?: string;
  copy?: string;
  image?: { src: string; alt: string; width: number; height: number };
}) {
  const questions = (
    /* Not `collapsible`: with a defaultValue and collapsing disabled, exactly one
       answer is open at all times — clicking the open question does nothing rather
       than leaving the block as a wall of headings with no visible answer. */
    <Accordion type="single" defaultValue="item-0" className={cn("mt-8", !image && "max-w-[68ch]")}>
      {items.map((item, index) => (
        <AccordionItem key={item.q} value={`item-${index}`} className="border-line">
          <AccordionTrigger className="text-left text-[1.0625rem] font-medium text-plum-900 hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-[1rem] text-ink-muted">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return (
    <section className="section-y">
      <div className="container-page">
        {image ? (
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal className="overflow-hidden rounded-2xl border border-line bg-pink-50 lg:max-w-[30rem]">
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                className="aspect-4/5 w-full object-cover"
              />
            </Reveal>
            <div>
              <SectionHeading eyebrow="FAQ" title={heading} copy={copy} />
              {questions}
            </div>
          </div>
        ) : (
          <>
            <SectionHeading eyebrow="FAQ" title={heading} copy={copy} />
            {questions}
          </>
        )}
      </div>
    </section>
  );
}

export function DoctorNote({ quote }: { quote: string }) {
  return (
    <figure className="rounded-xl border border-line border-l-4 border-l-pink-500 bg-white p-6">
      <blockquote className="text-[1.375rem] leading-snug text-plum-900">“{quote}”</blockquote>
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
          <Link to={ROUTES.about} className="font-medium text-plum-900 hover:underline">
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
    <section className="border-t border-line bg-pink-50/50 py-12">
      <div className="container-page">
        <p className="eyebrow">{title}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                {...(link.hash ? { hash: link.hash } : {})}
                className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-4 py-3 text-[0.9375rem] text-plum-900 hover:border-pink-600"
              >
                {link.label}
                <ChevronRight className="size-4 shrink-0 text-pink-600" />
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
    <div className="rounded-xl border-l-4 border-alert bg-pink-50 p-5">
      <p className="text-[0.9375rem] text-ink">{children}</p>
    </div>
  );
}
