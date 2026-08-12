import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1",
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

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const slide = el.clientWidth * 0.86;
      setActive(Math.min(items.length - 1, Math.round(el.scrollLeft / slide)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  return (
    <>
      {/* Mobile: swipeable carousel */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <div key={item.title} className="w-[86%] shrink-0 snap-center">
              <Card item={item} featured={i === featuredIndex} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Go to ${item.title}`}
              aria-current={i === active}
              onClick={() => {
                const el = trackRef.current;
                if (el) el.scrollTo({ left: i * el.clientWidth * 0.86, behavior: "smooth" });
              }}
              className={cn(
                "h-[3px] rounded-[2px] transition-all duration-300",
                i === active ? "w-8 bg-teal-700" : "w-4 bg-teal-900/20",
              )}
            />
          ))}
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
