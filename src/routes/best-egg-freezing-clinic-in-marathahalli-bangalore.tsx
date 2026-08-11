import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, SafetyNote } from "@/components/sections/blocks";
import { ZigzagSteps } from "@/components/sections/ZigzagSteps";
import stepConsult from "@/assets/ef-consultation.jpg.asset.json";
import stepStimulation from "@/assets/ef-stimulation.png.asset.json";
import stepRetrieval from "@/assets/ef-retrieval.jpg.asset.json";
import stepCryo from "@/assets/ef-cryopreservation.png.asset.json";
import stepStorage from "@/assets/ef-storage.png.asset.json";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.eggFreezing;

const FAQS = [
  {
    q: "How does egg freezing work?",
    a: "Eggs are retrieved, frozen, and stored for future use. The process involves ovarian stimulation, egg retrieval, and rapid freezing using vitrification to preserve the eggs until needed for fertilisation.",
  },
  {
    q: "What is the best age to freeze my eggs?",
    a: "The ideal age is between 25 and 35, as egg quality and quantity decline with age. Freezing eggs younger increases the chances of a successful pregnancy later. Women in their late 30s and early 40s may still benefit, depending on ovarian reserve.",
  },
  {
    q: "How many eggs should I freeze for future pregnancy?",
    a: "Under 35 years, 10 to 15 eggs are recommended. Between 35 and 40 years, 15 to 20 eggs. Above 40 years, more than 20 eggs, since more eggs are needed to offset a lower per-egg success rate.",
  },
  {
    q: "How long can frozen eggs be stored?",
    a: "Eggs can be safely stored for 10 to 15 years or more without losing quality. Vitrification keeps eggs in condition until you are ready to use them, and the decision to use them rests entirely with the patient.",
  },
  {
    q: "Does freezing eggs guarantee pregnancy later?",
    a: "No. Egg freezing does not guarantee pregnancy but significantly improves the chances of conceiving in future. Once thawed, eggs are fertilised through ICSI or IVF, with success rates varying from 50 to 80 percent depending on age and egg quality.",
  },
  {
    q: "Is the egg freezing process painful?",
    a: "The process is minimally invasive and not painful. Ovarian stimulation may cause mild bloating and discomfort similar to PMS. Egg retrieval is performed under light anesthesia and takes 10 to 15 minutes, with minimal downtime.",
  },
  {
    q: "Can I use my frozen eggs for IVF later?",
    a: "Yes. Frozen eggs are thawed using advanced cryopreservation techniques, fertilised using ICSI, and transferred into the uterus through IVF for implantation and pregnancy.",
  },
  {
    q: "How much does egg freezing cost in Bangalore?",
    a: "Cost depends on the number of eggs retrieved and stored, hormonal medications used for stimulation, laboratory and cryopreservation technology, and storage duration. Flexible payment options are available, and a written estimate is given after your first assessment.",
  },
];

export const Route = createFileRoute("/best-egg-freezing-clinic-in-marathahalli-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Egg Freezing Clinic in Marathahalli | Neo Fertility",
      description:
        "Egg freezing and preservation in Marathahalli, Bengaluru: who it suits, the process, storage, and what affects success.",
      path: PATH,
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Fertility Solutions", path: ROUTES.fertilitySolutions },
          { name: "Egg Freezing and Preservation", path: PATH },
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
      title="Egg Freezing and Preservation"
      intro="Egg freezing gives you the freedom to plan your future without worrying about age-related fertility decline, whether the reason is medical, career, or personal choice."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Fertility Solutions", to: ROUTES.fertilitySolutions },
        { name: "Egg Freezing and Preservation" },
      ]}
      sourcePage="egg-freezing"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Considering egg freezing?",
        copy: "Book a consultation for ovarian reserve testing and an honest conversation about timing before deciding.",
      }}
    >
      <Prose title="What egg freezing is">
        <p>
          Egg freezing, or oocyte cryopreservation, is a fertility preservation technique that allows women
          to freeze their eggs at a younger age and use them later when they are ready to conceive. It
          suits women who want to delay motherhood for career reasons, medical reasons, or personal choice.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Why consider it" title="Reasons to freeze your eggs" />
        <div className="mt-6">
          <CheckList
            items={[
              "Preserve fertility before age-related decline, since freezing eggs younger increases future success rates",
              "Medical reasons: cancer treatment, surgery, or other conditions that may affect fertility",
              "Personal or career planning, for those not ready to start a family now",
              "Support for IVF treatment: eggs can be frozen for future fertility treatment cycles",
            ]}
          />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Who it suits" title="Egg freezing is a good fit for" />
        <div className="mt-6">
          <CheckList
            items={[
              "Women in their 20s and early 30s, when egg quality and quantity are highest",
              "Women with medical conditions, including those undergoing chemotherapy, radiation, or ovarian surgery",
              "Women with a family history of early menopause",
              "Career-focused women who wish to delay pregnancy",
              "Women considering IVF later in life, since frozen eggs improve later IVF success",
            ]}
          />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="How it works" title="The egg freezing process, step by step" />
        <ZigzagSteps
          steps={[
            {
              title: "Initial consultation and fertility testing",
              copy: "Hormonal blood tests and ultrasound scans assess ovarian reserve and suitability for egg freezing.",
              image: stepConsult.url,
              alt: "Clinician holding a patient's hand during consultation",
            },
            {
              title: "Ovarian stimulation and monitoring",
              copy: "Hormonal injections are given for 10 to 12 days to stimulate egg production, with regular monitoring via ultrasound and blood tests.",
              image: stepStimulation.url,
              alt: "Doctor examining a model of the uterus and ovaries",
            },
            {
              title: "Egg retrieval procedure",
              copy: "Mature eggs are collected in a short, painless procedure under light anesthesia.",
              image: stepRetrieval.url,
              alt: "Embryologist handling a collection tube in theatre",
            },
            {
              title: "Cryopreservation",
              copy: "Vitrification is used to rapidly freeze eggs at ultra-low temperatures to maintain quality.",
              image: stepCryo.url,
              alt: "Cryovial being lifted from liquid nitrogen vapour",
            },
            {
              title: "Egg storage for future use",
              copy: "Eggs are safely stored in a specialised cryogenic facility until you are ready to use them.",
              image: stepStorage.url,
              alt: "Frozen egg preserved in a chilled dish",
            },
          ]}
        />
      </section>

      <DataTable
        caption="Recommended number of eggs frozen, by age"
        head={["Age", "Recommended number of eggs"]}
        rows={[
          ["Under 35 years", "10 to 15 eggs"],
          ["35 to 40 years", "15 to 20 eggs"],
          ["40 years and above", "More than 20 eggs"],
        ]}
      />

      <Prose title="What affects success">
        <p>
          Success depends on your age at the time of freezing (younger eggs mean higher success rates), the
          number of eggs frozen (10 to 15 or more improves the chances of a future pregnancy), and
          laboratory technology — the vitrification method used gives a 97 percent survival rate after
          thawing.
        </p>
      </Prose>

      <SafetyNote>
        The process is minimally invasive. Ovarian stimulation may cause mild bloating similar to PMS, and
        egg retrieval under light anesthesia takes 10 to 15 minutes, with mild cramping or bloating
        afterwards that usually resolves within a day or two.
      </SafetyNote>
    </ServicePage>
  );
}
