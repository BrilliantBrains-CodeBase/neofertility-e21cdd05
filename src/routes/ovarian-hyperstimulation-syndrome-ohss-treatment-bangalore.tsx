import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SectionHeading, CheckList, SafetyNote } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.ohss;

const FAQS = [
  { q: "What is Ovarian Hyperstimulation Syndrome?", a: "OHSS is an uncommon reaction to the hormone injections used to stimulate the ovaries during IVF or IUI, where the ovaries over-respond and become swollen and fluid can shift into the abdomen. Most cases are mild and settle on their own." },
  { q: "Is OHSS common?", a: "No. It is described across fertility treatment as a rare but treatable side effect of hormone medications. Mild bloating and discomfort during stimulation are common and are not the same as OHSS." },
  { q: "How is OHSS treated?", a: "Mild cases are managed with rest, fluids and monitoring. Moderate cases may need closer monitoring and medication adjustment. Severe cases, which are rare, need hospital-based management including fluid drainage." },
  { q: "Can OHSS be prevented?", a: "Risk is reduced by tailoring the medication dose to ovarian reserve and antral follicle count, monitoring closely with scans and blood tests during stimulation, and adjusting or cancelling a cycle where the response is excessive." },
  { q: "Who is at higher risk of OHSS?", a: "Women with PCOS, a high antral follicle count, or a strong response to previous stimulation are at higher risk. This is discussed and planned for before your cycle starts." },
];

export const Route = createFileRoute("/ovarian-hyperstimulation-syndrome-ohss-treatment-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "OHSS Treatment in Bangalore | Neo Fertility Clinic",
      description:
        "Ovarian Hyperstimulation Syndrome monitoring and treatment during IVF and IUI cycles in Marathahalli, Bangalore, with Dr. Payal Mahapatra.",
      path: PATH,
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "OHSS Treatment", path: PATH },
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
      title="Ovarian Hyperstimulation Syndrome (OHSS) Monitoring and Treatment"
      intro="OHSS is a rare but treatable reaction to fertility medication, where the ovaries over-respond to stimulation. Close monitoring during your cycle is designed to catch it early and manage it safely."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Fertility Solutions", to: ROUTES.fertilitySolutions },
        { name: "OHSS Treatment" },
      ]}
      sourcePage="ohss-treatment"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Stimulation with close monitoring, not a fixed dose",
        copy: "Your medication dose and response are tracked through the cycle so that risk of OHSS is managed rather than ignored.",
      }}
    >
      <Prose title="What OHSS is">
        <p>
          Ovarian Hyperstimulation Syndrome is a reaction to the hormone injections used to stimulate the ovaries
          during IVF or IUI. In most people, stimulation causes mild bloating and cramping as the ovaries produce
          several follicles. In OHSS, the ovaries over-respond, become enlarged, and fluid can shift out of the
          bloodstream into the abdomen. It is described as a rare but treatable side effect of hormone medications
          across fertility treatment.
        </p>
      </Prose>

      <SafetyNote>
        Seek urgent medical attention if you experience rapid weight gain, severe abdominal pain or bloating,
        persistent vomiting, shortness of breath, a significantly reduced urine output, or dizziness during or after
        a stimulated cycle. Call the clinic or go to the nearest emergency department without waiting for your next
        scheduled appointment.
      </SafetyNote>

      <section>
        <SectionHeading eyebrow="Risk factors" title="Who is more likely to develop OHSS" />
        <div className="mt-6">
          <CheckList
            items={[
              "PCOS or a high antral follicle count",
              "A strong response to hormone medication in a previous cycle",
              "Younger age with a high ovarian reserve",
              "A large number of follicles developing during stimulation",
            ]}
          />
        </div>
      </section>

      <Prose title="How risk is managed">
        <p>
          Medication dose is set from your AMH result and antral follicle count rather than a standard protocol.
          Through stimulation, follicle growth and hormone levels are tracked by ultrasound and blood tests every
          two to three days, and the dose or protocol is adjusted, or the cycle paused, if the response is running
          ahead of what is safe.
        </p>
      </Prose>

      <DataTable
        caption="How OHSS is graded and managed"
        head={["Severity", "Typical management"]}
        rows={[
          ["Mild", "Rest, fluids and monitoring at home, with a follow-up scan"],
          ["Moderate", "Closer monitoring, medication review, and sometimes a delay to embryo transfer"],
          ["Severe (rare)", "Hospital-based management, which may include fluid drainage and monitoring of blood counts and kidney function"],
        ]}
      />
    </ServicePage>
  );
}
