import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.firstRelationship;

const FAQS = [
  { q: "Is this consultation only for women?", a: "No. Either partner, or both together, can book a consultation. Many questions about a first sexual relationship are shared between partners." },
  { q: "Is this confidential?", a: "Yes. Consultations are confidential in the same way as any other gynecological or medical consultation." },
  { q: "What kind of questions can be discussed?", a: "Contraception choices, safe practices, pain or discomfort, general reproductive health, and any worries about what is normal. There is no question too basic to ask." },
  { q: "Will there be an examination?", a: "Not unless it is clinically necessary and you are comfortable with it. Many first consultations are entirely conversation and information." },
];

export const Route = createFileRoute("/first-sexual-relationship-guidance-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "First Sexual Relationship Guidance in Bangalore | Neo Fertility",
      description:
        "Confidential counselling and safe health practice guidance for a first sexual relationship, in Marathahalli, Bangalore, with Dr. Payal Mahapatra.",
      path: PATH,
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "First Sexual Relationship Guidance", path: PATH },
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
      title="First Sexual Relationship Guidance"
      intro="A confidential consultation covering contraception, safe practices and general reproductive health for anyone starting a first sexual relationship."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "First Sexual Relationship Guidance" },
      ]}
      sourcePage="first-relationship-guidance"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "A straightforward, confidential conversation",
        copy: "Book a consultation to discuss contraception, safe practices and any questions you have, without judgement.",
      }}
    >
      <Prose title="What this consultation covers">
        <p>
          Starting a first sexual relationship raises practical questions that are often easier to ask a doctor than
          to search for online. This consultation is a plain, confidential conversation covering contraception
          options, safe practices to reduce the risk of infection, and what to expect physically. It is offered to
          individuals and to couples together.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Topics" title="What is usually discussed" />
        <div className="mt-6">
          <CheckList
            items={[
              "Contraception options and which suits your situation",
              "Safe practices to reduce the risk of sexually transmitted infections",
              "What is normal, including common discomfort or worries",
              "When to seek further tests or treatment",
              "Menstrual cycle and general reproductive health",
            ]}
          />
        </div>
      </section>

      <Prose title="A confidential space">
        <p>
          The consultation is handled with the same confidentiality as any other medical appointment. There is no
          requirement to bring a partner, and no question is considered too basic to raise. If a physical examination
          or test is genuinely needed, this is explained and only carried out with your agreement.
        </p>
      </Prose>
    </ServicePage>
  );
}
