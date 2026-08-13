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
        {/* connector arcs, desktop only */}
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

        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((item, i) => {
            const flipped = i % 2 === 1;
            return (
              <li
                key={item.title}
                className={`flex flex-col items-center gap-5 ${
                  flipped ? "lg:mt-16 lg:flex-col-reverse" : ""
                }`}
              >
                <div className="rounded-full bg-pink-50 p-2 shadow-[0_18px_40px_-28px_rgba(61,32,63,0.45)]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={320}
                    height={320}
                    loading="lazy"
                    className="h-36 w-36 rounded-full object-cover ring-4 ring-white sm:h-44 sm:w-44"
                  />
                </div>

                <div className="w-full max-w-[30ch] rounded-2xl border border-line bg-white px-5 py-4 text-center">
                  <h4 className="text-[0.9375rem] font-semibold uppercase tracking-[0.1em] text-plum-900">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {item.copy}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
