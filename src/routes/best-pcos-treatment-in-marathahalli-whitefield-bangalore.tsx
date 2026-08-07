import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, StepList, SafetyNote } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.pcos;

const FAQS = [
  {
    q: "Is PCOS the same as PCOD?",
    a: "They are related but not identical. PCOS (polycystic ovary syndrome) is a broader metabolic and hormonal syndrome that can affect long-term insulin, weight and cardiovascular risk. PCOD (polycystic ovarian disease) usually describes a milder ovarian condition. Both are assessed with the same initial work-up, then managed according to severity.",
  },
  {
    q: "Can I get pregnant with PCOS?",
    a: "Yes. Most women with PCOS can conceive once ovulation is restored, either with lifestyle change and ovulation-inducing medication, or with IUI or IVF if simpler measures do not work.",
  },
  {
    q: "Do I need to lose weight before treatment starts?",
    a: "A 5-10% reduction in body weight, where relevant, improves ovulation and response to medication, but treatment is not withheld while this happens. Medication and monitoring usually begin alongside lifestyle changes.",
  },
  {
    q: "What tests confirm a PCOS diagnosis?",
    a: "Diagnosis uses a combination of irregular cycles, clinical or blood signs of excess androgens, and ovarian appearance on ultrasound. Thyroid and prolactin levels are checked to rule out other causes of irregular cycles.",
  },
  {
    q: "Is PCOS a lifelong condition?",
    a: "The underlying tendency, usually insulin resistance, persists, but symptoms can be well controlled long-term with the right combination of lifestyle measures and medication, reviewed periodically.",
  },
];

export const Route = createFileRoute("/best-pcos-treatment-in-marathahalli-whitefield-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Best PCOS Treatment in Marathahalli & Whitefield, Bangalore",
      description:
        "Diagnosis and treatment for polycystic ovary syndrome (PCOS) — irregular periods, acne, weight gain and fertility concerns — with Dr. Payal Mahapatra in Marathahalli and Whitefield, Bangalore.",
      path: PATH,
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Gynecology Treatments", path: ROUTES.gynecologyTreatments },
          { name: "PCOS Treatment", path: PATH },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePage
      eyebrow="Hormonal Concerns"
      title="Best PCOS Treatment in Marathahalli & Whitefield, Bangalore"
      intro="Polycystic ovary syndrome affects periods, skin, weight and fertility through an underlying hormonal and insulin imbalance. Treatment is matched to whether your priority is symptom control, long-term metabolic health, or conceiving."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Gynecology Treatments", to: ROUTES.gynecologyTreatments },
        { name: "PCOS Treatment" },
      ]}
      sourcePage="pcos"
      faqs={FAQS}
      related={[
        { label: "PCOD treatment", to: ROUTES.pcod },
        { label: "Menstrual and period disorders", to: ROUTES.menstrual },
        ...COMMON_RELATED,
      ]}
      closing={{
        heading: "Get your PCOS properly diagnosed and managed",
        copy: "Book a consultation with Dr. Payal Mahapatra for a clear diagnosis and a treatment plan matched to your goals.",
      }}
    >
      <Prose title="What PCOS is">
        <p>
          Polycystic ovary syndrome (PCOS) is a common hormonal condition in which the ovaries
          produce higher-than-usual levels of androgens and often do not release an egg every
          month. It is closely linked with insulin resistance, which is why weight, skin and
          metabolic symptoms often appear alongside irregular periods.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Symptoms" title="Common signs of PCOS" />
        <div className="mt-6">
          <CheckList
            columns={2}
            items={[
              "Irregular, infrequent or absent periods",
              "Difficulty conceiving",
              "Acne or oily skin that has not responded to routine treatment",
              "Excess facial or body hair (hirsutism)",
              "Weight gain, particularly around the abdomen",
              "Thinning hair on the scalp",
              "Darkened skin patches at the neck or underarms",
            ]}
          />
        </div>
      </section>

      <Prose title="Diagnosis">
        <p>
          Diagnosis is based on a combination of findings rather than any single test: your
          cycle pattern, clinical or blood evidence of excess androgens, and ovarian appearance
          on a transvaginal ultrasound. Thyroid function and prolactin are checked to rule out
          other causes of irregular cycles, and a fasting insulin and glucose profile is used to
          assess metabolic risk.
        </p>
        <DataTable
          caption="Typical initial work-up"
          head={["Test", "What it assesses"]}
          rows={[
            ["Pelvic ultrasound", "Ovarian volume and follicle pattern"],
            ["Androgen profile", "Testosterone and related hormone levels"],
            ["Thyroid and prolactin", "Rules out other causes of irregular cycles"],
            ["Fasting insulin and glucose", "Insulin resistance and metabolic risk"],
            ["Lipid profile", "Long-term cardiovascular risk"],
          ]}
        />
      </Prose>

      <section>
        <SectionHeading eyebrow="Treatment" title="How PCOS is managed" />
        <StepList
          steps={[
            {
              title: "Lifestyle and metabolic measures",
              copy: "Structured diet and activity changes, often with a 5-10% weight reduction where relevant, meaningfully improve ovulation and insulin sensitivity.",
            },
            {
              title: "Medication for symptom control",
              copy: "Options include insulin-sensitising medication, hormonal regulation of cycles, and targeted treatment for acne or excess hair growth.",
            },
            {
              title: "Ovulation induction for fertility",
              copy: "Where pregnancy is the goal, medication to trigger ovulation is used first, with cycle monitoring by ultrasound.",
            },
            {
              title: "IUI or IVF where needed",
              copy: "If ovulation induction alone does not lead to pregnancy after several cycles, IUI or IVF is discussed as the next step.",
            },
          ]}
        />
      </section>

      <SafetyNote>
        PCOS increases long-term risk of type 2 diabetes and cardiovascular disease. Periodic
        review of weight, blood pressure and metabolic markers is part of ongoing care, not only
        symptom management.
      </SafetyNote>
    </ServicePage>
  );
}
