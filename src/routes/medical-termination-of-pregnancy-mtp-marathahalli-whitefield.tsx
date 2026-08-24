import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, Prose, DataTable, COMMON_RELATED } from "@/components/sections/ServicePage";
import { SafetyNote } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  medicalWebPageSchema,
  pageMeta,
  serviceSchema,
} from "@/lib/seo";

const FAQS = [
  {
    q: "Is medical termination of pregnancy legal in India?",
    a: "Yes, under the Medical Termination of Pregnancy (MTP) Act, within defined gestational limits and conditions set out in the law.",
  },
  {
    q: "Up to what stage of pregnancy is termination permitted?",
    a: "The MTP Act sets specific gestational limits, and eligibility beyond the standard limit requires meeting additional conditions defined in the Act. This is discussed individually at consultation.",
  },
  {
    q: "Is the consultation confidential?",
    a: "Yes. Consultations for medical termination of pregnancy are confidential.",
  },
  {
    q: "Is sex determination during pregnancy legal?",
    a: "No. Sex determination is illegal in India under the PCPNDT Act, and this clinic does not disclose or determine the sex of a foetus under any circumstance.",
  },
  {
    q: "What is the difference between medical and surgical termination?",
    a: "Medical termination uses medication to end the pregnancy and is suitable within an early gestational window. Surgical termination is a procedure and is used where medical termination is not suitable or has not been effective.",
  },
  {
    q: "What follow-up is needed after termination?",
    a: "A follow-up visit confirms the termination is complete and addresses contraception going forward, if wanted.",
  },
];

export const Route = createFileRoute(
  "/medical-termination-of-pregnancy-mtp-marathahalli-whitefield",
)({
  head: () => ({
    ...pageMeta({
      title: "Medical Termination of Pregnancy (MTP) | Marathahalli",
      description:
        "Confidential medical termination of pregnancy under the MTP Act, in Marathahalli and Whitefield, Bengaluru, with Dr. Payal Mahapatra.",
      path: ROUTES.mtp,
    }),
    scripts: [
      jsonLd(
        medicalWebPageSchema({
          title: "Medical Termination of Pregnancy (MTP) | Marathahalli",
          description:
            "Confidential medical termination of pregnancy under the MTP Act, in Marathahalli and Whitefield, Bengaluru, with Dr. Payal Mahapatra.",
          path: ROUTES.mtp,
          about: "Medical termination of pregnancy",
        }),
      ),
      jsonLd(
        serviceSchema({
          name: "Medical Termination of Pregnancy (MTP)",
          description:
            "Confidential medical termination of pregnancy under the MTP Act, in Marathahalli and Whitefield, Bengaluru, with Dr. Payal Mahapatra.",
          path: ROUTES.mtp,
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Gynecology Treatments", path: ROUTES.gynecologyTreatments },
          { name: "Medical Termination of Pregnancy", path: ROUTES.mtp },
        ]),
      ),
    ],
  }),
  component: MtpPage,
});

function MtpPage() {
  return (
    <ServicePage
      eyebrow="Sexual & Reproductive Health"
      title="Medical Termination of Pregnancy (MTP)"
      intro="Medical termination of pregnancy is provided confidentially and lawfully under the MTP Act, with the gestational limits and conditions of the Act explained clearly before any decision is made."
      trail={[
        { name: "Home", to: ROUTES.home },
        { name: "Gynecology Treatments", to: ROUTES.gynecologyTreatments },
        { name: "Medical Termination of Pregnancy" },
      ]}
      sourcePage="mtp"
      faqs={FAQS}
      related={COMMON_RELATED}
      closing={{
        heading: "Book a confidential consultation",
        copy: "Discuss your options for medical termination of pregnancy in confidence with Dr. Payal Mahapatra.",
      }}
    >
      <Prose title="Who this is for">
        <p>
          Women who wish to discuss ending a pregnancy, within the framework set out by Indian law.
          Every consultation is confidential.
        </p>
      </Prose>

      <Prose title="Legal framework: the MTP Act">
        <p>
          Medical termination of pregnancy in India is governed by the MTP Act, which sets defined
          gestational limits within which termination is permitted, and specific additional
          conditions that apply for termination requested beyond the standard limit. Eligibility
          under the Act is assessed individually and explained at consultation.
        </p>
        <SafetyNote>
          Sex determination of a foetus is illegal in India under the PCPNDT Act. This clinic does
          not disclose or determine the sex of a foetus under any circumstance.
        </SafetyNote>
      </Prose>

      <Prose title="Confidentiality">
        <p>
          Consultations regarding termination of pregnancy are confidential. Your records and
          decision are not shared beyond what the law requires.
        </p>
      </Prose>

      <Prose title="Medical vs surgical termination">
        <DataTable
          caption="Comparing the two approaches"
          head={["Method", "How it works", "When used"]}
          rows={[
            [
              "Medical termination",
              "Medication taken to end the pregnancy",
              "Within an early gestational window",
            ],
            [
              "Surgical termination",
              "A procedure performed to end the pregnancy",
              "Where medical termination is unsuitable or incomplete",
            ],
          ]}
        />
      </Prose>

      <Prose title="Evaluation and aftercare">
        <p>
          Assessment includes confirming gestational age by ultrasound, reviewing your medical
          history, and discussing the appropriate method. A follow-up visit confirms the termination
          is complete and addresses contraception if wanted.
        </p>
        <SafetyNote>
          Heavy bleeding soaking more than one pad an hour, fever, or severe pain after termination
          should be seen the same day.
        </SafetyNote>
      </Prose>
    </ServicePage>
  );
}
