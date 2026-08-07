import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SafetyNote } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const FAQS = [
  {
    q: "Is vaginal discharge always a sign of infection?",
    a: "No. Some discharge is normal and varies through the menstrual cycle. A change in colour, odour, texture or amount, or accompanying itching or discomfort, is what points to infection.",
  },
  {
    q: "What causes vaginal itching, discharge or odour?",
    a: "The common causes are bacterial vaginosis, yeast infection (candidiasis) and trichomoniasis. Each has a different treatment, so identifying which one is present matters.",
  },
  {
    q: "When should new discharge be seen rather than self-treated?",
    a: "If it is a new symptom, or if an over-the-counter treatment has already been tried once without success.",
  },
  {
    q: "Can vaginal infections be sexually transmitted?",
    a: "Trichomoniasis is sexually transmitted. Bacterial vaginosis and yeast infections are not classed as STIs but can still be influenced by sexual activity.",
  },
  {
    q: "How is the cause of discharge diagnosed?",
    a: "By clinical examination and a vaginal swab, which identifies the organism responsible and allows the correct treatment to be chosen.",
  },
  {
    q: "Will treatment clear the odour completely?",
    a: "Treating the underlying infection resolves the odour in almost all cases. Persistent odour after a full treatment course should be reassessed.",
  },
];

export const Route = createFileRoute("/vaginal-discharge-infection-treatment-in-marathahalli-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Vaginal Discharge & Infection Treatment | Marathahalli",
      description:
        "Diagnosis and treatment of vaginal discharge, itching and odour, including bacterial vaginosis, yeast infection and trichomoniasis, in Marathahalli, Bengaluru.",
      path: "/vaginal-discharge-infection-treatment-in-marathahalli-bangalore",
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Gynecology Treatments", path: ROUTES.gynecologyTreatments },
          { name: "Vaginal Discharge & Infection", path: "/vaginal-discharge-infection-treatment-in-marathahalli-bangalore" },
        ]),
      ),
    ],
  }),
  component: VaginalInfectionPage,
});

function VaginalInfectionPage() {
  return (
    <ServicePage
      eyebrow="Infections & Special Treatments"
      title="Vaginal Discharge, Itching & Infection Treatment"
      intro="Vaginal discharge, itching and odour are assessed to identify the specific cause among bacterial vaginosis, yeast infection or trichomoniasis, and treated accordingly."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Gynecology Treatments", to: ROUTES.gynecologyTreatments },
        { name: "Vaginal Discharge & Infection" },
      ]}
      sourcePage="vaginalInfection"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Get discharge or odour assessed",
        copy: "Book a consultation to identify the cause and start the correct treatment.",
      }}
    >
      <Prose title="Who this is for">
        <p>
          Anyone with new vaginal discharge, itching or odour, or discharge that has not resolved
          with an over-the-counter treatment already tried once.
        </p>
      </Prose>

      <Prose title="Symptoms">
        <ul className="list-disc space-y-2 pl-5">
          <li>Change in discharge colour, texture or amount</li>
          <li>Vaginal itching or irritation</li>
          <li>Unusual odour</li>
          <li>Discomfort during intercourse or urination</li>
        </ul>
        <SafetyNote>
          If discharge is accompanied by pelvic pain, be seen the same week — untreated pelvic
          infection can scar the fallopian tubes within weeks.
        </SafetyNote>
      </Prose>

      <Prose title="Common causes">
        <DataTable
          caption="Typical presentation by cause"
          head={["Cause", "Typical presentation"]}
          rows={[
            ["Bacterial vaginosis", "Thin, greyish discharge with a fishy odour, often without significant itching"],
            ["Yeast infection (candidiasis)", "Thick, white discharge with marked itching and irritation"],
            ["Trichomoniasis", "Frothy, yellow-green discharge, odour, and discomfort; sexually transmitted"],
          ]}
        />
      </Prose>

      <Prose title="Evaluation">
        <p>
          Clinical examination and a vaginal swab identify the specific organism. Where a sexually
          transmitted cause is confirmed or suspected, partner testing is advised.
        </p>
      </Prose>

      <Prose title="Treatment">
        <p>
          Bacterial vaginosis and trichomoniasis are treated with a course of antibiotics; yeast
          infections with antifungal medication, oral or topical. Treatment is matched to the
          confirmed cause rather than given generically, since the wrong treatment will not clear
          the underlying infection.
        </p>
      </Prose>
    </ServicePage>
  );
}
