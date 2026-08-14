import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SafetyNote } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const FAQS = [
  {
    q: "Is STI testing confidential?",
    a: "Yes. Sexually transmitted infection testing and treatment is offered confidentially, and results are discussed only with you.",
  },
  {
    q: "What symptoms suggest an STI?",
    a: "Unusual discharge, genital itching or sores, pain on passing urine, pain during intercourse, or pelvic pain. Some infections cause no symptoms at all, which is why testing matters even without symptoms.",
  },
  {
    q: "Should my partner be tested too?",
    a: "Yes. Partner testing and, where an infection is confirmed, partner treatment is necessary to avoid reinfection.",
  },
  {
    q: "Can an untreated STI affect fertility?",
    a: "Yes. Some infections, if untreated, ascend to the uterus and fallopian tubes and cause pelvic inflammatory disease, which can permanently damage fertility.",
  },
  {
    q: "How is an STI diagnosed?",
    a: "By clinical examination together with swabs, urine testing or blood tests, depending on the infection suspected.",
  },
  {
    q: "Are STIs curable?",
    a: "Many bacterial and parasitic STIs are fully curable with the correct antibiotic course. Viral infections are managed rather than cured, and treatment reduces symptoms and transmission risk.",
  },
];

export const Route = createFileRoute("/sexually-transmitted-infections-stis-treatment-in-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "STI Testing & Treatment in Bangalore | Confidential Care",
      description:
        "Confidential testing and treatment for sexually transmitted infections in Bengaluru with Dr. Payal Mahapatra at Neo Fertility Clinic.",
      path: "/sexually-transmitted-infections-stis-treatment-in-bangalore",
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Gynecology Treatments", path: ROUTES.gynecologyTreatments },
          { name: "STI Testing & Treatment", path: "/sexually-transmitted-infections-stis-treatment-in-bangalore" },
        ]),
      ),
    ],
  }),
  component: StiPage,
});

function StiPage() {
  return (
    <ServicePage
      eyebrow="Infections & Special Treatments"
      title="Sexually Transmitted Infections (STIs): Testing & Treatment"
      intro="Confidential diagnosis and treatment for sexually transmitted infections, with partner testing and treatment where an infection is confirmed."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Gynecology Treatments", to: ROUTES.gynecologyTreatments },
        { name: "STI Testing & Treatment" },
      ]}
      sourcePage="sti"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Get tested confidentially",
        copy: "Book a consultation to discuss symptoms or arrange STI testing in confidence.",
      }}
    >
      <Prose title="Who this is for">
        <p>
          Anyone with symptoms suggestive of a sexually transmitted infection, anyone whose
          partner has been diagnosed with one, or anyone who wants a routine screen. Testing is
          offered confidentially.
        </p>
      </Prose>

      <Prose title="Symptoms">
        <ul className="list-disc space-y-2 pl-5">
          <li>Unusual vaginal discharge, odour or colour change</li>
          <li>Genital itching, sores or ulcers</li>
          <li>Pain or burning on passing urine</li>
          <li>Pain during intercourse</li>
          <li>Pelvic pain, with or without discharge</li>
          <li>No symptoms at all, as several STIs are commonly silent</li>
        </ul>
        <SafetyNote>
          Pelvic pain with discharge should be seen the same week. Untreated pelvic infection can
          scar the fallopian tubes within weeks.
        </SafetyNote>
      </Prose>

      <Prose title="Evaluation">
        <p>
          Diagnosis combines clinical examination with swabs, urine testing or blood tests as
          appropriate to the infection suspected. Where relevant, both partners are tested.
        </p>
      </Prose>

      <Prose title="Treatment">
        <DataTable
          caption="Treatment approach by infection type"
          head={["Infection type", "Approach"]}
          rows={[
            ["Bacterial (e.g. chlamydia, gonorrhoea)", "A full antibiotic course for both partners"],
            ["Parasitic (e.g. trichomoniasis)", "Antiparasitic medication for both partners"],
            ["Viral (e.g. herpes, HPV)", "Symptom management, suppressive therapy where indicated, and monitoring"],
          ]}
        />
        <p>
          Follow-up confirms the infection has cleared and screens for any complication such as
          pelvic inflammatory disease.
        </p>
      </Prose>
    </ServicePage>
  );
}
