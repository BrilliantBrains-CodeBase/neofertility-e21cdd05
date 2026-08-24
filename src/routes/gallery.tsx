import { createFileRoute } from "@tanstack/react-router";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero, SectionHeading, RelatedLinks } from "@/components/sections/blocks";
import { COMMON_RELATED } from "@/components/sections/ServicePage";
import { GALLERY_IMAGES } from "@/data/gallery";
import { ROUTES } from "@/data/navigation";
import { breadcrumbSchema, imageGallerySchema, jsonLd, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    ...pageMeta({
      title: "Gallery | Neo Fertility Clinic, Bangalore",
      description:
        "Photographs from Neo Fertility Clinic, Marathahalli and Whitefield, Bangalore — the people we have cared for and the moments they chose to share.",
      path: ROUTES.gallery,
    }),
    scripts: [
      jsonLd(
        imageGallerySchema({
          path: ROUTES.gallery,
          title: "Gallery | Neo Fertility Clinic, Bangalore",
          description:
            "Photographs from Neo Fertility Clinic, Marathahalli and Whitefield, Bangalore — the people we have cared for and the moments they chose to share.",
          images: GALLERY_IMAGES,
        }),
      ),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Gallery", path: ROUTES.gallery },
        ]),
      ),
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Our success stories"
        intro="Moments from the clinic, shared with permission. Every family here started with a single consultation."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Gallery" }]}
      />

      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Photographs"
            title="The families behind the treatment"
            copy="These photographs are shared with the consent of the patients in them. They record individual experiences and are not a guarantee of a similar outcome."
          />

          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {GALLERY_IMAGES.map((image, i) => (
              <li key={image.src} className="overflow-hidden rounded-2xl border border-line">
                {/* 40ms per tile, reset each row, so the sequence reads left-to-right
                    instead of the last tile arriving long after the eye has moved on. */}
                <Reveal delay={(i % 3) * 40}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading={i < 6 ? "eager" : "lazy"}
                    className="aspect-4/3 w-full object-cover"
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedLinks links={COMMON_RELATED} />

      <ClosingCta
        heading="Start your own story"
        copy="Book a consultation with Dr. Payal Mahapatra to understand your situation and the options open to you."
        sourcePage="gallery_closing"
        whatsappMessage="Hi, I'd like to book a consultation."
      />
    </>
  );
}
