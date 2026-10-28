import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  Baby,
  CalendarCheck,
  ChevronDown,
  ChevronRight,
  Clock,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Phone,
  Scissors,
  Snowflake,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import { PatientReviews } from "@/components/sections/PatientReviews";
import { Reveal } from "@/components/motion/Reveal";
import { useTimelineProgress } from "@/hooks/use-timeline-progress";
import { cn } from "@/lib/utils";
import { Breadcrumbs, StatStrip, FaqBlock, RelatedLinks } from "@/components/sections/blocks";
import { COMMON_RELATED } from "@/components/sections/ServicePage";
import { CLINIC, QUALIFICATIONS, MEMBERSHIPS, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { OG_DOCTOR, breadcrumbSchema, doctorSchema, faqSchema, jsonLd, pageMeta } from "@/lib/seo";
import portraitAsset from "@/assets/dr-payal-hero.webp";
/* The same portrait the home page's FAQ carries, so the two blocks read as one design.
   Deliberately not dr-payal-portrait.jpg: that asset shows a different woman from the
   real photographs in dr-payal-hero.webp and dr-payal-desk.png, so captioning it with
   the doctor's name would misrepresent who is treating you. It stays unused. */
import faqImage from "@/assets/faq-mother-newborn.webp";
import reception from "@/assets/clinic-reception.webp";
import waitingArea from "@/assets/clinic-waiting-area.webp";
import consultRoom from "@/assets/clinic-consult-room.webp";
import bothPartners from "@/assets/treatment-fertility-diagnosis.webp";
import ovulationTracking from "@/assets/iui-Ovulation.webp";
import reviewDiscussion from "@/assets/visit-review.webp";
import ultrasoundRoom from "@/assets/clinic-ultrasound.webp";
import procedureRoom from "@/assets/clinic-procedure-room.webp";

const FAQS = [
  {
    q: "What are Dr. Payal Mahapatra's qualifications?",
    a: "MBBS from MGM Medical College Jamshedpur in 2005, DGO in Obstetrics and Gynecology from RIMS Ranchi in 2011, DNB from Sagar Apollo Bangalore in 2014, and a Fellowship in Reproductive Medicine from IIRRH in 2017. She is a member of ISAR and FOGSI.",
  },
  {
    q: "How many years of experience does Dr. Payal Mahapatra have?",
    a: "Eighteen years of clinical experience across obstetrics, gynecology and reproductive medicine, with more than 80,000 gynecology patients, 6,789 IUI procedures and 2,046 IVF cycles.",
  },
  {
    q: "Is there a female fertility doctor in Marathahalli?",
    a: "Yes. Dr. Payal Mahapatra is a female fertility specialist and gynecologist practising at Neo Fertility Clinic on Marathahalli Bridge Service Road, open all seven days.",
  },
  {
    q: "Does the same doctor handle the pregnancy after IVF?",
    a: "Yes. Dr. Payal Mahapatra manages the pregnancy that follows fertility treatment, including high-risk pregnancy care. Most fertility clinics transfer patients to a separate obstetrician at around eight weeks.",
  },
  {
    q: "Does Dr. Payal Mahapatra perform the scans herself?",
    a: "Yes. Follicular tracking, endometrial assessment and antral follicle counts are performed by her rather than delegated, because in fertility treatment the scan is the clinical decision.",
  },
];

const FOCUS_AREAS: { title: string; copy: string; to: string; icon: LucideIcon }[] = [
  {
    title: "Assisted reproduction",
    copy: "IVF, ICSI, IUI, ovulation induction, frozen embryo transfer, donor gamete programmes.",
    to: ROUTES.fertilitySolutions,
    icon: FlaskConical,
  },
  {
    title: "Fertility preservation",
    copy: "Egg freezing before cancer treatment, before ovarian surgery, and for elective deferral of pregnancy.",
    to: ROUTES.eggFreezing,
    icon: Snowflake,
  },
  {
    title: "Reproductive endocrinology",
    copy: "PCOS and PMOS, PCOD, thyroid and prolactin disorders, insulin resistance, hyperandrogenism.",
    to: ROUTES.pcos,
    icon: Activity,
  },
  {
    title: "Reproductive surgery",
    copy: "Hysteroscopy for polyps, submucous fibroids, adhesions and septum. Laparoscopy for endometriosis, adhesions, ovarian cysts and tubal disease.",
    to: ROUTES.laparoscopy,
    icon: Scissors,
  },
  {
    title: "Recurrent pregnancy loss",
    copy: "Investigation and management of repeated miscarriage and repeated implantation failure.",
    to: ROUTES.infertility,
    icon: HeartPulse,
  },
  {
    title: "High-risk obstetrics",
    copy: "Gestational diabetes, hypertensive disorders, IVF pregnancies, previous caesarean, twins.",
    to: ROUTES.pregnancyCare,
    icon: Baby,
  },
];

/* Step three is the clinic's own photograph of Dr. Payal at the scanner, which is why it
   is no longer in the clinic strip below — it does more work here, showing the exact
   claim the step makes. The other three are library images, so their alt text describes
   a generic scene and does not put this clinic or this doctor in the frame. */
const CONSULT_STEPS = [
  {
    title: "Both partners investigated from the start",
    copy: "A male factor contributes in roughly half of infertility cases, yet semen analysis is often deferred. Here it happens in the first week.",
    image: bothPartners,
    width: 720,
    height: 360,
    alt: "A couple going through fertility investigations with a specialist",
  },
  {
    title: "The simplest effective treatment comes first",
    copy: "Where the diagnosis supports it, ovulation induction with timed intercourse is attempted before IUI, and IUI before IVF. Where IVF is the right first step, that is said plainly.",
    image: ovulationTracking,
    width: 800,
    height: 1000,
    alt: "Ovulation test strips being read against a tracking chart",
  },
  {
    title: "Scans performed by the treating doctor",
    copy: "Follicular tracking, endometrial assessment and antral follicle counts are performed by Dr. Payal Mahapatra rather than delegated.",
    image: ultrasoundRoom,
    width: 650,
    height: 450,
    alt: `${CLINIC.doctor} performing an ultrasound scan at Neo Fertility Clinic`,
  },
  {
    title: "A review point agreed before treatment starts",
    copy: "Three to four IUI cycles, or one IVF cycle, then a formal review, rather than a drift into cycles that were never going to work.",
    image: reviewDiscussion,
    width: 735,
    height: 490,
    alt: "A doctor going through test results with a patient across a desk",
  },
];

/* Photographs of the clinic itself, in the order a patient meets the rooms. All five
   images on this page are the clinic's own; the generated stand-ins they replaced are
   gone from the repository. There is no laboratory photograph, so the strip no longer
   claims one — the facilities sentence below still lists it, in text, where it belongs. */
const CLINIC_PHOTOS = [
  {
    src: waitingArea,
    width: 768,
    height: 576,
    alt: "Waiting area at Neo Fertility Clinic, with the doctor's qualifications framed on the wall",
  },
  {
    src: consultRoom,
    width: 768,
    height: 522,
    alt: `${CLINIC.doctor}'s consulting room at Neo Fertility Clinic, Marathahalli`,
  },
  {
    src: procedureRoom,
    width: 768,
    height: 576,
    alt: "Procedure room at Neo Fertility Clinic, Marathahalli",
  },
];

/* One string rather than JSX text, so the clamped paragraph has a single text node.
   Every word of it stays in the server-rendered HTML — the collapse below is `line-clamp`,
   which only limits how many lines are painted. Nothing is `display: none` and nothing is
   fetched on click, so a crawler and a screen reader both get the whole paragraph. */
const HERO_INTRO =
  "Dr. Payal Mahapatra is a fertility specialist and gynecologist practising in Marathahalli, Bengaluru. She holds an MBBS from MGM Medical College Jamshedpur, a DGO in Obstetrics and Gynecology from RIMS Ranchi, a DNB from Sagar Apollo Bangalore, and a Fellowship in Reproductive Medicine from IIRRH. She has 18 years of clinical experience, is a member of ISAR and FOGSI, and founded Neo Fertility Clinic.";

const HERO_GLOW =
  "radial-gradient(72% 120% at 82% 8%, color-mix(in oklab, var(--pink-500) 30%, transparent), transparent 66%)";

export const Route = createFileRoute("/best-gynecologist-and-fertility-doctor-in-marathahalli")({
  head: () => {
    const base = pageMeta({
      title: "Best Gynecologist - Fertility Doctor in Marathahalli",
      description:
        "Dr. Payal Mahapatra, MBBS, DGO, DNB, Fellowship in Reproductive Medicine. 18 years in fertility and gynecology in Marathahalli and Whitefield, Bangalore.",
      path: ROUTES.about,
      image: OG_DOCTOR,
    });
    return {
      ...base,
      scripts: [
        jsonLd(doctorSchema),
        jsonLd(faqSchema(FAQS)),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: ROUTES.home },
            { name: "About", path: ROUTES.about },
          ]),
        ),
      ],
    };
  },
  component: AboutPage,
});

/**
 * The page's own hero, rather than the flat interior `PageHero` band.
 *
 * `data-hero` puts the transparent navbar over it, exactly as on the home page — which
 * is why the copy column carries the same pt-42/lg:pt-40 clearance, and why the top
 * scrim is here: the portrait reaches up behind the bar from lg, so the light nav text
 * needs a guaranteed dark ground.
 */
function DoctorHero() {
  /* Collapsed on the server too, so hydration matches and the hero never reflows. The
     middle sentence is the qualification list, which the chips underneath already show
     — two lines is enough to carry the claim before a reader chooses to go on. */
  const [introOpen, setIntroOpen] = useState(false);

  return (
    <section
      data-hero
      aria-label={`${CLINIC.doctor}, fertility specialist`}
      className="relative w-full overflow-hidden bg-plum-900"
      style={{ backgroundImage: HERO_GLOW }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-48 bg-linear-to-b from-black/55 via-black/25 to-transparent"
      />

      <div className="container-page">
        {/* Copy before the portrait in both DOM and visual order. Leading with the
            photograph on a phone pushed the h1 and both CTAs below the fold — the
            visitor met a picture and nothing to act on. */}
        <div className="grid items-center gap-10 pt-42 pb-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 lg:pt-40 lg:pb-20">
          <div>
            <Breadcrumbs light trail={[{ name: "Home", to: ROUTES.home }, { name: "About" }]} />

            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-paper/25 bg-plum-900/60 px-4 py-1.5 text-[0.75rem] font-medium tracking-[0.16em] text-paper uppercase backdrop-blur-sm">
              <span aria-hidden className="size-2 rounded-full bg-pink-300" />
              {CLINIC.doctor}
            </p>

            <h1 className="mt-5 text-[2.125rem] leading-[1.1] sm:text-[2.75rem] lg:text-[3.25rem]">
              <span className="block font-semibold text-paper">
                Fertility Specialist and Gynecologist,
              </span>
              <span className="block font-normal text-pink-300 italic">Marathahalli</span>
            </h1>

            <p
              id="doctor-intro"
              className={cn(
                "mt-5 max-w-[62ch] text-[1rem] leading-relaxed text-paper/85 lg:text-[1.0625rem]",
                !introOpen && "line-clamp-2",
              )}
            >
              {HERO_INTRO}
            </p>

            <button
              type="button"
              onClick={() => setIntroOpen((open) => !open)}
              aria-expanded={introOpen}
              aria-controls="doctor-intro"
              className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-pink-300 transition-colors hover:text-paper"
            >
              {introOpen ? "Read less" : "Read more"}
              <ChevronDown
                aria-hidden
                className={cn(
                  "size-4 transition-transform duration-200",
                  introOpen && "rotate-180",
                )}
              />
            </button>

            {/* The qualifications, not a list of adjectives — same source as the timeline
                further down, so the two can never disagree. */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {QUALIFICATIONS.map((q) => (
                <li
                  key={q.title}
                  className="rounded-full border border-paper/20 bg-paper/5 px-3.5 py-1.5 text-[0.8125rem] text-paper/90"
                >
                  {q.title}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-row flex-wrap items-center gap-3">
              <AppointmentSheet sourcePage="about_hero">
                <Button
                  variant="cta"
                  className="h-auto min-h-12 rounded-full px-6 py-3 text-[0.9375rem] font-medium tracking-[0.01em] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 lg:px-[30px] lg:py-[15px]"
                >
                  <CalendarCheck className="size-4" />
                  Book a consultation
                </Button>
              </AppointmentSheet>
              <a
                href={CLINIC.phoneHref}
                onClick={() => track("call_click", { source_page: "about_hero" })}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-background/90 px-6 py-3 text-center text-[0.9375rem] font-medium whitespace-nowrap text-pink-700 shadow-md backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 hover:text-primary lg:px-[30px] lg:py-[15px]"
              >
                <Phone className="mr-2 size-4" />
                Call {CLINIC.phoneDisplay}
              </a>
            </div>
          </div>

          {/* The LCP element: no lazy loading, and the frame reserves its ratio so the
              hero cannot shift as it decodes. Capped below lg so a 13:18 portrait at full
              phone width does not run to 540px tall on its own. */}
          <div className="mx-auto w-full max-w-[17rem] overflow-hidden rounded-[2rem] bg-plum-900/40 sm:max-w-[20rem] lg:mx-0 lg:max-w-[26rem] lg:justify-self-end">
            <img
              src={portraitAsset}
              alt={`${CLINIC.doctor}, fertility specialist at Neo Fertility Clinic Marathahalli`}
              width={650}
              height={900}
              fetchPriority="high"
              className="aspect-13/18 w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The qualifications, on the same filling connector the home page's "How we work"
 * timeline uses — the track greys out ahead of the fill and each year lights up as it
 * is reached, so eighteen years read as progression rather than as four separate facts.
 *
 * The marker is the year itself rather than an ordinal. Every year is four digits, so
 * the pill can be a fixed width, which is what lets the vertical track sit exactly on
 * its centre without measuring anything.
 */
function QualificationTimeline() {
  const { ref, progress } = useTimelineProgress();

  const lastIndex = Math.max(1, QUALIFICATIONS.length - 1);
  const reached = (i: number) => progress >= i / lastIndex - 0.001;
  /* How far the connector leaving marker `i` has filled, 0 → 1. */
  const segment = (i: number) => Math.min(1, Math.max(0, (progress - i / lastIndex) * lastIndex));

  const marker = (i: number) =>
    cn(
      "font-stat relative z-10 grid h-10 w-20 shrink-0 place-items-center rounded-full text-[0.9375rem] font-bold tabular-nums transition-colors duration-300",
      reached(i) ? "bg-plum-900 text-paper" : "border border-line bg-background text-ink-muted",
    );

  return (
    <div ref={ref}>
      {/* From lg: one row, fill runs left to right. Four equal columns put the first and
          last marker centres at 12.5% and 87.5%, so the track spans the 75% between.
          The track lives on the wrapper, not inside the <ol> — an <ol> may only hold
          <li>, and two stray spans in it stop it being announced as a list of four. */}
      <div className="relative mt-14 hidden lg:block">
        <span aria-hidden className="absolute top-5 right-[12.5%] left-[12.5%] h-px bg-line" />
        <span
          aria-hidden
          className="absolute top-5 left-[12.5%] h-px bg-pink-700 transition-none"
          style={{ width: `calc(75% * ${progress})` }}
        />

        <ol className="grid grid-cols-4 gap-x-4">
          {QUALIFICATIONS.map((q, i) => (
            <li key={q.title} className="flex flex-col items-center px-3 text-center">
              <span className={marker(i)}>{q.year}</span>
              <h3 className="mt-5 max-w-[22ch] text-[1rem] leading-snug font-semibold text-plum-900">
                {q.title}
              </h3>
              <p className="mt-2 max-w-[26ch] text-[0.875rem] leading-relaxed text-ink-muted">
                {q.institution}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Below lg: vertical, fill runs top to bottom. One connector per entry rather
          than a single track down the whole list — the last institution runs to three
          lines, and a track measured against the list's full height trailed well past
          the 2017 marker into empty space. Each segment instead spans exactly from the
          bottom of its own marker to the top of the next. left-10 is the centre of the
          w-20 pill; top-10 is its full height. */}
      <ol className="relative mt-12 lg:hidden">
        {QUALIFICATIONS.map((q, i) => (
          <li key={q.title} className="relative flex gap-5 pb-8 last:pb-0">
            {i < lastIndex && (
              <>
                <span aria-hidden className="absolute top-10 bottom-0 left-10 w-px bg-line" />
                <span
                  aria-hidden
                  className="absolute top-10 left-10 w-px bg-pink-700"
                  style={{ height: `calc((100% - 2.5rem) * ${segment(i)})` }}
                />
              </>
            )}
            <span className={marker(i)}>{q.year}</span>
            <div className="pt-1">
              <h3 className="text-[1.0625rem] leading-snug font-semibold text-plum-900">
                {q.title}
              </h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                {q.institution}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* Three facts a visitor checks before reading anything else. Every string comes from
   CLINIC — nothing here is new copy. */
const TRUST_FACTS: { icon: LucideIcon; value: string }[] = [
  { icon: GraduationCap, value: CLINIC.credentialsShort },
  { icon: Stethoscope, value: CLINIC.experience },
  { icon: Clock, value: CLINIC.hours },
];

function TrustBar() {
  return (
    <section aria-label="Credentials at a glance" className="border-b border-line bg-pink-25 py-6">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
        {TRUST_FACTS.map((fact) => (
          <p
            key={fact.value}
            className="flex items-center gap-2.5 text-[0.9375rem] font-medium text-plum-900"
          >
            <fact.icon aria-hidden className="size-4 shrink-0 text-pink-700" />
            {fact.value}
          </p>
        ))}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <DoctorHero />
      <TrustBar />

      <section className="bg-white section-y">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <Reveal>
            <p className="eyebrow">Background</p>
            <h2 className="mt-2 text-[1.75rem] leading-[1.15] sm:text-[2.125rem]">
              <span className="block font-semibold">From gynecology</span>
              <span className="block font-normal text-pink-700 italic">
                into reproductive medicine
              </span>
            </h2>
            <p className="prose-measure mt-5 text-ink-muted">
              Dr. Payal Mahapatra qualified in medicine in 2005 and specialised in obstetrics and
              gynecology before moving into reproductive medicine. The Fellowship in Reproductive
              Medicine she completed at IIRRH in 2017 is what separates a general gynecologist from
              a fertility specialist: it is dedicated training in ovarian stimulation protocols,
              assisted reproduction, embryology liaison and the management of failed cycles.
            </p>
            <p className="prose-measure mt-4 text-ink-muted">
              She founded Neo Fertility Clinic to run fertility treatment and obstetric care as one
              continuous service rather than two separate ones. Most fertility clinics hand a
              patient over once the pregnancy is confirmed at around eight weeks. Here the same
              doctor who managed the treatment manages the pregnancy, including high-risk
              pregnancies, which a substantial proportion of IVF pregnancies are.
            </p>
          </Reveal>

          {/* 4:3, matching the photograph. The generated portrait this replaced was 4:5;
              holding that frame cropped the real reception desk down to its middle. */}
          <Reveal
            delay={80}
            className="overflow-hidden rounded-[2rem] bg-pink-50 lg:max-w-[26rem] lg:justify-self-end"
          >
            <img
              src={reception}
              alt="The reception desk at Neo Fertility Clinic, Scorpio House, Marathahalli"
              width={768}
              height={576}
              loading="lazy"
              className="aspect-4/3 w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-pink-25 section-y">
        <div className="container-page">
          <div className="mx-auto max-w-[52rem] text-center">
            <p className="eyebrow">Qualifications</p>
            <h2 className="mt-2 text-[1.75rem] leading-[1.15] sm:text-[2.125rem]">
              <span className="block font-semibold">Eighteen years,</span>
              <span className="block font-normal text-pink-700 italic">four qualifications</span>
            </h2>
          </div>

          <QualificationTimeline />

          {/* One line, not three pills. The organisations are the content; repeating
              "Member," in front of each of them three times was chrome. */}
          <div className="mt-14 border-t border-line pt-8 text-center">
            <p className="eyebrow">Professional memberships</p>
            {/* Inline items, so the three names reflow as one sentence. As flex children
                they wrapped a whole name at a time, which left the first organisation
                stranded alone on its own line. */}
            <ul className="mx-auto mt-3 max-w-[76ch] text-[0.9375rem] text-ink-muted">
              {MEMBERSHIPS.map((m, index) => (
                <li key={m} className="inline">
                  {index > 0 && <span aria-hidden> &middot; </span>}
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white section-y">
        <div className="container-page">
          <div className="mx-auto max-w-[52rem] text-center">
            <p className="eyebrow">Clinical focus</p>
            <h2 className="mt-2 text-[1.75rem] leading-[1.15] sm:text-[2.125rem]">
              <span className="block font-semibold">What she treats</span>
              <span className="block font-normal text-pink-700 italic">week in, week out</span>
            </h2>
          </div>

          {/* Hairline rows rather than six shadowed cards. The whole row is the link, so
              the six repeated "Read more" labels are gone — the chevron and the hover
              state carry the affordance, and the copy is what is left to read. */}
          <ul className="mx-auto mt-10 grid max-w-[72rem] sm:grid-cols-2 sm:gap-x-12 lg:gap-x-20">
            {FOCUS_AREAS.map((area, index) => (
              /* The rule sits on the <li> — the grid item — so the row divider lines up
                 across both columns whatever height the copy takes, and stays put while
                 the Reveal inside it is still animating. */
              <li key={area.title} className="border-t border-line">
                <Reveal delay={index * 60}>
                  <Link
                    to={area.to}
                    className="group flex items-start gap-5 py-7 focus-visible:[outline-offset:-3px]"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border border-pink-300 text-pink-700 transition-colors duration-300 group-hover:bg-pink-600 group-hover:text-paper"
                    >
                      <area.icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <h3 className="text-[1.125rem] leading-snug font-semibold text-plum-900 transition-colors duration-200 group-hover:text-pink-700">
                        {area.title}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                        {area.copy}
                      </p>
                    </span>
                    <ChevronRight
                      aria-hidden
                      className="mt-3 size-4 shrink-0 text-pink-700 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-pink-25 section-y">
        <div className="container-page">
          <div className="mx-auto max-w-[52rem] text-center">
            <p className="eyebrow">How she practises</p>
            <h2 className="mt-2 text-[1.75rem] leading-[1.15] sm:text-[2.125rem]">
              <span className="block font-semibold">What a first consultation</span>
              <span className="block font-normal text-pink-700 italic">is like</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[62ch] text-ink-muted">
              A sequence you can see and check for yourself, from the first appointment onward.
            </p>
          </div>

          {/* Four numbered markers threaded on one rule, which is what a sequence looks
              like. As two columns of boxes the order had to be inferred from the
              numerals alone. The rule is inset to the centre of the 44px marker. */}
          <ol className="mx-auto mt-12 max-w-[72rem]">
            {CONSULT_STEPS.map((step, index) => (
              <li key={step.title} className="relative list-none pb-8 last:pb-0">
                {/* A connector per step rather than one rule down the whole list: it runs
                    from under this marker to the next one, so the line stops at step 4
                    instead of trailing past it to the end of the last paragraph. `left`
                    is the centre of the 44px marker. It is a sibling of Reveal, not a
                    child, so the entrance transform does not drag it out of place. */}
                {index < CONSULT_STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute top-11 bottom-0 left-[1.375rem] w-px bg-line"
                  />
                )}
                <Reveal delay={index * 60} className="flex gap-6">
                  <span
                    aria-hidden
                    className="font-stat grid size-11 shrink-0 place-items-center rounded-full bg-plum-900 text-[1.0625rem] font-bold text-paper"
                  >
                    {index + 1}
                  </span>
                  {/* Copy and photograph side by side from sm, stacked below it. The
                      thumbnail is fixed-width rather than a grid fraction so all four
                      line up down the right regardless of how long the copy runs. */}
                  <div className="min-w-0 flex-1 pt-1.5 sm:flex sm:items-start sm:gap-10">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[1.125rem] leading-snug font-semibold text-plum-900">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[64ch] text-[0.9375rem] leading-relaxed text-ink-muted">
                        {step.copy}
                      </p>
                    </div>
                    <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white sm:mt-0 sm:w-44 sm:shrink-0 lg:w-56">
                      {/* 3:2 rather than 4:3, and narrower: at 4:3 the photograph stood
                          around 80px taller than a two-line step, which left a hole
                          under every paragraph. */}
                      <img
                        src={step.image}
                        alt={step.alt}
                        width={step.width}
                        height={step.height}
                        loading="lazy"
                        className="aspect-3/2 w-full object-cover"
                      />
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-plum-900 section-y">
        <div className="container-page">
          <div className="mx-auto max-w-[52rem] text-center">
            <p className="eyebrow text-pink-300">Clinical volume</p>
            <h2 className="mt-2 text-[1.75rem] leading-[1.15] sm:text-[2.125rem]">
              <span className="block font-semibold text-paper">Numbers we are</span>
              <span className="block font-normal text-pink-300 italic">willing to publish</span>
            </h2>
          </div>
          <div className="mt-12">
            <StatStrip light />
          </div>
          <p className="mt-10 text-center text-[0.8125rem] text-paper/60">{CLINIC.statsAsOf}</p>
        </div>
      </section>

      {/* pink-25, not white: the FaqBlock that follows is white, and two white bands in
          a row lost the alternation the rest of the page keeps. */}
      <section className="bg-pink-25 section-y">
        <div className="container-page">
          <div className="mx-auto max-w-[52rem] text-center">
            <p className="eyebrow">The clinic</p>
            <h2 className="mt-2 text-[1.75rem] leading-[1.15] sm:text-[2.125rem]">
              <span className="block font-semibold">Scorpio House,</span>
              <span className="block font-normal text-pink-700 italic">
                Marathahalli Bridge Service Road
              </span>
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {CLINIC_PHOTOS.map((photo, index) => (
              <Reveal
                key={photo.alt}
                delay={index * 60}
                className="group overflow-hidden rounded-[1.75rem] border border-line bg-pink-50"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Reveal>
            ))}
          </div>

          <p className="prose-measure mx-auto mt-10 text-center text-ink-muted">
            Neo Fertility Clinic occupies the first floor of Scorpio House on Marathahalli Bridge
            Service Road, opposite Purva Apartments. Facilities include consultation rooms, an
            ultrasound room, a procedure room and an equipped laboratory, and the clinic operates
            all seven days from 09:30 to 18:30.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[0.9375rem] text-pink-700">
            <Link
              to={ROUTES.contact}
              className="inline-flex min-h-11 items-center gap-1 hover:underline"
            >
              Address and directions
              <ChevronRight className="size-4" />
            </Link>
            <Link
              to={ROUTES.patientStories}
              className="inline-flex min-h-11 items-center gap-1 hover:underline"
            >
              Patient stories
              <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <FaqBlock
        items={FAQS}
        image={{
          src: faqImage,
          alt: "A mother in profile looking down at her sleeping newborn held against her chest",
          width: 784,
          height: 1168,
        }}
      />

      <PatientReviews />

      <RelatedLinks links={COMMON_RELATED.filter((l) => l.to !== ROUTES.about)} />

      <ClosingCta
        heading="Meet Dr. Payal Mahapatra at your first consultation"
        copy="Bring your previous reports. Both partners are seen and investigated from the first visit."
        sourcePage="about_closing"
        whatsappMessage="Hi, I'd like to book a consultation with Dr. Payal Mahapatra."
      />
    </>
  );
}
