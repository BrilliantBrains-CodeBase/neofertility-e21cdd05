import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, SafetyNote } from "@/components/sections/blocks";
import { ArrowTimeline } from "@/components/sections/ArrowTimeline";
import { JourneyFlow } from "@/components/sections/JourneyFlow";
import stimulation from "@/assets/icsi-stimulation.webp";
import retrieval from "@/assets/icsi-egg-retrieval.jpg";
import injection from "@/assets/icsi-sperm-injection.jpg";
import embryo from "@/assets/icsi-embryo-development.jpg";
import pregnancyTest from "@/assets/icsi-transfer-test.jpg";
import { ROUTES } from "@/data/navigation";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  medicalWebPageSchema,
  pageMeta,
  serviceSchema,
} from "@/lib/seo";

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

export const Route = createFileRoute("/icsi-treatment-in-marathahalli-whitefield-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Best ICSI Treatment in Marathahalli - Neo Fertility Clinic",
      description:
        "ICSI for male infertility in Marathahalli and Whitefield, Bengaluru: how it works, costs, and success factors.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "ICSI Treatment in Marathahalli, Whitefield | Neo Fertility",
          description:
            "ICSI for male infertility in Marathahalli and Whitefield, Bengaluru: how it works, costs, and success factors.",
          path: PATH,
          about: "Intracytoplasmic sperm injection",
        }),
      ),
      jsonLd(
        serviceSchema({
          name: "Intracytoplasmic Sperm Injection (ICSI)",
          description:
            "ICSI for male infertility in Marathahalli and Whitefield, Bengaluru: how it works, costs, and success factors.",
          path: PATH,
        }),
      ),
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
          fertilisation rates where sperm quality, quantity, or motility is an issue. Unlike
          conventional IVF, where sperm fertilises the egg naturally in a petri dish, ICSI ensures
          that a single selected sperm is precisely injected into the egg using a microneedle. This
          high-precision technique bypasses sperm-related fertility issues.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="How it works" title="The ICSI process, step by step" />
        <JourneyFlow
          steps={[
            {
              title: "Ovarian stimulation and monitoring",
              copy: "The female partner receives hormonal injections to stimulate the ovaries to produce multiple mature eggs. Regular ultrasounds and blood tests monitor follicle development.",
              image: stimulation,
              alt: "Hormonal injection being administered near an anatomical model of the ovary",
            },
            {
              title: "Egg retrieval procedure",
              copy: "Once the eggs are mature, they are retrieved through a minor outpatient procedure under sedation. The procedure is painless and takes 10 to 15 minutes.",
              image: retrieval,
              alt: "Embryologist holding a test tube during egg retrieval",
            },
            {
              title: "Sperm selection and injection",
              copy: "A single, healthy sperm is selected and injected directly into each mature egg using a fine microneedle in the lab.",
              image: injection,
              alt: "Single sperm being injected into an egg with a microneedle",
            },
            {
              title: "Embryo development",
              copy: "Fertilised eggs are monitored for a few days as they develop, and the best-quality embryo is chosen for transfer.",
              image: embryo,
              alt: "Illustration of a developing baby in the womb",
            },
            {
              title: "Embryo transfer and pregnancy test",
              copy: "The embryo is transferred into the uterus without anesthesia. A pregnancy test follows 10 to 14 days later.",
              image: pregnancyTest,
              alt: "Couple holding a positive pregnancy test",
            },
          ]}
        />
      </section>

      <ArrowTimeline
        caption="A typical ICSI cycle timeline"
        items={[
          { when: "Week 1 to 2", what: "Ovarian stimulation with hormone injections" },
          { when: "Week 3", what: "Egg retrieval and sperm collection" },
          { when: "Week 3 to 4", what: "Fertilisation via ICSI and embryo development in the lab" },
          { when: "Week 4 to 5", what: "Embryo transfer to the uterus" },
          { when: "Week 6", what: "Pregnancy test to confirm success" },
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
