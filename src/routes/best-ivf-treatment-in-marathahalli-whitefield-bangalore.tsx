import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, SafetyNote } from "@/components/sections/blocks";
import { ZigzagSteps } from "@/components/sections/ZigzagSteps";
import { AlternatingTimeline } from "@/components/sections/AlternatingTimeline";
import consultation from "@/assets/ivf-consultation.jpg.asset.json";
import stimulation from "@/assets/ivf-stimulation.png.asset.json";
import retrieval from "@/assets/ivf-egg-retrieval.jpg.asset.json";
import fertilization from "@/assets/ivf-fertilization.jpg.asset.json";
import embryo from "@/assets/ivf-embryo.jpg.asset.json";
import embryoTransfer from "@/assets/ivf-embryo-transfer.jpg.asset.json";
import pregnancyTest from "@/assets/ivf-pregnancy-test.jpg.asset.json";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.ivf;

const FAQS = [
  {
    q: "Is IVF painful?",
    a: "IVF is not a painful procedure, though some steps may cause mild discomfort. Ovarian stimulation involves hormone injections, which may cause bloating and mild cramping. Egg retrieval is performed under sedation, so no pain is felt. Embryo transfer is a simple, painless process, similar to a routine gynecological exam.",
  },
  {
    q: "How long does an IVF cycle take?",
    a: "An IVF cycle takes about 4 to 6 weeks, depending on individual response to medications: ovarian stimulation, egg retrieval, fertilisation and embryo growth, embryo transfer, then a pregnancy test 10 to 14 days after transfer.",
  },
  {
    q: "How many IVF cycles are needed to conceive?",
    a: "Most couples conceive within 1 to 3 IVF cycles. Women under 35 have a higher success rate per cycle at 50 to 60 percent. Women above 40 may require multiple cycles at 20 to 30 percent. If a first attempt is unsuccessful, the treatment plan is reviewed and modified for the next cycle.",
  },
  {
    q: "What factors affect IVF success rates?",
    a: "Age of the woman, egg and sperm quality, uterine health, lifestyle factors such as smoking, obesity and stress, and medical history including PCOS, endometriosis or hormonal imbalances.",
  },
  {
    q: "Are there any risks or side effects of IVF?",
    a: "Mild bloating and cramps due to hormone medications. Ovarian Hyperstimulation Syndrome, a rare condition where ovaries over-respond to stimulation. Multiple pregnancy if more than one embryo is transferred. Emotional stress due to the waiting process. We use individualised treatment plans to minimise risks and provide support throughout.",
  },
  {
    q: "Is IVF expensive? What are the cost factors?",
    a: "Initial consultation and tests are ₹3,000 to ₹5,000, an IVF treatment cycle is ₹1,00,000 to ₹2,00,000, ICSI if needed adds ₹30,000 to ₹50,000, frozen embryo transfer is ₹50,000 to ₹80,000, and preimplantation genetic testing is ₹1,00,000 and above. EMI and financing plans are available.",
  },
  {
    q: "Can IVF guarantee pregnancy?",
    a: "While IVF significantly increases pregnancy chances, it cannot guarantee success in all cases. Younger women have higher success rates due to better egg quality. If IVF is not successful, the fertility plan is re-evaluated and advanced techniques such as ICSI, donor eggs, or a change in protocol may be suggested.",
  },
  {
    q: "Is IVF safe for the baby?",
    a: "Yes. Studies show no significant increase in birth defects compared with natural pregnancies, and babies born through ICSI or frozen embryo transfer have normal growth and development. Preimplantation genetic testing can be done to screen for genetic disorders before embryo transfer.",
  },
];

export const Route = createFileRoute("/best-ivf-treatment-in-marathahalli-whitefield-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "IVF Treatment in Marathahalli, Whitefield | Neo Fertility",
      description:
        "Expert IVF in Marathahalli and Whitefield, Bengaluru: how the cycle works, success rates by age, costs and risks.",
      path: PATH,
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Fertility Solutions", path: ROUTES.fertilitySolutions },
          { name: "In-Vitro Fertilization (IVF)", path: PATH },
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
      title="In-Vitro Fertilization (IVF) Treatment"
      intro="IVF is one of the most effective and widely used fertility treatments. An egg is fertilised with sperm in a specialised lab, and the resulting embryo is placed inside the uterus to establish pregnancy."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Fertility Solutions", to: ROUTES.fertilitySolutions },
        { name: "In-Vitro Fertilization (IVF)" },
      ]}
      sourcePage="ivf-treatment"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Considering IVF?",
        copy: "Book a consultation for a detailed fertility assessment and a written estimate for your IVF cycle.",
      }}
    >
      <Prose title="What IVF is">
        <p>
          IVF bypasses many reproductive issues such as blocked fallopian tubes, ovulation disorders, and
          male fertility concerns. During IVF, an egg is fertilised with sperm in a specialised lab, and the
          resulting embryo is carefully placed inside the uterus to establish pregnancy.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="How it works" title="The IVF cycle, step by step" />
        <ZigzagSteps
          steps={[
            {
              title: "Initial consultation and fertility assessment",
              copy: "Every journey starts with a detailed consultation and fertility evaluation. Dr. Payal conducts tests to understand the root cause of infertility.",
              image: consultation.url,
              alt: "Couple in consultation with a fertility doctor",
            },
            {
              title: "Ovarian stimulation and monitoring",
              copy: "The ovaries are stimulated using fertility medications to produce multiple mature eggs, closely monitored with regular ultrasounds and blood tests.",
              image: stimulation.url,
              alt: "Doctor examining a model of the uterus and ovaries",
            },
            {
              title: "Egg retrieval procedure",
              copy: "Once the eggs are ready, they are retrieved in a minor outpatient procedure under light sedation, using a fine needle guided by ultrasound.",
              image: retrieval.url,
              alt: "Egg retrieval procedure illustration",
            },
            {
              title: "Sperm collection and fertilization",
              copy: "On the same day as egg retrieval, a sperm sample is collected and prepared. The most active and healthy sperm are selected to fertilise the eggs.",
              image: fertilization.url,
              alt: "Sperm approaching an egg during fertilisation",
            },
            {
              title: "Embryo development and selection",
              copy: "The fertilised eggs are monitored for a few days to ensure proper development. The best-quality embryo is chosen for transfer.",
              image: embryo.url,
              alt: "Embryo in a laboratory dish",
            },
            {
              title: "Embryo transfer into the uterus",
              copy: "The selected embryo is transferred into the uterus using a gentle, painless procedure. No anesthesia is required, and patients go home the same day.",
              image: embryoTransfer.url,
              alt: "Illustration of embryo transfer into the uterus",
            },
            {
              title: "Pregnancy test and follow-up",
              copy: "After 10 to 14 days, a blood test confirms pregnancy. If successful, close monitoring continues during the early weeks.",
              image: pregnancyTest.url,
              alt: "Hands holding a pregnancy test",
            },
          ]}
        />
      </section>

      <AlternatingTimeline
        caption="A typical IVF cycle timeline"
        items={[
          { when: "Day 1 to 14", what: "Ovarian stimulation with hormone injections" },
          { when: "Day 15 to 18", what: "Egg retrieval and sperm collection" },
          { when: "Day 19 to 21", what: "Fertilisation and embryo growth in the lab" },
          { when: "Day 22 to 25", what: "Embryo transfer" },
          { when: "Day 30 to 35", what: "Pregnancy test, 10 to 14 days after embryo transfer" },
        ]}
      />


      <section>
        <SectionHeading eyebrow="Who it helps" title="Who can benefit from IVF" />
        <div className="mt-6">
          <CheckList
            items={[
              "Blocked or damaged fallopian tubes: IVF bypasses the fallopian tubes, making pregnancy possible",
              "Ovulation disorders such as PCOS and irregular periods",
              "Low sperm count or poor sperm quality, where ICSI is used within IVF",
              "Unexplained infertility, where no medical reason is found",
              "Endometriosis, where IVF improves pregnancy rates",
              "Age-related fertility decline, for women in their late 30s and 40s with lower egg reserves",
            ]}
          />
        </div>
      </section>

      <DataTable
        caption="Published success rates by age (per cycle)"
        head={["Age group", "Success per cycle"]}
        rows={[
          ["Women under 35 years", "50 to 60 percent"],
          ["Women 35 to 40 years", "40 to 50 percent"],
          ["Women over 40 years", "20 to 30 percent"],
        ]}
      />
      <Prose>
        <p>
          Success rates vary based on age, ovarian reserve, sperm quality, uterine health and lifestyle.
          Rates improve when advanced techniques such as ICSI, frozen embryo transfer, blastocyst culture and
          preimplantation genetic testing are used.
        </p>
      </Prose>

      <DataTable
        caption="IVF cost factors"
        head={["Item", "Price range"]}
        rows={[
          ["Initial consultation and tests", "₹3,000 to ₹5,000"],
          ["IVF treatment cycle", "₹1,00,000 to ₹2,00,000"],
          ["ICSI, if needed", "₹30,000 to ₹50,000"],
          ["Frozen embryo transfer", "₹50,000 to ₹80,000"],
          ["Preimplantation genetic testing", "₹1,00,000 and above"],
        ]}
      />

      <SafetyNote>
        Risks include mild bloating and cramps from hormone medications, a rare risk of Ovarian
        Hyperstimulation Syndrome, and a chance of multiple pregnancy if more than one embryo is
        transferred. We use individualised treatment plans to minimise these risks and provide medical and
        emotional support throughout.
      </SafetyNote>
    </ServicePage>
  );
}
