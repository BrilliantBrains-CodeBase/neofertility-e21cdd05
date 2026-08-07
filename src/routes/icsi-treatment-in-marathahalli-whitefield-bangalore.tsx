import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, StepList, SafetyNote } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.icsi;

const FAQS = [
  {
    q: "What are the risks or side effects of ICSI?",
    a: "Mild bloating or discomfort due to ovarian stimulation. Ovarian Hyperstimulation Syndrome, a rare but treatable side effect of hormone medications. A chance of multiple pregnancy if more than one embryo is transferred. In rare cases, sperm injection does not result in fertilisation.",
  },
  {
    q: "How much does ICSI treatment cost in Bangalore?",
    a: "A standalone ICSI procedure is ₹30,000 to ₹50,000. A full IVF and ICSI cycle is ₹1,80,000 to ₹2,50,000. Surgical sperm retrieval, TESA or PESA, is ₹20,000 to ₹40,000. Frozen embryo transfer, if needed, is ₹50,000 to ₹80,000.",
  },
  {
    q: "What can I do to improve my chances of success with ICSI?",
    a: "Maintain a healthy lifestyle, manage stress, take prescribed vitamins and supplements to optimise sperm and egg quality, follow the doctor's medication schedule, and consider ICSI with preimplantation genetic testing to improve embryo selection.",
  },
  {
    q: "How is ICSI different from conventional IVF?",
    a: "In conventional IVF, sperm fertilises the egg naturally in a petri dish. In ICSI, a single selected sperm is precisely injected into the egg using a microneedle, bypassing sperm-related fertility issues.",
  },
  {
    q: "Who benefits most from ICSI?",
    a: "Couples dealing with male factor infertility, including low sperm count, poor motility, abnormal morphology, or where previous conventional IVF fertilisation failed.",
  },
  {
    q: "How long does an ICSI cycle take?",
    a: "An ICSI cycle follows the same overall timeline as IVF, from ovarian stimulation through egg retrieval, fertilisation via ICSI, embryo transfer and a pregnancy test around six weeks from the start.",
  },
];

export const Route = createFileRoute(PATH)({
  head: () => ({
    ...pageMeta({
      title: "ICSI Treatment in Marathahalli, Whitefield | Neo Fertility",
      description:
        "ICSI for male infertility in Marathahalli and Whitefield, Bengaluru: how it works, costs, and success factors.",
      path: PATH,
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Fertility Solutions", path: ROUTES.fertilitySolutions },
          { name: "Intracytoplasmic Sperm Injection (ICSI)", path: PATH },
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
      title="Intracytoplasmic Sperm Injection (ICSI)"
      intro="ICSI is a specialised IVF technique that involves injecting a single, healthy sperm directly into an egg, increasing the chances of fertilisation. It is especially beneficial for couples dealing with male factor infertility."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Fertility Solutions", to: ROUTES.fertilitySolutions },
        { name: "Intracytoplasmic Sperm Injection (ICSI)" },
      ]}
      sourcePage="icsi-treatment"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Discuss ICSI with a specialist",
        copy: "Book a consultation to find out whether ICSI is needed alongside your IVF cycle, based on semen analysis results.",
      }}
    >
      <Prose title="What ICSI is">
        <p>
          ICSI is an advanced form of assisted reproductive technology used alongside IVF to improve
          fertilisation rates where sperm quality, quantity, or motility is an issue. Unlike conventional
          IVF, where sperm fertilises the egg naturally in a petri dish, ICSI ensures that a single selected
          sperm is precisely injected into the egg using a microneedle. This high-precision technique
          bypasses sperm-related fertility issues.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="How it works" title="The ICSI process, step by step" />
        <StepList
          steps={[
            {
              title: "Ovarian stimulation and monitoring",
              copy: "The female partner receives hormonal injections to stimulate the ovaries to produce multiple mature eggs. Regular ultrasounds and blood tests monitor follicle development.",
            },
            {
              title: "Egg retrieval procedure",
              copy: "Once the eggs are mature, they are retrieved through a minor outpatient procedure under sedation. The procedure is painless and takes 10 to 15 minutes.",
            },
            {
              title: "Sperm selection and injection",
              copy: "A single, healthy sperm is selected and injected directly into each mature egg using a fine microneedle in the lab.",
            },
            {
              title: "Embryo development",
              copy: "Fertilised eggs are monitored for a few days as they develop, and the best-quality embryo is chosen for transfer.",
            },
            {
              title: "Embryo transfer and pregnancy test",
              copy: "The embryo is transferred into the uterus without anesthesia. A pregnancy test follows 10 to 14 days later.",
            },
          ]}
        />
      </section>

      <DataTable
        caption="A typical ICSI cycle timeline"
        head={["Timeframe", "Stage"]}
        rows={[
          ["Week 1 to 2", "Ovarian stimulation with hormone injections"],
          ["Week 3", "Egg retrieval and sperm collection"],
          ["Week 3 to 4", "Fertilisation via ICSI and embryo development in the lab"],
          ["Week 4 to 5", "Embryo transfer to the uterus"],
          ["Week 6", "Pregnancy test to confirm success"],
        ]}
      />

      <section>
        <SectionHeading eyebrow="Who benefits" title="ICSI is best suited to" />
        <div className="mt-6">
          <CheckList
            items={[
              "Low sperm count, or oligospermia",
              "Poor sperm motility, or asthenozoospermia",
              "Abnormal sperm morphology, or teratozoospermia",
              "Failed fertilisation in a previous conventional IVF cycle",
              "Sperm retrieved surgically via TESA or PESA",
            ]}
          />
        </div>
      </section>

      <DataTable
        caption="ICSI cost in Bangalore"
        head={["Item", "Price range"]}
        rows={[
          ["ICSI procedure, standalone", "₹30,000 to ₹50,000"],
          ["Full IVF and ICSI cycle", "₹1,80,000 to ₹2,50,000"],
          ["Surgical sperm retrieval, TESA or PESA", "₹20,000 to ₹40,000"],
          ["Frozen embryo transfer, if needed", "₹50,000 to ₹80,000"],
        ]}
      />

      <SafetyNote>
        Risks include mild bloating or discomfort from ovarian stimulation, a rare risk of Ovarian
        Hyperstimulation Syndrome, and a chance of multiple pregnancy if more than one embryo is
        transferred. In rare cases, sperm injection does not result in fertilisation.
      </SafetyNote>
    </ServicePage>
  );
}
