import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList } from "@/components/sections/blocks";
import { NumberedSteps } from "@/components/sections/NumberedSteps";
import { CircleInfographic } from "@/components/sections/CircleInfographic";
import transvaginalImg from "@/assets/scan-transvaginal.webp";
import abdominalImg from "@/assets/scan-abdominal.webp";
import follicularImg from "@/assets/scan-follicular.webp";
import { ROUTES } from "@/data/navigation";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  medicalWebPageSchema,
  pageMeta,
  serviceSchema,
} from "@/lib/seo";

const PATH = ROUTES.pelvicUltrasound;

const FAQS = [
  {
    q: "What does a pelvic ultrasound show?",
    a: "It examines the ovaries, uterus and, where relevant, follicle count, and is used to assess ovarian cysts, uterine fibroids or polyps, endometrial thickness, and antral follicle count as part of a fertility work-up.",
  },
  {
    q: "Is a pelvic ultrasound painful?",
    a: "No. A transvaginal or abdominal pelvic ultrasound is not painful, though a transvaginal scan can feel unusual if you have not had one before. The approach used is explained beforehand.",
  },
  {
    q: "Do I need a full bladder for a pelvic ultrasound?",
    a: "This depends on whether the scan is abdominal or transvaginal. You will be told what preparation is needed when the appointment is booked.",
  },
  {
    q: "What is a follicular study?",
    a: "A follicular study is a series of pelvic ultrasound scans across a cycle to track the development and release of a follicle, used to time ovulation for natural conception, IUI or IVF.",
  },
  {
    q: "Why is a pelvic ultrasound part of a fertility evaluation?",
    a: "It assesses ovarian appearance and antral follicle count, checks the uterus for fibroids or polyps, and measures endometrial thickness, all of which affect the choice of fertility treatment.",
  },
  {
    q: "Can a pelvic ultrasound diagnose PCOS or PMOS?",
    a: "It contributes to the diagnosis by checking for ovarian cysts and assessing ovarian function, but is interpreted alongside hormone tests rather than on its own.",
  },
  {
    q: "How soon can I get an appointment for a scan?",
    a: "Scans are usually arranged within the same cycle as your consultation, and follicular tracking is scheduled according to your cycle rather than a fixed calendar slot.",
  },
];

export const Route = createFileRoute("/pelvic-ultrasound-scan-in-marathahalli")({
  head: () => ({
    ...pageMeta({
      title: "Pelvic Ultrasound Scan - Marathahalli - Neo Fertility Clinic",
      description:
        "Pelvic ultrasound and follicular study scans in Marathahalli, Bengaluru, for gynecological assessment and fertility evaluation with Dr. Payal Mahapatra.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "Pelvic Ultrasound Scan in Marathahalli | Neo Fertility",
          description:
            "Pelvic ultrasound and follicular study scans in Marathahalli, Bengaluru, for gynecological assessment and fertility evaluation with Dr. Payal Mahapatra.",
          path: PATH,
          about: "Pelvic ultrasound",
        }),
      ),
      jsonLd(
        serviceSchema({
          name: "Pelvic Ultrasound Scan",
          description:
            "Pelvic ultrasound and follicular study scans in Marathahalli, Bengaluru, for gynecological assessment and fertility evaluation with Dr. Payal Mahapatra.",
          path: PATH,
          procedureType: "DiagnosticProcedure",
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Fertility Solutions", path: ROUTES.fertilitySolutions },
          { name: "Pelvic Ultrasound Scan", path: PATH },
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
      title="Pelvic Ultrasound Scan in Marathahalli"
      intro="A pelvic ultrasound examines the ovaries, uterus and follicle count, and is used both in routine gynecological assessment and as part of a fertility evaluation."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Fertility Solutions", to: ROUTES.fertilitySolutions },
        { name: "Pelvic Ultrasound Scan" },
      ]}
      sourcePage="pelvic-ultrasound"
      faqs={FAQS}
      related={[
        { label: "Preconception health check", to: ROUTES.preconception },
        { label: "Infertility evaluation", to: ROUTES.infertility },
        { label: "PCOS treatment", to: ROUTES.pcos },
        { label: "PCOD treatment", to: ROUTES.pcod },
        ...COMMON_RELATED,
      ]}
      closing={{
        heading: "Book a pelvic ultrasound",
        copy: "Book a pelvic ultrasound as a standalone assessment, or as part of a fertility or gynecological evaluation.",
      }}
    >
      <Prose title="Who this is for">
        <p>
          A pelvic ultrasound is used for anyone needing an assessment of the ovaries or uterus,
          whether that is investigation of irregular periods, ovarian cysts, fibroids, or as part of
          a fertility evaluation, including follicular tracking during a treatment cycle.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="What it checks" title="What a pelvic ultrasound examines" />
        <div className="mt-6">
          <CheckList
            items={[
              "Ovarian appearance, including cysts, and antral follicle count",
              "Uterine structure, including fibroids and polyps",
              "Endometrial thickness",
              "Follicle development and ovulation timing, in a follicular study",
              "Early pregnancy findings, where relevant",
            ]}
          />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="What to expect" title="What happens at the appointment" centered />
        <NumberedSteps
          steps={[
            {
              title: "Booking and preparation",
              copy: "You are told whether the scan is transvaginal or abdominal, and what preparation, if any, is needed.",
            },
            {
              title: "The scan",
              copy: "The scan itself takes a few minutes and is not painful, though a transvaginal approach can feel unfamiliar the first time.",
            },
            {
              title: "Results",
              copy: "Findings are explained at the same visit and, where relevant, form part of a wider fertility or gynecological evaluation.",
            },
          ]}
        />
      </section>

      <CircleInfographic
        caption="Types of pelvic ultrasound"
        items={[
          {
            title: "Transvaginal scan",
            copy: "Detailed view of ovaries, uterus and endometrium",
            image: transvaginalImg,
            alt: "Clinician preparing a transvaginal ultrasound probe",
          },
          {
            title: "Abdominal scan",
            copy: "General pelvic assessment, sometimes used where transvaginal scanning is not suitable",
            image: abdominalImg,
            alt: "Sonographer performing an abdominal ultrasound scan",
          },
          {
            title: "Follicular study",
            copy: "Tracking follicle development across a cycle for timed intercourse, IUI or IVF",
            image: follicularImg,
            alt: "Ultrasound monitor during a follicular tracking scan",
          },
        ]}
      />
    </ServicePage>
  );
}
