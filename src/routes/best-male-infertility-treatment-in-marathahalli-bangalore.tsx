import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, SafetyNote } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { breadcrumbSchema, faqSchema, jsonLd, medicalWebPageSchema, pageMeta } from "@/lib/seo";

const PATH = ROUTES.maleInfertility;

const FAQS = [
  {
    q: "Can male infertility be reversed?",
    a: "Yes. Many cases can be treated or improved with the right combination of lifestyle changes, medications, and fertility treatments.",
  },
  {
    q: "How long does male infertility treatment take?",
    a: "It depends on the underlying cause. Some men see improvements within 3 to 6 months, while others may need advanced fertility procedures such as ICSI or sperm retrieval.",
  },
  {
    q: "Can stress and diet affect male fertility?",
    a: "Yes. High stress levels, poor diet, smoking, and alcohol can negatively impact sperm quality. Maintaining a healthy lifestyle with proper nutrition, exercise, and stress management can improve fertility outcomes.",
  },
  {
    q: "Is IVF the only option for male infertility?",
    a: "No. Many men can improve their fertility through medications, lifestyle changes, and hormonal therapy. In severe cases, ICSI, IUI, or sperm retrieval procedures may be recommended.",
  },
  {
    q: "What are the chances of success with male infertility treatment?",
    a: "Success rates depend on the cause of infertility and the treatment used. Assisted reproductive techniques such as ICSI have a high success rate, especially when combined with lifestyle improvements.",
  },
  {
    q: "When should I see a male fertility specialist?",
    a: "If you and your partner have been trying to conceive for over a year without success, or if you have a known medical condition affecting fertility, it is best to consult a specialist as soon as possible.",
  },
];

export const Route = createFileRoute("/best-male-infertility-treatment-in-marathahalli-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Male Infertility Treatment in Marathahalli | Neo Fertility",
      description:
        "Male infertility diagnosis and treatment in Marathahalli, Bengaluru: causes, tests, timelines and treatment options.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "Male Infertility Treatment in Marathahalli | Neo Fertility",
          description:
            "Male infertility diagnosis and treatment in Marathahalli, Bengaluru: causes, tests, timelines and treatment options.",
          path: PATH,
          about: "Male infertility",
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Fertility Solutions", path: ROUTES.fertilitySolutions },
          { name: "Male Fertility Solutions", path: PATH },
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
      title="Male Infertility Treatment"
      intro="Male infertility affects millions of men worldwide, but with the right diagnosis and treatment, fatherhood is possible. Identifying the cause early significantly improves treatment success."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Fertility Solutions", to: ROUTES.fertilitySolutions },
        { name: "Male Fertility Solutions" },
      ]}
      sourcePage="male-infertility"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Start with a semen analysis",
        copy: "Male infertility usually has no symptoms. A semen analysis is fast, inexpensive and non-invasive. Book a consultation to begin.",
      }}
    >
      <Prose title="What male infertility is">
        <p>
          Male infertility is more common than people think. It occurs when a man has difficulty
          getting his partner pregnant due to issues with sperm production, function, or delivery.
          Identifying the cause early can significantly improve treatment success.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Causes" title="What causes male infertility" />
        <div className="mt-6">
          <CheckList
            items={[
              "Low sperm count, or oligospermia",
              "Poor sperm motility, or asthenozoospermia",
              "Abnormal sperm morphology, or teratozoospermia",
              "Hormonal imbalances, including low testosterone or other hormonal issues",
              "Varicocele, or enlarged veins in the scrotum, which can raise testicular temperature and reduce sperm quality",
              "Erectile dysfunction and ejaculation issues",
              "Lifestyle and environmental factors: smoking, excessive alcohol, obesity, and stress",
            ]}
          />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Diagnosis" title="How male infertility is diagnosed" />
        <div className="mt-6">
          <CheckList
            items={[
              "Semen analysis, evaluating sperm count, motility, morphology and overall quality",
              "Hormonal blood tests, checking testosterone, FSH, LH and prolactin levels",
              "Scrotal ultrasound, detecting varicocele or any abnormalities in the testicles",
              "DNA fragmentation test, determining sperm DNA integrity",
              "Testicular biopsy, performed when no sperm are found in the semen, to check for sperm production",
            ]}
          />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Treatment" title="Treatment options" />
        <div className="mt-6">
          <CheckList
            items={[
              "Lifestyle modifications and nutritional support: diet, exercise, and stress management",
              "Hormonal therapy: medications to correct low testosterone or hormonal imbalances",
              "Antioxidant supplements to reduce oxidative stress and enhance sperm quality",
              "Medications for erectile dysfunction",
              "Varicocele surgery, a minor procedure to correct enlarged veins in the scrotum",
              "Surgical sperm retrieval, TESA or PESA, extracting sperm directly from the testicles in cases of azoospermia",
              "ICSI, where a single sperm is injected directly into an egg",
              "Artificial insemination, or IUI, where processed sperm is placed directly inside the uterus",
            ]}
          />
        </div>
      </section>

      <DataTable
        caption="How long improvement typically takes"
        head={["Treatment type", "Time to see improvement"]}
        rows={[
          [
            "Lifestyle and medication-based treatments",
            "3 to 6 months for improvement in sperm quality",
          ],
          [
            "Surgical procedures",
            "Recovery takes 1 to 2 weeks, with sperm improvement seen in 3 months",
          ],
          ["ICSI or IVF", "Results can be seen within one fertility cycle, about 4 to 6 weeks"],
        ]}
      />

      <SafetyNote>
        Male infertility usually has no symptoms. Most men feel entirely normal and discover a
        problem only when a semen analysis is done. Deferring that test is the single most common
        sequencing error in fertility care. Where sperm production cannot be restored, ICSI means
        one usable sperm is enough, and TESA or PESA can recover sperm even when none appears in the
        ejaculate.
      </SafetyNote>
    </ServicePage>
  );
}
