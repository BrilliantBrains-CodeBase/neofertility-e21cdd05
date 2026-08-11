import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, StepList, SafetyNote } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.donor;

const FAQS = [
  {
    q: "Is using donor eggs or sperm legal in India?",
    a: "Yes. Egg and sperm donation is legal in India and is regulated under the Assisted Reproductive Technology (Regulation) Act 2021 and the Surrogacy (Regulation) Act 2021, which set eligibility criteria for donors and recipients.",
  },
  {
    q: "How are donors screened for the programme?",
    a: "All donors undergo a rigorous screening process: medical history review to rule out genetic disorders, fertility tests to confirm egg or sperm quality, infectious disease screening, and psychological evaluation to assess emotional wellbeing.",
  },
  {
    q: "Can I choose my egg or sperm donor?",
    a: "Yes. Intended parents can specify preferences such as physical traits, ethnicity, and medical background, and donors are carefully matched accordingly.",
  },
  {
    q: "What are the success rates of using donor eggs or sperm?",
    a: "Success rates depend on the age of the recipient, egg or sperm quality, and the number of embryos transferred. In most cases, IVF with donor eggs or sperm has a success rate of 70 to 80 percent.",
  },
  {
    q: "Will the child inherit traits from the donor?",
    a: "Yes. The child will inherit genetic traits from the donor, but intended parents select donors based on physical and genetic compatibility.",
  },
  {
    q: "Is the identity of the donor disclosed?",
    a: "No. Donor identity remains anonymous, ensuring confidentiality for both donors and recipients.",
  },
];

export const Route = createFileRoute("/donor-eggs-and-sperm-program-in-marathahalli-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Donor Egg and Sperm Programme | Neo Fertility",
      description:
        "Donor egg and sperm programme in Marathahalli, Bengaluru: who it helps, donor screening, the process, and eligibility.",
      path: PATH,
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Fertility Solutions", path: ROUTES.fertilitySolutions },
          { name: "Donor Egg and Sperm Programme", path: PATH },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePage
      eyebrow="Fertility Solutions"
      title="Donor Egg and Sperm Programme"
      intro="Struggling to conceive due to egg or sperm-related fertility issues? Donor eggs and sperm offer a safe and ethical route to parenthood, used within IVF or IUI."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Fertility Solutions", to: ROUTES.fertilitySolutions },
        { name: "Donor Egg and Sperm Programme" },
      ]}
      sourcePage="donor-programme"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Considering a donor programme?",
        copy: "Book a consultation to discuss donor selection, cycle planning, and the legal position, before treatment begins.",
      }}
    >
      <Prose title="What the programme involves">
        <p>
          Whether the cause is a medical condition, a genetic disorder, or age-related fertility decline,
          donor eggs and sperm offer a chance to experience the joy of having a baby. The programme involves
          carefully screening and selecting healthy donors based on strict medical criteria, retrieving eggs
          or sperm from a suitable donor, and using donor eggs or sperm in IVF or IUI to achieve pregnancy.
          It is conducted under strict confidentiality and the highest ethical standards.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Who it helps" title="This programme is suited to" />
        <div className="mt-6">
          <CheckList
            items={[
              "Those with poor egg or sperm quality due to age or medical conditions",
              "Those experiencing early menopause or premature ovarian failure",
              "Those who have undergone chemotherapy or radiation that has affected fertility",
              "Those with a genetic disorder who want to prevent passing it to their child",
              "Those who have had multiple failed IVF cycles due to egg or sperm-related issues",
              "Same-sex couples and single parents looking for a sperm or egg donor",
            ]}
          />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="How it works" title="The programme, step by step" />
        <ZigzagSteps
          steps={[
            {
              title: "Consultation and donor selection",
              copy: "We guide you in selecting the best donor based on medical compatibility and personal preferences.",
              image: selectionImg.url,
              alt: "Illustration of a donor egg passed between two hands",
            },
            {
              title: "Fertility treatment and synchronisation",
              copy: "The donor's egg retrieval or sperm collection is timed with the recipient's cycle for optimal success.",
              image: retrievalImg.url,
              alt: "Embryologist handling a sample tube during egg retrieval",
            },
            {
              title: "Fertilisation and embryo development",
              copy: "Donated eggs or sperm are used in IVF procedures to create healthy embryos.",
              image: fertilisationImg.url,
              alt: "Illustration of eggs being fertilised in the laboratory",
            },
            {
              title: "Embryo transfer and pregnancy monitoring",
              copy: "The fertilised embryo is transferred to the recipient's uterus for implantation, followed by regular pregnancy monitoring.",
              image: transferImg.url,
              alt: "Illustration of an embryo transfer into the uterus",
            },
          ]}
        />
      </section>

      <DataTable
        caption="Becoming a donor: eligibility"
        head={["Donor type", "Age", "Other criteria"]}
        rows={[
          ["Egg donors", "21 to 30", "Healthy women with no genetic or reproductive disorders"],
          ["Sperm donors", "21 to 40", "Healthy men with high sperm quality and motility"],
          [
            "Both",
            "Applies to all",
            "No history of genetic disorders, infections or sexually transmitted diseases. Non-smokers and non-alcoholics with a healthy lifestyle. Psychologically and emotionally stable.",
          ],
        ]}
      />

      <SafetyNote>
        Donor sperm with IUI or IVF is a recognised route to pregnancy in India, governed by the Assisted
        Reproductive Technology (Regulation) Act 2021 and the Surrogacy (Regulation) Act 2021. Specific
        eligibility criteria under these Acts are confirmed with you directly at consultation, before
        treatment planning begins.
      </SafetyNote>
    </ServicePage>
  );
}
