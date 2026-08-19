import { Reveal } from "@/components/motion/Reveal";

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
    /* The connector lives outside the <ol>: an ol may only contain li, script and
       template, so having it inside was invalid and cost the list its semantics. */
    <div className="relative mt-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 bg-pink-300 lg:block"
      />
      <ol className="space-y-10 lg:space-y-0">
        {steps.map((step, index) => {
          const flip = index % 2 === 1;
          return (
            <li key={step.title} className="relative">
              <Reveal
                delay={index * 60}
                className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8 lg:py-6"
              >
                <div className={flip ? "lg:order-2 lg:pl-8" : "lg:order-1 lg:pr-8"}>
                  {/* rem, not px: these circles are a third of the layout and fixed pixel
                    widths do not grow when the visitor raises their browser font size. */}
                  <div
                    className={`relative mx-auto aspect-square w-55 overflow-hidden rounded-full border-4 border-pink-50 shadow-rail sm:w-65 lg:mx-0 lg:w-75 ${flip ? "lg:mr-auto" : "lg:ml-auto"}`}
                  >
                    <img
                      src={step.image}
                      alt={step.alt}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </div>
                </div>

                <div className={flip ? "lg:order-1 lg:pr-8 lg:text-right" : "lg:order-2 lg:pl-8"}>
                  <div className={`flex items-center gap-3 ${flip ? "lg:justify-end" : ""}`}>
                    {/* aria-hidden: the ol already conveys order, and without it a screen
                      reader reads "zero one" before every step title. */}
                    <span aria-hidden className="text-[2rem] leading-none text-pink-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[1.25rem]">{step.title}</h3>
                  </div>
                  {/* The block sits right on the flipped side, but its text stays left
                    aligned — ragged-left body copy is markedly harder to read. */}
                  <p className="mt-3 max-w-[46ch] text-ink-muted lg:inline-block lg:text-left">
                    {step.copy}
                  </p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
