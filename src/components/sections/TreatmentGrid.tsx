import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { useCarouselAutoplay } from "@/hooks/use-carousel-autoplay";
import { ROUTES } from "@/data/navigation";
import { CLINIC, track } from "@/lib/clinic";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type TreatmentItem = {
  tag: string;
  title: string;
  copy: string;
  to: string;
  /* Anchor on the destination route. Several gynecology concerns share the menstrual
     page, and without this they would all land at the top of it. */
  hash?: string;
  icon: LucideIcon;
  /* Optional: a card with no image renders a branded placeholder rather than a hole,
     so a service can go live before its photograph exists. */
  image?: string;
  /* Required, not optional: a new card must pick a tab rather than silently
     disappearing from both. */
  group: "fertility" | "gynecology";
};

const TINTS = ["bg-gradient-to-b from-pink-50 to-white", "bg-gradient-to-b from-pink-25 to-white"];

/* The widest slides-per-view is 4 (xl). At or below that the whole set is already on
   screen, so looping just drifts the track and the arrows would do nothing. */
const MAX_PER_VIEW = 4;

/**
 * One carousel per tab, as its own component so each gets its own `useCarouselAutoplay`
 * instance — hooks cannot be called per-panel from inside a loop.
 */
function TreatmentCarousel({ items, label }: { items: TreatmentItem[]; label: string }) {
  const scrolls = items.length > MAX_PER_VIEW;
  const { plugins, setApi, pauseProps } = useCarouselAutoplay({ delay: 4000 });

  /* A single-row carousel at every breakpoint. Embla handles drag, keyboard and the
     scroll-prev/next state. */
  return (
    <Carousel
      opts={{ align: "start", loop: scrolls }}
      /* Autoplay is only attached when the track can actually move. Left on a
         non-scrolling carousel the plugin reads an empty snap list and throws
         ("cannot read properties of undefined (reading '0')") on mount, which took the
         whole section down when the 2-card tab was opened. */
      plugins={scrolls ? plugins : []}
      setApi={setApi}
      {...pauseProps}
      className="mt-10"
      aria-label={label}
    >
      {/* The hover lift and its bigger shadow were being sliced off by the
              viewport's overflow-hidden. The padding opens room inside the clip; the
              matching negative margin keeps the carousel's outer height unchanged. */}
      <CarouselContent viewportClassName="-my-8 py-8" className="-ml-5 lg:-ml-6">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <CarouselItem
              key={item.title}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}: ${item.title}`}
              className="basis-[85%] pl-5 sm:basis-1/2 lg:basis-1/3 lg:pl-6 xl:basis-1/4"
            >
              <div
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line shadow-[0_18px_40px_-30px_rgba(61,32,63,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-pink-600 hover:shadow-[0_28px_60px_-30px_rgba(61,32,63,0.4)]",
                  TINTS[i % TINTS.length],
                )}
              >
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-white/80 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-pink-700">
                      {item.tag}
                    </span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-pink-300 text-pink-700">
                      <Icon className="size-4" />
                    </span>
                  </div>
                  <h3 className="mt-4 text-[1.25rem] font-semibold leading-[1.15] text-plum-900">
                    {item.title}
                  </h3>
                  {/* Clamped to two lines; the full copy lives on the linked page,
                          which the button below already goes to. The full text stays in
                          the DOM, so it is still read out and still indexed. */}
                  <p className="mt-2.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-muted">
                    {item.copy}
                  </p>
                </div>

                <div className="relative m-3 mt-0 overflow-hidden rounded-[1.375rem]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* Placeholder, not an empty box: the service icon on the section's
                       own tint reads as deliberate while the photograph is outstanding.
                       aria-hidden because the card is already named by its heading, and
                       a decorative stand-in should not be announced. */
                    <div
                      aria-hidden
                      className="grid h-44 w-full place-items-center bg-linear-to-br from-pink-50 to-pink-25"
                    >
                      <Icon className="size-10 text-pink-300" strokeWidth={1.25} />
                    </div>
                  )}
                  {/* The accessible name must start with the visible label or it fails
                      WCAG 2.5.3 (Label in Name): a voice-control user saying "click Book
                      appointment" would not match an element named "Explore IUI
                      treatment". The title is appended so eight identically-labelled
                      links stay distinguishable in a screen reader's link list. */}
                  <Link
                    to={item.to}
                    {...(item.hash ? { hash: item.hash } : {})}
                    aria-label={`Book appointment: ${item.title}`}
                    className="absolute bottom-3 left-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-plum-900/90 px-3.5 py-2 text-[0.75rem] font-medium text-white backdrop-blur transition-colors hover:bg-plum-900"
                  >
                    Book appointment
                    <span className="grid size-5 place-items-center rounded-full bg-white text-plum-900">
                      <ArrowRight className="size-3" />
                    </span>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      {/* Only when the set actually scrolls — a tab holding four or fewer cards shows
          them all at once, and arrows that cannot move anything are worse than none.
          Outside the track from xl up, sitting in the container's 5% gutter: about 63px
          at 1280, enough for the 44px control plus a gap, widening to ~76px at 2xl where
          the offset steps out further. Below xl that gutter is too narrow and an arrow
          placed outside would land beyond the overflow-hidden section and be clipped. */}
      {scrolls && (
        <>
          <CarouselPrevious className="absolute top-1/2 left-2 z-10 size-11 -translate-y-1/2 border-line bg-white text-plum-900 shadow-rail hover:border-pink-600 hover:bg-white hover:text-pink-700 disabled:opacity-35 lg:left-3 xl:-left-12 2xl:-left-14" />
          <CarouselNext className="absolute top-1/2 right-2 z-10 size-11 -translate-y-1/2 border-line bg-white text-plum-900 shadow-rail hover:border-pink-600 hover:bg-white hover:text-pink-700 disabled:opacity-35 lg:right-3 xl:-right-12 2xl:-right-14" />
        </>
      )}
    </Carousel>
  );
}

/**
 * The way through to a tab's full catalogue. Every service now has a card, so this is a
 * route to the hub page's longer write-ups rather than to anything missing from the tab.
 */
function AllServicesLink({ label, to }: { label: string; to: string }) {
  return (
    <div className="mt-10 flex justify-center">
      <Link
        to={to}
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-pink-600 px-7 py-2 font-medium text-white transition-colors hover:bg-pink-700 focus-visible:ring-2 focus-visible:ring-pink-700 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {label}
        <ArrowRight className="size-4 shrink-0 rtl:rotate-180" />
      </Link>
    </div>
  );
}

export function TreatmentGrid({
  eyebrow,
  title,
  items,
  closing,
}: {
  eyebrow: string;
  title: string;
  items: TreatmentItem[];
  /* copy is optional: the home band shows the heading and the two buttons only. */
  closing: { heading: string; copy?: string };
}) {
  const fertility = items.filter((i) => i.group === "fertility");
  const gynecology = items.filter((i) => i.group === "gynecology");

  /* Below sm the two pills share the row: at their natural width the pair measures
     409px, which overflows a 390px viewport and gets clipped by the section. */
  const trigger =
    "inline-flex min-h-11 flex-1 items-center justify-center rounded-full px-3 text-center text-[0.8125rem] font-medium text-plum-900 transition-colors hover:text-pink-700 data-[state=active]:bg-pink-600 data-[state=active]:text-white sm:flex-none sm:px-6 sm:text-[0.9375rem]";

  /* overflow-clip, not overflow-hidden: the decorative blur below sits 96px past the
     right edge, and `hidden` leaves the section a scroll container 96px wider than its
     box. Anything that scrolls a descendant into view — the carousel, a focused tab —
     then slides the whole section sideways by 96px, heading included. `clip` clips the
     blur identically but creates no scrollport. */
  return (
    <section className="relative overflow-clip bg-white section-y">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-[26rem] rounded-full bg-pink-50 blur-3xl"
      />
      <div className="container-page relative">
        {/* Header */}
        <Reveal className="text-center">
          <p className="text-[0.75rem] font-medium tracking-[0.18em] text-pink-600 uppercase">
            {eyebrow}
          </p>
          {/* Two rows: `block` on the first span breaks the line without a <br>, so the
              two halves still read as one heading to a screen reader. */}
          <h2 className="mt-3 text-[1.875rem] leading-[1.08] text-plum-900 sm:text-[2.5rem] lg:text-[3rem]">
            <span className="block font-semibold">Advanced Fertility Treatments</span>
            <span className="block font-normal text-pink-700 italic">
              for Every Path to Parenthood
            </span>
          </h2>
        </Reveal>

        {/* Radix Tabs rather than hand-rolled: it carries the tablist/tab/tabpanel roles,
            arrow-key movement between tabs and aria-selected, and it unmounts the hidden
            panel — which matters here, because an embla carousel inside a display:none
            panel measures zero width and renders collapsed slides when revealed. */}
        <Tabs defaultValue="fertility" className="mt-8">
          <TabsList className="mx-auto flex h-auto w-full max-w-md gap-1 rounded-full border border-line bg-white p-1 sm:w-fit sm:max-w-none">
            <TabsTrigger value="fertility" className={trigger}>
              Fertility Solution
            </TabsTrigger>
            <TabsTrigger value="gynecology" className={trigger}>
              Gynecology Treatment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fertility">
            <TreatmentCarousel items={fertility} label="Fertility treatments" />
            <AllServicesLink label="All fertility services" to={ROUTES.fertilitySolutions} />
          </TabsContent>
          <TabsContent value="gynecology">
            <TreatmentCarousel items={gynecology} label="Gynecology treatments" />
            <AllServicesLink label="All gynecology treatments" to={ROUTES.gynecologyTreatments} />
          </TabsContent>
        </Tabs>

        {/* Closing band */}
        <div className="mt-14 rounded-[1.75rem] bg-plum-900 p-8 text-white lg:p-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
            <div>
              <h3 className="text-[1.375rem] leading-snug text-white sm:text-[1.75rem]">
                {closing.heading}
              </h3>
              {closing.copy && (
                <p className="mt-3 max-w-[62ch] text-[0.9375rem] leading-relaxed text-white/80">
                  {closing.copy}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap lg:justify-end">
              <AppointmentSheet sourcePage="home_treatments_band">
                <Button variant="cta" size="lg" className="rounded-full">
                  Book a Consultation
                </Button>
              </AppointmentSheet>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <a
                  href={CLINIC.phoneHref}
                  onClick={() => track("call_click", { source_page: "home_treatments_band" })}
                >
                  <Phone /> Call {CLINIC.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
