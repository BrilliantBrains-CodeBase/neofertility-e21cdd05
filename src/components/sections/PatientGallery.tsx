import { useId, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import p01 from "@/assets/patient-01.webp";
import p02 from "@/assets/patient-02.webp";
import p03 from "@/assets/patient-03.webp";
import p04 from "@/assets/patient-04.webp";
import p05 from "@/assets/patient-05.webp";
import p06 from "@/assets/patient-06.webp";
import p07 from "@/assets/patient-07.webp";
import p08 from "@/assets/patient-08.webp";
import p09 from "@/assets/patient-09.webp";
import p10 from "@/assets/patient-10.webp";

/**
 * TODO(alt-text): every entry below carries the same placeholder description. The
 * source images could not be inspected, so nothing specific is claimed about who or
 * what they show. Replace each `alt` with a real one-line description of that photo —
 * ten identical strings are close to useless for a screen-reader user.
 */
const PLACEHOLDER_ALT = "Patient at Neo Fertility Clinic";

const IMAGES = [
  { src: p01, width: 512, height: 512, alt: PLACEHOLDER_ALT },
  { src: p02, width: 512, height: 512, alt: PLACEHOLDER_ALT },
  { src: p03, width: 650, height: 450, alt: PLACEHOLDER_ALT },
  { src: p04, width: 512, height: 512, alt: PLACEHOLDER_ALT },
  { src: p05, width: 650, height: 450, alt: PLACEHOLDER_ALT },
  { src: p06, width: 650, height: 450, alt: PLACEHOLDER_ALT },
  { src: p07, width: 650, height: 450, alt: PLACEHOLDER_ALT },
  { src: p08, width: 650, height: 450, alt: PLACEHOLDER_ALT },
  { src: p09, width: 650, height: 450, alt: PLACEHOLDER_ALT },
  { src: p10, width: 650, height: 450, alt: PLACEHOLDER_ALT },
];

const VISIBLE_COUNT = 4;

export function PatientGallery() {
  const [expanded, setExpanded] = useState(false);
  const gridId = useId();
  const firstRevealed = useRef<HTMLLIElement>(null);

  const shown = expanded ? IMAGES : IMAGES.slice(0, VISIBLE_COUNT);
  const hiddenCount = IMAGES.length - VISIBLE_COUNT;

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    /* Expanding grows the grid downward; without this the keyboard user is left at a
       button that has just moved, with no idea anything appeared. */
    if (next) requestAnimationFrame(() => firstRevealed.current?.focus());
  };

  return (
    <div className="mt-14">
      <ul id={gridId} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {shown.map((image, i) => (
          <li
            key={image.src}
            {...(i === VISIBLE_COUNT ? { ref: firstRevealed, tabIndex: -1 } : {})}
            className="overflow-hidden rounded-2xl border border-line focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {/* 40ms per tile: enough to read as a sequence, short enough that the
                last tile is not still arriving after the eye has moved on. */}
            <Reveal delay={(i % 4) * 40}>
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

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls={gridId}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 py-2.5 font-medium text-teal-700 transition-colors hover:bg-clay-50 focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {expanded ? "Show less" : `Show ${hiddenCount} more`}
        </button>
      </div>
    </div>
  );
}
