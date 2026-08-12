import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  title: string;
  short: string;
  copy: string;
};

const DURATION_MS = 2000;

/**
 * Numbered process timeline: one row from `lg`, vertical below it.
 *
 * A connector line fills from the first step to the last when the section is first
 * scrolled into view, and each marker lights up as the fill passes it. The animation
 * plays once and stays complete — it does not reverse on scroll-up.
 *
 * `progress` starts at 1 so the server renders a finished timeline; it is reset to 0
 * on mount, while the section is still below the fold. Starting at 0 would leave
 * crawlers and any no-JS visitor looking at a permanently greyed-out timeline.
 */
export function ProcessTimeline({ steps }: { steps: readonly ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(1);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!reduced) setProgress(0);
  }, [reduced]);

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          setProgress(1 - Math.pow(1 - t, 3)); // ease-out cubic
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const lastIndex = Math.max(1, steps.length - 1);
  const reached = (i: number) => progress >= i / lastIndex - 0.001;

  const marker = (i: number) =>
    cn(
      "relative z-10 grid size-10 shrink-0 place-items-center rounded-full text-[0.9375rem] font-semibold transition-colors duration-300",
      reached(i) ? "bg-teal-900 text-sand" : "border border-line bg-white text-ink-muted",
    );

  return (
    <div ref={ref}>
      {/* Desktop: single row, fill runs left to right */}
      <ol className="relative mt-16 hidden grid-cols-5 gap-x-4 lg:grid">
        {/* Track spans the first and last marker centres (10% → 90% of the row) */}
        <span aria-hidden className="absolute top-5 right-[10%] left-[10%] h-px bg-line" />
        <span
          aria-hidden
          className="absolute top-5 left-[10%] h-px bg-teal-700 transition-none"
          style={{ width: `calc(80% * ${progress})` }}
        />

        {steps.map((step, i) => (
          <li key={step.title} className="flex flex-col items-center px-3 text-center">
            <span className={marker(i)}>{i + 1}</span>
            <h3 className="mt-5 max-w-[20ch] text-[1rem] leading-snug font-medium text-teal-900">
              {step.title}
            </h3>
            <p className="mt-2 max-w-[24ch] text-[0.875rem] leading-relaxed text-ink-muted">
              {step.short}
            </p>
          </li>
        ))}
      </ol>

      {/* Mobile and tablet: vertical, fill runs top to bottom */}
      <ol className="relative mt-12 lg:hidden">
        <span aria-hidden className="absolute top-5 bottom-5 left-5 w-px bg-line" />
        <span
          aria-hidden
          className="absolute top-5 left-5 w-px bg-teal-700"
          style={{ height: `calc((100% - 2.5rem) * ${progress})` }}
        />

        {steps.map((step, i) => (
          <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
            <span className={marker(i)}>{i + 1}</span>
            <div className="pt-1">
              <h3 className="text-[1.0625rem] font-medium text-teal-900">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{step.copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
