import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.familyPlanning;

const FAQS = [
  {
    q: "What family planning options are available?",
    a: "Contraceptive counselling and fitting, including IUD and implant fitting, alongside advice on other reversible and permanent methods, matched to your health history and plans.",
  },
  {
    q: "How do I choose between an IUD, an implant and other methods?",
    a: "The right method depends on your health history, whether you plan to conceive in future, and how you tolerate hormonal methods. This is discussed in detail at consultation rather than decided from a general list.",
  },
  {
    q: "Is family planning only for people who want to avoid pregnancy?",
    a: "No. Family planning also covers spacing pregnancies and planning the timing of a future pregnancy, alongside contraception for those not currently planning a family.",
  },
  {
    q: "Can I have an IUD or implant fitted at the clinic?",
    a: "Yes. IUD and implant fitting is carried out at the clinic as part of contraception services.",
  },
  {
    q: "Is family planning care confidential?",
    a: "Yes. Consultations, testing and results are confidential. Raise any specific concern about confidentiality at the start of your visit.",
  },
  {
    q: "Does family planning include medical termination of pregnancy?",
    a: "Medical termination of pregnancy is provided as a separate, related service under the MTP Act. It is covered on its own page and can be discussed confidentially at consultation.",
  },
  {
    q: "Do I need a referral for family planning advice?",
    a: "No. You can book directly by phone, WhatsApp or online.",
  },
];

export const Route = createFileRoute("/family-planning-services-in-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Family Planning Services in Bangalore | Neo Fertility",
      description:
        "Contraceptive counselling, IUD and implant fitting, and family planning advice in Marathahalli, Bengaluru, with Dr. Payal Mahapatra.",
      path: PATH,
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Fertility Solutions", path: ROUTES.fertilitySolutions },
          { name: "Family Planning", path: PATH },
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
      title="Family Planning Services"
      intro="Personalised contraceptive and reproductive health advice, matched to your health history and plans, whether you are avoiding pregnancy, spacing pregnancies, or planning to conceive later."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Fertility Solutions", to: ROUTES.fertilitySolutions },
        { name: "Family Planning" },
      ]}
      sourcePage="family-planning"
      faqs={FAQS}
      related={[
        { label: "Preconception health check", to: ROUTES.preconception },
        { label: "Pregnancy care", to: ROUTES.pregnancyCare },
        { label: "Medical termination of pregnancy", to: ROUTES.mtp },
        ...COMMON_RELATED,
      ]}
      closing={{
        heading: "Discuss your family planning options",
        copy: "Book a confidential consultation to discuss contraception, spacing a pregnancy, or planning for later.",
      }}
    >
      <Prose title="Who this is for">
        <p>
          Family planning covers anyone who wants advice on contraception, spacing between
          pregnancies, or planning the timing of a future pregnancy. It is not limited to people
          wanting to avoid pregnancy altogether.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Options" title="What is offered" />
        <div className="mt-6">
          <CheckList
            items={[
              "Contraceptive counselling matched to your health history and plans",
              "IUD fitting",
              "Implant fitting",
              "Advice on other reversible and permanent contraceptive methods",
              "Guidance on spacing pregnancies",
              "Planning the timing of a future pregnancy",
            ]}
          />
        </div>
      </section>

      <DataTable
        caption="Choosing a method"
        head={["Consideration", "Why it matters"]}
        rows={[
          ["Future pregnancy plans", "Some methods are more easily reversed than others"],
          ["Health history", "Certain hormonal methods are unsuitable with some medical conditions"],
          ["Tolerance of hormonal methods", "Non-hormonal options such as a copper IUD are available"],
          ["How long protection is needed", "Options range from short-term to several years"],
        ]}
      />

      <Prose title="What to expect at the visit">
        <p>
          The consultation covers your health history, current cycle, and what you are trying to
          achieve, whether that is avoiding pregnancy now, spacing a future pregnancy, or simply
          understanding your options. Fitting of an IUD or implant, where chosen, is carried out at
          the clinic. Consultations are confidential.
        </p>
      </Prose>
    </ServicePage>
  );
}
