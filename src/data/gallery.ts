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

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** Shared by the home-page teaser grid and the full gallery page. */
export const GALLERY_IMAGES: GalleryImage[] = [
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
