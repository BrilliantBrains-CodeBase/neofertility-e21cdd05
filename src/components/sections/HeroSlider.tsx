import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { CLINIC, track } from "@/lib/clinic";
import { cn } from "@/lib/utils";
import consultRoom from "@/assets/clinic-consult-room.jpg";
import ultrasound from "@/assets/clinic-ultrasound.jpg";
import lab from "@/assets/clinic-lab.jpg";
import reception from "@/assets/clinic-reception.jpg";

const EYEBROW =
  "IVF, IUI, ICSI, egg freezing and PCOS care at Neo Fertility Clinic, Marathahalli, led by Dr. Payal Mahapatra with 18 years in reproductive medicine.";
const HEADING =
  "Neo Fertility Clinic - Best IVF & Fertility Clinic in Marathahalli, Bangalore";

type Slide = {
  variant: "full" | "collage";
  images: { src: string; alt: string }[];
};

const SLIDES: Slide[] = [
  {
    variant: "full",
    images: [
      { src: consultRoom, alt: "Consultation room at Neo Fertility Clinic, Marathahalli" },
    ],
  },
  {
    variant: "collage",
    images: [
      { src: ultrasound, alt: "Ultrasound and follicular scanning setup at the clinic" },
      { src: lab, alt: "Embryology and IVF laboratory at Neo Fertility Clinic" },
      { src: reception, alt: "Reception and waiting area at Neo Fertility Clinic" },
    ],
  },
  {
    variant: "collage",
    images: [
      { src: lab, alt: "IVF laboratory workstation at Neo Fertility Clinic" },
      { src: consultRoom, alt: "Doctor and patient in consultation at the clinic" },
      { src: ultrasound, alt: "Follicular scanning during a fertility treatment cycle" },
    ],
  },
  {
    variant: "full",
    images: [{ src: reception, alt: "Clinic reception at Scorpio House, Marathahalli" }],
  },
];

function Imagery({ slide, priority }: { slide: Slide; priority: boolean }) {
  if (slide.variant === "full") {
    const image = slide.images[0]!;
    return (
      <img
        src={image.src}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className="aspect-[4/5] h-full w-full object-cover lg:aspect-auto"
      />
    );
  }
  return (
    <div className="grid h-full grid-cols-2 items-center gap-4 px-4 lg:gap-5 lg:px-0">
      <div className="space-y-4 lg:space-y-5 lg:pt-[60px]">
        <img
          src={slide.images[0]!.src}
          alt={slide.images[0]!.alt}
          loading={priority ? "eager" : "lazy"}
          className="aspect-[4/5] w-full rounded-2xl object-cover"
        />
        <img
          src={slide.images[2]!.src}
          alt={slide.images[2]!.alt}
          loading="lazy"
          className="aspect-square w-full rounded-2xl object-cover"
        />
      </div>
      <div className="lg:-ml-6">
        <img
          src={slide.images[1]!.src}
          alt={slide.images[1]!.alt}
          loading={priority ? "eager" : "lazy"}
          className="aspect-[4/5] w-full rounded-2xl object-cover lg:aspect-[3/4]"
        />
      </div>
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
    const id = window.setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 5000);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  return (
    <section
      aria-label="Neo Fertility Clinic introduction"
      className="relative overflow-hidden bg-background lg:h-[88vh] lg:min-h-[700px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Text block */}
      <div className="relative z-20 px-8 pt-12 pb-8 lg:absolute lg:top-1/2 lg:left-10 lg:max-w-[92%] lg:-translate-y-1/2 lg:p-0">
        <p className="font-display text-[1.125rem] leading-[1.55] text-foreground lg:max-w-[92%] lg:text-[1.3125rem] lg:leading-[1.5]">
          {EYEBROW}
        </p>
        <h1 className="mt-6 max-w-[16ch] text-[clamp(1.875rem,8.5vw,2.5rem)] leading-[1.12] font-normal lg:mt-6 lg:max-w-[58%] lg:text-[clamp(2.5rem,4.4vw,4.25rem)] lg:leading-[1.05]">
          {HEADING}
        </h1>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:mt-10">
          <AppointmentSheet sourcePage="home_hero_slider">
            <Button
              variant="cta"
              className="rounded-full px-[34px] py-[18px] text-[0.9375rem] font-medium tracking-[0.03em] transition-transform duration-250 hover:-translate-y-0.5"
            >
              <CalendarCheck /> Book a consultation
            </Button>
          </AppointmentSheet>
          <a
            href={CLINIC.phoneHref}
            onClick={() => track("call_click", { source_page: "home_hero_slider" })}
            className="text-[0.9375rem] font-medium text-teal-700 hover:text-primary hover:underline"
          >
            Call {CLINIC.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Imagery */}
      <div className="relative z-10 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[55%]">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            aria-hidden={index !== active}
            className={cn(
              "transition-opacity duration-700 ease-in-out lg:absolute lg:inset-0",
              index === active ? "opacity-100" : "pointer-events-none opacity-0 lg:block hidden",
            )}
          >
            <div className={cn("h-full", slide.variant === "collage" && "lg:pr-0 lg:pl-8")}>
              <Imagery slide={slide} priority={index === 0} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="relative z-30 flex justify-center gap-3 pt-6 pb-8 lg:absolute lg:inset-x-0 lg:bottom-10 lg:p-0">
        {SLIDES.map((_, index) => (
          <button
            key={index}
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
