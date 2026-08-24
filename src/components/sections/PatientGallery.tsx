import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { GALLERY_IMAGES } from "@/data/gallery";
import { ROUTES } from "@/data/navigation";

/** Two rows here — the rest of the photos live on the gallery page. */
const COLUMNS = 3;
const SHOWN_COUNT = COLUMNS * 2;

export function PatientGallery() {
  const shown = GALLERY_IMAGES.slice(0, SHOWN_COUNT);

  return (
    <div className="mt-14">
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {shown.map((image, i) => (
          <li
            key={image.src}
            className="overflow-hidden rounded-2xl border border-line"
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

      <div className="mt-8 flex justify-center">
        <Button variant="cta" size="lg" asChild className="rounded-full">
          <Link to={ROUTES.gallery}>
            View our success stories
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
