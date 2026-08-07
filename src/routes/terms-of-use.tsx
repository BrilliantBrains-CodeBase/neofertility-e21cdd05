import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/sections/blocks";
import { Prose } from "@/components/sections/ServicePage";
import { CLINIC } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.terms;

export const Route = createFileRoute("/terms-of-use")({
  head: () => ({
    ...pageMeta({
      title: "Terms of Use | Neo Fertility Clinic",
      description:
        "Terms of use governing the Neo Fertility Clinic website and online enquiry or appointment request forms.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Terms of Use", path: PATH },
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
        title="Terms of Use"
        intro="Please read these terms before using the Neo Fertility Clinic website or submitting an enquiry."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Terms of Use" }]}
      />

      <div className="container-page py-14 lg:py-16">
        <div className="mx-auto max-w-[72ch] space-y-10">
          <Prose title="About this website">
            <p>
              This website is operated by {CLINIC.name}, located at {CLINIC.addressLine}. By using this website, you
              agree to these terms of use.
            </p>
          </Prose>

          <Prose title="Informational purpose only">
            <p>
              Content on this website, including articles, FAQs, and descriptions of treatments, is provided for
              general informational purposes only. It is not a substitute for professional medical advice, diagnosis
              or treatment. Always seek the advice of a qualified doctor with any questions about a medical
              condition. Do not disregard professional medical advice or delay seeking it because of something you
              have read on this website.
            </p>
          </Prose>

          <Prose title="No doctor-patient relationship">
            <p>
              Submitting an enquiry or appointment request form on this website does not, by itself, create a
              doctor-patient relationship. That relationship is established only once a consultation has taken
              place at the clinic.
            </p>
          </Prose>

          <Prose title="Accuracy of information">
            <p>
              We make reasonable efforts to keep information on this website accurate and up to date, including
              treatment descriptions, statistics and costs, but these are indicative and may change. Please confirm
              current details directly with the clinic before making treatment decisions.
            </p>
          </Prose>

          <Prose title="Use of forms and third-party services">
            <p>
              Appointment and enquiry forms on this site are processed through third-party service providers used
              for scheduling and communication. By submitting a form, you consent to your information being
              processed for the purpose of responding to your enquiry, as described in our{" "}
              <a href="/privacy-policy/" className="text-teal-700 underline">
                Privacy Policy
              </a>
              .
            </p>
          </Prose>

          <Prose title="Limitation of liability">
            <p>
              {CLINIC.name} is not liable for any loss or damage arising from reliance on the content of this
              website, or from any decision made without a proper in-person consultation.
            </p>
          </Prose>

          <Prose title="Governing law">
            <p>
              These terms are governed by the laws of India, and any disputes will be subject to the jurisdiction of
              the courts in Bengaluru, Karnataka.
            </p>
          </Prose>

          <Prose title="Contact">
            <p>
              For questions about these terms, contact us at{" "}
              <a href={`mailto:${CLINIC.email}`} className="text-teal-700 underline">
                {CLINIC.email}
              </a>
              .
            </p>
          </Prose>
        </div>
      </div>
    </>
  );
}
