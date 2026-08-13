import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import { PageHero, SectionHeading, FaqBlock } from "@/components/sections/blocks";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const SEGMENTS = [
  {
    title: "1. Couples trying to conceive",
    copy: "You have been trying for a year, or six months if you are over 35, and nothing has happened. Nobody has told you why. What you need first is a diagnosis, not a treatment. Full evaluation of both partners takes one to two menstrual cycles: hormone profile, pelvic ultrasound and antral follicle count, tubal patency testing, and semen analysis in the first week. In a meaningful proportion of couples the finding is something simple and correctable.",
    link: { label: "Fertility evaluation for both partners", to: ROUTES.infertility },
  },
  {
    title: "2. Couples with secondary infertility",
    copy: "You conceived before. You cannot now. The causes are the same as primary infertility with additions: tubal damage from a previous infection or caesarean, scarring inside the uterus, new-onset thyroid or ovulation problems, deterioration in sperm parameters, weight change, and simply being older than you were the first time. The same six or twelve month thresholds apply, and the same investigation pathway.",
    link: { label: "Fertility evaluation for both partners", to: ROUTES.infertility },
  },
  {
    title: "3. Women with PCOS, PMOS or PCOD",
    copy: "Irregular periods, weight that will not shift, acne, unwanted hair, and often years of being told to lose weight without being told how or why. PCOS was formally renamed PMOS in a global consensus published in The Lancet in May 2026. The insulin resistance underneath is what needs treating, and it is also what determines long-term diabetes and cardiovascular risk long after fertility stops being the concern.",
    link: { label: "PCOS and PMOS care", to: ROUTES.pcos },
    link2: { label: "PCOD", to: ROUTES.pcod },
  },
  {
    title: "4. Women over 35",
    copy: "Egg quality and quantity decline through the thirties and more sharply after 40. Investigation thresholds shorten to six months. AMH and antral follicle count are measured early rather than later. A stepped treatment ladder that would be reasonable at 29 is often the wrong approach at 39. Egg freezing is discussed as a genuine option rather than mentioned in passing.",
    link: { label: "Egg freezing and fertility preservation", to: ROUTES.eggFreezing },
  },
  {
    title: "5. Men with fertility concerns",
    copy: "Male infertility usually has no symptoms. Most men feel entirely normal and discover a problem only when a semen analysis is done. Testing is fast, inexpensive and non-invasive. Many causes are treatable: hormonal deficiency, varicocele, infection, and lifestyle factors. Where sperm production cannot be restored, ICSI means one usable sperm is enough, and TESA or PESA can recover sperm even when none appears in the ejaculate.",
    link: { label: "Male fertility treatment", to: ROUTES.maleInfertility },
  },
  {
    title: "6. Single women and same-sex couples",
    copy: "Donor sperm with IUI or IVF is a recognised route to pregnancy. Access in India is governed by the Assisted Reproductive Technology (Regulation) Act 2021 and the Surrogacy (Regulation) Act 2021, which set specific eligibility criteria, and those criteria should be confirmed directly rather than assumed from information found online. The clinical consultation is straightforward: ovarian reserve assessment, tubal patency, donor selection and cycle planning.",
    link: { label: "Donor egg and sperm programme", to: ROUTES.donor },
  },
  {
    title: "7. Patients seeking a second opinion",
    copy: "A cycle failed. Nobody explained why, or the explanation was that it sometimes just does not work. A failed cycle produces information: how the ovaries responded, how many eggs matured, fertilisation rate, embryo grades, endometrial thickness at transfer. A second opinion consultation reviews that record and asks what should change. Bring every report, including embryology notes.",
    link: { label: "IVF treatment", to: ROUTES.ivf },
  },
];

const FAQS = [
  {
    q: "I already have a child but cannot conceive again. Is that treatable?",
    a: "Yes. Secondary infertility is common and is investigated the same way as primary infertility. Causes include tubal damage from previous infection or caesarean, uterine scarring, new thyroid or ovulation problems, changed sperm parameters and age. The same six or twelve month thresholds apply.",
  },
  {
    q: "Can I get a second opinion after a failed IVF cycle elsewhere?",
    a: "Yes. Bring all reports including stimulation records, egg and embryo numbers, embryo grades and endometrial measurements. A review consultation examines what happened and what should change, rather than repeating an identical cycle.",
  },
  {
    q: "I am 38 and not ready for a baby yet. What are my options?",
    a: "An AMH test and antral follicle count will tell you where your ovarian reserve actually sits, which is more useful than age alone. Egg freezing preserves eggs at their current quality. Women in their late thirties usually need more than one retrieval cycle to bank a useful number.",
  },
  {
    q: "Can single women access fertility treatment in India?",
    a: "Donor sperm with IUI or IVF is a recognised route, and access is governed by the ART (Regulation) Act 2021 and the Surrogacy (Regulation) Act 2021, which set specific eligibility criteria. Confirm the current position directly at consultation rather than relying on online summaries.",
  },
  {
    q: "Should my husband be tested even if he feels fine?",
    a: "Yes. Male infertility usually has no symptoms at all. Semen analysis is faster, cheaper and less invasive than the female workup, a male factor is present in roughly half of cases, and an abnormal result changes the whole treatment plan.",
  },
];

export const Route = createFileRoute("/who-we-help")({
  head: () => {
    const base = pageMeta({
      title: "Who We Help | Fertility Care in Marathahalli, Bangalore",
      description:
        "Fertility and gynecology care for couples trying to conceive, women with PCOS or PMOS, single women and same-sex couples, men with fertility concerns, and patients seeking a second opinion.",
      path: ROUTES.whoWeHelp,
    });
    return {
      ...base,
      scripts: [
        jsonLd(faqSchema(FAQS)),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: ROUTES.home },
            { name: "Who We Help", path: ROUTES.whoWeHelp },
          ]),
        ),
      ],
    };
  },
  component: WhoWeHelpPage,
});

function WhoWeHelpPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Help"
        title="Who We Help"
        intro="Neo Fertility Clinic treats seven distinct patient groups: couples trying to conceive for the first time, couples with secondary infertility, women with PCOS or PMOS and hormonal disorders, women over 35 facing age-related fertility decline, men with sperm-related fertility problems, single women and same-sex couples, and patients seeking a second opinion after failed treatment elsewhere."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Who We Help" }]}
      />

      <section className="bg-clay-25 section-y">
        <div className="container-page space-y-10">
          {SEGMENTS.map((segment) => (
            <div key={segment.title} className="border-t border-line pt-8">
              <h2>{segment.title}</h2>
              <p className="prose-measure mt-3 text-ink-muted">{segment.copy}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link
                  to={segment.link.to}
                  className="inline-flex items-center gap-2 font-medium text-teal-700 hover:underline"
                >
                  {segment.link.label} <ArrowRight className="size-4" />
                </Link>
                {segment.link2 && (
                  <Link
                    to={segment.link2.to}
                    className="inline-flex items-center gap-2 font-medium text-teal-700 hover:underline"
                  >
                    {segment.link2.label} <ArrowRight className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FaqBlock items={FAQS} />

      <ClosingCta
        heading="Wherever you are starting from, the first step is the same"
        copy="A full evaluation of both partners, and a plain explanation of what it finds."
        sourcePage="who_we_help_closing"
        whatsappMessage="Hi, I'd like to book a consultation."
      />
    </>
  );
}
