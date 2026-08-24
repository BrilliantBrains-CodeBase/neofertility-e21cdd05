import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Baby,
  FileSearch,
  HeartHandshake,
  Hourglass,
  Mars,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import { PageHero, FaqBlock, RelatedLinks } from "@/components/sections/blocks";
import { COMMON_RELATED } from "@/components/sections/ServicePage";
import { Reveal } from "@/components/motion/Reveal";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";
import faqImage from "@/assets/faq-mother-newborn.webp";

type Segment = {
  /** Anchor target. The picker cards link to `#${id}`. */
  id: string;
  icon: LucideIcon;
  title: string;
  /** One line for the picker card, condensed from the first sentence of `copy`. */
  blurb: string;
  copy: string;
  link: { label: string; to: string };
  link2?: { label: string; to: string };
};

/* The ordinal used to sit inside `title` ("1. Couples trying to conceive"), which set it
   at h2 display size and made the body read as an ordered list. It is now derived from
   array position and rendered as a watermark numeral, so the titles are plain nouns. */
const SEGMENTS: Segment[] = [
  {
    id: "trying",
    icon: HeartHandshake,
    title: "Couples trying to conceive",
    blurb: "A year of trying, or six months over 35, and nobody has told you why.",
    copy: "You have been trying for a year, or six months if you are over 35, and nothing has happened. Nobody has told you why. What you need first is a diagnosis, not a treatment. Full evaluation of both partners takes one to two menstrual cycles: hormone profile, pelvic ultrasound and antral follicle count, tubal patency testing, and semen analysis in the first week. In a meaningful proportion of couples the finding is something simple and correctable.",
    link: { label: "Fertility evaluation for both partners", to: ROUTES.infertility },
  },
  {
    id: "secondary",
    icon: Baby,
    title: "Couples with secondary infertility",
    blurb: "You conceived before. You cannot now, and the same workup still applies.",
    copy: "You conceived before. You cannot now. The causes are the same as primary infertility with additions: tubal damage from a previous infection or caesarean, scarring inside the uterus, new-onset thyroid or ovulation problems, deterioration in sperm parameters, weight change, and simply being older than you were the first time. The same six or twelve month thresholds apply, and the same investigation pathway.",
    link: { label: "Fertility evaluation for both partners", to: ROUTES.infertility },
  },
  {
    id: "pcos",
    icon: Activity,
    title: "Women with PCOS, PMOS or PCOD",
    blurb:
      "Irregular periods and weight that will not shift. The insulin resistance is the target.",
    copy: "Irregular periods, weight that will not shift, acne, unwanted hair, and often years of being told to lose weight without being told how or why. PCOS was formally renamed PMOS in a global consensus published in The Lancet in May 2026. The insulin resistance underneath is what needs treating, and it is also what determines long-term diabetes and cardiovascular risk long after fertility stops being the concern.",
    link: { label: "PCOS and PMOS care", to: ROUTES.pcos },
    link2: { label: "PCOD", to: ROUTES.pcod },
  },
  {
    id: "over-35",
    icon: Hourglass,
    title: "Women over 35",
    blurb: "Investigation thresholds shorten to six months, and the treatment ladder changes.",
    copy: "Egg quality and quantity decline through the thirties and more sharply after 40. Investigation thresholds shorten to six months. AMH and antral follicle count are measured early rather than later. A stepped treatment ladder that would be reasonable at 29 is often the wrong approach at 39. Egg freezing is discussed as a genuine option rather than mentioned in passing.",
    link: { label: "Egg freezing and fertility preservation", to: ROUTES.eggFreezing },
  },
  {
    id: "male",
    icon: Mars,
    title: "Men with fertility concerns",
    blurb: "Male infertility usually has no symptoms. Testing is fast and non-invasive.",
    copy: "Male infertility usually has no symptoms. Most men feel entirely normal and discover a problem only when a semen analysis is done. Testing is fast, inexpensive and non-invasive. Many causes are treatable: hormonal deficiency, varicocele, infection, and lifestyle factors. Where sperm production cannot be restored, ICSI means one usable sperm is enough, and TESA or PESA can recover sperm even when none appears in the ejaculate.",
    link: { label: "Male fertility treatment", to: ROUTES.maleInfertility },
  },
  {
    id: "donor",
    icon: Users,
    title: "Single women and same-sex couples",
    blurb: "Donor sperm with IUI or IVF is a recognised route to pregnancy in India.",
    copy: "Donor sperm with IUI or IVF is a recognised route to pregnancy. Access in India is governed by the Assisted Reproductive Technology (Regulation) Act 2021 and the Surrogacy (Regulation) Act 2021, which set specific eligibility criteria, and those criteria should be confirmed directly rather than assumed from information found online. The clinical consultation is straightforward: ovarian reserve assessment, tubal patency, donor selection and cycle planning.",
    link: { label: "Donor egg and sperm programme", to: ROUTES.donor },
  },
  {
    id: "second-opinion",
    icon: FileSearch,
    title: "Patients seeking a second opinion",
    blurb: "A cycle failed and nobody explained why. A failed cycle produces information.",
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

const ordinal = (index: number) => String(index + 1).padStart(2, "0");

/**
 * The self-identification grid. Seven anchor cards, one per segment, so a visitor lands on
 * their own situation instead of scrolling past the six that do not apply to them.
 *
 * Four columns, not three: seven cards fill 4 + 3, where three columns would leave a single
 * orphan card on the last row.
 */
function SegmentPicker() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="mx-auto max-w-[52rem] text-center">
          <p className="eyebrow">Find your situation</p>
          {/* Deliberately echoes the homepage's "Four ways people arrive here" tabs, which
              link here — arriving on the same sentence confirms this is the full list.
              It must not open on "Wherever you are starting from": the closing CTA on this
              same page already opens on those exact words. */}
          <h2 className="mt-3 text-[1.75rem] leading-[1.1] text-plum-900 sm:text-[2.25rem] lg:text-[2.75rem]">
            <span className="block font-semibold">Seven ways people arrive here,</span>
            <span className="block font-normal text-pink-700 italic">
              seven different first steps
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map((segment, index) => (
            <Reveal key={segment.id} delay={index * 60} className="h-full">
              <a
                href={`#${segment.id}`}
                className="flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-[color,background-color,border-color,box-shadow] hover:border-pink-300 hover:shadow-rail"
              >
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className="flex size-10 items-center justify-center rounded-full bg-pink-50"
                  >
                    <segment.icon className="size-5 text-pink-700" />
                  </span>
                  {/* Decorative: the heading below carries the meaning, and this tint is a
                      watermark that would not clear the 4.5:1 bar as text. */}
                  <span
                    aria-hidden="true"
                    className="font-stat text-[1.5rem] leading-none text-pink-500/30"
                  >
                    {ordinal(index)}
                  </span>
                </div>
                <h3 className="mt-5">{segment.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-muted">{segment.blurb}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The full detail for a run of segments.
 *
 * `startIndex` is the segment's absolute position, so the watermark numerals stay
 * continuous (01–07) across the band boundary rather than restarting at the second band.
 */
function SegmentBand({
  segments,
  startIndex,
  className,
}: {
  segments: Segment[];
  startIndex: number;
  className?: string;
}) {
  return (
    <section className={`section-y ${className ?? ""}`}>
      <div className="container-page space-y-10">
        {segments.map((segment, index) => (
          <Reveal key={segment.id} delay={index * 60}>
            {/* Two columns rather than one narrow measure: the identifying rail sits in the
                width that was previously empty, and the prose keeps its 68ch measure. */}
            <div
              id={segment.id}
              className="grid gap-6 border-t border-line pt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16"
            >
              <div>
                <span
                  aria-hidden="true"
                  className="block font-stat text-[3.5rem] leading-none text-pink-500/25"
                >
                  {ordinal(startIndex + index)}
                </span>
                <segment.icon aria-hidden="true" className="mt-4 size-7 text-pink-700" />
                <h2 className="mt-4">{segment.title}</h2>
              </div>

              <div>
                <p className="prose-measure text-ink-muted">{segment.copy}</p>
                <div className="mt-5 flex flex-wrap gap-4">
                  <Link
                    to={segment.link.to}
                    className="inline-flex items-center gap-2 font-medium text-pink-700 hover:underline"
                  >
                    {segment.link.label} <ArrowRight className="size-4 rtl:rotate-180" />
                  </Link>
                  {segment.link2 && (
                    <Link
                      to={segment.link2.to}
                      className="inline-flex items-center gap-2 font-medium text-pink-700 hover:underline"
                    >
                      {segment.link2.label} <ArrowRight className="size-4 rtl:rotate-180" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhoWeHelpPage() {
  return (
    <>
      {/* The eyebrow used to repeat the h1 verbatim, and the intro listed all seven groups
          in prose that the picker below now enumerates properly. */}
      <PageHero
        eyebrow="Patient pathways"
        title="Who We Help"
        intro="Fertility problems do not all start the same way. Find the situation that matches yours, and the first step that goes with it."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Who We Help" }]}
      />

      <SegmentPicker />

      {/* Split 4 / 3 across two bands. All seven segments in one pink-25 run made the
          whole body read as a single undifferentiated tint before the FAQ. */}
      <SegmentBand segments={SEGMENTS.slice(0, 4)} startIndex={0} />
      <SegmentBand
        segments={SEGMENTS.slice(4)}
        startIndex={4}
        className="border-t border-line bg-pink-25"
      />

      <FaqBlock
        items={FAQS}
        image={{
          src: faqImage,
          alt: "A mother in profile looking down at her sleeping newborn held against her chest",
          width: 784,
          height: 1168,
        }}
      />

      <RelatedLinks links={COMMON_RELATED} />

      <ClosingCta
        heading="Wherever you are starting from, the first step is the same"
        copy="A full evaluation of both partners, and a plain explanation of what it finds."
        sourcePage="who_we_help_closing"
        whatsappMessage="Hi, I'd like to book a consultation."
      />
    </>
  );
}
