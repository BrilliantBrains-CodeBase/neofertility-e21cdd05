import { Reveal } from "@/components/motion/Reveal";

export type ArrowTimelineItem = { when: string; what: string };

/**
 * Horizontal arrow-band timeline: timeframes sit inside a continuous rail
 * separated by chevrons, with the stage copy below each segment.
 * Collapses to a stacked vertical rail on small screens.
 */
export function ArrowTimeline({
  caption,
  items,
}: {
  caption?: string;
  items: ArrowTimelineItem[];
}) {
  return (
    <section className="rounded-xl border border-line bg-paper p-5 sm:p-7">
      {caption && <p className="eyebrow mb-8">{caption}</p>}

      {/* Desktop / tablet */}
      <Reveal className="hidden md:block">
        <div className="flex items-stretch">
          {items.map((item, index) => (
            <div key={item.when} className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center">
                {/* `truncate` silently ate the timeframe — the one thing a timeline exists
                    to communicate. It wraps now, and the row grows from a 44px floor. */}
                <div
                  className={`flex min-h-11 min-w-0 flex-1 items-center justify-center bg-pink-50 px-2 py-1.5 text-center ${
                    index === 0 ? "rounded-l-full" : ""
                  } ${index === items.length - 1 ? "rounded-r-full" : ""}`}
                >
                  <span className="text-[0.875rem] leading-snug text-ink-muted">{item.when}</span>
                </div>
                {/* No chevron after the last segment: it pointed at nothing. */}
                {index < items.length - 1 && (
                  <svg aria-hidden viewBox="0 0 20 44" className="h-11 w-5 shrink-0 text-pink-600">
                    <path d="M2 2 L18 22 L2 42 L2 30 L10 22 L2 14 Z" fill="currentColor" />
                  </svg>
                )}
              </div>

              <div className="mt-5 px-3 text-center">
                <p className="text-[1.0625rem] leading-tight font-medium text-plum-900">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[0.9375rem] leading-snug text-ink-muted">{item.what}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Mobile */}
      <ol className="md:hidden">
        {items.map((item, index) => (
          <li key={item.when} className="relative pb-6 last:pb-0">
            {index < items.length - 1 && (
              <span
                aria-hidden
                className="absolute top-10 left-[1.125rem] h-[calc(100%-2.5rem)] w-px bg-pink-300"
              />
            )}
            <Reveal delay={index * 60} className="flex gap-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-pink-600 text-[0.8125rem] font-semibold text-paper">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[0.9375rem] font-medium text-plum-900">{item.when}</p>
                <p className="mt-1 text-[0.9375rem] text-ink-muted">{item.what}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
