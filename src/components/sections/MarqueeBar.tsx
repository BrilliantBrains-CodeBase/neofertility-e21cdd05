import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/data/navigation";

const ITEMS = [
  { label: "IVF", to: ROUTES.ivf },
  { label: "IUI", to: ROUTES.iui },
  { label: "ICSI", to: ROUTES.icsi },
  { label: "Egg Freezing", to: ROUTES.eggFreezing },
  { label: "PCOS", to: ROUTES.pcos },
  { label: "Pregnancy Care", to: ROUTES.pregnancyCare },
];

function Track({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <span className="flex shrink-0 items-center" {...(ariaHidden ? { "aria-hidden": true } : {})}>
      {ITEMS.map((item) => (
        <span key={item.label} className="flex items-center">
          <Link
            to={item.to}
            tabIndex={ariaHidden ? -1 : undefined}
            className="font-display text-[1.75rem] font-normal tracking-[0.01em] text-foreground transition-colors hover:text-primary lg:text-[2.75rem]"
          >
            {item.label}
          </Link>
          <span
            aria-hidden
            className="mx-6 size-2 rounded-full bg-foreground/40 lg:mx-10"
          />
        </span>
      ))}
    </span>
  );
}

export function MarqueeBar() {
  return (
    <div className="flex h-[76px] items-center overflow-hidden bg-secondary whitespace-nowrap lg:h-[104px]">
      <div className="marquee-track flex w-max items-center">
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  );
}
