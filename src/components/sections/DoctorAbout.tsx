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
    <section className="bg-sand section-y" aria-labelledby="about-doctor">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* The clinic's own studio portrait, framed at its native 650×900 so the
              full figure is shown and nothing is cropped. The smaller circular
              avatars elsewhere keep the tighter head-and-shoulders crop. */}
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-clay-50">
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

            <p className="mt-3 text-[1rem] font-medium text-teal-700">
              {CLINIC.credentialsShort} · {CLINIC.experience}
            </p>

            <p className="mt-5 max-w-[56ch] text-[1.0625rem] text-ink-muted">
              Founder of Neo Fertility &amp; IVF Clinic in Marathahalli — Whitefield. A
              compassionate approach combined with cutting-edge fertility treatment, so every couple
              gets a plan built around them and the best possible chance of success.
            </p>

            <div className="mt-7">
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
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-white text-teal-700">
                  <Phone aria-hidden className="size-4" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.8125rem] text-ink-muted">Contact us?</span>
                  <span className="block font-semibold text-teal-900">{CLINIC.phoneDisplay}</span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
