import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useId, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { GALLERY_IMAGES } from "@/data/gallery";
import { ROUTES } from "@/data/navigation";

/** One row collapsed, two rows expanded — the rest live on the gallery page. */
const COLUMNS = 3;
const COLLAPSED_COUNT = COLUMNS;
const EXPANDED_COUNT = COLUMNS * 2;

export function PatientGallery() {
  const [expanded, setExpanded] = useState(false);
  const gridId = useId();
  const firstRevealed = useRef<HTMLLIElement>(null);

  const shown = GALLERY_IMAGES.slice(0, expanded ? EXPANDED_COUNT : COLLAPSED_COUNT);
  const hiddenCount = Math.min(EXPANDED_COUNT, GALLERY_IMAGES.length) - COLLAPSED_COUNT;

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    /* Expanding grows the grid downward; without this the keyboard user is left at a
       button that has just moved, with no idea anything appeared. */
    if (next) requestAnimationFrame(() => firstRevealed.current?.focus());
  };

  return (
    <div className="mt-14">
      <ul id={gridId} className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {shown.map((image, i) => (
          <li
            key={image.src}
            {...(i === COLLAPSED_COUNT ? { ref: firstRevealed, tabIndex: -1 } : {})}
            className="overflow-hidden rounded-2xl border border-line focus-visible:ring-2 focus-visible:ring-pink-700 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {/* 40ms per tile: enough to read as a sequence, short enough that the
                last tile is not still arriving after the eye has moved on. */}
            <Reveal delay={(i % COLUMNS) * 40}>
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                className="aspect-4/3 w-full object-cover"
              />
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {/* Collapsed: one more row. Expanded: the rest of the photos live on their
            own page rather than growing this section any further. */}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls={gridId}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 py-2.5 font-medium text-pink-700 transition-colors hover:bg-pink-50 focus-visible:ring-2 focus-visible:ring-pink-700 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {expanded ? "Show less" : `Show more`}
        </button>

        {expanded && (
          <Button variant="cta" size="lg" asChild className="rounded-full">
            <Link to={ROUTES.gallery}>
              View our success stories
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
