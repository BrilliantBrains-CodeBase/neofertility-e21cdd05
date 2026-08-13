import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckList } from "@/components/sections/blocks";
import { Reveal } from "@/components/motion/Reveal";
import { CLINIC, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import portrait from "@/assets/dr-payal-hero.webp";

/* Specialisations as listed on the clinic's existing site. */
const SPECIALISATIONS = [
  "IVF (In Vitro Fertilization)",
  "IUI (Intra Uterine Insemination)",
  "PCOS management",
  "High-risk pregnancy care",
  "Advanced reproductive solutions",
];

export function DoctorAbout() {
  return (
    <section className="bg-white section-y" aria-labelledby="about-doctor">
      <div className="container-page">
        {/* 40/60 rather than an even split, and the portrait is capped. On a 50/50 grid
            a 13:18 portrait grows taller faster than it grows wider, so once the
            container became a percentage the image reached 1069px against 468px of
            copy. The cap holds it near 1.3× the text height at any width. */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          {/* The clinic's own studio portrait, framed at its native 650×900 so the
              full figure is shown and nothing is cropped. The smaller circular
              avatars elsewhere keep the tighter head-and-shoulders crop. */}
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-pink-50 lg:max-w-[30rem]">
            <img
              src={portrait}
              alt={`${CLINIC.doctor}, fertility specialist at Neo Fertility Clinic Marathahalli`}
              width={650}
              height={900}
              loading="lazy"
              className="aspect-13/18 w-full object-cover object-top"
            />
          </Reveal>

          <Reveal delay={80}>
            <p className="eyebrow flex items-center gap-2">
              <Stethoscope aria-hidden className="size-4" />
              About the doctor
            </p>

            <h2 id="about-doctor" className="mt-3">
              {CLINIC.doctor}
            </h2>

            <p className="mt-3 text-[1rem] font-medium text-pink-700">
              {CLINIC.credentialsShort} · {CLINIC.experience}
            </p>

            <p className="mt-5 max-w-[56ch] text-[1.0625rem] text-ink-muted">
              Founder of Neo Fertility &amp; IVF Clinic in Marathahalli — Whitefield. A
              compassionate approach combined with cutting-edge fertility treatment, so every couple
              gets a plan built around them and the best possible chance of success.
            </p>

            {/* Capped: the text column is ~926px at 1920, which pushed the two check
                columns far enough apart to read as unrelated lists. */}
            <div className="mt-7 max-w-2xl">
              <CheckList items={SPECIALISATIONS} columns={2} />
            </div>

            {/* Clinical volume and credentials live in the dark Experience band that
                follows this section. */}

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button variant="cta" size="lg" asChild className="rounded-full">
                <Link to={ROUTES.about}>
                  About {CLINIC.doctor.split(" ").slice(0, 2).join(" ")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <a
                href={CLINIC.phoneHref}
                onClick={() => track("call_click", { source_page: "home_doctor" })}
                className="flex min-h-11 items-center gap-3 hover:opacity-80"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-white text-pink-700">
                  <Phone aria-hidden className="size-4" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.8125rem] text-ink-muted">Contact us?</span>
                  <span className="block font-semibold text-plum-900">{CLINIC.phoneDisplay}</span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
