import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export type ServiceCardItem = {
  title: string;
  copy: string;
  to: string;
  image: string;
  alt: string;
};

/* No card is highlighted by default — the dark teal treatment is applied on hover
   (and on keyboard focus, so it is not pointer-only). */
function Card({ item }: { item: ServiceCardItem }) {
  return (
    <Link
      to={item.to}
      aria-label={`${item.title} — view all details`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300",
        "hover:-translate-y-1 hover:border-teal-900 hover:bg-teal-900 hover:shadow-rail",
        "focus-visible:border-teal-900 focus-visible:bg-teal-900 focus-visible:shadow-rail focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.25rem] leading-tight transition-colors duration-300 group-hover:text-sand group-focus-visible:text-sand">
          {item.title}
        </h3>
        <p className="mt-3 text-[0.9375rem] text-ink-muted transition-colors duration-300 group-hover:text-sand/80 group-focus-visible:text-sand/80">
          {item.copy}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-clay-600 transition-colors duration-300 group-hover:text-clay-50 group-focus-visible:text-clay-50">
          View all details
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

const AUTOPLAY_MS = 4000;

export function ServiceCards({ items }: { items: readonly ServiceCardItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const target = el.children[i] as HTMLElement | undefined;
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  /* Autoplay. This track is a native scroll-snap container rather than an embla
     carousel, so it advances by scrolling itself instead of by a plugin — but the
     pause rules match every other carousel on the site: never under reduced motion
     (WCAG 2.2.2), and stopped for good the moment the visitor touches it. */
  useEffect(() => {
    if (reduced || paused) return;
    const timer = window.setInterval(
      () => scrollToIndex((activeRef.current + 1) % items.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(timer);
  }, [reduced, paused, items.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        Array.from(el.children).forEach((child, i) => {
          const node = child as HTMLElement;
          const mid = node.offsetLeft - el.offsetLeft + node.offsetWidth / 2;
          const dist = Math.abs(mid - center);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setActive(best);
        activeRef.current = best;
      });
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [items.length]);

  return (
    <>
      {/* Mobile: swipeable carousel. Any interaction stops autoplay for good, matching
          embla's stopOnInteraction — pointer covers drag and button taps, focus covers
          the keyboard path. */}
      <div
        className="md:hidden"
        role="group"
        aria-roledescription="carousel"
        aria-label="Our services"
        onPointerDown={() => setPaused(true)}
        onFocusCapture={() => setPaused(true)}
      >
        <div
          ref={trackRef}
          id="service-carousel-track"
          tabIndex={0}
          role="group"
          aria-label={`Services carousel, showing ${active + 1} of ${items.length}`}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              scrollToIndex(Math.min(items.length - 1, active + 1));
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              scrollToIndex(Math.max(0, active - 1));
            } else if (e.key === "Home") {
              e.preventDefault();
              scrollToIndex(0);
            } else if (e.key === "End") {
              e.preventDefault();
              scrollToIndex(items.length - 1);
            }
          }}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <div
              key={item.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}: ${item.title}`}
              className="w-[86%] shrink-0 snap-center"
            >
              <Card item={item} />
            </div>
          ))}
        </div>

        {/* Silent while autoplay is driving: announcing every automatic step would
            talk over a screen-reader user every few seconds. Once they interact,
            autoplay is off for good and the announcements are theirs. */}
        <p aria-live="polite" className="sr-only">
          {paused || reduced
            ? `Service ${active + 1} of ${items.length}: ${items[active]?.title ?? ""}`
            : ""}
        </p>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous service"
            aria-controls="service-carousel-track"
            disabled={active === 0}
            onClick={() => scrollToIndex(Math.max(0, active - 1))}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-white text-teal-900 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 disabled:opacity-35"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-1" role="tablist" aria-label="Select service">
            {items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-label={`Go to ${item.title}`}
                aria-selected={i === active}
                onClick={() => scrollToIndex(i)}
                className="flex min-h-11 min-w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-[6px] rounded-full transition-all duration-300",
                    i === active ? "w-7 bg-teal-700" : "w-[6px] bg-teal-900/25",
                  )}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next service"
            aria-controls="service-carousel-track"
            disabled={active === items.length - 1}
            onClick={() => scrollToIndex(Math.min(items.length - 1, active + 1))}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-white text-teal-900 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 disabled:opacity-35"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Tablet and desktop grid */}
      <div className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Card key={item.title} item={item} />
        ))}
      </div>
    </>
  );
}
