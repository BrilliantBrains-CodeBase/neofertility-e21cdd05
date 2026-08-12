import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ServiceCardItem = {
  title: string;
  copy: string;
  to: string;
  image: string;
  alt: string;
};

function Card({ item, featured }: { item: ServiceCardItem; featured?: boolean }) {
  return (
    <Link
      to={item.to}
      aria-label={`${item.title} — view all details`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        featured
          ? "border-teal-900 bg-teal-900 shadow-rail"
          : "border-line bg-white hover:border-teal-300 hover:shadow-rail",
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
        <h3 className={cn("font-display text-[1.25rem] leading-tight", featured && "text-sand")}>
          {item.title}
        </h3>
        <p
          className={cn(
            "mt-3 text-[0.9375rem]",
            featured ? "text-sand/80" : "text-ink-muted",
          )}
        >
          {item.copy}
        </p>
        <span
          className={cn(
            "mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium",
            featured ? "text-clay-50" : "text-clay-600",
          )}
        >
          View all details
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ServiceCards({
  items,
  featuredIndex = 2,
}: {
  items: readonly ServiceCardItem[];
  featuredIndex?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const target = el.children[i] as HTMLElement | undefined;
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

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
      {/* Mobile: swipeable carousel */}
      <div
        className="md:hidden"
        role="group"
        aria-roledescription="carousel"
        aria-label="Our services"
      >
        <div
          ref={trackRef}
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
              <Card item={item} featured={i === featuredIndex} />
            </div>
          ))}
        </div>

        <p aria-live="polite" className="sr-only">
          {`Service ${active + 1} of ${items.length}: ${items[active]?.title ?? ""}`}
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
          <Card key={item.title} item={item} featured={i === featuredIndex} />
        ))}
      </div>
    </>
  );
}
