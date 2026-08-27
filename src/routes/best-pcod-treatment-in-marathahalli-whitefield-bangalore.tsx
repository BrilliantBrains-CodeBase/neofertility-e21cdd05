import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, StepList } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { breadcrumbSchema, faqSchema, jsonLd, medicalWebPageSchema, pageMeta } from "@/lib/seo";

const PATH = ROUTES.pcod;

const FAQS = [
  {
    q: "Is PCOD dangerous?",
    a: "PCOD (polycystic ovarian disease) is usually a milder ovarian condition than PCOS, without the same degree of metabolic disturbance in most women. It still deserves proper diagnosis, because untreated irregular ovulation affects fertility and long-term cycle regularity.",
  },
  {
    q: "Will PCOD go away on its own?",
    a: "It can improve, particularly with weight and lifestyle changes, but it does not reliably resolve without some intervention. Most women need either lifestyle measures, medication, or both to regulate cycles.",
  },
  {
    q: "Can PCOD affect my ability to have children?",
    a: "It can, mainly through irregular or absent ovulation. Most women with PCOD conceive with ovulation-inducing medication and monitoring; a smaller number need IUI or IVF.",
  },
  {
    q: "What is the difference between PCOD and PCOS?",
    a: "PCOD generally describes ovaries with multiple immature follicles and irregular ovulation, without the broader insulin resistance and metabolic profile that defines PCOS in many women. The distinction matters less for immediate treatment and more for long-term monitoring.",
  },
  {
    q: "How soon can treatment start after diagnosis?",
    a: "Once a pelvic ultrasound and basic hormone panel are done, a management plan can usually be started at the same visit or shortly after.",
  },
];

export const Route = createFileRoute("/best-pcod-treatment-in-marathahalli-whitefield-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Best PCOD treatment in Marathahalli - Neo Fertility Clinic",
      description:
        "Diagnosis and management of polycystic ovarian disease (PCOD) with Dr. Payal Mahapatra in Marathahalli and Whitefield, Bangalore. Cycles and fertility.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "Best PCOD Treatment in Marathahalli & Whitefield, Bangalore",
          description:
            "Diagnosis and management of polycystic ovarian disease (PCOD) with Dr. Payal Mahapatra in Marathahalli and Whitefield, Bangalore. Irregular cycles, ovulation problems and fertility concerns.",
          path: PATH,
          about: "Polycystic ovarian disease (PCOD)",
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Gynecology Treatments", path: ROUTES.gynecologyTreatments },
          { name: "PCOD Treatment", path: PATH },
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
      title="Best PCOD Treatment in Marathahalli & Whitefield, Bangalore"
      intro="Polycystic ovarian disease causes irregular cycles and inconsistent ovulation. Diagnosis is confirmed with an ultrasound and hormone profile, and treatment is matched to whether you want regular cycles, symptom relief, or pregnancy."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Gynecology Treatments", to: ROUTES.gynecologyTreatments },
        { name: "PCOD Treatment" },
      ]}
      sourcePage="pcod"
      faqs={FAQS}
      related={[
        { label: "PCOS treatment", to: ROUTES.pcos },
        { label: "Menstrual and period disorders", to: ROUTES.menstrual },
        ...COMMON_RELATED,
      ]}
      closing={{
        heading: "Get irregular cycles investigated properly",
        copy: "Book a consultation with Dr. Payal Mahapatra to confirm the diagnosis and start a plan matched to your goals.",
      }}
    >
      <Prose title="What PCOD is">
        <p>
          Polycystic ovarian disease (PCOD) describes ovaries that release multiple immature or
          partially developed eggs each cycle, instead of one mature egg, resulting in irregular or
          absent ovulation. Many women with PCOD have relatively mild symptoms compared to PCOS, but
          the effect on periods and fertility can still be significant.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Symptoms" title="Common signs of PCOD" />
        <div className="mt-6">
          <CheckList
            columns={2}
            items={[
              "Irregular or unpredictable periods",
              "Longer gaps between cycles",
              "Mild weight gain",
              "Occasional acne or oily skin",
              "Difficulty conceiving",
              "Mood changes around the cycle",
            ]}
          />
        </div>
      </section>

      <Prose title="Diagnosis">
        <p>
          A transvaginal or pelvic ultrasound looks for the characteristic pattern of multiple small
          follicles in the ovaries. Basic hormone tests, including thyroid, prolactin and an
          androgen panel, rule out other causes of irregular cycles and help distinguish PCOD from
          PCOS or thyroid-related irregularity.
        </p>
        <DataTable
          caption="Typical diagnostic work-up"
          head={["Test", "What it assesses"]}
          rows={[
            ["Pelvic ultrasound", "Ovarian follicle pattern and volume"],
            ["Thyroid profile", "Rules out thyroid-related cycle irregularity"],
            ["Prolactin", "Rules out raised prolactin as a cause"],
            ["Androgen panel", "Distinguishes PCOD from PCOS severity"],
          ]}
        />
      </Prose>

      <section>
        <SectionHeading eyebrow="Treatment" title="How PCOD is managed" />
        <StepList
          steps={[
            {
              title: "Lifestyle measures",
              copy: "Dietary changes and regular activity often restore more predictable cycles within a few months.",
            },
            {
              title: "Cycle regulation",
              copy: "Hormonal medication is used where regular periods, rather than pregnancy, is the immediate goal.",
            },
            {
              title: "Ovulation induction",
              copy: "For women trying to conceive, medication to trigger reliable ovulation is started with ultrasound monitoring.",
            },
            {
              title: "Further fertility treatment if needed",
              copy: "IUI or IVF is discussed if ovulation induction alone does not result in pregnancy after a reasonable number of cycles.",
            },
          ]}
        />
      </section>

      <Prose title="Long-term outlook">
        <p>
          Most women with PCOD go on to have regular cycles and successful pregnancies with
          appropriate treatment. Periodic review is still worthwhile, since cycle patterns and
          hormone levels can shift over time, particularly with changes in weight or age.
        </p>
      </Prose>
    </ServicePage>
  );
}
