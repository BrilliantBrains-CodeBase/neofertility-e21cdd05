import { Reveal } from "@/components/motion/Reveal";

export type StepCard = {
  title: string;
  copy: string;
  image: string;
  alt: string;
};

/**
 * Numbered infographic cards: blush frame, white inner card, photo on top,
 * with a large numeral badge tucked behind the left edge of each card.
 */
export function StepCards({ steps }: { steps: StepCard[] }) {
  return (
    <ol className="mt-10 grid gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="flex h-full">
          {/* Reveal inside the li, never around it — a div between ol and li is invalid. */}
          <Reveal delay={i * 60} className="relative flex h-full w-full pl-10 sm:pl-11">
            <span
              aria-hidden
              className="absolute top-1/2 left-0 z-0 grid size-24 -translate-y-1/2 place-items-center rounded-full bg-pink-50 pr-10 text-[1.375rem] font-semibold text-plum-900 sm:pr-11"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative z-10 w-full rounded-[1.75rem] bg-pink-50 p-2 shadow-card transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-card-lift">
              <div className="flex h-full flex-col overflow-hidden rounded-[1.375rem] bg-paper">
                <img
                  src={step.image}
                  alt={step.alt}
                  width={640}
                  height={420}
                  loading="lazy"
                  className="h-40 w-full object-cover sm:h-44"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[1rem] leading-snug font-medium text-plum-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-muted">{step.copy}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
