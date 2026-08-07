import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { BookingRail } from "@/components/conversion/BookingRail";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import { PageHero, FaqBlock, RelatedLinks, SectionHeading } from "@/components/sections/blocks";
import { Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { CLINIC, DEFAULT_WHATSAPP_MESSAGE, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.ivfCost;
const SOURCE_PAGE = "ivf-cost-in-bangalore";

const FAQS = [
  {
    q: "How much does IVF cost in Bangalore in 2026?",
    a: "At Neo Fertility Clinic a standard IVF cycle is between one lakh and two lakh rupees, with consultation and tests at three to five thousand. ICSI adds thirty to fifty thousand. Medication is the largest variable and depends on ovarian reserve.",
  },
  {
    q: "Why do IVF costs vary so much between clinics?",
    a: "Mostly medication, which is the largest single line item and varies with ovarian reserve, and what is bundled into the quoted figure. A low headline price frequently excludes medication, freezing and storage. Compare written estimates that itemise medication separately.",
  },
  {
    q: "Is IVF covered by insurance in India?",
    a: "Most policies have historically excluded infertility treatment, though some newer products offer limited cover. Check your specific policy wording, and check separately whether associated procedures such as hysteroscopy or laparoscopy are covered, because they often are even where IVF is not.",
  },
  {
    q: "Are EMI options available for IVF treatment?",
    a: "Yes. Ask for the total repayable amount including interest rather than the monthly instalment alone, so you can compare it against paying directly.",
  },
  {
    q: "What does IUI cost compared with IVF?",
    a: "IUI is a fraction of the cost of an IVF cycle, because there is no egg retrieval, no laboratory fertilisation and far less medication. Since most couples are advised to plan three to four IUI cycles, ask for the cost of a full three-cycle plan rather than a single procedure.",
  },
];

export const Route = createFileRoute("/ivf-cost-in-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "IVF Cost in Bangalore 2026 | Transparent Pricing | Neo Fertility",
      description:
        "IVF, ICSI, sperm retrieval and frozen embryo transfer costs at Neo Fertility Clinic, Marathahalli, Bangalore. What is included, what varies, and EMI options.",
      path: PATH,
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "IVF Cost in Bangalore", path: PATH },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Cost and financing"
        title="IVF Cost in Bangalore: What You Will Actually Pay"
        intro="At Neo Fertility Clinic in Marathahalli, Bangalore, a standard IVF cycle costs between one lakh and two lakh rupees. Initial consultation and tests are three to five thousand rupees. ICSI adds thirty to fifty thousand, surgical sperm retrieval twenty to forty thousand, and a frozen embryo transfer fifty to eighty thousand. Medication is the largest variable and depends on ovarian reserve. EMI options are available."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "IVF Cost in Bangalore" }]}
      >
        <div className="flex flex-wrap gap-3">
          <AppointmentSheet sourcePage={SOURCE_PAGE}>
            <Button variant="cta" size="lg">
              <CalendarCheck /> Book a consultation
            </Button>
          </AppointmentSheet>
          <Button variant="outlineTeal" size="lg" asChild>
            <a href={CLINIC.phoneHref} onClick={() => track("call_click", { source_page: SOURCE_PAGE })}>
              <Phone /> Call {CLINIC.phoneDisplay}
            </a>
          </Button>
        </div>
      </PageHero>

      <div className="container-page flex gap-14 py-14 lg:py-16">
        <div className="min-w-0 flex-1 space-y-12">
          <section>
            <SectionHeading eyebrow="Pricing" title="Published price ranges" />
            <div className="mt-6">
              <DataTable
                head={["Item", "Range", "What drives the variation"]}
                rows={[
                  ["Initial consultation and tests", "₹3,000 to ₹5,000", "Which tests are indicated by your history"],
                  ["IVF cycle", "₹1,00,000 to ₹2,00,000", "Medication dose, which depends on ovarian reserve"],
                  ["ICSI added to IVF", "₹30,000 to ₹50,000", "Fixed laboratory procedure"],
                  ["Full IVF with ICSI", "₹1,80,000 to ₹2,50,000", "As above, combined"],
                  ["Surgical sperm retrieval, TESA or PESA", "₹20,000 to ₹40,000", "Which procedure is required"],
                  ["Frozen embryo transfer", "₹50,000 to ₹80,000", "Lining preparation protocol"],
                  ["Preimplantation genetic testing", "₹1,00,000 and above", "Number of embryos tested"],
                ]}
              />
            </div>
          </section>

          <Prose title="Why the range is wide, explained honestly">
            <p>
              Medication is the reason. A woman with a good ovarian reserve may need a fraction of the injectable dose
              that a woman with a diminished reserve requires, and injectable gonadotropins are the single largest line
              item in an IVF cycle. That is why no clinic can quote one figure honestly before an AMH result and an
              antral follicle count.
            </p>
            <p>
              What you should expect is a written estimate at your first consultation, after those two results, with
              the medication component identified separately. Ask for it. Any clinic that will not provide one is
              telling you something.
            </p>
          </Prose>

          <Prose title="What is not included">
            <ul className="list-disc space-y-2 pl-5">
              <li>Medication, in some quoted packages. Confirm whether your estimate includes it, because it is the largest variable</li>
              <li>Preimplantation genetic testing, which is optional and priced separately</li>
              <li>Freezing and annual storage of surplus embryos</li>
              <li>Surgical sperm retrieval, where required</li>
              <li>Treatment of a condition found before the cycle, such as hysteroscopic removal of a polyp</li>
            </ul>
          </Prose>

          <Prose title="Insurance and financing">
            <p>
              Most Indian health insurance policies have historically excluded infertility treatment, though some
              products now offer limited cover and IRDAI has moved toward broader inclusion. Check your specific
              policy wording rather than assuming either way, and check whether associated procedures such as
              hysteroscopy or laparoscopy are covered even where IVF is not, because they frequently are.
            </p>
            <p>
              EMI and financing options are available at the clinic. Ask for the total cost including interest rather
              than the monthly figure alone.
            </p>
          </Prose>
        </div>
        <BookingRail sourcePage={SOURCE_PAGE} whatsappMessage={DEFAULT_WHATSAPP_MESSAGE} />
      </div>

      <FaqBlock items={FAQS} />
      <RelatedLinks
        links={[
          { label: "IVF treatment", to: ROUTES.ivf },
          { label: "ICSI treatment", to: ROUTES.icsi },
          { label: "IUI treatment", to: ROUTES.iui },
          { label: "Fertility assessment", to: ROUTES.fertilityAssessment },
          ...COMMON_RELATED.filter((l) => l.to !== ROUTES.ivfCost),
        ]}
      />
      <ClosingCta
        heading="Get a written estimate at your first consultation"
        copy="Once your AMH and antral follicle count are known, you leave with an itemised estimate, not a guess."
        sourcePage={SOURCE_PAGE}
        whatsappMessage={DEFAULT_WHATSAPP_MESSAGE}
      />
    </>
  );
}
