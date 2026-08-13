import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  },
  {
    tag: "Assisted Conception",
    title: "In Vitro Fertilization (IVF) Treatment",
    copy: "IVF is one of the most effective fertility treatments available today. Eggs are fertilised with sperm in our advanced laboratory, and the healthiest embryo is transferred to the uterus. IVF is recommended for blocked fallopian tubes, low ovarian reserve, failed IUI cycles, and unexplained infertility.",
    linkText: "Explore IVF treatment in Marathahalli",
    to: ROUTES.ivf,
    icon: FlaskConical,
    image: trIvf,
  },
  {
    tag: "Assisted Conception",
    title: "Intracytoplasmic Sperm Injection (ICSI)",
    copy: "ICSI is an advanced form of IVF in which a single healthy sperm is injected directly into the egg to achieve fertilisation. It is the most effective option for severe male factor infertility, including low sperm count and poor sperm motility.",
    linkText: "Explore ICSI treatment",
    to: ROUTES.icsi,
    icon: Microscope,
    image: trIcsi,
  },
  {
    tag: "Fertility Preservation",
    title: "Egg Freezing and Fertility Preservation",
    copy: "Egg freezing allows women to preserve their fertility by storing healthy eggs for future use. It is ideal for women who want to delay pregnancy for career, health, or personal reasons, and before medical treatments that may affect fertility.",
    linkText: "Explore egg freezing in Bangalore",
    to: ROUTES.eggFreezing,
    icon: Snowflake,
    image: trEf,
  },
  {
    tag: "Male Fertility",
    title: "Male Infertility Treatment",
    copy: "Male factors contribute to nearly half of all infertility cases. Our male fertility solutions include advanced semen analysis, hormonal evaluation, sperm retrieval techniques, and targeted treatment for low sperm count, motility, and morphology issues.",
    linkText: "Explore male infertility treatment",
    to: ROUTES.maleInfertility,
    icon: Users,
    image: trMale,
  },
  {
    tag: "Donor Care",
    title: "Donor Egg and Sperm Programs",
    copy: "Donor programs help couples conceive when pregnancy is not possible with their own eggs or sperm. All donors are medically screened, and every case is handled with complete confidentiality and compassionate counselling support.",
    linkText: "Explore donor egg and sperm programs",
    to: ROUTES.donor,
    icon: HeartHandshake,
    image: trDonor,
  },
  {
    tag: "Hormonal Health",
    title: "PCOD Treatment",
    copy: "PCOD (Polycystic Ovarian Disease) causes irregular periods, ovarian cysts, and difficulty conceiving. Our PCOD treatment combines medical management, cycle regulation, and lifestyle guidance to restore hormonal balance and improve fertility naturally.",
    linkText: "Explore PCOD treatment in Marathahalli",
    to: ROUTES.pcod,
    icon: Activity,
    image: trPcod,
  },
  {
    tag: "Hormonal Health",
    title: "PCOS Treatment",
    copy: "PCOS (Polycystic Ovary Syndrome) is a hormonal disorder that affects ovulation, weight, and fertility. We offer comprehensive PCOS care including hormonal therapy, ovulation induction, metabolic support, and long term fertility protection.",
    linkText: "Explore PCOS treatment in Marathahalli",
    to: ROUTES.pcos,
    icon: Sparkles,
    image: trPcos,
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
import { useCarouselAutoplay } from "@/hooks/use-carousel-autoplay";
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

const SEGMENTS = [
  {
    title: "Trying for 12 months, or 6 months if you are over 35",
    copy: "Start with a fertility evaluation for both partners. Hormones, ultrasound, tubal patency and semen analysis in the first cycle.",
    to: ROUTES.infertility,
    image: pathwayTrying,
    alt: "Woman holding a pregnancy test after months of trying to conceive",
  },
  {
    title: "Irregular periods, PCOS, endometriosis or fibroids",
    copy: "Start with a hormonal and gynecological assessment so the cycle is understood before any fertility treatment is discussed.",
    to: ROUTES.pcos,
    image: pathwayIrregular,
    alt: "Calendar with circled dates tracking irregular periods",
  },
  {
    title: "Not ready for a family yet, but want to protect the option",
    copy: "Start with ovarian reserve testing, then decide about egg freezing with real numbers rather than guesswork.",
    to: ROUTES.eggFreezing,
    image: pathwayEggFreezing,
    alt: "Egg preserved inside a block of ice, representing egg freezing",
  },
  {
    title: "A failed IVF cycle or repeated miscarriage elsewhere",
    copy: "Bring your records for a second opinion and a full cycle review. We tell you what we would change and why.",
    to: ROUTES.ivf,
    image: pathwayFailedIvf,
    alt: "Woman standing between empty cots after a failed IVF cycle",
  },
];

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
  const pathwayAutoplay = useCarouselAutoplay({ delay: 4500 });

  return (
    <>
      <HeroVideo />
      <MarqueeBar />

      <DoctorAbout />

      {/* Experience — sits directly under the doctor section: these are her numbers, so
          they belong with her. No heading: each figure carries its own label, punched
          through the middle of the numeral. */}
      <section aria-label="Experience and clinical volume" className="bg-clay-25 py-16 lg:py-20">
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

      <section className="section-y">
        <div className="container-page">
          {/* Split heading, reference style */}
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12">
            <div>
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-teal-600">
                Who we help
              </p>
              <h2 className="mt-3 font-display text-[1.75rem] leading-[1.1] text-teal-900 sm:text-[2.25rem] lg:text-[2.75rem]">
                <span className="block font-semibold">Four ways people arrive here,</span>
                <span className="block italic font-normal text-teal-700">
                  four different starting points
                </span>
              </h2>
            </div>
          </div>

          {/* Infographic pathway cards — a carousel rather than a 4-up grid, which
              squeezed each card to ~216px once the number badge took its 44px. */}
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={pathwayAutoplay.plugins}
            setApi={pathwayAutoplay.setApi}
            {...pathwayAutoplay.pauseProps}
            className="mt-12 lg:mt-16"
            aria-label="Patient pathways"
          >
            <CarouselContent className="-ml-5">
              {SEGMENTS.map((segment, i) => (
                <CarouselItem
                  key={segment.title}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${SEGMENTS.length}: ${segment.title}`}
                  className="basis-[88%] pl-5 sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative flex h-full pl-11">
                    {/* Number badge */}
                    <span
                      aria-hidden
                      className="absolute top-1/2 left-0 z-0 grid h-24 w-24 -translate-y-1/2 place-items-center rounded-full bg-clay-50 pr-11 font-display text-[1.375rem] font-semibold text-teal-900"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Blush frame + white card */}
                    <div className="relative z-10 w-full rounded-[1.75rem] bg-clay-50 p-2 shadow-[0_18px_40px_-28px_rgba(1,49,55,0.45)]">
                      <div className="flex h-full flex-col overflow-hidden rounded-[1.375rem] bg-white">
                        <img
                          src={segment.image}
                          alt={segment.alt}
                          width={640}
                          height={420}
                          loading="lazy"
                          className="h-40 w-full object-cover sm:h-48"
                        />
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="text-[1.0625rem] leading-snug font-medium text-teal-900">
                            {segment.title}
                          </h3>
                          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                            {segment.copy}
                          </p>
                          <Link
                            to={segment.to}
                            className="mt-4 inline-flex items-center gap-1 text-[0.875rem] font-medium text-teal-700 hover:underline"
                          >
                            Read more <ArrowRight className="size-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute top-1/2 left-2 z-20 size-11 -translate-y-1/2 border-line bg-white text-teal-900 shadow-rail hover:border-teal-600 hover:bg-white disabled:opacity-35 lg:left-3 xl:-left-12 2xl:-left-14" />
            <CarouselNext className="absolute top-1/2 right-2 z-20 size-11 -translate-y-1/2 border-line bg-white text-teal-900 shadow-rail hover:border-teal-600 hover:bg-white disabled:opacity-35 lg:right-3 xl:-right-12 2xl:-right-14" />
          </Carousel>

          <div className="mt-12 flex justify-center">
            <Link
              to={ROUTES.whoWeHelp}
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-medium text-teal-700 transition-colors hover:bg-clay-50"
            >
              See all patient pathways <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-clay-25 section-y">
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

      {/* How we work */}
      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-[52rem] text-center">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-3 font-display text-[1.75rem] leading-[1.1] text-teal-900 sm:text-[2.25rem] lg:text-[2.75rem]">
              <span className="block font-semibold">A sequence you can see</span>
              <span className="block font-normal italic text-teal-700">
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
