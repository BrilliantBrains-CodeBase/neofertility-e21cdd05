export type JourneyStep = {
  title: string;
  copy: string;
  image: string;
  alt: string;
};

/**
 * Serpentine step flow: large circular photo per step, alternating sides,
 * joined by a winding connector line. Stacks to a single column on mobile.
 */
export function JourneyFlow({ steps }: { steps: JourneyStep[] }) {
  return (
    <ol className="relative mt-8 space-y-10 lg:space-y-0">
      {/* winding connector, desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 bg-teal-300 lg:block"
      />
      {steps.map((step, index) => {
        const flip = index % 2 === 1;
        return (
          <li
            key={step.title}
            className="relative grid items-center gap-6 lg:grid-cols-2 lg:gap-14 lg:py-6"
          >
            <div className={flip ? "lg:order-2 lg:pl-10" : "lg:order-1 lg:pr-10"}>
              <div className="relative mx-auto aspect-square w-[220px] overflow-hidden rounded-full border-4 border-clay-50 shadow-rail sm:w-[260px] lg:mx-0 lg:w-[300px] lg:ml-auto">
                <img
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
            </div>

            <div
              className={
                flip
                  ? "lg:order-1 lg:pr-10 lg:text-right"
                  : "lg:order-2 lg:pl-10"
              }
            >
              <div
                className={`flex items-center gap-3 ${flip ? "lg:justify-end" : ""}`}
              >
                <span className="font-display text-[2rem] leading-none text-clay-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[1.25rem]">{step.title}</h3>
              </div>
              <p className="mt-3 max-w-[46ch] text-ink-muted lg:inline-block">{step.copy}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
