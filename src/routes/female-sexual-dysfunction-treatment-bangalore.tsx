import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, StepList, SafetyNote } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.sexualDysfunction;

const FAQS = [
  {
    q: "Is female sexual dysfunction a recognised medical condition?",
    a: "Yes. Low desire, arousal difficulty, pain during intercourse and difficulty reaching orgasm are all recognised clinical concerns with identifiable causes in many cases, and effective treatment options.",
  },
  {
    q: "Is this only a psychological issue?",
    a: "Not necessarily. Hormonal changes, pelvic floor conditions, medication side effects, medical conditions such as diabetes or thyroid disorders, and relationship or psychological factors can all contribute, often together. Assessment looks at all of these.",
  },
  {
    q: "Will I need an examination at the first visit?",
    a: "A pelvic examination is only done if clinically relevant and with your agreement. Much of the first consultation is a detailed history to understand the pattern and timing of symptoms.",
  },
  {
    q: "Can this be treated without medication?",
    a: "Often, yes. Pelvic floor therapy, lubricants, addressing an underlying medical cause, or counselling can resolve symptoms without medication. Medication or hormonal treatment is used where indicated.",
  },
  {
    q: "Is this confidential?",
    a: "Yes, in the same way as any other gynecological consultation. Partners are welcome to attend but are not required to.",
  },
];

export const Route = createFileRoute("/female-sexual-dysfunction-treatment-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Female Sexual Dysfunction Treatment in Bangalore | Neo Fertility",
      description:
        "Assessment and treatment for low desire, arousal difficulty, pain during intercourse and orgasm difficulty, with Dr. Payal Mahapatra in Marathahalli, Bangalore.",
      path: PATH,
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Female Sexual Dysfunction Treatment", path: PATH },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePage
      eyebrow="Sexual and Reproductive Health"
      title="Female Sexual Dysfunction Treatment in Bangalore"
      intro="Low desire, arousal difficulty, pain during intercourse and difficulty reaching orgasm are common and treatable concerns. Assessment considers hormonal, physical and psychological causes together."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Female Sexual Dysfunction Treatment" },
      ]}
      sourcePage="female-sexual-dysfunction"
      faqs={FAQS}
      related={[
        { label: "Pain during sex treatment", to: ROUTES.painDuringSex },
        { label: "Vaginal tightening treatment", to: ROUTES.vaginalTightening },
        ...COMMON_RELATED,
      ]}
      closing={{
        heading: "A confidential assessment, without embarrassment",
        copy: "Book a consultation with Dr. Payal Mahapatra to discuss your symptoms and the options available.",
      }}
    >
      <Prose title="What female sexual dysfunction covers">
        <p>
          Female sexual dysfunction is a broad term for persistent difficulty with desire,
          arousal, orgasm, or pain during intercourse that causes distress or affects quality of
          life. It is common, under-discussed, and in most cases identifiable and treatable once
          properly assessed.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Symptoms" title="Common presentations" />
        <div className="mt-6">
          <CheckList
            columns={2}
            items={[
              "Persistent low or absent sexual desire",
              "Difficulty becoming physically aroused",
              "Pain or discomfort during or after intercourse",
              "Difficulty reaching orgasm, or loss of sensation",
              "Vaginal dryness",
              "Anxiety or avoidance around intimacy",
            ]}
          />
        </div>
      </section>

      <Prose title="What contributes to it">
        <p>
          Causes are often more than one factor acting together: hormonal changes around
          childbirth, breastfeeding or menopause; pelvic floor tightness or weakness; medical
          conditions such as diabetes or thyroid disorders; certain medications, including some
          antidepressants; and psychological or relationship factors. Assessment aims to identify
          which of these are contributing in your case, rather than assuming a single cause.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Assessment and treatment" title="How this is approached" />
        <StepList
          steps={[
            {
              title: "Detailed history",
              copy: "Timing, onset and pattern of symptoms, medical history, medications and relevant life events are reviewed in a confidential conversation.",
            },
            {
              title: "Targeted examination if needed",
              copy: "A pelvic examination is only carried out if clinically useful and with your agreement, to check for physical causes of pain or discomfort.",
            },
            {
              title: "Relevant tests",
              copy: "Hormone levels, thyroid function or blood sugar may be checked where a medical cause is suspected.",
            },
            {
              title: "Individualised treatment",
              copy: "Options include pelvic floor physiotherapy, lubricants or moisturisers, hormonal treatment, medication review, or referral for counselling, used alone or in combination.",
            },
          ]}
        />
      </section>

      <SafetyNote>
        New or worsening pain during intercourse, unexplained bleeding after intercourse, or
        pelvic pain outside of intercourse should be assessed promptly rather than managed as a
        purely sexual concern.
      </SafetyNote>
    </ServicePage>
  );
}
