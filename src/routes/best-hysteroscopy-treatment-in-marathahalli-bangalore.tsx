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
    q: "What conditions is hysteroscopy used for?",
    a: "Polyps, submucous fibroids, intrauterine adhesions and uterine septum are the main conditions diagnosed and treated by hysteroscopy.",
  },
  {
    q: "Is hysteroscopy a major operation?",
    a: "No. It is a minimally invasive procedure performed through the vagina and cervix, without any external incision.",
  },
  {
    q: "How long does recovery take?",
    a: "Most patients return to normal activity within a day or two. Recovery time depends on whether the hysteroscopy was diagnostic only or included a treatment procedure.",
  },
  {
    q: "Can hysteroscopy improve fertility?",
    a: "Yes, where a polyp, fibroid, septum or adhesion is affecting the uterine cavity, removing it can improve the chance of a pregnancy implanting and continuing.",
  },
  {
    q: "Is anaesthesia required?",
    a: "Diagnostic hysteroscopy can often be done with minimal or no anaesthesia. Operative hysteroscopy, where a fibroid or septum is treated, is usually done under sedation or general anaesthesia.",
  },
  {
    q: "When is hysteroscopy done before an IVF transfer?",
    a: "It is sometimes recommended to check the uterine cavity is normal before an embryo transfer, particularly after a previous failed cycle.",
  },
];

export const Route = createFileRoute("/best-hysteroscopy-treatment-in-marathahalli-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Hysteroscopy Treatment in Marathahalli, Bangalore",
      description:
        "Diagnostic and operative hysteroscopy for polyps, fibroids, adhesions and uterine septum in Marathahalli, Bengaluru.",
      path: ROUTES.hysteroscopy,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "Hysteroscopy Treatment in Marathahalli, Bangalore",
          description:
            "Diagnostic and operative hysteroscopy for polyps, fibroids, adhesions and uterine septum in Marathahalli, Bengaluru.",
          path: ROUTES.hysteroscopy,
          about: "Hysteroscopy",
        }),
      ),
      jsonLd(
        serviceSchema({
          name: "Hysteroscopy",
          description:
            "Diagnostic and operative hysteroscopy for polyps, fibroids, adhesions and uterine septum in Marathahalli, Bengaluru.",
          path: ROUTES.hysteroscopy,
          procedureType: "SurgicalProcedure",
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Gynecology Treatments", path: ROUTES.gynecologyTreatments },
          { name: "Hysteroscopy", path: ROUTES.hysteroscopy },
        ]),
      ),
    ],
  }),
  component: HysteroscopyPage,
});

function HysteroscopyPage() {
  return (
    <ServicePage
      eyebrow="Surgeries"
      title="Hysteroscopy Treatment in Marathahalli"
      intro="Hysteroscopy is used to diagnose and treat polyps, submucous fibroids, intrauterine adhesions and uterine septum, using a narrow camera passed through the cervix without any external incision."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Gynecology Treatments", to: ROUTES.gynecologyTreatments },
        { name: "Hysteroscopy" },
      ]}
      sourcePage="hysteroscopy"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Discuss whether hysteroscopy is right for you",
        copy: "Book a consultation to review your scan findings and whether hysteroscopy is indicated.",
      }}
    >
      <Prose title="Who this is for">
        <p>
          Women with abnormal bleeding, a suspected uterine polyp or fibroid on ultrasound,
          recurrent implantation failure, or a suspected uterine septum or intrauterine adhesion.
        </p>
      </Prose>

      <Prose title="Conditions treated">
        <DataTable
          caption="What hysteroscopy addresses"
          head={["Condition", "How hysteroscopy helps"]}
          rows={[
            ["Endometrial polyp", "Direct visualisation and removal of the polyp"],
            ["Submucous fibroid", "Resection of fibroid distorting the uterine cavity"],
            ["Intrauterine adhesions", "Division of scar tissue restoring normal cavity shape"],
            ["Uterine septum", "Incision of the septum to create a single, normal cavity"],
          ]}
        />
      </Prose>

      <Prose title="Evaluation">
        <p>
          A pelvic ultrasound, often with saline infusion, identifies the abnormality first.
          Hysteroscopy is then planned either as a diagnostic look, or combined with treatment in
          the same sitting where feasible.
        </p>
      </Prose>

      <Prose title="The procedure">
        <StepList
          steps={[
            {
              title: "Preparation",
              copy: "Timed to the appropriate point in your cycle, with anaesthesia planned according to whether treatment is expected.",
            },
            {
              title: "Hysteroscopy",
              copy: "A narrow camera is passed through the cervix into the uterine cavity, which is examined and, if needed, treated.",
            },
            {
              title: "Recovery",
              copy: "Most patients go home the same day, with light spotting and mild cramping for a day or two being normal.",
            },
          ]}
        />
        <SafetyNote>
          Heavy bleeding, fever, or severe pain after the procedure should be reported promptly.
        </SafetyNote>
      </Prose>

      <Prose title="Recovery and aftercare">
        <p>
          Most women resume normal activity within one to two days. Intercourse and strenuous
          exercise are usually avoided for a short period as advised at your follow-up visit, which
          also reviews the findings and results of any tissue sent for testing.
        </p>
      </Prose>
    </ServicePage>
  );
}
