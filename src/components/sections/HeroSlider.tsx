import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { CLINIC, track } from "@/lib/clinic";
import { cn } from "@/lib/utils";
import pinkBanner from "@/assets/hero-banner-pink.png.asset.json";
import tealBanner from "@/assets/hero-banner-teal.png.asset.json";

const SLIDES = [
  {
    src: pinkBanner.url,
    alt: "You deserve more than just keep trying - Neo Fertility Clinic, under the expert guidance of Dr. Payal Mahapatra",
  },
  {
    src: tealBanner.url,
    alt: "Before you hold them, we help you protect them - personalised pregnancy care at Neo Fertility Clinic",
  },
];

function Ctas({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3",
        className,
      )}
    >
      <AppointmentSheet sourcePage="home_hero_slider">
        <Button
          variant="cta"
          className="rounded-full px-4 py-2 text-[0.6875rem] font-medium tracking-[0.03em] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 sm:px-[22px] sm:py-[12px] sm:text-[0.8125rem] lg:px-[30px] lg:py-[16px] lg:text-[0.9375rem]"
        >
          <CalendarCheck /> Book a consultation
        </Button>
      </AppointmentSheet>
      <a
        href={CLINIC.phoneHref}
        onClick={() => track("call_click", { source_page: "home_hero_slider" })}
        className="rounded-full bg-background/90 px-4 py-2 text-center text-[0.6875rem] font-medium text-teal-700 shadow-md backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 hover:text-primary sm:px-[22px] sm:py-[12px] sm:text-[0.8125rem] lg:text-[0.9375rem]"
      >
        Call {CLINIC.phoneDisplay}
      </a>
    </div>
  );
}


export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 6000);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  return (
    <section
      aria-label="Neo Fertility Clinic introduction"
      className="relative w-full overflow-hidden bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative w-full">
        {/* Aspect-ratio keeper */}
        <div className="relative w-full" style={{ aspectRatio: "1672 / 941" }}>
          {SLIDES.map((slide, index) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              aria-hidden={index !== active}
              loading={index === 0 ? "eager" : "lazy"}
              {...(index === 0 ? { fetchPriority: "high" as const } : {})}
              className={cn(
                "absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-700 ease-in-out",
                index === active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            />
          ))}

          {/* CTAs - same marked position (lower right of the artwork) at every breakpoint */}
          <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto absolute right-[4%] bottom-[7%] xl:bottom-[8%]">
              <Ctas />
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="absolute inset-x-0 bottom-2 z-30 flex justify-center gap-3 sm:bottom-4 lg:bottom-6">

        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === active}
            onClick={() => setActive(index)}
            className={cn(
              "h-[3px] rounded-[2px] transition-all duration-300",
              index === active ? "w-11 bg-foreground/70" : "w-7 bg-foreground/25",
            )}
          />
        ))}
      </div>
    </section>
  );
}
