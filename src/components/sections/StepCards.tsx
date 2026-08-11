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
        <li key={step.title} className="relative flex h-full pl-10 sm:pl-11">
          <span
            aria-hidden
            className="absolute left-0 top-1/2 z-0 grid h-24 w-24 -translate-y-1/2 place-items-center rounded-full bg-clay-50 pr-10 font-display text-[1.25rem] font-semibold text-teal-900 sm:pr-11"
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className="relative z-10 w-full rounded-[1.75rem] bg-clay-50 p-2 shadow-[0_18px_40px_-28px_rgba(1,49,55,0.45)]">
            <div className="flex h-full flex-col overflow-hidden rounded-[1.375rem] bg-white">
              <img
                src={step.image}
                alt={step.alt}
                width={640}
                height={420}
                loading="lazy"
                className="h-40 w-full object-cover sm:h-44"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[1rem] font-medium leading-snug text-teal-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-muted">{step.copy}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
