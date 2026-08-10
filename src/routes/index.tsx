import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, CalendarCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { LeadFormBand } from "@/components/conversion/LeadFormBand";
import {
  SectionHeading,
  StatStrip,
  StepList,
  InfoCard,
  FaqBlock,
  DoctorNote,
} from "@/components/sections/blocks";
import { CLINIC, CLINICAL_VOLUME, QUALIFICATIONS, MEMBERSHIPS, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, clinicSchema, doctorSchema, faqSchema } from "@/lib/seo";
import heroPortraitAsset from "@/assets/dr-payal-hero.png.asset.json";
import reception from "@/assets/clinic-reception.jpg";

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
  },
  {
    title: "Irregular periods, PCOS, endometriosis or fibroids",
    copy: "Start with a hormonal and gynecological assessment so the cycle is understood before any fertility treatment is discussed.",
    to: ROUTES.pcos,
  },
  {
    title: "Not ready for a family yet, but want to protect the option",
    copy: "Start with ovarian reserve testing, then decide about egg freezing with real numbers rather than guesswork.",
    to: ROUTES.eggFreezing,
  },
  {
    title: "A failed IVF cycle or repeated miscarriage elsewhere",
    copy: "Bring your records for a second opinion and a full cycle review. We tell you what we would change and why.",
    to: ROUTES.ivf,
  },
];

const SERVICES = [
  {
    title: "Fertility treatment",
    copy: "IVF, IUI, ICSI, egg freezing, male fertility treatment including surgical sperm retrieval, and donor egg and sperm programmes.",
    to: ROUTES.fertilitySolutions,
  },
  {
    title: "Hormonal and reproductive health",
    copy: "PCOS and PCOD, thyroid-related cycle disorders, irregular and heavy periods, endometriosis and menopause care.",
    to: ROUTES.pcos,
  },
  {
    title: "Gynecology and surgery",
    copy: "Hysteroscopy, laparoscopic surgery for infertility, pelvic ultrasound and follicular studies, infection treatment and breast health.",
    to: ROUTES.gynecologyTreatments,
  },
  {
    title: "Pregnancy care",
    copy: "Preconception health checks, complete antenatal care and high-risk pregnancy management, including IVF pregnancies.",
    to: ROUTES.pregnancyCare,
  },
];

const STEPS = [
  {
    title: "Full evaluation, both partners",
    copy: "Hormone profile, pelvic ultrasound, tubal patency testing and semen analysis. The male partner is tested in week one, not month three. One to two cycles.",
  },
  {
    title: "A named diagnosis",
    copy: "You are told what the cause is, or told honestly that it is unexplained. Results are explained in plain language, not handed over as a printout.",
  },
  {
    title: "The simplest effective treatment first",
    copy: "Ovulation induction and timed intercourse before IUI. IUI before IVF. IVF when the diagnosis makes it the right first step, not by default.",
  },
  {
    title: "A defined review point",
    copy: "Agreed at the outset. Three to four IUI cycles, or one IVF cycle, then a formal review rather than an indefinite continuation.",
  },
  {
    title: "Continuity through pregnancy",
    copy: "The doctor who treated your infertility manages the pregnancy that follows, through to delivery.",
  },
];

const DIFFERENTIATORS = [
  {
    title: "A single specialist, start to finish",
    copy: "Dr. Payal Mahapatra performs your scans, your retrieval and your transfer. You are not handed between a consultant, a junior and a sonographer.",
  },
  {
    title: "Fertility and obstetrics under one roof",
    copy: "Many fertility clinics hand pregnancies over at 8 weeks. Here the same doctor manages the pregnancy she helped you conceive, including high-risk care.",
  },
  {
    title: "Natural conception attempted first",
    copy: "Ovulation induction and IUI are offered where the diagnosis supports them. IVF is recommended when it is the right answer, not as an opening position.",
  },
  {
    title: "Published price ranges",
    copy: "IVF, ICSI, sperm retrieval and frozen transfer costs are published on this site rather than disclosed after you commit.",
  },
  {
    title: "Both partners investigated together",
    copy: "A male factor is present in roughly half of cases. The semen analysis happens in the first week.",
  },
  {
    title: "Open all seven days",
    copy: "09:30 to 18:30, every day. Follicular tracking and stimulation monitoring do not pause for weekends.",
  },
];

export const Route = createFileRoute("/")({
  head: () => {
    const base = pageMeta({
      title: "IVF & Fertility Clinic in Marathahalli, Bangalore | Neo Fertility",
      description:
        "Fertility and IVF care in Marathahalli and Whitefield, Bangalore. IVF, IUI, ICSI, egg freezing and PCOS care with Dr. Payal Mahapatra, 18 years in reproductive medicine. Open all seven days.",
      path: "/",
    });
    return {
      ...base,
      scripts: [jsonLd(clinicSchema), jsonLd(doctorSchema), jsonLd(faqSchema(FAQS))],
    };
  },
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-white pt-4 pb-0 lg:pt-6">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2rem] bg-clay-50">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[300px] lg:min-h-[520px]">
                <img
                  src={heroPortraitAsset.url}
                  alt={`${CLINIC.doctor}, fertility specialist at Neo Fertility Clinic Marathahalli`}
                  width={650}
                  height={900}
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
                <p className="eyebrow">
                  Dr. Payal Mahapatra · Fertility &amp; IVF Specialist · Bengaluru
                </p>
                <h1 className="mt-4 text-[2.5rem] leading-[1.02] lg:text-[3.5rem]">
                  You deserve more than “just keep trying.”
                </h1>
                <p className="mt-5 max-w-[46ch] text-[1.0625rem] text-ink-muted">
                  With Dr. Payal Mahapatra, your fertility journey starts with being heard,
                  understanding what may be holding you back, and finding a treatment plan that feels
                  right for you — whether that means simple fertility support, IUI, IVF, ICSI or
                  advanced care.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <AppointmentSheet sourcePage="home_hero">
                    <Button variant="cta" size="lg" className="rounded-full">
                      <CalendarCheck /> Book a consultation
                    </Button>
                  </AppointmentSheet>
                  <Button variant="outlineTeal" size="lg" asChild className="rounded-full">
                    <a
                      href={CLINIC.phoneHref}
                      onClick={() => track("call_click", { source_page: "home_hero" })}
                    >
                      <Phone /> Call {CLINIC.phoneDisplay}
                    </a>
                  </Button>
                </div>
                <p className="mt-5 text-[0.9375rem] text-ink-muted">
                  18+ Years of Experience · Personalised Fertility Care · Marathahalli &amp;
                  Whitefield
                </p>

              </div>
            </div>
          </div>
        </div>

        {/* Ghost-figure clinical volume band */}
        <div className="container-page py-10 lg:py-14">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
            {CLINICAL_VOLUME.map((s) => (
              <li key={s.label} className="relative overflow-hidden text-center">
                <span
                  aria-hidden
                  className="block font-display text-[2.75rem] font-semibold leading-none text-clay-50 lg:text-[4.5rem]"
                >
                  {s.figure}
                </span>
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-1 font-display text-[0.9375rem] italic leading-tight text-teal-700">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* Direct answer block */}
      <section className="border-b border-line bg-white py-10">
        <div className="container-page">
          <p className="max-w-[80ch] text-[1.0625rem] text-ink">
            <strong className="font-semibold text-teal-900">Neo Fertility Clinic</strong> is a
            fertility and gynecology practice in Marathahalli, Bengaluru, led by Dr. Payal
            Mahapatra, a reproductive medicine specialist with 18 years of clinical experience. The
            clinic provides IVF, IUI, ICSI, egg freezing, male fertility treatment, donor programmes,
            PCOS and PCOD care, and full gynecological services. It is open all seven days, 09:30 to
            18:30, on Marathahalli Bridge Service Road.
          </p>
        </div>
      </section>

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
            <p className="text-[1.0625rem] leading-relaxed text-ink-muted lg:pb-2">
              Neo Fertility Clinic treats four groups of patients, and the pathway is different for
              each.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
            {/* Image with offset blush panel */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute -left-3 -top-3 bottom-6 right-6 rounded-[1.75rem] bg-clay-50 sm:-left-5 sm:-top-5"
              />
              <img
                src={reception}
                alt="Reception at Neo Fertility Clinic, Marathahalli, Bengaluru"
                width={720}
                height={780}
                loading="lazy"
                className="relative h-64 w-full rounded-[1.5rem] object-cover sm:h-80 lg:h-[26rem]"
              />
            </div>

            {/* Numbered pathway list */}
            <ol className="grid gap-7 sm:gap-8">
              {SEGMENTS.map((segment, i) => (
                <li key={segment.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                  <span
                    aria-hidden
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-clay-50 font-display text-[1.0625rem] font-semibold text-clay-600"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[1.0625rem] font-medium leading-snug text-teal-800 sm:text-[1.125rem]">
                      {segment.title}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                      {segment.copy}
                    </p>
                    <Link
                      to={segment.to}
                      className="mt-2.5 inline-flex items-center gap-1 text-[0.9375rem] font-medium text-teal-700 hover:underline"
                    >
                      Read more <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <Link
            to={ROUTES.whoWeHelp}
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-medium text-teal-700 transition-colors hover:bg-clay-50"
          >
            See all patient pathways <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>


      {/* What we do */}
      <section className="bg-white section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we do"
            title="Fertility, hormones, surgery and pregnancy in one practice"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <InfoCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="How we work"
              title="A sequence you can see from the first consultation"
            />
            <StepList steps={STEPS} />
          </div>
          <div className="space-y-6">
            <img
              src={reception}
              alt="Reception at Neo Fertility Clinic, Scorpio House, Marathahalli"
              width={640}
              height={800}
              loading="lazy"
              className="h-64 w-full rounded-xl object-cover lg:h-80"
            />
            <DoctorNote quote="Most couples do not need IVF on day one. They need someone to find the reason, say it plainly, and start with the simplest treatment that fits it." />
          </div>
        </div>
      </section>

      {/* Why patients choose us */}
      <section className="bg-white section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Neo Fertility Clinic"
            title="What that means in practice"
          />
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((item) => (
              <div key={item.title} className="border-t border-line pt-5">
                <h3>{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-muted">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-teal-900 section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Experience and clinical volume"
            title="Numbers we are willing to publish"
            light
          />
          <div className="mt-10">
            <StatStrip light />
          </div>
          <p className="mt-8 text-[0.8125rem] text-sand/60">{CLINIC.statsAsOf}</p>

          <div className="mt-12 grid gap-10 border-t border-sand/15 pt-10 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-teal-300">Credentials</p>
              <ul className="mt-4 space-y-2 text-[0.9375rem] text-sand/85">
                {QUALIFICATIONS.map((q) => (
                  <li key={q.title}>
                    {q.title} — {q.institution}, {q.year}
                  </li>
                ))}
                {MEMBERSHIPS.map((m) => (
                  <li key={m}>Member, {m}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-teal-300">Where our patients come from</p>
              <p className="mt-4 text-[0.9375rem] text-sand/80">
                The clinic sits on Marathahalli Bridge Service Road, opposite Purva Apartments, which
                puts it within twenty to thirty minutes of most of east Bangalore. {CLINIC.catchment}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to={ROUTES.whitefield}
                  className="rounded-md border border-sand/25 px-4 py-2 text-[0.875rem] text-sand hover:bg-sand/10"
                >
                  IVF clinic in Whitefield
                </Link>
                <Link
                  to={ROUTES.bellandur}
                  className="rounded-md border border-sand/25 px-4 py-2 text-[0.875rem] text-sand hover:bg-sand/10"
                >
                  Fertility clinic in Bellandur
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeadFormBand
        heading="Tell us where you are, and we will tell you the next step"
        copy="Share your number and Dr. Payal's team will call you back with a plain answer about what to test first and when to come in."
        sourcePage="home_band"
      />

      <FaqBlock items={FAQS} heading="Frequently asked questions" />
    </>
  );
}
