export type AlternatingTimelineItem = { when: string; what: string };

/**
 * Horizontal rail timeline with labels alternating below / above the line,
 * numbered nodes on stems, and the final stage emphasised as a filled disc.
 * Stacks into a vertical rail on mobile.
 */
export function AlternatingTimeline({
  caption,
  items,
}: {
  caption?: string;
  items: AlternatingTimelineItem[];
}) {
  const last = items.length - 1;

  return (
    <section className="rounded-xl border border-line bg-white p-5 sm:p-7">
      {caption && <p className="eyebrow mb-8">{caption}</p>}

      {/* Desktop / tablet */}
      <div className="relative hidden md:block">
        <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-teal-300" />
        <div
          className="relative grid items-center gap-4"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map((item, index) => {
            const above = index % 2 === 1;
            const isLast = index === last;

            if (isLast) {
              return (
                <div key={item.when} className="flex justify-center">
                  <div className="flex size-[9.5rem] flex-col items-center justify-center rounded-full bg-teal-900 px-4 text-center ring-8 ring-white">
                    <p className="font-display text-[0.9375rem] text-white">{item.when}</p>
                    <p className="mt-1 text-[0.75rem] leading-snug text-teal-50/80">{item.what}</p>
                  </div>
                </div>
              );
            }

            return (
              <div key={item.when} className="flex h-[9.5rem] flex-col items-center justify-center">
                {above ? (
                  <>
                    <div className="flex flex-1 flex-col justify-end pb-2 text-center">
                      <p className="text-[0.9375rem] font-medium text-teal-900">{item.when}</p>
                      <p className="mt-1 text-[0.8125rem] leading-snug text-ink-muted">{item.what}</p>
                    </div>
                    <span aria-hidden className="h-5 w-px bg-teal-300" />
                    <span className="flex size-9 items-center justify-center rounded-full bg-clay-600 font-display text-[0.8125rem] text-white ring-4 ring-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1" />
                  </>
                ) : (
                  <>
                    <span className="flex-1" />
                    <span className="flex size-9 items-center justify-center rounded-full bg-clay-600 font-display text-[0.8125rem] text-white ring-4 ring-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden className="h-5 w-px bg-teal-300" />
                    <div className="flex flex-1 flex-col justify-start pt-2 text-center">
                      <p className="text-[0.9375rem] font-medium text-teal-900">{item.when}</p>
                      <p className="mt-1 text-[0.8125rem] leading-snug text-ink-muted">{item.what}</p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile */}
      <ol className="md:hidden">
        {items.map((item, index) => (
          <li key={item.when} className="relative flex gap-4 pb-6 last:pb-0">
            {index < last && (
              <span
                aria-hidden
                className="absolute top-10 left-[1.125rem] h-[calc(100%-2.5rem)] w-px bg-teal-300"
              />
            )}
            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-full font-display text-[0.8125rem] text-white ${
                index === last ? "bg-teal-900" : "bg-clay-600"
              }`}
            >
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
