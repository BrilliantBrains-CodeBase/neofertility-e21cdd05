import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { CLINIC, track } from "@/lib/clinic";
import { cn } from "@/lib/utils";
import heroPoster from "@/assets/hero-mother-baby-poster.webp";
import heroWebm from "@/assets/hero-mother-baby.webm";
import heroMp4 from "@/assets/hero-mother-baby.mp4";

function Ctas({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-row flex-wrap items-center gap-3", className)}>
      <AppointmentSheet sourcePage="home_hero_video">
        <Button
          variant="cta"
          className="h-auto min-h-12 rounded-full px-6 py-3 text-[0.9375rem] font-medium tracking-[0.01em] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 lg:px-[30px] lg:py-[15px]"
        >
          <CalendarCheck className="size-4" />
          Book a consultation
        </Button>
      </AppointmentSheet>
      <a
        href={CLINIC.phoneHref}
        onClick={() => track("call_click", { source_page: "home_hero_video" })}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-background/90 px-6 py-3 text-center text-[0.9375rem] font-medium whitespace-nowrap text-teal-700 shadow-md backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 hover:text-primary lg:px-[30px] lg:py-[15px]"
      >
        <Phone className="mr-2 size-4" />
        Call {CLINIC.phoneDisplay}
      </a>
    </div>
  );
}

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  /* prefers-reduced-motion is only known after mount, so the autoplay that has
     already started is paused here rather than relying on the autoPlay prop.
     Reduced-motion users get the poster plus controls, so they can still opt in. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      const video = videoRef.current;
      if (!video) return;
      if (mq.matches) {
        video.pause();
      } else {
        void video.play().catch(() => {
          /* Autoplay can still be blocked by browser policy; the poster remains. */
        });
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <section
      data-hero
      aria-label="Neo Fertility Clinic introduction"
      className="relative w-full overflow-hidden bg-background"
    >
      {/* Both branches reserve their space up front so the hero never shifts layout.
          Below lg the video's 16:9 frame is far too short for the copy, so the hero is
          given viewport height instead and the video crops (svh, so mobile browser
          chrome hiding does not resize it). */}
      <div className="relative min-h-[80svh] w-full lg:aspect-1672/941 lg:min-h-0">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          poster={heroPoster}
          aria-label="A mother kissing her newborn baby"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={reduced}
        >
          <source src={heroWebm} type="video/webm" />
          <source src={heroMp4} type="video/mp4" />
        </video>

        {/* Scrim under the transparent navbar. The video's brightness varies frame to
            frame, so the light nav text needs a guaranteed dark ground to sit on. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-linear-to-b from-black/55 via-black/25 to-transparent"
        />

        {/* Scrim for the overlay copy, following where it sits: bottom-weighted on
            mobile, left-weighted from lg up. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent lg:bg-linear-to-r lg:from-black/80 lg:via-black/35 lg:to-transparent"
        />

        {/* Overlay copy — hugs the left edge rather than sitting on the page container,
            so it reads as deliberately left-aligned instead of floating mid-left. */}
        {/* Top padding clears the overlaying navbar: ~120px on mobile (utility bar +
            nav row) and ~118px from lg, plus breathing room in both cases.

            Below lg this sits in flow and carries the min-height itself, so the hero
            grows when the copy needs more room than 80svh. Absolutely positioned, the
            hero stayed locked at 80svh and justify-center pushed the overflow out of
            both ends — on a short viewport that put the Call CTA on top of the
            marquee below. From lg the 16:9 frame governs, so it can go back to
            filling its parent. */}
        <div className="relative flex min-h-[80svh] flex-col justify-center pt-42 pb-14 lg:absolute lg:inset-0 lg:min-h-0 lg:pt-40 lg:pb-16">
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
            <p className="inline-flex items-center gap-2 rounded-full border border-sand/25 bg-teal-900/60 px-4 py-1.5 text-[0.75rem] font-medium tracking-[0.16em] text-sand uppercase backdrop-blur-sm">
              <span aria-hidden className="size-2 rounded-full bg-teal-300" />
              Marathahalli - Whitefield
            </p>

            {/* Sized to hold on one line from lg up; wraps naturally below that. */}
            <h1 className="mt-5 text-[2.25rem] leading-[1.05] text-sand sm:text-[3rem] lg:text-[3.5rem] lg:whitespace-nowrap xl:text-[4rem]">
              Best Fertility and IVF Clinic
            </h1>

            {/* max-w tuned so this sets in two lines on desktop. */}
            <p className="mt-5 max-w-[58ch] text-[1rem] leading-relaxed text-sand/90 lg:max-w-[82ch] lg:text-[1.125rem]">
              Expert, Personalized &amp; Advanced Fertility Care by Dr. Payal Mahapatra (Founder Neo
              Fertility &amp; IVF Clinic in Marathahalli - Whitefield)
            </p>

            <Ctas className="mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
