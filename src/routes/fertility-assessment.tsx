import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import { PageHero, SectionHeading } from "@/components/sections/blocks";
import { Prose } from "@/components/sections/ServicePage";
import { CLINIC, DEFAULT_WHATSAPP_MESSAGE, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.fertilityAssessment;
const SOURCE_PAGE = "fertility-assessment";

export const Route = createFileRoute("/fertility-assessment")({
  head: () => ({
    ...pageMeta({
      title: "Fertility Self-Assessment | Neo Fertility Clinic, Bangalore",
      description:
        "A short self-assessment to help you decide which fertility evaluation to start with. Not a diagnosis. Both partners tested from the start.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Fertility Assessment", path: PATH },
        ]),
      ),
    ],
  }),
  component: Page,
});

type Answers = {
  age: string;
  months: string;
  cycle: string;
  diagnosis: string;
  maleTested: string;
};

function recommend(a: Answers): { heading: string; copy: string; to: string; label: string } | null {
  if (!a.age || !a.months || !a.cycle || !a.diagnosis || !a.maleTested) return null;

  if (a.cycle === "irregular" || a.diagnosis === "pcos") {
    return {
      heading: "Start with a hormonal and gynecological assessment",
      copy: "Irregular cycles or a known hormonal condition should be understood before fertility treatment is planned around them.",
      to: ROUTES.pcos,
      label: "PCOS and PCOD care",
    };
  }

  const monthsThreshold = a.age === "over35" ? 6 : 12;
  const monthsValue = a.months === "12plus" ? 12 : a.months === "6to11" ? 8 : 3;

  if (monthsValue >= monthsThreshold) {
    return {
      heading: "Start with a fertility evaluation for both partners",
      copy: "Based on your answers, a full evaluation covering hormone profile, pelvic ultrasound, tubal patency and semen analysis is the right first step.",
      to: ROUTES.infertility,
      label: "Fertility evaluation and treatment",
    };
  }

  if (a.maleTested === "no") {
    return {
      heading: "Arrange a semen analysis alongside continued trying",
      copy: "You have not been trying long enough to meet the usual evaluation threshold, but testing the male partner early rarely does harm and often saves time later.",
      to: ROUTES.maleInfertility,
      label: "Male infertility evaluation",
    };
  }

  return {
    heading: "Continue trying, and revisit if this stretches on",
    copy: "Based on your answers there is no immediate indication for a fertility evaluation. If you reach the threshold above without success, book an evaluation for both partners.",
    to: ROUTES.infertility,
    label: "Fertility evaluation and treatment",
  };
}

function Page() {
  const [answers, setAnswers] = useState<Answers>({
    age: "",
    months: "",
    cycle: "",
    diagnosis: "",
    maleTested: "",
  });

  const result = useMemo(() => recommend(answers), [answers]);

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      <PageHero
        eyebrow="Self-assessment"
        title="Which Fertility Evaluation Should You Start With?"
        intro="Answer five short questions to see which evaluation fits your situation. This is not a diagnosis and does not replace a consultation."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Fertility Assessment" }]}
      />

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:py-16">
        <div className="min-w-0 space-y-10">
          <Prose>
            <p>
              This tool asks about age, how long you have been trying, your cycle, any known diagnoses and whether
              the male partner has been tested. It gives a plain recommendation of where to start, not a medical
              verdict. Only a consultation and tests can establish a diagnosis.
            </p>
          </Prose>

          <form className="space-y-8 rounded-xl border border-line bg-white p-6" aria-label="Fertility self-assessment">
            <fieldset>
              <legend className="mb-3 font-medium text-teal-900">Your age</legend>
              <RadioGroup value={answers.age} onValueChange={(v) => set("age", v)}>
                {[
                  { v: "under35", l: "Under 35" },
                  { v: "over35", l: "35 or over" },
                ].map((o) => (
                  <div key={o.v} className="flex items-center gap-2">
                    <RadioGroupItem value={o.v} id={`age-${o.v}`} />
                    <Label htmlFor={`age-${o.v}`}>{o.l}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-medium text-teal-900">How long have you been trying to conceive?</legend>
              <RadioGroup value={answers.months} onValueChange={(v) => set("months", v)}>
                {[
                  { v: "under6", l: "Under 6 months" },
                  { v: "6to11", l: "6 to 11 months" },
                  { v: "12plus", l: "12 months or more" },
                ].map((o) => (
                  <div key={o.v} className="flex items-center gap-2">
                    <RadioGroupItem value={o.v} id={`months-${o.v}`} />
                    <Label htmlFor={`months-${o.v}`}>{o.l}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-medium text-teal-900">Is your menstrual cycle regular?</legend>
              <RadioGroup value={answers.cycle} onValueChange={(v) => set("cycle", v)}>
                {[
                  { v: "regular", l: "Regular, roughly the same length each month" },
                  { v: "irregular", l: "Irregular or unpredictable" },
                ].map((o) => (
                  <div key={o.v} className="flex items-center gap-2">
                    <RadioGroupItem value={o.v} id={`cycle-${o.v}`} />
                    <Label htmlFor={`cycle-${o.v}`}>{o.l}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-medium text-teal-900">Any known diagnoses?</legend>
              <RadioGroup value={answers.diagnosis} onValueChange={(v) => set("diagnosis", v)}>
                {[
                  { v: "none", l: "None that I know of" },
                  { v: "pcos", l: "PCOS, PCOD or a thyroid condition" },
                  { v: "other", l: "Endometriosis, fibroids or a previous pelvic surgery" },
                ].map((o) => (
                  <div key={o.v} className="flex items-center gap-2">
                    <RadioGroupItem value={o.v} id={`diag-${o.v}`} />
                    <Label htmlFor={`diag-${o.v}`}>{o.l}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            <fieldset>
              <legend className="mb-3 font-medium text-teal-900">Has the male partner had a semen analysis?</legend>
              <RadioGroup value={answers.maleTested} onValueChange={(v) => set("maleTested", v)}>
                {[
                  { v: "yes", l: "Yes" },
                  { v: "no", l: "No, not yet" },
                ].map((o) => (
                  <div key={o.v} className="flex items-center gap-2">
                    <RadioGroupItem value={o.v} id={`male-${o.v}`} />
                    <Label htmlFor={`male-${o.v}`}>{o.l}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>
          </form>

          <div role="status" aria-live="polite">
            {result && (
              <div className="rounded-xl border-l-4 border-teal-600 bg-teal-50 p-6">
                <h2 className="text-[1.25rem] text-teal-900">{result.heading}</h2>
                <p className="mt-2 text-ink-muted">{result.copy}</p>
                <Link
                  to={result.to}
                  className="mt-4 inline-flex items-center gap-1 font-medium text-teal-700 hover:underline"
                >
                  Read about {result.label}
                </Link>
              </div>
            )}
          </div>

          <div className="rounded-xl border-l-4 border-alert bg-clay-50 p-5">
            <p className="text-[0.9375rem] text-ink">
              This tool gives a general starting point only. It is not a diagnosis and does not replace a
              consultation. Only tests interpreted by a doctor can establish a diagnosis or a treatment plan.
            </p>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 w-[320px] rounded-xl border border-line bg-white p-5 shadow-rail">
            <p className="font-medium text-teal-900">Prefer to talk it through?</p>
            <p className="mt-2 text-[0.9375rem] text-ink-muted">
              Book a fertility assessment with {CLINIC.doctor} and get a plan built on your test results.
            </p>
            <div className="mt-4 space-y-2">
              <AppointmentSheet sourcePage={SOURCE_PAGE}>
                <Button variant="cta" className="w-full">
                  <CalendarCheck /> Book a consultation
                </Button>
              </AppointmentSheet>
              <Button variant="outlineTeal" className="w-full" asChild>
                <a href={CLINIC.phoneHref} onClick={() => track("call_click", { source_page: SOURCE_PAGE })}>
                  <Phone /> Call {CLINIC.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </aside>
      </div>

      <section className="section-y border-t border-line bg-sand">
        <div className="container-page">
          <SectionHeading eyebrow="What a real assessment covers" title="Both partners, tested from the start" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-line bg-white p-6">
              <h3>For you</h3>
              <p className="mt-2 text-ink-muted">
                Hormone profile including AMH, FSH, LH, thyroid and prolactin. Pelvic ultrasound with antral follicle
                count. Tubal patency testing. Endometrial assessment.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-white p-6">
              <h3>For him</h3>
              <p className="mt-2 text-ink-muted">
                Semen analysis covering count, motility and morphology, arranged in the first week rather than three
                months later.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        heading="Book your fertility assessment"
        copy="You leave with a named diagnosis where possible, a written cost estimate, and a treatment plan in order of simplicity."
        sourcePage={SOURCE_PAGE}
        whatsappMessage={DEFAULT_WHATSAPP_MESSAGE}
      />
    </>
  );
}
