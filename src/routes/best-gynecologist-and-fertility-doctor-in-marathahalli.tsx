import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import {
  PageHero,
  SectionHeading,
  StatStrip,
  StepList,
  InfoCard,
  FaqBlock,
} from "@/components/sections/blocks";
import { CLINIC, QUALIFICATIONS, MEMBERSHIPS } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, doctorSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import portrait from "@/assets/dr-payal-portrait.jpg";
import reception from "@/assets/clinic-reception.jpg";

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

const FOCUS_AREAS = [
  {
    title: "Assisted reproduction",
    copy: "IVF, ICSI, IUI, ovulation induction, frozen embryo transfer, donor gamete programmes.",
    to: ROUTES.fertilitySolutions,
  },
  {
    title: "Fertility preservation",
    copy: "Egg freezing before cancer treatment, before ovarian surgery, and for elective deferral of pregnancy.",
    to: ROUTES.eggFreezing,
  },
  {
    title: "Reproductive endocrinology",
    copy: "PCOS and PMOS, PCOD, thyroid and prolactin disorders, insulin resistance, hyperandrogenism.",
    to: ROUTES.pcos,
  },
  {
    title: "Reproductive surgery",
    copy: "Hysteroscopy for polyps, submucous fibroids, adhesions and septum. Laparoscopy for endometriosis, adhesions, ovarian cysts and tubal disease.",
    to: ROUTES.laparoscopy,
  },
  {
    title: "Recurrent pregnancy loss",
    copy: "Investigation and management of repeated miscarriage and repeated implantation failure.",
    to: ROUTES.infertility,
  },
  {
    title: "High-risk obstetrics",
    copy: "Gestational diabetes, hypertensive disorders, IVF pregnancies, previous caesarean, twins.",
    to: ROUTES.pregnancyCare,
  },
];

const CONSULT_STEPS = [
  {
    title: "Both partners investigated from the start",
    copy: "A male factor contributes in roughly half of infertility cases, yet semen analysis is often deferred. Here it happens in the first week.",
  },
  {
    title: "The simplest effective treatment comes first",
    copy: "Where the diagnosis supports it, ovulation induction with timed intercourse is attempted before IUI, and IUI before IVF. Where IVF is the right first step, that is said plainly.",
  },
  {
    title: "Scans performed by the treating doctor",
    copy: "Follicular tracking, endometrial assessment and antral follicle counts are performed by Dr. Payal Mahapatra rather than delegated.",
  },
  {
    title: "A review point agreed before treatment starts",
    copy: "Three to four IUI cycles, or one IVF cycle, then a formal review, rather than a drift into cycles that were never going to work.",
  },
];

export const Route = createFileRoute("/best-gynecologist-and-fertility-doctor-in-marathahalli")({
  head: () => {
    const base = pageMeta({
      title: "Dr. Payal Mahapatra | Fertility Specialist, Marathahalli",
      description:
        "Dr. Payal Mahapatra, MBBS, DGO, DNB, Fellowship in Reproductive Medicine. 18 years in fertility and gynecology in Marathahalli and Whitefield, Bangalore. ISAR and FOGSI member.",
      path: ROUTES.about,
    });
    return {
      ...base,
      scripts: [
        jsonLd(doctorSchema),
        jsonLd(faqSchema(FAQS)),
        jsonLd(breadcrumbSchema([{ name: "Home", path: ROUTES.home }, { name: "About", path: ROUTES.about }])),
      ],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Dr. Payal Mahapatra"
        title="Fertility Specialist and Gynecologist, Marathahalli"
        intro="Dr. Payal Mahapatra is a fertility specialist and gynecologist practising in Marathahalli, Bengaluru. She holds an MBBS from MGM Medical College Jamshedpur, a DGO in Obstetrics and Gynecology from RIMS Ranchi, a DNB from Sagar Apollo Bangalore, and a Fellowship in Reproductive Medicine from IIRRH. She has 18 years of clinical experience, is a member of ISAR and FOGSI, and founded Neo Fertility Clinic."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "About" }]}
      >
        <img
          src={portrait}
          alt="Dr. Payal Mahapatra, fertility specialist at Neo Fertility Clinic Marathahalli"
          width={720}
          height={480}
          className="h-72 w-full max-w-xl rounded-xl object-cover object-top lg:h-96"
        />
      </PageHero>

      <section className="bg-white section-y">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow="Background" title="From gynecology into reproductive medicine" />
            <p className="prose-measure mt-5 text-ink-muted">
              Dr. Payal Mahapatra qualified in medicine in 2005 and specialised in obstetrics and gynecology
              before moving into reproductive medicine. The Fellowship in Reproductive Medicine she completed
              at IIRRH in 2017 is what separates a general gynecologist from a fertility specialist: it is
              dedicated training in ovarian stimulation protocols, assisted reproduction, embryology liaison
              and the management of failed cycles.
            </p>
            <p className="prose-measure mt-4 text-ink-muted">
              She founded Neo Fertility Clinic to run fertility treatment and obstetric care as one
              continuous service rather than two separate ones. Most fertility clinics hand a patient over
              once the pregnancy is confirmed at around eight weeks. Here the same doctor who managed the
              treatment manages the pregnancy, including high-risk pregnancies, which a substantial
              proportion of IVF pregnancies are.
            </p>
          </div>
          <img
            src={reception}
            alt="Reception at Neo Fertility Clinic, Scorpio House, Marathahalli"
            width={640}
            height={800}
            loading="lazy"
            className="h-72 w-full rounded-xl object-cover lg:h-full"
          />
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Qualifications" title="Timeline" />
          <ol className="mt-8 space-y-6 border-l border-line pl-6">
            {QUALIFICATIONS.map((q) => (
              <li key={q.title} className="relative">
                <span className="absolute top-1.5 -left-[1.6rem] size-2.5 rounded-full bg-teal-600" />
                <p className="font-display text-[1.0625rem] text-teal-900">
                  {q.title} <span className="text-ink-muted">— {q.year}</span>
                </p>
                <p className="mt-1 text-[0.9375rem] text-ink-muted">{q.institution}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <h3>Professional memberships</h3>
            <ul className="mt-3 space-y-2 text-[0.9375rem] text-ink-muted">
              {MEMBERSHIPS.map((m) => (
                <li key={m}>Member, {m}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Clinical focus" title="What she treats" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FOCUS_AREAS.map((area) => (
              <InfoCard key={area.title} {...area} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="How she practises"
            title="What a first consultation is like"
            copy="A sequence you can see and check for yourself, from the first appointment onward."
          />
          <StepList steps={CONSULT_STEPS} />
        </div>
      </section>

      <section className="bg-teal-900 section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Clinical volume" title="Numbers we are willing to publish" light />
          <div className="mt-10">
            <StatStrip light />
          </div>
          <p className="mt-8 text-[0.8125rem] text-sand/60">{CLINIC.statsAsOf}</p>
        </div>
      </section>

      <section className="bg-white section-y">
        <div className="container-page">
          <SectionHeading eyebrow="The clinic" title="Scorpio House, Marathahalli Bridge Service Road" />
          <p className="prose-measure mt-5 text-ink-muted">
            Neo Fertility Clinic occupies the first floor of Scorpio House on Marathahalli Bridge Service
            Road, opposite Purva Apartments. Facilities include consultation rooms, an ultrasound room, a
            procedure room and an equipped laboratory, and the clinic operates all seven days from 09:30 to
            18:30.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-[0.9375rem] text-teal-700">
            <Link to={ROUTES.contact} className="hover:underline">
              Address and directions
            </Link>
            <Link to={ROUTES.patientStories} className="hover:underline">
              Patient stories
            </Link>
          </div>
        </div>
      </section>

      <FaqBlock items={FAQS} />

      <ClosingCta
        heading="Meet Dr. Payal Mahapatra at your first consultation"
        copy="Bring your previous reports. Both partners are seen and investigated from the first visit."
        sourcePage="about_closing"
        whatsappMessage="Hi, I'd like to book a consultation with Dr. Payal Mahapatra."
      />
    </>
  );
}
