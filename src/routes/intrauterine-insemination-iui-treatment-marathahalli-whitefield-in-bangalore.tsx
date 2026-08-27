import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, SafetyNote } from "@/components/sections/blocks";
import { ZigzagSteps } from "@/components/sections/ZigzagSteps";
import stepOvulation from "@/assets/iui-Ovulation.jpg";
import stepSperm from "@/assets/iui-Sperm_Prep.jpg";
import stepProcedure from "@/assets/iui-iui_procedure.jpg";
import stepCare from "@/assets/iui-post_procedure_care.jpg";
import stepTest from "@/assets/iui-Pregnancy_test.jpg";
import { ROUTES } from "@/data/navigation";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  medicalWebPageSchema,
  pageMeta,
  serviceSchema,
} from "@/lib/seo";

const PATH = ROUTES.iui;

const FAQS = [
  {
    q: "Is IUI painful?",
    a: "No. IUI is a painless procedure and does not require anesthesia. Some women may feel mild cramping, but it usually settles within a day or two.",
  },
  {
    q: "How long does the IUI process take?",
    a: "The insemination itself takes only a few minutes. The full cycle, including ovulation monitoring and a pregnancy test two weeks later, takes about three to four weeks.",
  },
  {
    q: "How many cycles of IUI should I try before moving to IVF?",
    a: "Most doctors recommend 3 to 6 cycles of IUI before considering IVF, depending on the cause of infertility.",
  },
  {
    q: "What is the success rate of IUI?",
    a: "IUI has a success rate of around 10 to 20 percent per cycle, compared with 40 to 60 percent for IVF. IUI is often the first step before IVF and works well for many couples.",
  },
  {
    q: "How should I prepare for an IUI procedure?",
    a: "Ovulation is tracked closely in the lead-up to the procedure, sometimes with medication to time it precisely. Bring your partner's semen sample or donor sperm as instructed by the clinic.",
  },
  {
    q: "What are the risks or side effects of IUI?",
    a: "IUI is a safe procedure with minimal risks. Some women experience mild cramping, spotting, or temporary bloating, but this usually resolves within a day or two.",
  },
  {
    q: "Can I resume normal activities after IUI?",
    a: "Yes. You can return to daily activities immediately after IUI, though it is recommended to avoid strenuous exercise for a day or two.",
  },
  {
    q: "Can IUI be combined with other treatments for better results?",
    a: "Yes. IUI is often paired with ovulation-inducing medications or hormone therapy to improve success rates.",
  },
];

export const Route = createFileRoute(
  "/intrauterine-insemination-iui-treatment-marathahalli-whitefield-in-bangalore",
)({
  head: () => ({
    ...pageMeta({
      title: "Intrauterine Insemination IUI - Marathahalli - Neo Fertility",
      description:
        "IUI in Marathahalli and Whitefield, Bengaluru: how it works, who it suits, success rates and how it compares with IVF.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "IUI Treatment in Marathahalli, Whitefield | Neo Fertility",
          description:
            "IUI in Marathahalli and Whitefield, Bengaluru: how it works, who it suits, success rates and how it compares with IVF.",
          path: PATH,
          about: "Intrauterine insemination",
        }),
      ),
      jsonLd(
        serviceSchema({
          name: "Intrauterine Insemination (IUI)",
          description:
            "IUI in Marathahalli and Whitefield, Bengaluru: how it works, who it suits, success rates and how it compares with IVF.",
          path: PATH,
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Fertility Solutions", path: ROUTES.fertilitySolutions },
          { name: "Intrauterine Insemination (IUI)", path: PATH },
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
      title="Intrauterine Insemination (IUI) Treatment"
      intro="IUI is a safe, effective, and less invasive fertility treatment designed to increase your chances of pregnancy. Specially prepared sperm is placed directly into the uterus during ovulation."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Fertility Solutions", to: ROUTES.fertilitySolutions },
        { name: "Intrauterine Insemination (IUI)" },
      ]}
      sourcePage="iui-treatment"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Ready to talk about IUI?",
        copy: "Book a consultation to find out whether IUI is the right first step for you, or whether another treatment fits your diagnosis better.",
      }}
    >
      <Prose title="Understanding IUI">
        <p>
          IUI is one of the most commonly recommended fertility treatments for couples trying to
          conceive naturally but facing challenges. It is a quick, minimally invasive procedure that
          enhances the chances of pregnancy. Specially prepared sperm is placed directly into the
          uterus during ovulation to improve the chances of fertilisation. The procedure is
          painless, takes just a few minutes, and improves the chances of conception for many
          couples.
        </p>
      </Prose>

      <section>
        <SectionHeading eyebrow="Who it suits" title="IUI is ideal for couples experiencing" />
        <div className="mt-6">
          <CheckList
            items={[
              "Unexplained infertility, where the cause is not clear",
              "Mild male infertility: low sperm count or slow-moving sperm",
              "Irregular ovulation, for women with PCOS or hormonal issues",
              "Cervical mucus issues, which IUI bypasses",
              "Same-sex couples or single women using donor sperm",
            ]}
          />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="How it works" title="The IUI process, step by step" />
        <ZigzagSteps
          steps={[
            {
              title: "Ovulation monitoring",
              copy: "Your cycle is tracked to pinpoint the best time for insemination. Medications may be used to stimulate ovulation.",
              image: stepOvulation,
              alt: "Woman recording ovulation test results at home",
            },
            {
              title: "Sperm preparation",
              copy: "The healthiest sperm are separated and concentrated in a lab to maximise the chances of fertilisation.",
              image: stepSperm,
              alt: "Laboratory illustration of sperm being prepared",
            },
            {
              title: "IUI procedure",
              copy: "The prepared sperm is inserted directly into the uterus using a thin catheter. This is a quick, painless process.",
              image: stepProcedure,
              alt: "Illustration of the insemination catheter procedure",
            },
            {
              title: "Post-procedure care",
              copy: "You may be advised to rest briefly after the procedure, but normal activities can resume the same day.",
              image: stepCare,
              alt: "Nurse holding a patient's hand during aftercare",
            },
            {
              title: "Pregnancy test",
              copy: "A follow-up pregnancy test is done after two weeks to check the success of the procedure.",
              image: stepTest,
              alt: "Hands holding a home pregnancy test",
            },
          ]}
        />
      </section>

      <Prose title="Is IUI right for you">
        <p>
          IUI is an excellent option for those who have mild male infertility issues such as low
          sperm motility or count, women with ovulation problems that make it harder for sperm to
          reach the egg, those using donor sperm, or couples with unexplained infertility where no
          obvious cause is found.
        </p>
        <p>
          IUI may not be suitable for those with severe male infertility, blocked fallopian tubes,
          or certain other conditions. These are assessed at your evaluation.
        </p>
      </Prose>

      <DataTable
        caption="IUI compared with IVF"
        head={["Treatment", "Best suited to", "Invasiveness", "Success rate"]}
        rows={[
          [
            "IUI",
            "Mild male infertility, unexplained infertility, ovulation issues, donor sperm",
            "Outpatient, no anaesthesia, 5 to 10 minutes",
            "10 to 20 percent per cycle",
          ],
          [
            "IVF",
            "Blocked tubes, severe infertility, repeated IUI failures",
            "Injections, sedated retrieval, transfer",
            "40 to 60 percent per cycle",
          ],
        ]}
      />

      <SafetyNote>
        IUI is often the first step before IVF and works well for many couples, particularly with
        mild male-factor or unexplained infertility. Most doctors recommend 3 to 6 cycles of IUI
        before considering IVF.
      </SafetyNote>
    </ServicePage>
  );
}
