export type NumberedStep = {
  title: string;
  copy: string;
};

/**
 * Oversized ghost numerals above each step, in equal columns divided by
 * hairline rules. Stacks to one column on mobile.
 */
export function NumberedSteps({ steps }: { steps: NumberedStep[] }) {
  return (
    <ol className="mt-10 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="flex flex-col items-center px-6 text-center sm:border-l sm:border-line sm:first:border-l-0 lg:[&:nth-child(3n+1)]:border-l-0 sm:[&:nth-child(2n+1)]:border-l-0 lg:[&:nth-child(2n+1)]:border-l"
        >
          <span
            aria-hidden
            className="text-[4.5rem] font-semibold leading-none tracking-tight text-pink-300/70 sm:text-[5.5rem]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-[0.9375rem] font-semibold uppercase tracking-[0.12em] text-plum-900">
            {step.title}
          </h3>
          <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-muted">
            {step.copy}
          </p>
        </li>
      ))}
    </ol>
  );
}
