import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList } from "@/components/sections/blocks";
import { JourneyFlow } from "@/components/sections/JourneyFlow";
import consultationImg from "@/assets/visit-consultation.jpg.asset.json";
import testingImg from "@/assets/visit-testing.jpg.asset.json";
import reviewImg from "@/assets/visit-review.jpg.asset.json";
import supplementsImg from "@/assets/visit-supplements.jpg.asset.json";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.preconception;

const FAQS = [
  {
    q: "Who should have a preconception health check?",
    a: "Anyone planning a pregnancy, whether conception is expected naturally or through fertility treatment. It is particularly worthwhile if you have irregular periods, PCOS or PMOS, a thyroid condition, a previous miscarriage, or a family history of genetic conditions.",
  },
  {
    q: "What does a preconception check involve?",
    a: "A detailed history, a general and pelvic examination, a hormone profile, a pelvic ultrasound, thyroid and prolactin testing, screening for infections, and a semen analysis for the male partner. Blood group, rubella immunity and general fitness for pregnancy are also checked.",
  },
  {
    q: "How long before trying to conceive should we have this done?",
    a: "Three to six months ahead is reasonable. This allows time to start folic acid, correct any deficiencies such as vitamin D or thyroid imbalance, and address any findings from the evaluation before you start trying.",
  },
  {
    q: "Does the male partner need to be tested too?",
    a: "Yes. A semen analysis is a fast, inexpensive, non-invasive test and a male factor contributes to roughly half of fertility difficulties. It is sensible to test both partners together rather than starting with only one.",
  },
  {
    q: "Will I need to take any supplements?",
    a: "Folic acid is routinely recommended before conception to reduce the risk of neural tube defects. Other supplements, such as vitamin D or iron, are advised only where testing shows a deficiency.",
  },
  {
    q: "Can existing health conditions affect pregnancy?",
    a: "Yes. Thyroid disorders, diabetes, high blood pressure, PCOS or PMOS and untreated infections can all affect conception and pregnancy outcomes. The preconception check identifies and, where possible, corrects these before you conceive.",
  },
  {
    q: "Do I need a referral to book a preconception check?",
    a: "No. You can book directly by phone, WhatsApp or online.",
  },
];

export const Route = createFileRoute("/best-pre-conception-health-check-in-marathahalli-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Pre-Conception Health Check in Marathahalli | Neo Fertility",
      description:
        "Preconception health screening in Marathahalli, Bengaluru: hormone profile, pelvic ultrasound, infection screening and semen analysis before you start trying to conceive.",
      path: PATH,
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Fertility Solutions", path: ROUTES.fertilitySolutions },
          { name: "Preconception Checkup", path: PATH },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePage
      eyebrow="Pregnancy Services"
      title="Pre-Conception Health Check in Marathahalli"
      intro="A preconception health check confirms your body is ready for pregnancy, and corrects what is not, before you start trying rather than after a difficult first trimester."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Fertility Solutions", to: ROUTES.fertilitySolutions },
        { name: "Preconception Checkup" },
      ]}
      sourcePage="preconception"
      faqs={FAQS}
      related={[
        { label: "Family planning services", to: ROUTES.familyPlanning },
        { label: "Pregnancy care", to: ROUTES.pregnancyCare },
        { label: "Pelvic ultrasound scan", to: ROUTES.pelvicUltrasound },
        ...COMMON_RELATED,
      ]}
      closing={{
        heading: "Planning a pregnancy?",
        copy: "Book a preconception health check three to six months before you plan to start trying, so any findings can be addressed in good time.",
      }}
    >
      <Prose title="Who this is for">
        <p>
          A preconception health check is for anyone planning a pregnancy, whether conception is
          expected to happen naturally or with fertility treatment. It matters more, not less, if
          you have irregular periods, PCOS or PMOS, a thyroid condition, a previous miscarriage, or
          a family history of a genetic condition.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Evaluation" title="What the check involves" />
        <div className="mt-6">
          <CheckList
            items={[
              "Detailed history covering cycles, previous pregnancies, surgeries and family history, for both partners",
              "General and pelvic examination",
              "Hormone profile, including thyroid and prolactin",
              "Pelvic ultrasound to assess the uterus, ovaries and antral follicle count",
              "Screening for infections, including rubella immunity and blood group",
              "Semen analysis for the male partner",
              "Review of existing conditions such as diabetes, high blood pressure, PCOS or PMOS and thyroid disorders",
            ]}
          />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Timeline" title="What happens at the visit" />
        <JourneyFlow
          steps={[
            {
              title: "Consultation and history",
              copy: "A detailed conversation about your cycle, medical history and any previous pregnancies, for both partners.",
              image: consultationImg.url,
              alt: "Doctor discussing medical history with a patient at a consultation desk",
            },
            {
              title: "Testing",
              copy: "Blood tests, pelvic ultrasound and semen analysis are arranged, usually completed within one menstrual cycle.",
              image: testingImg.url,
              alt: "Clinician performing a pelvic ultrasound scan",
            },
            {
              title: "Review and correction",
              copy: "Results are explained in plain language. Any deficiencies, thyroid imbalance or infections found are treated before you start trying.",
              image: reviewImg.url,
              alt: "Doctor explaining test results to a patient",
            },
            {
              title: "Folic acid and supplements",
              copy: "Folic acid is started ahead of conception. Other supplements are added only where testing shows they are needed.",
              image: supplementsImg.url,
              alt: "Woman taking folic acid supplement tablets with a glass of water",
            },
          ]}
        />
      </section>


      <DataTable
        caption="Typical preconception timeline"
        head={["When", "What happens"]}
        rows={[
          ["3 to 6 months before trying", "Preconception consultation, testing and correction of any findings"],
          ["1 month before trying", "Folic acid established, review of results complete"],
          ["When trying begins", "Ovulation tracking or timed intercourse guidance, if requested"],
        ]}
      />

      <Prose title="Why this matters">
        <p>
          Correcting a thyroid imbalance, treating an infection, or addressing irregular ovulation
          before conception is more straightforward than managing the same issue once you are
          already pregnant. A preconception check also gives a clear picture of ovarian reserve and
          semen parameters, which is useful information whether or not any problem is found.
        </p>
      </Prose>
    </ServicePage>
  );
}
