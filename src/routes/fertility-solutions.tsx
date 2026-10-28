import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import {
  PageHero,
  SectionHeading,
  CheckList,
  FaqBlock,
  TreatmentMenuSection,
} from "@/components/sections/blocks";
import { FERTILITY_MENU, ROUTES } from "@/data/navigation";
import { breadcrumbSchema, faqSchema, itemListSchema, jsonLd, pageMeta } from "@/lib/seo";
import { pagesInSection } from "@/data/site-pages";

const COMPARE = [
  {
    treatment: "Ovulation induction",
    suited: "Anovulatory PCOS or PMOS, irregular cycles, open tubes, normal sperm",
    plan: "3 to 6 cycles",
  },
  {
    treatment: "IUI",
    suited: "Unexplained infertility, mild male factor, cervical factor, donor sperm",
    plan: "3 to 4 cycles",
  },
  {
    treatment: "IVF",
    suited: "Blocked or damaged tubes, endometriosis, failed IUI, age-related decline",
    plan: "1 to 3 cycles",
  },
  {
    treatment: "ICSI",
    suited: "Low count, poor motility, abnormal morphology, azoospermia, failed fertilisation",
    plan: "1 to 3 cycles",
  },
  {
    treatment: "Egg freezing",
    suited: "Deferring pregnancy, before cancer treatment or ovarian surgery, low AMH for age",
    plan: "1 to 2 retrieval cycles",
  },
  {
    treatment: "Donor egg or sperm",
    suited:
      "Very low ovarian reserve, premature ovarian insufficiency, azoospermia, heritable conditions",
    plan: "Per protocol",
  },
];

const COSTS = [
  { item: "Initial consultation and tests", range: "₹3,000 to ₹5,000" },
  { item: "IVF cycle", range: "₹1,00,000 to ₹2,00,000" },
  { item: "ICSI added to an IVF cycle", range: "₹30,000 to ₹50,000" },
  { item: "Full IVF with ICSI", range: "₹1,80,000 to ₹2,50,000" },
  { item: "Surgical sperm retrieval, TESA or PESA", range: "₹20,000 to ₹40,000" },
  { item: "Frozen embryo transfer", range: "₹50,000 to ₹80,000" },
  { item: "Preimplantation genetic testing", range: "₹1,00,000 and above" },
];

const FAQS = [
  {
    q: "Which fertility treatment is right for me?",
    a: "It depends entirely on the diagnosis. Anovulation with open tubes usually starts with ovulation induction. Unexplained infertility usually starts with IUI. Blocked tubes, severe male factor or advanced maternal age go straight to IVF. A full evaluation of both partners takes one to two cycles and determines the answer.",
  },
  {
    q: "What is the difference between IUI, IVF and ICSI?",
    a: "IUI places prepared sperm in the uterus and fertilisation still happens naturally inside the body. IVF removes eggs and fertilises them in a laboratory. ICSI is a step within IVF where a single sperm is injected directly into the egg, used when sperm cannot fertilise unaided.",
  },
  {
    q: "Should I try IUI before IVF?",
    a: "If your tubes are open, your partner's sperm parameters are reasonable and you are under 35, usually yes, for three to four cycles. If both tubes are blocked, sperm counts are very low, or you are over 38 with a low ovarian reserve, IUI is unlikely to work and going directly to IVF saves months that matter.",
  },
  {
    q: "How long does fertility treatment take?",
    a: "Evaluation takes one to two menstrual cycles. Ovulation induction is planned as three to six cycles, IUI as three to four cycles, and an IVF cycle runs four to six weeks from the first injection to the pregnancy test. A review point is agreed before treatment begins.",
  },
  {
    q: "Do both partners need to be tested?",
    a: "Yes, and at the same time. A male factor contributes in roughly half of cases and semen analysis is faster, cheaper and less invasive than the female workup. Any evaluation that starts with only one partner is being done in the wrong order.",
  },
];

export const Route = createFileRoute("/fertility-solutions")({
  head: () => {
    const base = pageMeta({
      title: "Fertility Treatment, Marathahalli Bangalore | Neo Fertility",
      description:
        "Compare IVF, IUI, ICSI, egg freezing, male fertility and donor programmes in Marathahalli, Bangalore: costs, success factors and who each suits.",
      path: ROUTES.fertilitySolutions,
    });
    return {
      ...base,
      scripts: [
        jsonLd(
          itemListSchema({
            path: ROUTES.fertilitySolutions,
            title: "Fertility Treatments",
            items: pagesInSection("fertility", ROUTES.fertilitySolutions),
          }),
        ),
        jsonLd(faqSchema(FAQS)),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: ROUTES.home },
            { name: "Fertility Solutions", path: ROUTES.fertilitySolutions },
          ]),
        ),
      ],
    };
  },
  component: FertilitySolutionsPage,
});

function FertilitySolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Fertility Solutions"
        title="Fertility Treatment in Marathahalli and Whitefield, Bangalore"
        intro="Neo Fertility Clinic offers six fertility treatments: ovulation induction, intrauterine insemination (IUI), in-vitro fertilization (IVF), intracytoplasmic sperm injection (ICSI), egg freezing, and donor egg and sperm programmes. Which one is right depends on the diagnosis, not on preference. All six begin with a full evaluation of both partners at the clinic in Marathahalli, Bengaluru."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Fertility Solutions" }]}
      />

      <section className="bg-pink-25 section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Start with the diagnosis"
            title="Not the treatment"
            copy="The question most couples arrive with is whether they need IVF. It is the wrong first question. The right one is what is actually preventing conception, because the answer determines the treatment and frequently rules IVF out as unnecessary. A full evaluation takes one to two menstrual cycles: hormone profile, pelvic ultrasound and antral follicle count, tubal patency testing, and semen analysis for the male partner in the first week."
          />
          <Link
            to={ROUTES.infertility}
            className="mt-6 inline-flex items-center gap-2 font-medium text-pink-700 hover:underline"
          >
            Start here: fertility evaluation for both partners <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Compare" title="Compare the treatments" />
          <div className="mt-8 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[640px] text-left text-[0.9375rem]">
              <thead className="bg-pink-50/60 text-plum-900">
                <tr>
                  <th className="p-4 font-medium">Treatment</th>
                  <th className="p-4 font-medium">Best suited to</th>
                  <th className="p-4 font-medium">Typical plan</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.treatment} className="border-t border-line">
                    <td className="p-4 font-medium text-plum-900">{row.treatment}</td>
                    <td className="p-4 text-ink-muted">{row.suited}</td>
                    <td className="p-4 text-ink-muted">{row.plan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <TreatmentMenuSection groups={FERTILITY_MENU} title="Every fertility service we offer" />

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Cost" title="What each treatment costs" />
          <div className="mt-8 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[480px] text-left text-[0.9375rem]">
              <tbody>
                {COSTS.map((row) => (
                  <tr key={row.item} className="border-t border-line first:border-t-0">
                    <td className="p-4 text-ink">{row.item}</td>
                    <td className="p-4 text-plum-900">{row.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="prose-measure mt-6 text-ink-muted">
            Medication is the largest variable within any cycle and depends on ovarian reserve. A
            written estimate is given at the first consultation. EMI and financing options are
            available.
          </p>
          <Link
            to={ROUTES.ivfCost}
            className="mt-4 inline-flex items-center gap-2 font-medium text-pink-700 hover:underline"
          >
            Full cost breakdown and financing <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="bg-pink-25 section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="What determines outcomes"
            title="Five factors, only two within anyone's control"
          />
          <div className="mt-8">
            <CheckList
              items={[
                "Age of the female partner, which drives egg quality and is the single strongest predictor",
                "Ovarian reserve, measured by AMH and antral follicle count",
                "The specific diagnosis, since tubal factor, male factor and endometriosis respond differently",
                "Sperm parameters, including DNA fragmentation where relevant",
                "Uterine and endometrial health, including polyps, fibroids, adhesions and lining receptivity",
              ]}
            />
          </div>
          <p className="prose-measure mt-6 text-ink-muted">
            Lifestyle factors, weight, smoking, alcohol, diabetes control and vitamin D status, are
            the modifiable ones. They will not open a blocked tube, and they meaningfully affect
            outcomes at the margin.
          </p>
        </div>
      </section>

      <FaqBlock items={FAQS} />

      <ClosingCta
        heading="Start with a full evaluation, not a guess"
        copy="Both partners are seen from the first visit, and the plan follows the diagnosis."
        sourcePage="fertility_solutions_closing"
        whatsappMessage="Hi, I'd like to book a fertility evaluation."
      />
    </>
  );
}
