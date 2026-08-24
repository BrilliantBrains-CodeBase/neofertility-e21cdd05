import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SafetyNote } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { breadcrumbSchema, faqSchema, jsonLd, medicalWebPageSchema, pageMeta } from "@/lib/seo";

const FAQS = [
  {
    q: "Why is speed of treatment for PID emphasised?",
    a: "Because pelvic inflammatory disease that is not treated promptly scars the fallopian tubes within weeks, and that scarring can be permanent and affect future fertility.",
  },
  {
    q: "What causes PID?",
    a: "Most commonly an untreated sexually transmitted infection that ascends from the cervix into the uterus and fallopian tubes. It can also follow a procedure that breaches the natural barrier of the cervix.",
  },
  {
    q: "What are the symptoms of PID?",
    a: "Pelvic pain, unusual discharge, pain during intercourse, fever, and pain on passing urine. Symptoms can be mild, which is part of why the condition is often diagnosed late.",
  },
  {
    q: "How is PID diagnosed?",
    a: "By clinical examination, pelvic ultrasound, and swabs or blood tests to identify the causative organism.",
  },
  {
    q: "Can PID affect fertility?",
    a: "Yes. Scarring of the fallopian tubes from PID is a recognised cause of tubal-factor infertility and ectopic pregnancy.",
  },
  {
    q: "Is PID treated with antibiotics alone?",
    a: "Most cases respond to a full antibiotic course. Where an abscess has formed or the infection is severe, hospital admission or drainage may be required.",
  },
];

export const Route = createFileRoute("/pelvic-inflammatory-disease-pids-treatment-in-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Pelvic Inflammatory Disease (PID) Treatment | Bangalore",
      description:
        "Prompt diagnosis and treatment of pelvic inflammatory disease in Bengaluru to prevent tubal damage and protect fertility.",
      path: ROUTES.pid,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "Pelvic Inflammatory Disease (PID) Treatment | Bangalore",
          description:
            "Prompt diagnosis and treatment of pelvic inflammatory disease in Bengaluru to prevent tubal damage and protect fertility.",
          path: ROUTES.pid,
          about: "Pelvic inflammatory disease",
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Gynecology Treatments", path: ROUTES.gynecologyTreatments },
          { name: "Pelvic Inflammatory Disease", path: ROUTES.pid },
        ]),
      ),
    ],
  }),
  component: PidPage,
});

function PidPage() {
  return (
    <ServicePage
      eyebrow="Infections & Special Treatments"
      title="Pelvic Inflammatory Disease (PID) Treatment"
      intro="Pelvic inflammatory disease is treated as urgent, because the speed of treatment directly determines whether fertility is preserved."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Gynecology Treatments", to: ROUTES.gynecologyTreatments },
        { name: "Pelvic Inflammatory Disease" },
      ]}
      sourcePage="pid"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Do not wait on pelvic pain with discharge",
        copy: "Book a same-week consultation if you have pelvic pain with discharge, so treatment can start before any tubal damage occurs.",
      }}
    >
      <Prose title="Who this is for">
        <p>
          Women with pelvic pain, unusual discharge, fever or pain during intercourse, particularly
          following an untreated infection or a recent gynaecological procedure.
        </p>
      </Prose>

      <SafetyNote>
        Pelvic pain with discharge should be seen the same week. Untreated pelvic infection scars
        the fallopian tubes within weeks, and that damage can be permanent.
      </SafetyNote>

      <Prose title="Symptoms">
        <ul className="list-disc space-y-2 pl-5">
          <li>Pelvic or lower abdominal pain</li>
          <li>Unusual or increased vaginal discharge</li>
          <li>Pain during intercourse</li>
          <li>Fever</li>
          <li>Pain or burning on passing urine</li>
        </ul>
      </Prose>

      <Prose title="Causes">
        <p>
          Most commonly an ascending sexually transmitted infection reaching the uterus and
          fallopian tubes. Less commonly, infection following a procedure that breaches the cervical
          barrier.
        </p>
      </Prose>

      <Prose title="Evaluation">
        <p>
          Clinical examination, pelvic ultrasound to check for tubal or ovarian involvement or
          abscess formation, and swabs or blood tests to identify the causative organism.
        </p>
      </Prose>

      <Prose title="Treatment">
        <DataTable
          caption="Treatment by severity"
          head={["Presentation", "Management"]}
          rows={[
            ["Mild to moderate", "Full oral antibiotic course, with review to confirm resolution"],
            ["Moderate with poor response", "Injectable antibiotics, closer monitoring"],
            [
              "Severe or abscess present",
              "Hospital admission, intravenous antibiotics, drainage if required",
            ],
          ]}
        />
        <p>
          After treatment, review assesses whether any tubal damage has occurred, which matters
          directly for future fertility.
        </p>
      </Prose>
    </ServicePage>
  );
}
