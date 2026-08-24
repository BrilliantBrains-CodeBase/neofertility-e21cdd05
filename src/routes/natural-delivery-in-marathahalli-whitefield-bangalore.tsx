import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { ServicePage, Prose, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, StepList, CheckList } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  medicalWebPageSchema,
  pageMeta,
  serviceSchema,
} from "@/lib/seo";

/* Passed to pageMeta without the trailing slash. pageMeta appends one itself, so handing
   it the ROUTES value (which already ends in "/") renders a canonical with a double
   slash — see the note in the handover. ROUTES.naturalDelivery stays the source of truth
   for every href; this constant only feeds the meta helpers. */
const PATH = ROUTES.naturalDelivery;
const SOURCE_PAGE = "natural-delivery";

const STEPS = [
  {
    title: "She listens before she plans",
    copy: "First, she understands you — your medical history, your health today, your worries, and the kind of birth you're hoping for. No plan is made until she knows the person it's for.",
  },
  {
    title: "She maps what your body needs",
    copy: "From there, a plan built around you, not a template — shaped by your risks, your baby's growth, and your daily life.",
  },
  {
    title: "She guides what you eat",
    copy: "She tells you exactly what your body needs to stay strong for labour — iron and protein, calcium, healthy fats, fibre — and how to keep blood sugar steady and weight gain gentle, so your baby stays a healthy size. Your supplements are prescribed for you, not off a list.",
  },
  {
    title: "She keeps your body ready",
    copy: "At the right stage, she guides safe movement — walking, prenatal yoga, squats and pelvic-floor work — and later, birthing-ball tilts, perineal massage and breathing practice. Everything cleared and paced by her, for your stage of pregnancy.",
  },
  {
    title: "She keeps you low-risk",
    copy: "Blood pressure, weight, blood sugar, your baby's growth and position — all watched closely, so small issues are caught and managed before they ever become a reason for surgery.",
  },
  {
    title: "She plans the birth with you",
    copy: "A birth plan in plain language: what to expect, the choices you have, and pain-relief options that still let you move.",
  },
  {
    title: "She's with you on the day",
    copy: "Freedom to stay upright and mobile, and calm, continuous support through labour — both shown to shorten labour and raise the chance of a natural birth. You won't be left flat on your back without a reason.",
  },
];

const FAQS = [
  {
    q: "How can I prepare for a natural delivery?",
    a: "Preparing for a natural delivery means staying active with walking, prenatal yoga and pelvic-floor exercises, eating an iron- and protein-rich diet, keeping blood sugar and weight steady, and choosing a doctor who supports vaginal birth. At Neo Fertility, Dr. Payal guides you through all of this from early pregnancy.",
  },
  {
    q: "Which foods help with normal delivery?",
    a: "Foods that support a normal delivery include iron and protein sources like lentils, eggs and greens, calcium from milk and ragi, omega-3 from fish and walnuts, and fibre-rich fruit, vegetables and millets. Steady blood sugar and gentle weight gain also help keep a natural birth safe and within reach.",
  },
  {
    q: "Which exercises are best for a normal delivery?",
    a: "Walking, prenatal yoga, squats, gentle lunges and pelvic-floor (Kegel) exercises are among the best for a normal delivery. Later in pregnancy, birthing-ball pelvic tilts and perineal massage help too. Always get your doctor's clearance first — Dr. Payal advises what's safe for your stage.",
  },
  {
    q: "Is normal delivery possible after IVF?",
    a: "Yes. An IVF pregnancy does not require a caesarean by default. The mode of delivery depends on your health, your baby's position and growth, and how the pregnancy progresses — not on how you conceived. At Neo Fertility, an IVF pregnancy is managed toward a safe, natural birth wherever possible.",
  },
  {
    q: "Can I have a normal delivery after a previous C-section?",
    a: "Often, yes. A vaginal birth after caesarean (VBAC) is safe for many women, depending on the earlier surgery and current pregnancy. Dr. Payal reviews your history and gives you an honest recommendation, rather than defaulting to a repeat C-section.",
  },
  {
    q: "Where can I get natural delivery care in Marathahalli or Whitefield?",
    a: "Neo Fertility Clinic in Marathahalli offers natural delivery care led by Dr. Payal Mahapatra, with 18 years in fertility and gynecology. Open all seven days, the clinic serves Marathahalli, Whitefield, Bellandur, Brookefield and nearby areas of East Bangalore.",
  },
];

export const Route = createFileRoute("/natural-delivery-in-marathahalli-whitefield-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Natural Delivery in Marathahalli, Whitefield | Neo Fertility",
      description:
        "Prepare for a safe, natural delivery in Marathahalli & Whitefield, Bangalore. Nutrition, movement and expert labour support with Dr. Payal Mahapatra at Neo Fertility.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "Natural Delivery in Marathahalli, Whitefield | Neo Fertility",
          description:
            "Prepare for a safe, natural delivery in Marathahalli & Whitefield, Bangalore. Nutrition, movement and expert labour support with Dr. Payal Mahapatra at Neo Fertility.",
          path: PATH,
          about: "Vaginal delivery",
        }),
      ),
      jsonLd(
        serviceSchema({
          name: "Natural Delivery",
          description:
            "Prepare for a safe, natural delivery in Marathahalli & Whitefield, Bangalore. Nutrition, movement and expert labour support with Dr. Payal Mahapatra at Neo Fertility.",
          path: PATH,
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Fertility Solutions", path: ROUTES.fertilitySolutions },
          { name: "Natural Delivery", path: PATH },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ServicePage
      eyebrow="Marathahalli · Whitefield · Bangalore"
      title="Natural Delivery Care, the Way It Should Be"
      intro="We help you stay strong, healthy and low-risk through pregnancy — so a natural birth stays within reach. And we keep a C-section for the moments it genuinely protects you and your baby, never as the default."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Fertility Solutions", to: ROUTES.fertilitySolutions },
        { name: "Natural Delivery" },
      ]}
      sourcePage={SOURCE_PAGE}
      whatsappMessage="Hi, I'd like to ask about natural delivery care."
      faqs={FAQS}
      related={[
        { label: "Pregnancy care", to: ROUTES.pregnancyCare },
        { label: "Preconception health check", to: ROUTES.preconception },
        { label: "Pelvic ultrasound scan", to: ROUTES.pelvicUltrasound },
        ...COMMON_RELATED,
      ]}
      closing={{
        heading: "Book your pregnancy consultation",
        copy: "We can't promise every birth will be natural. We can promise we will do everything safely within our power to help you get there.",
      }}
    >
      <Prose id="why" title="Why we protect natural birth">
        <p>
          Across Karnataka, roughly 1 in 3 births is now a caesarean — and the number climbs higher
          in private hospitals. The World Health Organization says only about 10 to 15% of births
          truly need one.
        </p>
        <p>
          A C-section is a gift when it saves a life. But it shouldn't be the first answer for a
          healthy pregnancy.
        </p>
        <p>
          At Neo Fertility, the goal is simple: <strong>the safest birth for you</strong> — natural
          whenever it's safe, surgical only when it's needed.
        </p>
      </Prose>

      <section id="every-step">
        <SectionHeading
          eyebrow="How it works"
          title="Every step, guided by Dr. Payal"
          copy="A natural birth isn't luck. It's a series of small, well-timed decisions — and Dr. Payal walks you through each one, from your first scan to the moment you hold your baby. One doctor, start to finish."
        />
        <StepList steps={STEPS} />
      </section>

      <section id="vbac">
        <SectionHeading
          eyebrow="After a caesarean"
          title="Had a C-section before? A natural birth may still be possible."
        />
        <div className="prose-measure mt-4 space-y-4 text-ink-muted">
          <p>
            For many women, a vaginal birth after a caesarean (VBAC) is a safe, realistic option.
            Dr. Payal will look at your history and tell you honestly whether it's right for you.
          </p>
        </div>
        <div className="mt-6">
          <AppointmentSheet sourcePage={`${SOURCE_PAGE}-vbac`}>
            <Button variant="cta" size="lg">
              <CalendarCheck /> Ask about VBAC
            </Button>
          </AppointmentSheet>
        </div>
      </section>

      <section id="promise">
        <SectionHeading eyebrow="Our commitment" title="A gentle, honest promise" />
        <div className="prose-measure mt-4 space-y-4 text-ink-muted">
          <p>
            We can't promise every birth will be natural — no one honestly can. Bodies and babies
            are their own.
          </p>
          <p>
            What we promise is this: we'll do everything safely within our power to help you birth
            naturally, and we'll only reach for surgery when it truly keeps you and your baby safe.
          </p>
        </div>
        <div className="mt-6">
          <CheckList
            items={[
              "One doctor from your first scan through to delivery",
              "A nutrition and movement plan built for your stage, not a handout",
              "Blood pressure, weight, blood sugar and your baby's growth watched closely",
              "Freedom to stay upright and mobile through labour",
              "A caesarean only when it genuinely protects you or your baby",
            ]}
          />
        </div>
      </section>
    </ServicePage>
  );
}
