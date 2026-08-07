import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/sections/blocks";
import { Prose } from "@/components/sections/ServicePage";
import { CLINIC } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.privacy;

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    ...pageMeta({
      title: "Privacy Policy | Neo Fertility Clinic",
      description:
        "How Neo Fertility Clinic, Marathahalli, Bangalore collects, uses and protects your personal and medical information.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Privacy Policy", path: PATH },
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
        eyebrow="Legal"
        title="Privacy Policy"
        intro="This policy explains how Neo Fertility Clinic collects, uses and protects your personal and medical information."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Privacy Policy" }]}
      />

      <div className="container-page py-14 lg:py-16">
        <div className="mx-auto max-w-[72ch] space-y-10">
          <Prose title="Information we collect">
            <p>
              When you contact us through our website, phone, or WhatsApp, or visit the clinic, we may collect your
              name, contact number, email address, and health-related information necessary for your consultation
              and treatment, such as medical history, test results, and treatment records.
            </p>
          </Prose>

          <Prose title="How we use your information">
            <ul className="list-disc space-y-2 pl-5">
              <li>To respond to enquiries and schedule appointments</li>
              <li>To provide medical consultation, diagnosis and treatment</li>
              <li>To maintain medical records as required by law</li>
              <li>To send appointment reminders and relevant clinic communication</li>
              <li>To improve our services and website experience</li>
            </ul>
          </Prose>

          <Prose title="Confidentiality of medical information">
            <p>
              Your medical information is treated with the same confidentiality as any patient record under
              applicable Indian medical and data protection regulations. It is not shared with third parties except
              where necessary for your treatment (for example, with a laboratory or referral specialist), where
              required by law, or with your explicit consent.
            </p>
          </Prose>

          <Prose title="Website data and cookies">
            <p>
              Our website may use cookies and analytics tools to understand how visitors use the site and to improve
              its performance. This data is used in aggregate and is not linked to your medical records.
            </p>
          </Prose>

          <Prose title="Your rights">
            <p>
              You may request access to, correction of, or deletion of your personal information held by us, subject
              to our obligations to retain medical records as required by law. To make a request, contact us at{" "}
              <a href={`mailto:${CLINIC.email}`} className="text-teal-700 underline">
                {CLINIC.email}
              </a>{" "}
              or call {CLINIC.phoneDisplay}.
            </p>
          </Prose>

          <Prose title="Changes to this policy">
            <p>
              We may update this policy from time to time to reflect changes in our practices or legal requirements.
              The updated version will be posted on this page.
            </p>
          </Prose>
        </div>
      </div>
    </>
  );
}
