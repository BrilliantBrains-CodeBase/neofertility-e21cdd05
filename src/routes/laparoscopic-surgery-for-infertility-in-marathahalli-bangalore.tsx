import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SafetyNote, StepList } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  medicalWebPageSchema,
  pageMeta,
  serviceSchema,
} from "@/lib/seo";

const FAQS = [
  {
    q: "What conditions is laparoscopic surgery used for in infertility?",
    a: "Endometriosis, pelvic adhesions, ovarian cysts, tubal disease and, for PCOS/PMOS-related infertility that has not responded to medication, ovarian drilling.",
  },
  {
    q: "Is laparoscopy a major operation?",
    a: "It is minimally invasive, performed through a few small incisions rather than an open abdominal cut, which generally means a shorter recovery than open surgery.",
  },
  {
    q: "How long is recovery after laparoscopy?",
    a: "Most patients go home within a day and return to normal, non-strenuous activity within one to two weeks, though this varies with what was treated.",
  },
  {
    q: "Does laparoscopic surgery improve chances of conceiving?",
    a: "Where the cause of infertility is a mechanical or structural one, such as endometriosis, adhesions or a blocked tube, removing or correcting it can improve the chance of natural conception or the success of subsequent fertility treatment.",
  },
  {
    q: "What is ovarian drilling?",
    a: "A laparoscopic procedure used in PCOS/PMOS where ovulation has not responded to medication, in which small punctures are made in the ovarian surface to help restore ovulation.",
  },
  {
    q: "Is laparoscopy always the first option?",
    a: "No. The simplest effective treatment is tried first. Laparoscopy is used where the diagnosis and findings indicate it is the right next step, not by default.",
  },
];

export const Route = createFileRoute(
  "/laparoscopic-surgery-for-infertility-in-marathahalli-bangalore",
)({
  head: () => ({
    ...pageMeta({
      title: "Laparoscopic Surgery for Infertility - Neo Fertility Clinic",
      description:
        "Minimally invasive laparoscopic surgery for endometriosis, adhesions, ovarian cysts and tubal disease in Marathahalli, Bengaluru.",
      path: ROUTES.laparoscopy,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "Laparoscopic Surgery for Infertility | Marathahalli",
          description:
            "Minimally invasive laparoscopic surgery for endometriosis, adhesions, ovarian cysts and tubal disease in Marathahalli, Bengaluru.",
          path: ROUTES.laparoscopy,
          about: "Laparoscopic surgery",
        }),
      ),
      jsonLd(
        serviceSchema({
          name: "Laparoscopic Surgery for Infertility",
          description:
            "Minimally invasive laparoscopic surgery for endometriosis, adhesions, ovarian cysts and tubal disease in Marathahalli, Bengaluru.",
          path: ROUTES.laparoscopy,
          procedureType: "SurgicalProcedure",
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Gynecology Treatments", path: ROUTES.gynecologyTreatments },
          { name: "Laparoscopic Surgery", path: ROUTES.laparoscopy },
        ]),
      ),
    ],
  }),
  component: LaparoscopyPage,
});

function LaparoscopyPage() {
  return (
    <ServicePage
      eyebrow="Surgeries"
      title="Laparoscopic Surgery for Infertility"
      intro="Minimally invasive laparoscopic surgery for endometriosis, pelvic adhesions, ovarian cysts, tubal disease and ovarian drilling, used where a structural cause of infertility is identified."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Gynecology Treatments", to: ROUTES.gynecologyTreatments },
        { name: "Laparoscopic Surgery" },
      ]}
      sourcePage="laparoscopy"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Discuss whether laparoscopic surgery is indicated",
        copy: "Book a consultation to review your evaluation and whether laparoscopy is the right next step.",
      }}
    >
      <Prose title="Who this is for">
        <p>
          Women with a diagnosed or suspected structural cause of infertility, including
          endometriosis, pelvic adhesions, ovarian cysts, tubal blockage, or PCOS/PMOS where
          ovulation has not responded to medication.
        </p>
      </Prose>

      <Prose title="Conditions treated">
        <DataTable
          caption="What laparoscopy addresses"
          head={["Condition", "How laparoscopy helps"]}
          rows={[
            [
              "Endometriosis",
              "Removal or ablation of endometriotic deposits and associated adhesions",
            ],
            ["Pelvic adhesions", "Division of scar tissue restoring normal pelvic anatomy"],
            [
              "Ovarian cysts",
              "Removal of the cyst while preserving healthy ovarian tissue where possible",
            ],
            [
              "Tubal disease",
              "Assessment of tubal patency, and repair or removal where a tube is damaged",
            ],
            ["PCOS/PMOS, drug-resistant", "Ovarian drilling to help restore ovulation"],
          ]}
        />
      </Prose>

      <Prose title="Evaluation">
        <p>
          Diagnosis is built from pelvic ultrasound, tubal patency testing and clinical history.
          Laparoscopy is recommended where these point to a structural cause that is unlikely to
          resolve with medication alone, following the principle that the simplest effective
          treatment is tried first.
        </p>
      </Prose>

      <Prose title="The procedure">
        <StepList
          steps={[
            {
              title: "Pre-operative assessment",
              copy: "Fitness for anaesthesia is confirmed and the surgical plan is discussed in detail.",
            },
            {
              title: "Laparoscopic surgery",
              copy: "Performed under general anaesthesia through a few small incisions, using a camera and fine instruments.",
            },
            {
              title: "Recovery in hospital",
              copy: "Most patients are discharged the same day or the following day.",
            },
          ]}
        />
        <SafetyNote>
          Fever, worsening pain, or heavy bleeding after surgery should be reported promptly.
        </SafetyNote>
      </Prose>

      <Prose title="Recovery and aftercare">
        <p>
          Most women return to light activity within a few days and normal activity within one to
          two weeks, depending on what was treated. A follow-up consultation reviews the surgical
          findings and discusses the next step toward conception, whether that is trying naturally
          or proceeding to IUI or IVF.
        </p>
      </Prose>
    </ServicePage>
  );
}
