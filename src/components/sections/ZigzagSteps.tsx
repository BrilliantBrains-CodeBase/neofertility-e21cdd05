import { Reveal } from "@/components/motion/Reveal";

export type ZigzagStep = {
  title: string;
  copy: string;
  image: string;
  alt: string;
};

/**
 * Alternating pill cards with a circular photo tucked into the inner edge and a
 * large "STEP 01" label on the outside, joined by a dotted serpentine line.
 * Stacks to a single readable column on small screens.
 */
export function ZigzagSteps({ steps }: { steps: ZigzagStep[] }) {
  return (
    <ol className="relative mt-10 space-y-8 lg:space-y-6">
      {steps.map((step, index) => {
        const right = index % 2 === 1;
        const tone = index % 2 === 0 ? "bg-pink-700" : "bg-plum-900";
        return (
          <li key={step.title} className="relative">
            {/* Reveal sits INSIDE the li, not around it: a div between ol and li is
                invalid and drops the list semantics these steps depend on. */}
            <Reveal delay={index * 60}>
              <div
                className={`flex flex-col items-center gap-4 sm:flex-row sm:gap-6 ${
                  right ? "sm:flex-row-reverse lg:ml-auto" : ""
                } lg:w-[86%]`}
              >
                {/* step numeral */}
                <div
                  className={`shrink-0 text-center ${right ? "sm:text-left" : "sm:text-right"} sm:w-[6.5rem]`}
                >
                  {/* Was 11px with 0.22em tracking — under the 12px floor and the most
                      aggressive tracking in the codebase, on five service pages. */}
                  <p className="text-[0.75rem] font-semibold tracking-[0.16em] text-ink-muted uppercase">
                    Step
                  </p>
                  <p className="text-[2.25rem] leading-none font-semibold text-pink-700">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </div>

                {/* pill */}
                <div
                  className={`relative flex-1 rounded-[2.5rem] ${tone} px-6 py-6 shadow-pill transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-pill-lift sm:px-8 ${
                    right ? "sm:pl-28" : "sm:pr-28"
                  }`}
                >
                  <h3
                    className={`text-[1.0625rem] font-semibold uppercase tracking-[0.08em] text-paper ${
                      right ? "sm:text-right" : ""
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mt-2 max-w-[46ch] text-[0.9375rem] leading-relaxed text-paper/80 ${
                      right ? "sm:ml-auto sm:text-right" : ""
                    }`}
                  >
                    {step.copy}
                  </p>

                  {/* circular photo */}
                  <div
                    className={`mx-auto mt-5 size-24 shrink-0 overflow-hidden rounded-full border-4 border-paper bg-paper shadow-rail sm:absolute sm:top-1/2 sm:mt-0 sm:size-28 sm:-translate-y-1/2 ${
                      right ? "sm:left-4" : "sm:right-4"
                    }`}
                  >
                    <img
                      src={step.image}
                      alt={step.alt}
                      width={224}
                      height={224}
                      loading="lazy"
                      className="size-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* dotted connector, desktop only */}
            {index < steps.length - 1 && (
              <span
                aria-hidden
                className={`pointer-events-none absolute -bottom-4 hidden h-8 w-1/2 rounded-full border-b-2 border-dotted border-pink-300 lg:block ${
                  right ? "left-6 border-l-2" : "right-6 border-r-2"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
