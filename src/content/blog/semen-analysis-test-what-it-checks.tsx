import { Link } from "@tanstack/react-router";
import { Prose } from "@/components/sections/ServicePage";
import { ROUTES } from "@/data/navigation";
import { CLINIC } from "@/lib/clinic";
import cover from "@/assets/blogs/semen-analysis-test-what-it-checks.webp";
import ogCover from "@/assets/og/og-blog-semen-analysis-test.jpg";
import avatar from "@/assets/dr-payal-avatar.webp";
import type { BlogPostMeta } from "./types";

/* eslint-disable react-refresh/only-export-components --
   A post module is metadata plus its body by design; splitting `meta` into a second
   file per post would double the content tree to satisfy a dev-only HMR rule. */
export const meta: BlogPostMeta = {
  slug: "semen-analysis-test-what-it-checks",
  title: "Semen Analysis Test: What It Checks and What Results Mean",
  excerpt:
    "A clear guide to the semen analysis test: what it measures, how to prepare, what the results mean and what happens if sperm count is low.",
  intro:
    "When a couple has been trying to conceive without success, a semen analysis test is one of the first and simplest tests a doctor will ask for. Male factors play a part in many couples' fertility problems, yet men are often tested later than their partners. A single sample can tell a doctor a great deal.",
  category: "Male Fertility",
  readMinutes: 4, // 823 words
  author: { name: CLINIC.doctor, avatar },
  cover: {
    src: cover,
    alt: "Illustration of a laboratory microscope used for semen analysis",
    width: 720,
    height: 360,
    ogSrc: ogCover,
  },
  metaTitle: "Semen Analysis Test: What It Checks and Means",
  metaDescription:
    "A clear guide to the semen analysis test: what it measures, how to prepare, what the results mean and what happens if sperm count is low.",
  related: [
    { label: "Male infertility treatment", to: ROUTES.maleInfertility },
    { label: "Male infertility: causes, diagnosis and treatment", to: ROUTES.blogMaleInfertility },
    { label: "ICSI treatment", to: ROUTES.icsi },
    { label: "IUI treatment", to: ROUTES.iui },
    { label: "Neo Fertility home", to: ROUTES.home },
    { label: "Contact and directions", to: ROUTES.contact },
  ],
  cta: {
    heading: "Need a semen analysis, or help reading a report?",
    copy: "Book a consultation with Dr. Payal Mahapatra at our Marathahalli clinic. We assess both partners together.",
    sourcePage: "blog-semen-analysis-test",
    whatsappMessage:
      "Hi, I read your article on the semen analysis test and would like to book a consultation.",
  },
  faqs: [
    {
      q: "How long should I abstain before a semen analysis test?",
      a: "Doctors usually advise about two to five days without ejaculation. Too short or too long a gap can affect the result, so follow your clinic's advice.",
    },
    {
      q: "Is a sperm count test the same as a semen analysis?",
      a: "A sperm count is one part of a semen analysis. The full test also checks movement, shape, volume and other qualities of the sample.",
    },
    {
      q: "Can I collect the sample at home?",
      a: "Some clinics allow it. The sample usually needs to reach the laboratory quickly and be kept at body temperature, so check the instructions first.",
    },
    {
      q: "Can a low sperm count improve?",
      a: "Sometimes. Treating a cause, such as an infection or a hormone problem, or changing lifestyle habits can help. Changes take around three months to show.",
    },
    {
      q: "Does a low sperm count mean we cannot have a baby?",
      a: "No. Many couples with a male factor conceive, with or without treatment. Options range from lifestyle changes to IUI, IVF and ICSI.",
    },
  ],
};

const linkClass = "text-pink-700 underline";

export function Body() {
  return (
    <>
      <Prose>
        <p>
          This guide explains what the test measures, how to prepare, how to read common terms on
          the report and what happens if the results are not normal.
        </p>
      </Prose>

      <Prose title="What Is a Semen Analysis Test?">
        <p>
          This test examines a sample of semen in the laboratory. It looks at the number of sperm,
          how well they move, their shape and the qualities of the fluid itself. It is sometimes
          called a sperm count test, although the count is only one part of the report. The test is
          painless, needs no needles and gives results within a short time. Our page on{" "}
          <Link to={ROUTES.maleInfertility} className={linkClass}>
            male infertility treatment
          </Link>{" "}
          explains how the test fits into a full male fertility assessment.
        </p>
      </Prose>

      <Prose title="Who Should Get Tested?">
        <p>A doctor may suggest a semen analysis when:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            A couple has been trying for a year without pregnancy, or six months if the woman is
            older
          </li>
          <li>The man has had a past groin injury, surgery, mumps or an undescended testicle</li>
          <li>There are problems with erection or ejaculation</li>
          <li>The couple is about to start IUI or IVF</li>
          <li>A vasectomy needs to be checked</li>
        </ul>
        <p>
          Testing both partners early saves time, because treatment depends on the full picture.
        </p>
      </Prose>

      <Prose title="How to Prepare for the Test">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Abstain for a few days.</strong> Doctors usually advise avoiding ejaculation for
            about two to five days before the test. Your clinic will confirm the exact window.
          </li>
          <li>
            <strong>Collect the whole sample.</strong> The first part of the ejaculate holds many
            sperm, so losing it can affect the result.
          </li>
          <li>
            <strong>Avoid lubricants.</strong> Many lubricants can harm sperm. Ask the clinic if one
            is needed.
          </li>
          <li>
            <strong>Collect at the clinic if possible.</strong> If you collect at home, the sample
            usually needs to reach the laboratory quickly and be kept at body temperature.
          </li>
          <li>
            <strong>Mention recent illness.</strong> A fever in the past few months can lower sperm
            counts for a while.
          </li>
        </ul>
      </Prose>

      <Prose title="What the Report Measures">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Volume.</strong> The amount of semen.
          </li>
          <li>
            <strong>Concentration and total count.</strong> How many sperm are present.
          </li>
          <li>
            <strong>Motility.</strong> The share of sperm that move, and how many move forward well.
          </li>
          <li>
            <strong>Morphology.</strong> The share of sperm with a normal shape.
          </li>
          <li>
            <strong>Vitality.</strong> How many sperm are alive, often checked when movement is low.
          </li>
          <li>
            <strong>pH, liquefaction and white cells.</strong> Signs of infection or blockage.
          </li>
        </ul>
        <p>
          Laboratories compare results with reference values published by the World Health
          Organization.
        </p>
      </Prose>

      <Prose title="Common Terms on a Semen Analysis Report">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Oligozoospermia:</strong> a lower than expected sperm count.
          </li>
          <li>
            <strong>Asthenozoospermia:</strong> reduced sperm movement.
          </li>
          <li>
            <strong>Teratozoospermia:</strong> a lower share of normally shaped sperm.
          </li>
          <li>
            <strong>Azoospermia:</strong> no sperm in the sample.
          </li>
        </ul>
        <p>
          These terms describe the sample, not the cause. Many men have results that fall outside
          the reference range in one area but still father children. Your doctor will explain what
          your numbers mean together.
        </p>
      </Prose>

      <Prose title="Why One Test Is Not Always Enough">
        <p>
          Sperm counts can vary a lot from one sample to the next. Illness, stress, heat and the
          abstinence period all play a part. If a result is outside the normal range, doctors
          usually repeat the test after some weeks before drawing conclusions. Sperm take around
          three months to develop, so changes made today show up in later samples.
        </p>
      </Prose>

      <Prose title="What Happens If the Results Are Not Normal?">
        <p>
          The next step is to look for the cause. A doctor may examine the testes, order hormone
          blood tests, suggest a scrotal ultrasound to check for a varicocele, or advise genetic
          tests in selected cases. Our blog on{" "}
          <Link
            to="/$slug/"
            params={{ slug: "male-infertility-causes-diagnosis-and-treatment" }}
            className={linkClass}
          >
            male infertility causes, diagnosis and treatment
          </Link>{" "}
          explains these steps in more depth.
        </p>
      </Prose>

      <Prose title="Low Sperm Count Treatment Options">
        <p>Low sperm count treatment depends on the cause. Options may include:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Lifestyle changes.</strong> Stopping smoking, cutting down alcohol, reaching a
            healthy weight and avoiding heat to the groin.
          </li>
          <li>
            <strong>Treating infections or hormone problems.</strong> Some causes respond to
            medicines.
          </li>
          <li>
            <strong>Varicocele repair.</strong> Surgery may be suggested in selected men.
          </li>
          <li>
            <strong>IUI.</strong> Washed sperm placed in the uterus can help in mild cases.
          </li>
          <li>
            <strong>IVF with ICSI.</strong> A single sperm is injected into each egg when counts or
            movement are very low. Our page on{" "}
            <Link to={ROUTES.icsi} className={linkClass}>
              ICSI treatment
            </Link>{" "}
            explains how it works.
          </li>
          <li>
            <strong>Surgical sperm retrieval.</strong> When no sperm appear in the semen, sperm may
            sometimes be taken directly from the testis.
          </li>
        </ul>
      </Prose>

      <Prose title="Finding a Sperm Count Test Near You">
        <p>
          If you are searching for a sperm count test near me or a semen analysis test near me, look
          for a laboratory that follows standard methods and offers a private collection room. A
          clinic that can also explain the report and arrange next steps saves you repeat visits.
          Ask whether a doctor will review the results with you, rather than sending a report with
          no explanation.
        </p>
      </Prose>

      <Prose title="Conclusion">
        <h3 className="text-[1.25rem] text-plum-900">
          Understand Your Results With the Right Guidance
        </h3>
        <p>
          A semen analysis test is a simple, non-invasive first step in understanding male
          fertility, but a single report rarely tells the whole story. Results are best read by a
          doctor alongside your history, a repeat test where needed and your partner's assessment.
        </p>
        <p>
          At Neo Fertility Clinic, Bangalore, we assess both partners together so that the next step
          is based on the full picture. If you're planning a sperm count test or would like help
          understanding a report, you can consult our team at our clinic in Munnekolala, near
          Marathahalli Bridge, Bengaluru. For appointments or enquiries, contact us at{" "}
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
