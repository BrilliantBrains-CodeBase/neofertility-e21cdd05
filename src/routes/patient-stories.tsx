import { createFileRoute } from "@tanstack/react-router";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import { PageHero, SectionHeading } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, breadcrumbSchema } from "@/lib/seo";

type Story = {
  name: string;
  context: string;
  summary: string;
};

const STORIES: Story[] = [
  {
    name: "Ananya, 31",
    context: "Trying to conceive for two years, later diagnosed with PCOS",
    summary:
      "Ananya had irregular cycles for years and had been told to simply lose weight. A pelvic ultrasound and hormone panel confirmed PCOS with mild insulin resistance. With lifestyle changes and ovulation-inducing medication over several monitored cycles, she conceived without needing IVF. Her cycles are now more predictable than before treatment began.",
  },
  {
    name: "Meera and Arjun",
    context: "Secondary infertility after a straightforward first pregnancy",
    summary:
      "After their first child, Meera and Arjun tried for a second for over a year without success. Evaluation found mild tubal scarring, likely related to a past infection. They moved to IUI after two natural cycles did not work, and conceived on their second IUI attempt.",
  },
  {
    name: "Farah, 37",
    context: "Second opinion after a failed IVF cycle elsewhere",
    summary:
      "Farah's first IVF cycle at another clinic did not result in pregnancy, and she was not given a clear explanation. A review of her stimulation records and embryology notes led to a change in protocol and closer monitoring of endometrial preparation. Her second cycle resulted in a successful pregnancy.",
  },
  {
    name: "Priya, 27",
    context: "Persistent pain during intercourse",
    summary:
      "Priya had lived with pain during intercourse for over a year and had assumed it was something to manage on her own. Assessment identified a pelvic floor component alongside mild vaginal dryness. A combination of pelvic floor physiotherapy and simple hormonal support resolved her symptoms over a few months.",
  },
];

export const Route = createFileRoute("/patient-stories")({
  head: () => ({
    ...pageMeta({
      title: "Patient Stories | Neo Fertility Clinic, Bangalore",
      description:
        "Anonymised accounts of patients treated at Neo Fertility Clinic, Marathahalli and Whitefield, Bangalore. Individual results vary and are not a guarantee of outcome.",
      path: ROUTES.patientStories,
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Patient Stories", path: ROUTES.patientStories },
        ]),
      ),
    ],
  }),
  component: PatientStoriesPage,
});

function PatientStoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Stories"
        title="Patient Stories"
        intro="A small selection of anonymised patient accounts, shared with permission and with identifying details changed. They describe individual experiences, not guaranteed outcomes."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Patient Stories" }]}
      />

      <section className="bg-pink-25 section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Accounts"
            title="Every case is different"
            copy="These stories illustrate how a proper evaluation can change the course of treatment. They are not a promise of similar results, since fertility and gynecological outcomes depend on individual medical factors."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {STORIES.map((story) => (
              <article
                key={story.name}
                className="rounded-xl border border-line border-l-4 border-l-pink-500 bg-pink-50/40 p-6"
              >
                <p className="eyebrow">{story.context}</p>
                <h3 className="mt-2">{story.name}</h3>
                <p className="mt-3 text-[0.9375rem] text-ink-muted">{story.summary}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-xl border-l-4 border-alert bg-pink-50 p-5">
            <p className="text-[0.9375rem] text-ink">
              Names have been changed and details adjusted to protect patient privacy. These
              accounts describe individual experiences and results. They are not a guarantee that
              any other patient will have the same outcome; fertility and gynecological treatment
              results depend on individual diagnosis, age, and underlying medical factors, and are
              discussed honestly at consultation.
            </p>
          </div>
        </div>
      </section>

      <ClosingCta
        heading="Start with your own evaluation"
        copy="Book a consultation with Dr. Payal Mahapatra to understand your specific situation and the options available to you."
        sourcePage="patient_stories_closing"
        whatsappMessage="Hi, I'd like to book a consultation."
      />
    </>
  );
}
