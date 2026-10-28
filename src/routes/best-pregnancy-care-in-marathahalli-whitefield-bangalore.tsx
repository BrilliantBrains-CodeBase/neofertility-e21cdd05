import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, SafetyNote } from "@/components/sections/blocks";
import { StepCards } from "@/components/sections/StepCards";
import { ROUTES } from "@/data/navigation";
import { breadcrumbSchema, faqSchema, jsonLd, medicalWebPageSchema, pageMeta } from "@/lib/seo";
import visitFirst from "@/assets/visit-first-antenatal-visit.webp";
import visitFirstTrimester from "@/assets/visit-1st-trimester.webp";
import visitLaterTrimesters from "@/assets/visit-2nd-and-3rd-trimester.webp";
import visitDelivery from "@/assets/visit-delivery.webp";

const PATH = ROUTES.pregnancyCare;

const FAQS = [
  {
    q: "Does the same doctor manage fertility treatment and the pregnancy that follows?",
    a: "Yes. Dr. Payal Mahapatra manages the pregnancy that follows fertility treatment, including high-risk pregnancy care, rather than handing you to another consultant at eight weeks.",
  },
  {
    q: "What is covered under high-risk pregnancy care?",
    a: "Gestational diabetes, hypertension in pregnancy, and recurrent miscarriage are among the conditions managed as high-risk pregnancy care, alongside pregnancies conceived through IVF.",
  },
  {
    q: "How often will I be seen during pregnancy?",
    a: "Visit frequency depends on your risk profile and stage of pregnancy, and is agreed with you at the first antenatal visit. Higher-risk pregnancies are seen more often.",
  },
  {
    q: "Is IVF pregnancy managed differently from a natural pregnancy?",
    a: "IVF pregnancies are monitored somewhat more closely in the first trimester, and are managed by the same doctor who carried out the fertility treatment, which gives continuity through the early weeks when it matters most.",
  },
  {
    q: "Can I book antenatal care here without having had fertility treatment at the clinic?",
    a: "Yes. Complete antenatal care is offered regardless of where or how you conceived.",
  },
  {
    q: "What should I bring to my first antenatal visit?",
    a: "Any previous scans, blood test results and, if relevant, fertility treatment records. These help build an accurate picture from the first appointment.",
  },
  {
    q: "Is the clinic open on weekends for antenatal appointments?",
    a: "Yes, all seven days from 09:30 to 18:30, which matters for scans and monitoring that need to happen on a schedule rather than around a working week.",
  },
];

export const Route = createFileRoute("/best-pregnancy-care-in-marathahalli-whitefield-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Best Pregnancy Care in Marathahalli - Neo Fertility Clinic",
      description:
        "Complete antenatal care and high-risk pregnancy management in Marathahalli and Whitefield, Bengaluru, including pregnancies conceived through IVF.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "Pregnancy Care in Marathahalli & Whitefield | Neo Fertility",
          description:
            "Complete antenatal care and high-risk pregnancy management in Marathahalli and Whitefield, Bengaluru, including pregnancies conceived through IVF.",
          path: PATH,
          about: "Antenatal care",
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Fertility Solutions", path: ROUTES.fertilitySolutions },
          { name: "Pregnancy Care", path: PATH },
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
      title="Pregnancy Care in Marathahalli & Whitefield"
      intro="Complete antenatal care and high-risk pregnancy management, delivered by the same doctor throughout, including pregnancies conceived through IVF."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Fertility Solutions", to: ROUTES.fertilitySolutions },
        { name: "Pregnancy Care" },
      ]}
      sourcePage="pregnancy-care"
      faqs={FAQS}
      related={[
        { label: "Natural delivery care", to: ROUTES.naturalDelivery },
        { label: "Preconception health check", to: ROUTES.preconception },
        { label: "Family planning services", to: ROUTES.familyPlanning },
        { label: "Pelvic ultrasound scan", to: ROUTES.pelvicUltrasound },
        { label: "Medical termination of pregnancy", to: ROUTES.mtp },
        ...COMMON_RELATED,
      ]}
      closing={{
        heading: "Book your antenatal care",
        copy: "Whether your pregnancy followed fertility treatment or conceived naturally, book a first antenatal appointment to start continuous care.",
      }}
    >
      <Prose title="Who this is for">
        <p>
          This page covers pregnancy care for anyone who is pregnant or has recently conceived,
          whether naturally or through fertility treatment. Many fertility clinics hand pregnancies
          over to another doctor at eight weeks. Here, the doctor who managed your fertility
          treatment manages the pregnancy that follows, through to delivery.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="What is covered" title="Antenatal and high-risk pregnancy care" />
        <div className="mt-6">
          <CheckList
            items={[
              "Complete antenatal care from the first missed period through to delivery",
              "Dating and anomaly scans, and routine antenatal screening",
              "Gestational diabetes screening and management",
              "Management of hypertension in pregnancy",
              "Care for recurrent miscarriage in a current or future pregnancy",
              "Continuity of care for pregnancies conceived through IVF",
            ]}
          />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="What to expect" title="A typical antenatal journey" />
        <StepCards
          steps={[
            {
              title: "First antenatal visit",
              copy: "History, dating scan, baseline blood tests and a discussion of your risk profile and visit schedule.",
              image: visitFirst,
              alt: "Baseline blood test being taken at a first antenatal visit",
            },
            {
              title: "First trimester",
              copy: "Closer monitoring where the pregnancy followed IVF, or where a risk factor is identified.",
              image: visitFirstTrimester,
              alt: "Early pregnancy scan images beside a positive pregnancy test",
            },
            {
              title: "Second and third trimester",
              copy: "Scheduled scans, screening for gestational diabetes and hypertension, and regular monitoring.",
              image: visitLaterTrimesters,
              alt: "Pregnant woman holding a scan photograph against her bump",
            },
            {
              title: "Delivery",
              copy: "Managed by the same doctor who has followed the pregnancy throughout.",
              image: visitDelivery,
              alt: "Newborn baby held by the doctor moments after delivery",
            },
          ]}
        />
      </section>

      <DataTable
        caption="Conditions managed as high-risk pregnancy care"
        head={["Condition", "What is involved"]}
        rows={[
          [
            "Gestational diabetes",
            "Screening, dietary guidance and, where needed, medical management",
          ],
          [
            "Hypertension in pregnancy",
            "Regular monitoring and treatment to protect mother and baby",
          ],
          [
            "Recurrent miscarriage",
            "Investigation of possible causes and closer monitoring in a subsequent pregnancy",
          ],
          [
            "IVF pregnancy",
            "Closer first-trimester monitoring, managed by the treating fertility doctor",
          ],
        ]}
      />

      <SafetyNote>
        Bleeding, severe abdominal pain, reduced fetal movement, or a severe headache with visual
        disturbance in pregnancy should be assessed the same day.
      </SafetyNote>
    </ServicePage>
  );
}
