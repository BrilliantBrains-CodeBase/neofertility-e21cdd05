import { Reveal } from "@/components/motion/Reveal";

export type TimelineBandItem = { when: string; what: string };

/**
 * Horizontal branded timeline: time frames above the rail,
 * numbered node and detail copy below. Stacks on mobile.
 */
export function TimelineBand({ caption, items }: { caption?: string; items: TimelineBandItem[] }) {
  const columns = { gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` };

  return (
    <section className="rounded-xl border border-line bg-paper p-5 sm:p-7">
      {caption && <p className="eyebrow mb-6">{caption}</p>}

      {/* Desktop / tablet: horizontal rail.
          The column count comes from the data. It was hardcoded to `grid-cols-3` against
          an arbitrary-length prop, so any caller passing 2 or 4 items silently broke. */}
      <Reveal className="hidden sm:block">
        <div className="grid gap-6" style={columns}>
          {items.map((item) => (
            <p key={item.when} className="text-center text-[0.9375rem] font-medium text-plum-900">
              {item.when}
            </p>
          ))}
        </div>

        <div className="relative mt-3 h-1.5 rounded-full bg-pink-50">
          <div className="absolute inset-y-0 left-0 w-full rounded-full bg-pink-300/70" />
        </div>

        <div className="grid gap-6" style={columns}>
          {items.map((item, index) => (
            <div key={item.when} className="flex flex-col items-center">
              <span aria-hidden className="h-6 w-px bg-pink-600/40" />
              <span className="flex size-11 items-center justify-center rounded-full bg-pink-600 text-[1.0625rem] font-semibold text-paper">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-center text-[0.9375rem] text-ink-muted">{item.what}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Mobile: vertical rail */}
      <ol className="sm:hidden">
        {items.map((item, index) => (
          <li key={item.when} className="relative pb-6 last:pb-0">
            {index < items.length - 1 && (
              <span
                aria-hidden
                className="absolute top-11 left-[1.375rem] h-[calc(100%-2.75rem)] w-px bg-pink-300"
              />
            )}
            <Reveal delay={index * 60} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-pink-600 text-[1.0625rem] font-semibold text-paper">
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
