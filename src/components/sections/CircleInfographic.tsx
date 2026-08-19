import { Reveal } from "@/components/motion/Reveal";

export type CircleInfographicItem = {
  title: string;
  copy: string;
  image: string;
  alt: string;
};

/**
 * Three photo circles with caption cards, alternating up/down like a classic
 * infographic. Hairline arcs connect the circles on large screens only.
 */
export function CircleInfographic({
  caption,
  items,
}: {
  caption?: string;
  items: CircleInfographicItem[];
}) {
  return (
    <section>
      {caption && (
        <h3 className="text-center text-[1.375rem] font-semibold text-plum-900">{caption}</h3>
      )}

      <div className="relative mt-8">
        {/* Connector arcs, desktop only. The path coordinates are drawn for exactly three
            circles, so render them only at that count rather than letting them point at
            nothing — the component takes an arbitrary-length prop. */}
        {items.length === 3 && (
          <svg
            aria-hidden
            viewBox="0 0 900 200"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-[42%] hidden h-24 w-full text-pink-300 lg:block"
          >
            <path
              d="M150 40 C 260 150, 340 150, 450 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            <path
              d="M450 40 C 560 150, 640 150, 750 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
          </svg>
        )}

        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((item, i) => {
            const flipped = i % 2 === 1;
            return (
              <li key={item.title} className="flex">
                <Reveal
                  delay={i * 60}
                  className={`flex w-full flex-col items-center gap-5 ${
                    flipped ? "lg:mt-16 lg:flex-col-reverse" : ""
                  }`}
                >
                  <div className="rounded-full bg-pink-50 p-2 shadow-card transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-card-lift">
                    <img
                      src={item.image}
                      alt={item.alt}
                      width={320}
                      height={320}
                      loading="lazy"
                      className="size-36 rounded-full object-cover ring-4 ring-paper sm:size-44"
                    />
                  </div>

                  <div className="w-full max-w-[30ch] rounded-2xl border border-line bg-paper px-5 py-4 text-center">
                    <h4 className="text-[0.9375rem] font-semibold tracking-[0.1em] text-plum-900 uppercase">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                      {item.copy}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
