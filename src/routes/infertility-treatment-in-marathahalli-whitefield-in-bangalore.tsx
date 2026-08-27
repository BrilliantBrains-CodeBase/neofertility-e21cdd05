import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, SafetyNote } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { breadcrumbSchema, faqSchema, jsonLd, medicalWebPageSchema, pageMeta } from "@/lib/seo";

const PATH = ROUTES.infertility;

const FAQS = [
  {
    q: "When should I see a fertility specialist?",
    a: "If you have been trying to conceive for over a year, or six months if you are over 35, without success, it is best to consult a specialist for an infertility evaluation.",
  },
  {
    q: "What are the first steps in infertility evaluation?",
    a: "A detailed consultation, blood tests, ultrasound for women, and semen analysis for men to identify potential fertility issues.",
  },
  {
    q: "What treatments are available for infertility?",
    a: "A range of personalised fertility treatments including ovulation induction, IUI, IVF, ICSI, egg freezing, and surgical procedures such as laparoscopy and hysteroscopy.",
  },
  {
    q: "Is IVF my only option if I am struggling to conceive?",
    a: "No. Many couples conceive through ovulation tracking, lifestyle changes, IUI, or hormonal therapy before considering IVF. We recommend the most suitable treatment for the condition, not the most advanced one by default.",
  },
  {
    q: "What are the success rates of fertility treatments?",
    a: "Success rates depend on age, diagnosis and treatment type. IVF has a 40 to 60 percent success rate per cycle, while IUI has 10 to 20 percent per cycle.",
  },
  {
    q: "Is male infertility treatable?",
    a: "Yes. Male infertility can often be treated with lifestyle changes, medication, hormonal therapy, or advanced techniques such as ICSI or sperm retrieval procedures.",
  },
  {
    q: "How much does infertility treatment cost?",
    a: "Cost varies depending on the treatment required, from ovulation induction tablets through to a full IVF cycle. A written estimate is given at the first consultation once your diagnosis is clear.",
  },
  {
    q: "Can I still conceive naturally after fertility treatment?",
    a: "Yes. Many couples who undergo fertility treatment improve their reproductive health and go on to conceive naturally in future cycles.",
  },
];

export const Route = createFileRoute(
  "/infertility-treatment-in-marathahalli-whitefield-in-bangalore",
)({
  head: () => ({
    ...pageMeta({
      title: "Infertility Treatment in Marathahalli - Neo Fertility Clinic",
      description:
        "Comprehensive infertility evaluation and treatment in Marathahalli, Bengaluru: causes, tests, and personalised treatment for both partners.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "Infertility Treatment in Marathahalli, Whitefield | Neo Fertility",
          description:
            "Comprehensive infertility evaluation and treatment in Marathahalli, Bengaluru: causes, tests, and personalised treatment for both partners.",
          path: PATH,
          about: "Infertility",
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Fertility Solutions", path: ROUTES.fertilitySolutions },
          { name: "Infertility Evaluation and Treatment", path: PATH },
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
      title="Comprehensive Infertility Evaluation and Treatment"
      intro="Struggling to conceive? Knowing the cause is the first step toward successful treatment. We carry out a detailed evaluation of both partners before recommending any treatment."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Fertility Solutions", to: ROUTES.fertilitySolutions },
        { name: "Infertility Evaluation and Treatment" },
      ]}
      sourcePage="infertility-treatment"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Start with an evaluation, not a guess",
        copy: "Book a fertility evaluation for both partners and get a personalised treatment plan built on your results.",
      }}
    >
      <Prose title="What causes infertility">
        <p>
          Infertility can affect both men and women, and knowing the cause is the first step toward
          successful treatment. It is not always a single issue. It can be hormonal, structural, or
          lifestyle-related. We carry out comprehensive evaluations to identify the exact reason and
          build a personalised treatment plan.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Causes" title="Causes in women" />
        <div className="mt-6">
          <CheckList
            items={[
              "Ovulation disorders: irregular or absent ovulation due to PCOS, thyroid issues, or hormonal imbalances",
              "Blocked fallopian tubes: tubal damage from infections, previous surgeries, or endometriosis",
              "Endometriosis: tissue similar to the uterine lining growing outside the uterus",
              "Poor egg quality: age-related decline in egg health or premature ovarian failure",
              "Uterine abnormalities: fibroids, polyps, or scar tissue that may prevent implantation",
              "Hormonal imbalances affecting estrogen, progesterone or thyroid hormones",
            ]}
          />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Causes" title="Causes in men" />
        <div className="mt-6">
          <CheckList
            items={[
              "Low sperm count",
              "Poor sperm motility",
              "Abnormal sperm shape, or morphology",
              "Hormonal imbalances, including low testosterone",
              "Varicocele: enlarged veins in the scrotum affecting sperm quality",
              "Infections and lifestyle factors: smoking, alcohol, obesity and stress",
            ]}
          />
        </div>
        <SafetyNote>
          Did you know? In nearly 30 to 40 percent of infertility cases, both partners have
          contributing factors. That is why a complete fertility evaluation for both men and women
          is essential.
        </SafetyNote>
      </section>

      <Prose title="Comprehensive fertility evaluation">
        <p>
          Before starting any treatment, it is important to understand the root cause. We use a set
          of advanced tests to build a personalised plan for each partner.
        </p>
      </Prose>

      <DataTable
        caption="Tests for women"
        head={["Test", "Purpose"]}
        rows={[
          ["Hormonal blood tests", "FSH, LH, AMH and thyroid hormones"],
          ["Pelvic ultrasound scan", "Examining ovaries, uterus and follicle count"],
          ["Ovulation tracking", "Understanding the cycle and the best time to conceive"],
          ["HSG or sonohysterogram", "Checking whether the fallopian tubes are open"],
          ["Endometrial health assessment", "Ensuring the uterus is ready for implantation"],
        ]}
      />

      <DataTable
        caption="Tests for men"
        head={["Test", "Purpose"]}
        rows={[
          ["Semen analysis", "Sperm count, motility and morphology"],
          ["Hormonal testing", "Testosterone and other hormones affecting fertility"],
          [
            "Physical examination",
            "Identifying structural or medical issues affecting sperm health",
          ],
        ]}
      />

      <Prose title="What happens after the evaluation">
        <p>
          We sit down with you to explain results in simple terms and discuss the best treatment
          options. Unnecessary treatments are never pushed. You leave with a clear understanding of
          your fertility status, a personalised treatment plan based on test results, and Dr. Payal
          Mahapatra's guidance on next steps.
        </p>
      </Prose>

      <DataTable
        caption="Treatment options for women"
        head={["Treatment", "What it involves"]}
        rows={[
          [
            "Ovulation induction therapy",
            "Medications to stimulate egg release for better chances of conception",
          ],
          [
            "Intrauterine insemination (IUI)",
            "A simple, non-invasive treatment that places healthy sperm directly into the uterus",
          ],
          [
            "In-vitro fertilization (IVF)",
            "A highly effective assisted reproductive technique to help women conceive",
          ],
          [
            "Intracytoplasmic sperm injection (ICSI)",
            "Best for severe male infertility; a single healthy sperm is injected directly into an egg",
          ],
          ["Egg freezing and preservation", "Preserving eggs for future pregnancy planning"],
          [
            "Endometriosis and PCOS management",
            "Tailored treatment for women facing ovulation issues due to hormonal disorders",
          ],
          [
            "Hysteroscopy and laparoscopy",
            "Minimally invasive procedures to diagnose and treat uterine or tubal issues",
          ],
        ]}
      />

      <DataTable
        caption="Treatment options for men"
        head={["Treatment", "What it involves"]}
        rows={[
          [
            "Semen analysis and diagnosis",
            "Comprehensive sperm health evaluation covering count, motility and morphology",
          ],
          ["Hormonal therapy", "Treating imbalances affecting sperm production"],
          [
            "Lifestyle and nutritional guidance",
            "Improving fertility through diet, exercise and stress management",
          ],
          ["Medications and supplements", "Enhancing sperm quality for better conception chances"],
          [
            "Surgical sperm retrieval (TESA/PESA)",
            "Extracting sperm directly in cases of low sperm count or blockages",
          ],
          [
            "ICSI",
            "Best for severe male infertility, injecting a single healthy sperm directly into the egg",
          ],
          ["Donor sperm programmes", "Providing solutions when natural conception is not possible"],
        ]}
      />
    </ServicePage>
  );
}
