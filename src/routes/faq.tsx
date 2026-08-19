import { createFileRoute } from "@tanstack/react-router";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import { PageHero, SectionHeading } from "@/components/sections/blocks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

type Faq = { q: string; a: string };
type Category = { heading: string; items: Faq[] };

const CATEGORIES: Category[] = [
  {
    heading: "Fertility treatment",
    items: [
      {
        q: "When should we see a fertility specialist?",
        a: "After 12 months of trying to conceive if you are under 35, or after 6 months if you are 35 or older. Sooner if you have known risk factors such as irregular periods, prior pelvic surgery, or a partner with known sperm concerns.",
      },
      {
        q: "What does an initial fertility evaluation involve?",
        a: "A detailed history for both partners, a pelvic ultrasound and hormone profile for the woman, and a semen analysis for the man. Most of this can be completed within one to two menstrual cycles.",
      },
      {
        q: "What is the difference between IUI and IVF?",
        a: "IUI places prepared sperm directly into the uterus around the time of ovulation and is used for milder fertility problems. IVF fertilises eggs and sperm outside the body and is used for more significant tubal, sperm, or age-related factors, or after IUI has not worked.",
      },
      {
        q: "Does age really affect IVF success rates?",
        a: "Yes, primarily through egg quantity and quality, which decline through the thirties and more sharply after 40. Success rates and the number of cycles likely to be needed are discussed openly based on your specific ovarian reserve testing.",
      },
      {
        q: "Can male infertility be treated?",
        a: "Many causes are treatable, including hormonal deficiencies, varicocele and infections. Where sperm counts cannot be improved, ICSI allows fertilisation with a single sperm, and surgical sperm retrieval is an option when none appears in the ejaculate.",
      },
    ],
  },
  {
    heading: "Gynecology",
    items: [
      {
        q: "How much menstrual pain is normal?",
        a: "Mild cramping in the first day or two of a period is common. Pain that is not controlled by ordinary painkillers, or that has worsened over time, is not something to accept as normal and should be evaluated.",
      },
      {
        q: "What causes irregular periods?",
        a: "Common causes include PCOS or PCOD, thyroid dysfunction, raised prolactin, significant weight change, and perimenopause. A pelvic ultrasound and basic hormone panel usually identify the cause.",
      },
      {
        q: "Is vaginal discharge always a sign of infection?",
        a: "No. Some discharge is a normal part of the menstrual cycle. Discharge that is unusually heavy, discoloured, foul-smelling, or accompanied by itching or pain is worth assessing.",
      },
      {
        q: "When should a breast lump be checked?",
        a: "Any new lump, whatever your age, should be assessed. Most lumps are benign, but timely evaluation with examination and imaging gives a clear answer rather than ongoing uncertainty.",
      },
    ],
  },
  {
    heading: "Costs",
    items: [
      {
        q: "How much does IVF cost in Bangalore?",
        a: "Cost depends on the protocol used, medication dose, and whether additional procedures such as ICSI or genetic testing are needed. An individualised estimate is given after your evaluation; see our detailed IVF cost guide for a full breakdown.",
      },
      {
        q: "Are consultations charged separately from tests?",
        a: "Yes. Consultation fees and diagnostic test costs are itemised separately, and nothing is billed without being discussed with you first.",
      },
      {
        q: "Does insurance cover fertility treatment in India?",
        a: "Coverage varies widely by insurer and policy. It is worth checking your specific policy terms; the clinic can provide documentation needed for reimbursement claims where treatment is covered.",
      },
    ],
  },
  {
    heading: "Appointments",
    items: [
      {
        q: "How do I book a consultation?",
        a: "You can book online through the appointment form on this website, call the clinic directly, or message on WhatsApp. Same-week appointments are usually available.",
      },
      {
        q: "What should I bring to my first appointment?",
        a: "Any previous test reports, scan images, prescriptions, and a note of your menstrual cycle dates if relevant. If you have had prior fertility treatment elsewhere, bring those records too.",
      },
      {
        q: "Can my partner attend with me?",
        a: "Yes, and for fertility consultations it is generally recommended, since evaluation and treatment planning usually involve both partners.",
      },
    ],
  },
];

const ALL_FAQS: Faq[] = CATEGORIES.flatMap((category) => category.items);

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...pageMeta({
      title: "Frequently Asked Questions | Neo Fertility Clinic, Bangalore",
      description:
        "Answers to common questions on fertility treatment, gynecology, costs and appointments at Neo Fertility Clinic, Marathahalli and Whitefield, Bangalore.",
      path: ROUTES.faq,
    }),
    scripts: [
      jsonLd(faqSchema(ALL_FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "FAQ", path: ROUTES.faq },
        ]),
      ),
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        intro="Answers to the questions we hear most often about fertility treatment, gynecology, costs and appointments. If your question isn't answered here, ask us directly at consultation."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "FAQ" }]}
      />

      <section className="bg-pink-25 section-y">
        <div className="container-page space-y-14">
          {CATEGORIES.map((category) => (
            <div key={category.heading}>
              <SectionHeading eyebrow="Category" title={category.heading} />
              {/* One answer stays open per category — see FaqBlock for why this is
                  not `collapsible`. */}
              <Accordion
                type="single"
                defaultValue={`${category.heading}-0`}
                className="mt-6 max-w-[68ch]"
              >
                {category.items.map((item, index) => (
                  <AccordionItem
                    key={item.q}
                    value={`${category.heading}-${index}`}
                    className="border-line"
                  >
                    <AccordionTrigger className="text-left text-[1.0625rem] font-medium text-plum-900 hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[1rem] text-ink-muted">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <ClosingCta
        heading="Still have a question?"
        copy="Book a consultation with Dr. Payal Mahapatra and get a direct answer specific to your situation."
        sourcePage="faq_closing"
        whatsappMessage="Hi, I have a question before booking an appointment."
      />
    </>
  );
}
