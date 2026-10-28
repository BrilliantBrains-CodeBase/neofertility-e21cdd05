import { Link } from "@tanstack/react-router";
import { Prose } from "@/components/sections/ServicePage";
import { ROUTES } from "@/data/navigation";
import { CLINIC } from "@/lib/clinic";
import cover from "@/assets/blogs/iui-treatment-process-who-it-suits.webp";
import ogCover from "@/assets/og/og-blog-iui-treatment-process.jpg";
import avatar from "@/assets/dr-payal-avatar.webp";
import type { BlogPostMeta } from "./types";

/* eslint-disable react-refresh/only-export-components --
   A post module is metadata plus its body by design; splitting `meta` into a second
   file per post would double the content tree to satisfy a dev-only HMR rule. */
export const meta: BlogPostMeta = {
  slug: "iui-treatment-process-who-it-suits",
  title: "IUI Treatment: Process, Who It Suits and What Affects Success",
  excerpt:
    "Learn how IUI treatment works, who it may suit, what affects the chance of success and how doctors decide between IUI and IVF.",
  intro:
    "For many couples, IUI treatment is one of the first fertility options a doctor discusses. It is simpler than IVF, it works with the body’s own cycle, and it does not need an egg retrieval or a laboratory to create embryos. It is not right for everyone, though, and knowing why helps you make a sound decision.",
  category: "IUI",
  readMinutes: 6, // 1173 words
  author: { name: CLINIC.doctor, avatar },
  cover: {
    src: cover,
    alt: "IUI treatment guide: an expecting couple beside an illustration of the uterus and IUI catheter, Neo Fertility Clinic",
    width: 720,
    height: 360,
    ogSrc: ogCover,
  },
  metaTitle: "IUI Treatment: Process, Suitability and Success",
  metaDescription:
    "Learn how IUI treatment works, who it may suit, what affects the chance of success and how doctors decide between IUI and IVF.",
  related: [
    { label: "IUI treatment", to: ROUTES.iui },
    { label: "Infertility evaluation and treatment", to: ROUTES.infertility },
    { label: "Ovulation calculator", to: ROUTES.ovulationCalculator },
    { label: "IVF treatment", to: ROUTES.ivf },
    { label: "Neo Fertility home", to: ROUTES.home },
    { label: "Contact and directions", to: ROUTES.contact },
  ],
  cta: {
    heading: "Considering IUI? Start with a full assessment.",
    copy: "Book a consultation with Dr. Payal Mahapatra at our Marathahalli clinic to find out whether IUI suits you.",
    sourcePage: "blog-iui-treatment",
    whatsappMessage:
      "Hi, I read your article on IUI treatment and would like to book a consultation.",
  },
  faqs: [
    {
      q: "Is IUI painful?",
      a: "Most women find it similar to a routine pelvic exam. Some feel mild cramping during or after the procedure, which usually settles quickly.",
    },
    {
      q: "How many IUI cycles should we try?",
      a: "It depends on your age and diagnosis. Doctors often plan a few cycles and then review whether to continue or consider IVF.",
    },
    {
      q: "Do I need to rest after IUI?",
      a: "You can usually go back to normal daily activities the same day. Your doctor will tell you if anything should be avoided in your case.",
    },
    {
      q: "Can IUI be done without fertility medicines?",
      a: "Yes. It can be done in a natural cycle. Medicines are added when ovulation is irregular or when your doctor feels they may help.",
    },
    {
      q: "When should we move from IUI to IVF?",
      a: "This depends on age, tube health, sperm quality and how many cycles you have tried. Your doctor will review this with you after each cycle.",
    },
  ],
};

const linkClass = "text-pink-700 underline";

export function Body() {
  return (
    <>
      <Prose>
        <p>
          This guide explains what IUI is, how a cycle works, who it may suit, what affects the
          chance of success and when a doctor may suggest a different route.
        </p>
      </Prose>

      <Prose title="What Is IUI?">
        <p>
          IUI stands for intrauterine insemination. Around the time of ovulation, a prepared sample
          of sperm is placed directly into the uterus using a thin, soft tube. This puts a higher
          number of healthy, moving sperm closer to the egg than intercourse alone would.
          Fertilisation still happens naturally inside the fallopian tube, so at least one tube must
          be open. Our{" "}
          <Link to={ROUTES.iui} className={linkClass}>
            IUI treatment page
          </Link>{" "}
          covers how the clinic approaches it.
        </p>
      </Prose>

      <Prose title="Who Intrauterine Insemination May Suit">
        <p>A doctor may suggest IUI when:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>The male factor is mild.</strong> Sperm count or movement is a little below
            normal, but not severely.
          </li>
          <li>
            <strong>Infertility is unexplained.</strong> Tests for both partners are normal, yet
            pregnancy has not happened.
          </li>
          <li>
            <strong>Ovulation is irregular.</strong> IUI is often combined with medicines that help
            the ovaries release an egg.
          </li>
          <li>
            <strong>There is a cervical factor.</strong> Cervical mucus may make it hard for sperm
            to pass through.
          </li>
          <li>
            <strong>Intercourse is difficult.</strong> Pain, timing problems or sexual dysfunction
            can make IUI a practical option.
          </li>
          <li>
            <strong>Donor sperm is being used.</strong> IUI is a common way to use donor sperm.
          </li>
        </ul>
      </Prose>

      <Prose title="When IUI May Not Be the Right Choice">
        <p>
          IUI is less likely to help when both tubes are blocked, when the sperm count is very low,
          or when a woman has severe endometriosis. A low ovarian reserve or a woman’s age may also
          lead a doctor to suggest moving to IVF sooner. This is why a full assessment matters
          before treatment begins. Our{" "}
          <Link to={ROUTES.infertility} className={linkClass}>
            infertility evaluation page
          </Link>{" "}
          explains the tests usually done for both partners.
        </p>
      </Prose>

      <Prose title="How an IUI Cycle Works, Step by Step">
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>Assessment.</strong> A semen analysis, a check that the tubes are open and tests
            of ovulation and hormones.
          </li>
          <li>
            <strong>Natural or stimulated cycle.</strong> Some cycles use no medicines. Others use
            tablets or injections to help one or two follicles grow.
          </li>
          <li>
            <strong>Monitoring.</strong> Ultrasound scans track the follicle as it grows and the
            lining of the uterus.
          </li>
          <li>
            <strong>Timing ovulation.</strong> When the follicle is ready, a trigger injection may
            be given to time ovulation.
          </li>
          <li>
            <strong>Sperm preparation.</strong> On the day of the procedure, the semen sample is
            washed in the laboratory to separate the healthiest moving sperm.
          </li>
          <li>
            <strong>Insemination.</strong> The sample is placed into the uterus. It takes a few
            minutes and feels similar to a routine pelvic exam.
          </li>
          <li>
            <strong>Pregnancy test.</strong> A test is usually done about two weeks later.
          </li>
        </ol>
        <p>
          Knowing your cycle helps with planning. Our{" "}
          <Link to={ROUTES.ovulationCalculator} className={linkClass}>
            ovulation calculator
          </Link>{" "}
          gives a rough guide to your fertile days, though scans give a far more precise picture
          during treatment.
        </p>
      </Prose>

      <Prose title="Understanding the IUI Treatment Success Rate">
        <p>
          Couples often search for the IUI treatment success rate, but a single figure says little
          about your own chances. The factors that matter most are:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>The woman’s age.</strong> Egg quality falls with age, which affects every
            fertility treatment.
          </li>
          <li>
            <strong>The cause of infertility.</strong> IUI tends to suit some causes better than
            others.
          </li>
          <li>
            <strong>Sperm quality after washing.</strong> The number of moving sperm in the prepared
            sample matters.
          </li>
          <li>
            <strong>Tube health.</strong> At least one healthy, open tube is needed.
          </li>
          <li>
            <strong>The number of cycles.</strong> Doctors often plan a few cycles and then review
            the approach.
          </li>
        </ul>
        <p>
          Your doctor can explain how these factors apply to you. Be cautious of any clinic that
          promises a result.
        </p>
      </Prose>

      <Prose title="Possible Side Effects and Risks">
        <p>
          The procedure is usually well tolerated. Some women feel mild cramping or notice light
          spotting afterwards. When fertility medicines are used, more than one follicle can grow,
          which raises the chance of twins or more. Careful monitoring helps reduce this risk.
          Rarely, the ovaries can over-respond to medicines, or an infection can occur. Contact your
          clinic if you have severe pain, fever or heavy bleeding.
        </p>
      </Prose>

      <Prose title="IUI or IVF: How Doctors Decide">
        <p>
          IUI is simpler and less intensive, but it relies on the egg and sperm meeting inside the
          body. IVF moves fertilisation into the laboratory. Doctors usually weigh the woman’s age,
          tube health, sperm quality and how long a couple has been trying. Some couples start with
          IUI and move to IVF if it does not work after a few cycles. Others are advised to go
          straight to IVF. Neither path is right for everyone.
        </p>
      </Prose>

      <Prose title="Finding the Right Clinic Nearby">
        <p>
          When you search for an infertility specialist near me, infertility treatment near me or
          IUI treatment near me, it helps to know what to look for. Choose a clinic that assesses
          both partners, explains why IUI is or is not suggested, and monitors each cycle with
          scans. Easy access matters too, since a cycle can involve several short visits.
        </p>
      </Prose>

      <Prose title="Preparing for Your First Consultation">
        <p>
          Bring any earlier test reports, scan results and a record of your periods. Note how long
          you have been trying and any medicines you take. Useful questions include:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Why do you suggest IUI for us?</li>
          <li>Will the cycle be natural or stimulated?</li>
          <li>How many cycles do you suggest before we review?</li>
          <li>What would make you suggest IVF instead?</li>
        </ul>
      </Prose>

      <Prose title="Conclusion">
        <h3 className="text-[1.25rem] text-plum-900">
          Take the Next Step Towards Your Fertility Goals
        </h3>
        <p>
          IUI treatment can be a suitable option for couples facing certain fertility challenges,
          but the right approach depends on factors such as age, reproductive health, and underlying
          fertility concerns. A proper evaluation and timely medical guidance can help you
          understand your options and make informed decisions.
        </p>
        <p>
          At Neo Fertility Clinic, Bangalore, we focus on understanding each couple's fertility
          concerns and recommending treatment options based on their individual needs. If you're
          considering IUI treatment or have questions about your fertility, you can consult our
          specialists at our clinic in Munnekolala, near Marathahalli Bridge, Bengaluru. For
          appointments or enquiries, contact us at{" "}
          <a href={CLINIC.phoneHref} className={linkClass}>
            {CLINIC.phoneDisplay}
          </a>{" "}
          or visit{" "}
          <Link to={ROUTES.home} className={linkClass}>
            neofertility.co.in
          </Link>
          .
        </p>
        <p className="text-[0.875rem] italic">
          This article is for general information and does not replace an in-person consultation.
          Suitability and results vary from person to person.
        </p>
      </Prose>
    </>
  );
}
