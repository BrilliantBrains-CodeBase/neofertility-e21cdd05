import { createFileRoute, Link } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SafetyNote } from "@/components/sections/blocks";
import { ZigzagSteps } from "@/components/sections/ZigzagSteps";
import menoConsultation from "@/assets/meno-consultation.jpg";
import menoAssessment from "@/assets/meno-assessment.jpg";
import menoPlan from "@/assets/meno-plan.jpg";
import { ROUTES } from "@/data/navigation";
import { breadcrumbSchema, faqSchema, jsonLd, medicalWebPageSchema, pageMeta } from "@/lib/seo";

const FAQS = [
  {
    q: "How many days of bleeding counts as abnormal?",
    a: "A period lasting more than seven days, or bleeding that soaks a pad hourly, or clots larger than a rupee coin, is heavy or prolonged bleeding and should be assessed rather than watched.",
  },
  {
    q: "When should irregular periods be investigated?",
    a: "If the pattern of irregular cycles has lasted three months or more, investigation is worthwhile. Occasional single-cycle variation is common and not automatically a concern.",
  },
  {
    q: "Is period pain that worsens over the years normal?",
    a: "Pain that has changed in character or intensity, or that ordinary painkillers no longer control, is not something to accept as normal and should be evaluated for causes such as endometriosis or adenomyosis.",
  },
  {
    q: "Is bleeding after menopause serious?",
    a: "Any bleeding after menopause should be assessed promptly. It is not always serious, but it always needs to be checked to rule out endometrial causes.",
  },
  {
    q: "What tests are used to investigate menstrual problems?",
    a: "A pelvic ultrasound, thyroid and prolactin levels, an androgen profile where hormonal imbalance is suspected, and endometrial assessment where indicated by age or scan findings.",
  },
  {
    q: "Can menstrual disorders affect fertility?",
    a: "Yes. Irregular ovulation, hormonal imbalance and undiagnosed pelvic disease are common contributors to difficulty conceiving, which is why menstrual assessment is often the starting point for a fertility work-up.",
  },
  {
    q: "Is hormone therapy the only option for menopausal symptoms?",
    a: "No. Hormone therapy is one option, considered against your personal and family history. Non-hormonal measures for symptom control are also available and are discussed at consultation.",
  },
];

export const Route = createFileRoute(
  "/menstrual-bleeding-and-irregular-period-treatment-in-marathahalli-bangalore",
)({
  head: () => ({
    ...pageMeta({
      title: "Period Problems & Menstrual Disorder Treatment | Marathahalli",
      description:
        "Treatment for heavy bleeding, painful periods, irregular cycles and menopausal symptoms in Marathahalli, Bengaluru, with Dr. Payal Mahapatra.",
      path: ROUTES.menstrual,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "Period Problems & Menstrual Disorder Treatment | Marathahalli",
          description:
            "Treatment for heavy bleeding, painful periods, irregular cycles and menopausal symptoms in Marathahalli, Bengaluru, with Dr. Payal Mahapatra.",
          path: ROUTES.menstrual,
          about: "Menstrual disorders",
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Gynecology Treatments", path: ROUTES.gynecologyTreatments },
          {
            name: "Menstrual & Period Disorders",
            path: ROUTES.menstrual,
          },
        ]),
      ),
    ],
  }),
  component: MenstrualPage,
});

function MenstrualPage() {
  return (
    <ServicePage
      eyebrow="Menstrual & Hormonal Disorders"
      title="Menstrual Bleeding & Irregular Period Treatment in Marathahalli"
      intro="Heavy bleeding, painful periods, irregular cycles and menopausal symptoms are investigated with a pelvic ultrasound, hormone profile and endometrial assessment where indicated, and treated with a plan matched to the underlying cause."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Gynecology Treatments", to: ROUTES.gynecologyTreatments },
        { name: "Menstrual & Period Disorders" },
      ]}
      sourcePage="menstrual"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Get your menstrual symptoms assessed",
        copy: "Book a consultation with Dr. Payal Mahapatra to have your bleeding pattern, pain or menopausal symptoms properly evaluated.",
      }}
    >
      <Prose title="Who this is for">
        <p>
          This page covers four related concerns: abnormal or heavy bleeding, constant menstrual
          pain, irregular menstrual cycles, and menopausal disorders. Each is evaluated on its own
          merits, though several often occur together.
        </p>
      </Prose>

      <Prose>
        <nav aria-label="Jump to section" className="rounded-xl border border-line bg-white p-5">
          <p className="eyebrow">On this page</p>
          <ul className="mt-3 space-y-2 text-[0.9375rem]">
            <li>
              <a href="#abnormal_bleeding" className="text-pink-700 hover:underline">
                Abnormal bleeding
              </a>
            </li>
            <li>
              <a href="#constant_menstrual_pain" className="text-pink-700 hover:underline">
                Constant menstrual pain
              </a>
            </li>
            <li>
              <a href="#irregular_menstrual_cycles" className="text-pink-700 hover:underline">
                Irregular menstrual cycles
              </a>
            </li>
            <li>
              <a href="#menopausal_disorders" className="text-pink-700 hover:underline">
                Menopausal disorders
              </a>
            </li>
          </ul>
        </nav>
      </Prose>

      <Prose id="abnormal_bleeding" title="Abnormal bleeding">
        <p>
          Abnormal bleeding includes periods lasting more than seven days, soaking a pad every hour,
          passing clots larger than a rupee coin, bleeding between periods, or bleeding after
          intercourse or after menopause.
        </p>
        <p>
          <strong>Common causes</strong> include fibroids, endometrial polyps, adenomyosis, hormonal
          imbalance, thyroid disorders, and, less commonly, endometrial pathology.
        </p>
        <p>
          <strong>Evaluation</strong> starts with a pelvic ultrasound, blood counts, thyroid and
          prolactin testing, and endometrial assessment where age or scan findings warrant it.
        </p>
        <p>
          <strong>Treatment</strong> is matched to the cause: hormonal medication to regulate
          bleeding, treatment of thyroid or prolactin abnormalities, or a procedure such as
          hysteroscopy where a polyp or fibroid is found.
        </p>
        <SafetyNote>
          Seek same-day care for bleeding that soaks more than one pad an hour for two consecutive
          hours, for bleeding after menopause, or for bleeding after intercourse.
        </SafetyNote>
      </Prose>

      <Prose id="constant_menstrual_pain" title="Constant menstrual pain">
        <p>
          Period pain that ordinary painkillers no longer control, or that has worsened over the
          years, is not something to accept as routine.
        </p>
        <p>
          <strong>Causes</strong> considered include endometriosis, adenomyosis, fibroids and pelvic
          inflammatory disease.
        </p>
        <p>
          <strong>Evaluation</strong> is by pelvic examination and transvaginal or abdominal
          ultrasound, with further imaging where endometriosis is suspected.
        </p>
        <p>
          <strong>Treatment</strong> ranges from targeted pain relief and hormonal therapy to
          laparoscopic surgery where endometriosis or adhesions are confirmed.
        </p>
      </Prose>

      <Prose id="irregular_menstrual_cycles" title="Irregular menstrual cycles">
        <p>
          Cycles that have become unpredictable, unusually far apart, or absent for three months or
          more, are assessed for an underlying hormonal cause.
        </p>
        <p>
          <strong>Causes</strong> include PCOS/PMOS, thyroid dysfunction, raised prolactin, and
          perimenopause.
        </p>
        <DataTable
          caption="What is checked and why"
          head={["Test", "What it looks for"]}
          rows={[
            ["Pelvic ultrasound", "Ovarian appearance, endometrial thickness, structural causes"],
            ["Thyroid profile", "Under- or overactive thyroid affecting ovulation"],
            ["Prolactin", "Raised prolactin disrupting cycle regularity"],
            ["Androgen profile", "Hyperandrogenism associated with PCOS/PMOS"],
          ]}
        />
        <p>
          <strong>Treatment</strong> aims to correct the underlying hormonal imbalance and restore
          predictable cycles, or, where fertility is the goal, to support ovulation directly.
        </p>
      </Prose>

      <Prose id="menopausal_disorders" title="Menopausal disorders">
        <p>
          Perimenopausal and menopausal symptoms include irregular bleeding, hot flushes, mood
          change and vaginal dryness.
        </p>
        <p>
          <strong>Evaluation</strong> confirms the cause of any bleeding before symptom management
          begins, since bleeding after menopause is always assessed rather than assumed to be
          hormonal.
        </p>
        <p>
          <strong>Treatment options</strong> include hormone therapy, weighed against your personal
          and family history, and non-hormonal measures for symptom control.
        </p>
        <ZigzagSteps
          steps={[
            {
              title: "Consultation and history",
              copy: "Bleeding pattern, symptom timeline and family history are reviewed.",
              image: menoConsultation,
              alt: "Doctor discussing symptoms with a patient at consultation",
            },
            {
              title: "Assessment",
              copy: "Pelvic ultrasound and, where indicated, endometrial assessment.",
              image: menoAssessment,
              alt: "Sonographer performing a pelvic ultrasound scan",
            },
            {
              title: "Plan",
              copy: "Hormonal or non-hormonal management is agreed based on your findings and preference.",
              image: menoPlan,
              alt: "Doctor explaining a treatment plan to a patient",
            },
          ]}
        />
      </Prose>
    </ServicePage>
  );
}
