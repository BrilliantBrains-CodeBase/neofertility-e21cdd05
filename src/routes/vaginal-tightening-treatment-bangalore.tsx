import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, StepList, SafetyNote } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { breadcrumbSchema, faqSchema, jsonLd, medicalWebPageSchema, pageMeta } from "@/lib/seo";

const PATH = ROUTES.vaginalTightening;

const FAQS = [
  {
    q: "Who typically seeks vaginal tightening treatment?",
    a: "Most commonly, women after vaginal childbirth, and women experiencing looseness or reduced sensation with age or menopause. It is a personal decision, not a medical necessity, unless there is an associated functional problem such as prolapse.",
  },
  {
    q: "Is this a surgical procedure?",
    a: "It depends on the option chosen. Non-surgical approaches include pelvic floor physiotherapy and energy-based devices. Surgical vaginoplasty is a separate option for more pronounced laxity and is discussed only after non-surgical measures have been reviewed.",
  },
  {
    q: "Is this the same as treatment for prolapse?",
    a: "No. Pelvic organ prolapse is a distinct condition with its own assessment and treatment pathway. If prolapse is found during evaluation, it is addressed as a separate, medically necessary concern.",
  },
  {
    q: "How long do non-surgical results last?",
    a: "This varies by method and individual factors including childbirth history and hormonal status. Pelvic floor exercises give the most durable benefit when continued long-term; device-based treatments often need maintenance sessions.",
  },
  {
    q: "Is this confidential?",
    a: "Yes, handled with the same confidentiality as any other gynecological consultation.",
  },
];

export const Route = createFileRoute("/vaginal-tightening-treatment-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Vaginal Tightening Treatment in Bangalore | Neo Fertility",
      description:
        "Assessment and options for vaginal laxity after childbirth or with age, including pelvic floor therapy and procedural options, with Dr. Payal Mahapatra in Marathahalli, Bangalore.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "Vaginal Tightening Treatment in Bangalore | Neo Fertility",
          description:
            "Assessment and options for vaginal laxity after childbirth or with age, including pelvic floor therapy and procedural options, with Dr. Payal Mahapatra in Marathahalli, Bangalore.",
          path: PATH,
          about: "Vaginal rejuvenation",
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Vaginal Tightening Treatment", path: PATH },
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
      title="Vaginal Tightening Treatment in Bangalore"
      intro="Vaginal laxity after childbirth or with age can be addressed with pelvic floor therapy, energy-based devices, or surgical options, chosen after a proper assessment of your specific concern."
      trail={[{ name: "Home", to: ROUTES.home }, { name: "Vaginal Tightening Treatment" }]}
      sourcePage="vaginal-tightening"
      faqs={FAQS}
      related={[
        { label: "Female sexual dysfunction treatment", to: ROUTES.sexualDysfunction },
        { label: "Pain during sex treatment", to: ROUTES.painDuringSex },
        ...COMMON_RELATED,
      ]}
      closing={{
        heading: "Discuss your options in a confidential consultation",
        copy: "Book a consultation with Dr. Payal Mahapatra to have your concern assessed and the right option explained.",
      }}
    >
      <Prose title="Understanding vaginal laxity">
        <p>
          Vaginal laxity, a sense of looseness or reduced sensation, is common after vaginal
          childbirth and can also occur with age-related tissue changes or menopause. It is not
          harmful in itself, but many women find it affects confidence or sexual satisfaction and
          choose to pursue treatment for that reason.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="When to seek assessment" title="Reasons women consult" />
        <div className="mt-6">
          <CheckList
            columns={2}
            items={[
              "Reduced sensation during intercourse after childbirth",
              "A feeling of looseness or reduced tone",
              "Change in symptoms after menopause",
              "Interest in non-surgical toning options",
              "Concern about a bulge or heaviness (needs prolapse assessment)",
            ]}
          />
        </div>
      </section>

      <Prose title="Assessment first">
        <p>
          A pelvic examination distinguishes straightforward laxity from pelvic organ prolapse,
          which is a distinct condition with different treatment and, occasionally, more urgent
          management needs. Getting this distinction right before choosing a treatment matters more
          than the treatment choice itself.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Treatment options" title="How this is approached" />
        <StepList
          steps={[
            {
              title: "Pelvic floor physiotherapy",
              copy: "Structured pelvic floor exercises, sometimes guided by biofeedback, are the first-line option and give durable improvement with consistent practice.",
            },
            {
              title: "Energy-based device treatment",
              copy: "Non-surgical devices using radiofrequency or similar energy can improve tissue tone, typically over a short course of sessions, with periodic maintenance.",
            },
            {
              title: "Surgical vaginoplasty",
              copy: "For more pronounced laxity, or where non-surgical options have not given the desired result, surgical tightening is discussed as a planned procedure with a clear recovery timeline.",
            },
          ]}
        />
      </section>

      <SafetyNote>
        A sensation of a bulge, heaviness, or something coming down into the vagina is more likely
        to be pelvic organ prolapse and should be assessed on its own terms rather than treated as
        cosmetic laxity.
      </SafetyNote>
    </ServicePage>
  );
}
