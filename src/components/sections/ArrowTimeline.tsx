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
    <section className="rounded-xl border border-line bg-white p-5 sm:p-7">
      {caption && <p className="eyebrow mb-8">{caption}</p>}

      {/* Desktop / tablet */}
      <div className="hidden md:block">
        <div className="flex items-stretch">
          {items.map((item, index) => (
            <div key={item.when} className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center">
                <div
                  className={`flex h-11 min-w-0 flex-1 items-center justify-center bg-teal-50 px-2 text-center ${
                    index === 0 ? "rounded-l-full" : ""
                  }`}
                >
                  <span className="truncate text-[0.875rem] text-ink-muted">{item.when}</span>
                </div>
                <svg
                  aria-hidden
                  viewBox="0 0 20 44"
                  className={`h-11 w-5 shrink-0 ${
                    index === items.length - 1 ? "text-teal-300" : "text-clay-600"
                  }`}
                >
                  <path d="M2 2 L18 22 L2 42 L2 30 L10 22 L2 14 Z" fill="currentColor" />
                </svg>
              </div>

              <div className="mt-5 px-3 text-center">
                <p className="font-display text-[1.0625rem] leading-tight text-teal-900">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[0.9375rem] leading-snug text-ink-muted">{item.what}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <ol className="md:hidden">
        {items.map((item, index) => (
          <li key={item.when} className="relative flex gap-4 pb-6 last:pb-0">
            {index < items.length - 1 && (
              <span
                aria-hidden
                className="absolute top-10 left-[1.125rem] h-[calc(100%-2.5rem)] w-px bg-teal-300"
              />
            )}
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-clay-600 font-display text-[0.8125rem] text-white">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-[0.9375rem] font-medium text-teal-900">{item.when}</p>
              <p className="mt-1 text-[0.9375rem] text-ink-muted">{item.what}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
