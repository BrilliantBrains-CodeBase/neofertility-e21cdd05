import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionHeading, StatStrip, FaqBlock } from "@/components/sections/blocks";
import { ROUTES, SITE_URL } from "@/data/navigation";
import { pageMeta, jsonLd, clinicSchema, websiteSchema, doctorSchema, faqSchema } from "@/lib/seo";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { DoctorAbout } from "@/components/sections/DoctorAbout";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { PatientGallery } from "@/components/sections/PatientGallery";
import { PatientReviews } from "@/components/sections/PatientReviews";
import { AppointmentMapForm } from "@/components/sections/AppointmentMapForm";
import { MarqueeBar } from "@/components/sections/MarqueeBar";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { TreatmentGrid } from "@/components/sections/TreatmentGrid";
import { TabbedFeatureSection } from "@/components/sections/TabbedFeatureSection";
import type { TabbedFeatureTab } from "@/components/sections/TabbedFeatureSection";
import type { TreatmentItem } from "@/components/sections/TreatmentGrid";
import {
  Syringe,
  FlaskConical,
  Microscope,
  Snowflake,
  Users,
  HeartHandshake,
  Activity,
  Sparkles,
} from "lucide-react";

const TREATMENTS: TreatmentItem[] = [
  {
    tag: "Assisted Conception",
    title: "Intrauterine Insemination (IUI) Treatment",
    copy: "IUI is a simple, minimally invasive fertility treatment in which prepared, healthy sperm is placed directly into the uterus during ovulation. It is often the recommended first step for couples with unexplained infertility, mild male factor issues, or ovulation problems.",
    linkText: "Explore IUI treatment in Marathahalli",
    to: ROUTES.iui,
    icon: Syringe,
    image: trIui,
    group: "fertility",
  },
  {
    tag: "Assisted Conception",
    title: "In Vitro Fertilization (IVF) Treatment",
    copy: "IVF is one of the most effective fertility treatments available today. Eggs are fertilised with sperm in our advanced laboratory, and the healthiest embryo is transferred to the uterus. IVF is recommended for blocked fallopian tubes, low ovarian reserve, failed IUI cycles, and unexplained infertility.",
    linkText: "Explore IVF treatment in Marathahalli",
    to: ROUTES.ivf,
    icon: FlaskConical,
    image: trIvf,
    group: "fertility",
  },
  {
    tag: "Assisted Conception",
    title: "Intracytoplasmic Sperm Injection (ICSI)",
    copy: "ICSI is an advanced form of IVF in which a single healthy sperm is injected directly into the egg to achieve fertilisation. It is the most effective option for severe male factor infertility, including low sperm count and poor sperm motility.",
    linkText: "Explore ICSI treatment",
    to: ROUTES.icsi,
    icon: Microscope,
    image: trIcsi,
    group: "fertility",
  },
  {
    tag: "Fertility Preservation",
    title: "Egg Freezing and Fertility Preservation",
    copy: "Egg freezing allows women to preserve their fertility by storing healthy eggs for future use. It is ideal for women who want to delay pregnancy for career, health, or personal reasons, and before medical treatments that may affect fertility.",
    linkText: "Explore egg freezing in Bangalore",
    to: ROUTES.eggFreezing,
    icon: Snowflake,
    image: trEf,
    group: "fertility",
  },
  {
    tag: "Male Fertility",
    title: "Male Infertility Treatment",
    copy: "Male factors contribute to nearly half of all infertility cases. Our male fertility solutions include advanced semen analysis, hormonal evaluation, sperm retrieval techniques, and targeted treatment for low sperm count, motility, and morphology issues.",
    linkText: "Explore male infertility treatment",
    to: ROUTES.maleInfertility,
    icon: Users,
    image: trMale,
    group: "fertility",
  },
  {
    tag: "Donor Care",
    title: "Donor Egg and Sperm Programs",
    copy: "Donor programs help couples conceive when pregnancy is not possible with their own eggs or sperm. All donors are medically screened, and every case is handled with complete confidentiality and compassionate counselling support.",
    linkText: "Explore donor egg and sperm programs",
    to: ROUTES.donor,
    icon: HeartHandshake,
    image: trDonor,
    group: "fertility",
  },
  {
    tag: "Hormonal Health",
    title: "PCOD Treatment",
    copy: "PCOD (Polycystic Ovarian Disease) causes irregular periods, ovarian cysts, and difficulty conceiving. Our PCOD treatment combines medical management, cycle regulation, and lifestyle guidance to restore hormonal balance and improve fertility naturally.",
    linkText: "Explore PCOD treatment in Marathahalli",
    to: ROUTES.pcod,
    icon: Activity,
    image: trPcod,
    group: "gynecology",
  },
  {
    tag: "Hormonal Health",
    title: "PCOS Treatment",
    copy: "PCOS (Polycystic Ovary Syndrome) is a hormonal disorder that affects ovulation, weight, and fertility. We offer comprehensive PCOS care including hormonal therapy, ovulation induction, metabolic support, and long term fertility protection.",
    linkText: "Explore PCOS treatment in Marathahalli",
    to: ROUTES.pcos,
    icon: Sparkles,
    image: trPcos,
    group: "gynecology",
  },
];

import trIui from "@/assets/iui-iui_procedure.jpg";
import trIvf from "@/assets/ivf-embryo-transfer.jpg";
import trIcsi from "@/assets/icsi-sperm-injection.jpg";
import trEf from "@/assets/ef-cryopreservation.webp";
import trMale from "@/assets/ivf-fertilization.jpg";
import trDonor from "@/assets/donor-selection.webp";
import trPcod from "@/assets/meno-assessment.jpg";
import trPcos from "@/assets/meno-plan.jpg";
import pinkBannerAsset from "@/assets/hero-banner-pink.webp";
import faqImage from "@/assets/faq-mother-baby.webp";
import pathwayTrying from "@/assets/pathway-trying.jpg";
import pathwayIrregular from "@/assets/pathway-irregular.jpg";
import pathwayEggFreezing from "@/assets/pathway-egg-freezing.jpg";
import pathwayFailedIvf from "@/assets/pathway-failed-ivf.jpg";
import serviceFertility from "@/assets/ivf-consultation.jpg";
import serviceHormonal from "@/assets/meno-consultation.jpg";
import serviceGynecology from "@/assets/scan-transvaginal.jpg";
import servicePregnancy from "@/assets/visit-2nd-and-3rd-trimester.jpg";

const FAQS = [
  {
    q: "Where is Neo Fertility Clinic located?",
    a: "Neo Fertility Clinic is at 1st floor, Scorpio House, Marathahalli Bridge Service Road, Munnekolala, opposite Purva Apartments, Bengaluru 560037. It is on the service road beside Marathahalli Bridge and is open all seven days from 09:30 to 18:30.",
  },
  {
    q: "Who is the fertility specialist at Neo Fertility Clinic?",
    a: "Dr. Payal Mahapatra, MBBS, DGO, DNB in Obstetrics and Gynecology, with a Fellowship in Reproductive Medicine from IIRRH. She has 18 years of clinical experience and is a member of ISAR and FOGSI.",
  },
  {
    q: "What fertility treatments are available in Marathahalli?",
    a: "IVF, IUI, ICSI, egg freezing and preservation, male fertility treatment including TESA and PESA sperm retrieval, donor egg and sperm programmes, ovulation induction, hysteroscopy and laparoscopic surgery for infertility.",
  },
  {
    q: "How much does IVF cost in Bangalore?",
    a: "At Neo Fertility Clinic a standard IVF cycle is between one lakh and two lakh rupees, with initial consultation and tests at three to five thousand. ICSI adds thirty to fifty thousand. Medication is the largest variable. Written estimates are given at the first consultation and EMI options are available.",
  },
  {
    q: "Do I need a referral to book a fertility consultation?",
    a: "No. You can book directly by phone, WhatsApp or online. Bring any previous scans, hormone reports and semen analysis results, however old, because they usually save repeating tests.",
  },
  {
    q: "Is the clinic open on Sundays?",
    a: "Yes. Neo Fertility Clinic is open all seven days from 09:30 to 18:30. This matters during a treatment cycle, because follicular tracking and stimulation monitoring run on the cycle, not the calendar.",
  },
];

/* Tab labels are short plain-language versions of each title, which stays as the panel
   heading. Bullets are lifted verbatim from the page each pathway already links to, so
   nothing clinical is authored here — see the CheckList on each linked route. */
const SEGMENTS: TabbedFeatureTab[] = [
  {
    id: "trying",
    label: "Trying to conceive",
    icon: <HeartHandshake />,
    panel: {
      title: "Trying for 12 months, or 6 months if you are over 35",
      description:
        "Start with a fertility evaluation for both partners. Hormones, ultrasound, tubal patency and semen analysis in the first cycle.",
      bullets: [
        "Ovulation disorders",
        "Blocked fallopian tubes",
        "Endometriosis",
        "Poor egg quality",
      ],
      cta: { label: "Fertility evaluation", href: ROUTES.infertility },
      image: {
        src: pathwayTrying,
        alt: "Woman holding a pregnancy test after months of trying to conceive",
      },
    },
  },
  {
    id: "cycles",
    label: "Irregular cycles",
    icon: <Activity />,
    panel: {
      title: "Irregular periods, PCOS, endometriosis or fibroids",
      description:
        "Start with a hormonal and gynecological assessment so the cycle is understood before any fertility treatment is discussed.",
      bullets: [
        "Irregular, infrequent or absent periods",
        "Difficulty conceiving",
        "Excess facial or body hair (hirsutism)",
        "Weight gain, particularly around the abdomen",
      ],
      cta: { label: "PCOS and PCOD care", href: ROUTES.pcos },
      image: {
        src: pathwayIrregular,
        alt: "Calendar with circled dates tracking irregular periods",
      },
    },
  },
  {
    id: "preserve",
    label: "Fertility preservation",
    icon: <Snowflake />,
    panel: {
      title: "Not ready for a family yet, but want to protect the option",
      description:
        "Start with ovarian reserve testing, then decide about egg freezing with real numbers rather than guesswork.",
      bullets: [
        "Preserve fertility before age-related decline",
        "Medical reasons such as cancer treatment or surgery",
        "Personal or career planning",
        "Eggs can be frozen for future treatment cycles",
      ],
      cta: { label: "Egg freezing", href: ROUTES.eggFreezing },
      image: {
        src: pathwayEggFreezing,
        alt: "Egg preserved inside a block of ice, representing egg freezing",
      },
    },
  },
  {
    id: "second-opinion",
    label: "Second opinion",
    icon: <Microscope />,
    panel: {
      title: "A failed IVF cycle or repeated miscarriage elsewhere",
      description:
        "Bring your records for a second opinion and a full cycle review. We tell you what we would change and why.",
      bullets: [
        "Blocked or damaged fallopian tubes",
        "Ovulation disorders such as PCOS and irregular periods",
        "Low sperm count or poor sperm quality",
        "Unexplained infertility, where no medical reason is found",
      ],
      cta: { label: "IVF treatment", href: ROUTES.ivf },
      image: {
        src: pathwayFailedIvf,
        alt: "Woman standing between empty cots after a failed IVF cycle",
      },
    },
  },
];

/* The "What we do" band is hidden for now. Typed as boolean rather than left as a literal
   so TypeScript does not narrow it to `false` and mark the whole block unreachable — flip
   this to true to bring the section back exactly as it was. */
const SHOW_WHAT_WE_DO: boolean = false;

const SERVICES = [
  {
    title: "Fertility treatment",
    copy: "IVF, IUI, ICSI, egg freezing, male fertility treatment including surgical sperm retrieval, and donor egg and sperm programmes.",
    to: ROUTES.fertilitySolutions,
    image: serviceFertility,
    alt: "Couple in a fertility consultation with Dr. Payal Mahapatra",
  },
  {
    title: "Hormonal and reproductive health",
    copy: "PCOS and PCOD, thyroid-related cycle disorders, irregular and heavy periods, endometriosis and menopause care.",
    to: ROUTES.pcos,
    image: serviceHormonal,
    alt: "Doctor discussing hormonal and reproductive health with a patient",
  },
  {
    title: "Gynecology and surgery",
    copy: "Hysteroscopy, laparoscopic surgery for infertility, pelvic ultrasound and follicular studies, infection treatment and breast health.",
    to: ROUTES.gynecologyTreatments,
    image: serviceGynecology,
    alt: "Transvaginal ultrasound scan being performed at the clinic",
  },
  {
    title: "Pregnancy care",
    copy: "Preconception health checks, complete antenatal care and high-risk pregnancy management, including IVF pregnancies.",
    to: ROUTES.pregnancyCare,
    image: servicePregnancy,
    alt: "Pregnant woman during a routine antenatal check",
  },
];

/* `short` is a compression of `copy` for the narrow desktop columns — five across
   leaves roughly 200px of text width, which the full paragraphs cannot take. */
const STEPS = [
  {
    title: "Full evaluation, both partners",
    short: "Both partners tested in week one, not month three.",
    copy: "Hormone profile, pelvic ultrasound, tubal patency testing and semen analysis. The male partner is tested in week one, not month three. One to two cycles.",
  },
  {
    title: "A named diagnosis",
    short: "A cause, or an honest “unexplained” — in plain language.",
    copy: "You are told what the cause is, or told honestly that it is unexplained. Results are explained in plain language, not handed over as a printout.",
  },
  {
    title: "The simplest effective treatment first",
    short: "Ovulation induction before IUI. IUI before IVF.",
    copy: "Ovulation induction and timed intercourse before IUI. IUI before IVF. IVF when the diagnosis makes it the right first step, not by default.",
  },
  {
    title: "A defined review point",
    short: "Agreed upfront: 3–4 IUI cycles or one IVF cycle, then review.",
    copy: "Agreed at the outset. Three to four IUI cycles, or one IVF cycle, then a formal review rather than an indefinite continuation.",
  },
  {
    title: "Continuity through pregnancy",
    short: "The same doctor sees the pregnancy through to delivery.",
    copy: "The doctor who treated your infertility manages the pregnancy that follows, through to delivery.",
  },
];

export const Route = createFileRoute("/")({
  head: () => {
    const base = pageMeta({
      title: "IVF & Fertility Clinic in Marathahalli, Bangalore | Neo Fertility",
      description:
        "Fertility and IVF care in Marathahalli and Whitefield, Bangalore. IVF, IUI, ICSI, egg freezing and PCOS care with Dr. Payal Mahapatra, 18 years in reproductive medicine. Open all seven days.",
      path: "/",
      image: `${SITE_URL}${pinkBannerAsset}`,
    });
    return {
      ...base,
      meta: [
        ...base.meta,
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:locale", content: "en_IN" },
        { name: "geo.region", content: "IN-KA" },
        { name: "geo.placename", content: "Marathahalli, Bengaluru" },
      ],
      scripts: [
        jsonLd(clinicSchema),
        jsonLd(websiteSchema),
        jsonLd(doctorSchema),
        jsonLd(faqSchema(FAQS)),
      ],
    };
  },

  component: Home,
});

function Home() {
  return (
    <>
      <HeroVideo />
      <MarqueeBar />

      <DoctorAbout />

      {/* Experience — sits directly under the doctor section: these are her numbers, so
          they belong with her. No heading: each figure carries its own label, punched
          through the middle of the numeral. */}
      <section aria-label="Experience and clinical volume" className="bg-pink-25 py-16 lg:py-20">
        <div className="container-page">
          <StatStrip />
        </div>
      </section>

      {/* Treatments */}
      <TreatmentGrid
        eyebrow="Services We Offer"
        title="Advanced Fertility Treatments for Every Path to Parenthood"
        items={TREATMENTS}
        closing={{
          heading: "Not sure which fertility treatment is right for you?",
          copy: "Book a consultation with Dr. Payal Mahapatra at Neo Fertility and IVF Clinic in Marathahalli, Whitefield. In a single visit, she will review your reports, explain your options clearly, and recommend the treatment path best suited to you.",
        }}
      />

      {/* Who we help */}
      {/* No background override: the component already defaults --tfs-section-bg to
          pink-25, the same greyish tint the stat strip and patient reviews use. */}
      <TabbedFeatureSection
        sectionTitle={
          <>
            <span className="block font-semibold">Four ways people arrive here,</span>
            <span className="block font-normal text-pink-700 italic">
              four different starting points
            </span>
          </>
        }
        tabs={SEGMENTS}
      />

      {/* Continues the tabbed section's background — this link belongs to it, and a white
          strip here would read as a separate band. */}
      <div className="bg-pink-25 pb-[clamp(3rem,7vw,6.5rem)]">
        <div className="container-page flex justify-center">
          <Link
            to={ROUTES.whoWeHelp}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 font-medium text-pink-700 transition-colors hover:bg-pink-50"
          >
            See all patient pathways <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>

      {/* What we do — hidden, see SHOW_WHAT_WE_DO */}
      {SHOW_WHAT_WE_DO && (
        <section className="bg-pink-25 section-y">
          <div className="container-page">
            <SectionHeading
              eyebrow="What we do"
              title="Fertility, hormones, surgery and pregnancy in one practice"
            />
            <div className="mt-10">
              <ServiceCards items={SERVICES} />
            </div>
          </div>
        </section>
      )}

      {/* How we work */}
      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-[52rem] text-center">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-3 text-[1.75rem] leading-[1.1] text-plum-900 sm:text-[2.25rem] lg:text-[2.75rem]">
              <span className="block font-semibold">A sequence you can see</span>
              <span className="block font-normal italic text-pink-700">
                from the first consultation
              </span>
            </h2>
          </div>

          <ProcessTimeline steps={STEPS} />

          <PatientGallery />
        </div>
      </section>

      <AppointmentMapForm sourcePage="home_band" />

      <FaqBlock
        items={FAQS}
        heading="Frequently asked questions"
        image={{
          src: faqImage,
          alt: "A smiling mother in a pink shirt cradling her newborn baby at home",
          width: 795,
          height: 870,
        }}
      />

      <PatientReviews />
    </>
  );
}
