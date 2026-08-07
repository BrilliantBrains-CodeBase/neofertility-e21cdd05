import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, SafetyNote } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.painDuringSex;

const FAQS = [
  {
    q: "Is pain during sex common?",
    a: "It is a common presentation in gynecology, more common than the silence around it suggests. It is not something to accept as normal, and it is investigated like any other symptom.",
  },
  {
    q: "When should I see a doctor about pain during intercourse?",
    a: "If it has happened more than a few times, or is getting worse. A single uncomfortable occasion is not usually a concern, but a repeated or worsening pattern should be assessed.",
  },
  {
    q: "What causes pain during sex?",
    a: "Common causes include vaginal infections, vaginismus, endometriosis, pelvic inflammatory disease, vaginal dryness related to hormonal change, and, less commonly, structural conditions. The cause determines the treatment, so an accurate diagnosis matters more than guessing at a remedy.",
  },
  {
    q: "What does the evaluation involve?",
    a: "A detailed history, a gentle pelvic examination, and further testing where indicated, such as a pelvic ultrasound or infection screening. The pace of the examination is set by you, and it can be paused or stopped at any point.",
  },
  {
    q: "Is the consultation confidential?",
    a: "Yes. Consultations, testing and results are confidential. If confidentiality is a particular concern, raise it at the start of the visit and ask how you will be contacted and what appears on records.",
  },
  {
    q: "Can this be treated without surgery?",
    a: "Often, yes. Many causes, including infection, vaginismus and hormonal dryness, are managed with medication, topical treatment or targeted physiotherapy. Surgery is considered only where a structural cause, such as endometriosis, requires it.",
  },
  {
    q: "Do I need a referral?",
    a: "No. You can book directly by phone, WhatsApp or online, with Dr. Payal Mahapatra, a female gynecologist.",
  },
];

export const Route = createFileRoute(PATH)({
  head: () => ({
    ...pageMeta({
      title: "Pain During Sex Treatment in Marathahalli | Neo Fertility",
      description:
        "Confidential evaluation and treatment for pain during intercourse in Marathahalli, Bengaluru, with Dr. Payal Mahapatra, female gynecologist.",
      path: PATH,
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Gynecology Treatments", path: ROUTES.gynecologyTreatments },
          { name: "Pain While Having Sex", path: PATH },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePage
      eyebrow="Sexual & Reproductive Health"
      title="Pain During Sex: Diagnosis and Treatment"
      intro="Pain during intercourse has an identifiable cause in the great majority of cases, and an identifiable treatment. It is assessed confidentially by Dr. Payal Mahapatra, a female gynecologist."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Gynecology Treatments", to: ROUTES.gynecologyTreatments },
        { name: "Pain While Having Sex" },
      ]}
      sourcePage="pain-during-sex"
      faqs={FAQS}
      related={[
        { label: "Vaginal discharge and infection", to: ROUTES.vaginalInfection },
        { label: "Pelvic inflammatory disease", to: ROUTES.pid },
        { label: "Female sexual dysfunction", to: ROUTES.sexualDysfunction },
        { label: "Vaginal tightening treatment", to: ROUTES.vaginalTightening },
        ...COMMON_RELATED,
      ]}
      closing={{
        heading: "Book a confidential consultation",
        copy: "Pain during intercourse can be assessed and treated. Book a confidential appointment with Dr. Payal Mahapatra.",
      }}
    >
      <Prose title="Who this is for">
        <p>
          This page is for anyone experiencing pain during intercourse, whether occasional or
          persistent, new or long-standing. It has happened more than a few times, or is getting
          worse: that is the point at which it is worth booking a consultation rather than waiting.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Causes" title="What can cause pain during sex" />
        <div className="mt-6">
          <CheckList
            items={[
              "Vaginal infections, including bacterial vaginosis, yeast infection or trichomoniasis",
              "Vaginismus, an involuntary tightening of the vaginal muscles",
              "Endometriosis, causing deep pain with intercourse",
              "Pelvic inflammatory disease",
              "Vaginal dryness related to hormonal change, including around menopause",
              "Structural conditions, assessed where other causes are ruled out",
            ]}
          />
        </div>
      </section>

      <Prose title="What the evaluation involves">
        <p>
          A detailed history is taken first, covering when the pain started, where it is felt, and
          whether it is linked to a particular position or point of penetration. A gentle pelvic
          examination follows, at a pace you set, and can be paused or stopped at any point. Further
          testing, such as a pelvic ultrasound or infection screening, is arranged where the history
          and examination point to it.
        </p>
      </Prose>

      <DataTable
        caption="Common causes and how they are treated"
        head={["Cause", "Typical treatment"]}
        rows={[
          ["Vaginal infection", "Targeted medication once the specific infection is identified"],
          ["Vaginismus", "Targeted physiotherapy and, where needed, graded desensitisation support"],
          ["Endometriosis", "Hormonal therapy or laparoscopic surgery, depending on severity"],
          ["Hormonal dryness", "Topical or hormonal treatment matched to your history"],
          ["Pelvic inflammatory disease", "Prompt antibiotic treatment to limit damage to the fallopian tubes"],
        ]}
      />

      <SafetyNote>
        Pelvic pain together with discharge should be seen the same week. Untreated pelvic
        infection can scar the fallopian tubes within weeks and affect future fertility.
      </SafetyNote>

      <Prose title="What to expect at the visit">
        <p>
          Consultations, testing and results are confidential. Dr. Payal Mahapatra conducts the
          consultation and any examination personally. If confidentiality is a particular concern,
          say so at the start of the visit.
        </p>
      </Prose>
    </ServicePage>
  );
}
