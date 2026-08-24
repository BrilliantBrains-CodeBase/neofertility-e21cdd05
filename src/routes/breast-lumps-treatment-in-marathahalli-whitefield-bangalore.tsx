import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SafetyNote, StepList } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { breadcrumbSchema, faqSchema, jsonLd, medicalWebPageSchema, pageMeta } from "@/lib/seo";

const FAQS = [
  {
    q: "Should every breast lump be checked, even if it doesn't hurt?",
    a: "Yes. Any new lump should be assessed, regardless of whether it hurts. Pain is not a reliable indicator of whether a lump needs attention.",
  },
  {
    q: "What is a triple assessment?",
    a: "It is the combination of clinical examination, imaging (ultrasound or mammography) and, where indicated, a biopsy, used together to reach an accurate diagnosis of a breast lump.",
  },
  {
    q: "Does a breast lump mean cancer?",
    a: "No. Most breast lumps, particularly in younger women, are benign, such as cysts or fibroadenomas. Assessment is what establishes this rather than assumption.",
  },
  {
    q: "What happens if malignancy is suspected or confirmed?",
    a: "You are referred to breast surgical oncology for further management, with your assessment findings provided to support continuity of care.",
  },
  {
    q: "Is nipple discharge always assessed alongside a lump?",
    a: "Nipple discharge is assessed on its own merits, whether or not a lump is also present, since the two can occur independently.",
  },
  {
    q: "How soon should a new lump be seen?",
    a: "As soon as reasonably possible. It does not need to be painful or increasing in size to warrant assessment.",
  },
];

export const Route = createFileRoute(
  "/breast-lumps-treatment-in-marathahalli-whitefield-bangalore",
)({
  head: () => ({
    ...pageMeta({
      title: "Breast Lump Assessment & Treatment | Marathahalli, Whitefield",
      description:
        "Examination, triple assessment and treatment of breast lumps in Marathahalli and Whitefield, Bengaluru, with referral pathways where needed.",
      path: ROUTES.breastLumps,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "Breast Lump Assessment & Treatment | Marathahalli, Whitefield",
          description:
            "Examination, triple assessment and treatment of breast lumps in Marathahalli and Whitefield, Bengaluru, with referral pathways where needed.",
          path: ROUTES.breastLumps,
          about: "Breast lumps",
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Gynecology Treatments", path: ROUTES.gynecologyTreatments },
          { name: "Breast Lumps", path: ROUTES.breastLumps },
        ]),
      ),
    ],
  }),
  component: BreastLumpsPage,
});

function BreastLumpsPage() {
  return (
    <ServicePage
      eyebrow="Infections & Special Treatments"
      title="Breast Lumps: Assessment & Treatment"
      intro="Any new breast lump is examined and assessed through triple assessment: clinical examination, imaging, and biopsy where indicated, with referral to breast surgical oncology where malignancy is confirmed or suspected."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Gynecology Treatments", to: ROUTES.gynecologyTreatments },
        { name: "Breast Lumps" },
      ]}
      sourcePage="breastLumps"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Get a new lump assessed",
        copy: "Book a consultation for examination of a breast lump or nipple discharge.",
      }}
    >
      <Prose title="Who this is for">
        <p>
          Anyone who has found a new breast lump, a change in breast texture, or nipple discharge,
          regardless of whether it is painful.
        </p>
      </Prose>

      <SafetyNote>
        Any new breast lump should be assessed promptly, regardless of whether it hurts.
      </SafetyNote>

      <Prose title="Symptoms assessed">
        <ul className="list-disc space-y-2 pl-5">
          <li>A new or changing lump in the breast or underarm</li>
          <li>Change in breast size, shape or skin texture</li>
          <li>Nipple discharge</li>
          <li>Localised pain or tenderness</li>
        </ul>
      </Prose>

      <Prose title="Evaluation: triple assessment">
        <StepList
          steps={[
            {
              title: "Clinical examination",
              copy: "Physical examination of both breasts and the axillary regions.",
            },
            {
              title: "Imaging",
              copy: "Ultrasound or mammography, chosen based on age and findings.",
            },
            {
              title: "Biopsy where indicated",
              copy: "A tissue sample is taken if imaging findings are indeterminate or suspicious.",
            },
          ]}
        />
      </Prose>

      <Prose title="Treatment and next steps">
        <DataTable
          caption="Typical pathways after assessment"
          head={["Finding", "Next step"]}
          rows={[
            ["Simple cyst", "Observation, or aspiration if symptomatic"],
            ["Fibroadenoma", "Observation with follow-up scan, or removal if large or changing"],
            [
              "Malignancy confirmed or suspected",
              "Referral to breast surgical oncology with assessment findings",
            ],
          ]}
        />
      </Prose>
    </ServicePage>
  );
}
