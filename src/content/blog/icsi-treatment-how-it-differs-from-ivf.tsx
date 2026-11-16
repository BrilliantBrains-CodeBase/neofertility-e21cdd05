import { Link } from "@tanstack/react-router";
import { Prose } from "@/components/sections/ServicePage";
import { ROUTES } from "@/data/navigation";
import { CLINIC } from "@/lib/clinic";
import cover from "@/assets/blogs/icsi-treatment-how-it-differs-from-ivf.webp";
import ogCover from "@/assets/og/og-blog-icsi-treatment.jpg";
import avatar from "@/assets/dr-payal-avatar.webp";
import type { BlogPostMeta } from "./types";

/* eslint-disable react-refresh/only-export-components --
   A post module is metadata plus its body by design; splitting `meta` into a second
   file per post would double the content tree to satisfy a dev-only HMR rule. */
export const meta: BlogPostMeta = {
  slug: "icsi-treatment-how-it-differs-from-ivf",
  title: "ICSI Treatment: How It Works and How It Differs from IVF",
  excerpt:
    "Learn how ICSI treatment works, who it may help, how it differs from standard IVF and what it means for couples facing male infertility.",
  intro:
    "When a semen analysis shows a low sperm count or poor movement, many couples hear the term ICSI for the first time. ICSI treatment has changed the outlook for many couples facing male infertility, because it needs only a single healthy sperm for each egg. It is a laboratory technique within IVF, not a separate treatment, and it is not needed by every couple.",
  category: "Male Fertility",
  readMinutes: 4, // 778 words
  author: { name: CLINIC.doctor, avatar },
  cover: {
    src: cover,
    alt: "Illustration of a single sperm being injected into an egg during ICSI",
    width: 720,
    height: 360,
    ogSrc: ogCover,
  },
  metaTitle: "ICSI Treatment: How It Works and Differs from IVF",
  metaDescription:
    "Learn how ICSI treatment works, who it may help, how it differs from standard IVF and what it means for couples facing male infertility.",
  related: [
    { label: "ICSI treatment", to: ROUTES.icsi },
    { label: "IVF treatment", to: ROUTES.ivf },
    { label: "Male infertility treatment", to: ROUTES.maleInfertility },
    { label: "Semen analysis test: what it checks", to: ROUTES.blogSemenAnalysis },
    { label: "Neo Fertility home", to: ROUTES.home },
    { label: "Contact and directions", to: ROUTES.contact },
  ],
  cta: {
    heading: "Considering ICSI, or have questions about male fertility?",
    copy: "Book a consultation with Dr. Payal Mahapatra at our Marathahalli clinic. We assess both partners and explain every option.",
    sourcePage: "blog-icsi-treatment",
    whatsappMessage:
      "Hi, I read your article on ICSI treatment and would like to book a consultation.",
  },
  faqs: [
    {
      q: "Is ICSI better than IVF?",
      a: "Neither is better for everyone. ICSI helps when there is a male factor or an earlier fertilisation problem. For other couples, standard IVF may be enough.",
    },
    {
      q: "Does ICSI need a separate cycle from IVF?",
      a: "No. ICSI is done within an IVF cycle. The stimulation, egg retrieval and embryo transfer are the same. Only the fertilisation step differs.",
    },
    {
      q: "Can ICSI work if there are no sperm in the semen?",
      a: "Sometimes. Sperm may be taken directly from the testis or epididymis and used for ICSI, although sperm cannot always be found.",
    },
    {
      q: "Is ICSI painful for the man?",
      a: "Giving a semen sample is not painful. If surgical sperm retrieval is needed, it is done under anaesthesia and usually causes only mild soreness.",
    },
    {
      q: "Does ICSI guarantee fertilisation?",
      a: "No. ICSI helps the sperm enter the egg, but not every injected egg fertilises or develops into a healthy embryo.",
    },
  ],
};

const linkClass = "text-pink-700 underline";

export function Body() {
  return (
    <>
      <Prose>
        <p>
          This guide explains what ICSI is, how it differs from standard IVF, who it may help and
          what to expect.
        </p>
      </Prose>

      <Prose title="What Is ICSI?">
        <p>
          ICSI stands for intracytoplasmic sperm injection. In the laboratory, an embryologist
          selects a single sperm and injects it directly into the centre of a mature egg, using a
          very fine needle under a powerful microscope. This is repeated for each mature egg. The
          eggs are then watched to see whether they fertilise and grow into embryos. Our{" "}
          <Link to={ROUTES.icsi} className={linkClass}>
            ICSI treatment
          </Link>{" "}
          page explains how the clinic uses the technique.
        </p>
      </Prose>

      <Prose title="How ICSI Differs from Standard IVF">
        <p>
          The two follow the same path until the eggs are collected. The woman has stimulation
          injections, monitoring scans and an egg retrieval in both. The difference is the
          fertilisation step:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>In standard IVF,</strong> eggs are placed in a dish with many prepared sperm,
            and a sperm enters each egg on its own.
          </li>
          <li>
            <strong>In ICSI,</strong> an embryologist injects one chosen sperm into each egg.
          </li>
        </ul>
        <p>
          After fertilisation, embryo culture and transfer are the same. For an overview of the full
          cycle, see our page on{" "}
          <Link to={ROUTES.ivf} className={linkClass}>
            IVF treatment
          </Link>
          .
        </p>
      </Prose>

      <Prose title="Who ICSI Treatment May Help">
        <p>A doctor may suggest ICSI when:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>The sperm count is very low.</strong> Too few sperm are available for standard
            IVF.
          </li>
          <li>
            <strong>Sperm movement or shape is poor.</strong> Sperm may struggle to enter the egg on
            their own.
          </li>
          <li>
            <strong>Sperm has been collected surgically.</strong> This often applies to men with
            azoospermia.
          </li>
          <li>
            <strong>Fertilisation failed in an earlier IVF cycle.</strong> ICSI can help when eggs
            did not fertilise before.
          </li>
          <li>
            <strong>Frozen eggs or limited frozen sperm are used.</strong> ICSI makes the best use
            of a small number.
          </li>
          <li>
            <strong>Embryos will be genetically tested.</strong> ICSI avoids contamination from
            extra sperm.
          </li>
        </ul>
        <p>
          If the semen analysis is normal and there is no history of failed fertilisation, standard
          IVF may be enough.
        </p>
      </Prose>

      <Prose title="ICSI as Part of Male Infertility Treatment">
        <p>
          Male infertility treatment starts with finding the cause. A male infertility specialist
          will usually review a semen analysis, examine the testes and check hormones. Some causes,
          such as infections, hormone problems or a varicocele, can be treated directly. ICSI
          becomes one of the main male fertility treatment options when the cause cannot be
          corrected or when sperm numbers stay very low. Our page on{" "}
          <Link to={ROUTES.maleInfertility} className={linkClass}>
            male infertility treatment
          </Link>{" "}
          covers the full range of options.
        </p>
      </Prose>

      <Prose title="Azoospermia Treatment and ICSI">
        <p>Azoospermia means no sperm are found in the semen. It has two broad types:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Obstructive azoospermia.</strong> Sperm are made, but a blockage stops them
            reaching the semen.
          </li>
          <li>
            <strong>Non-obstructive azoospermia.</strong> The testes make very few or no sperm.
          </li>
        </ul>
        <p>
          Azoospermia treatment often involves taking sperm directly from the epididymis or testis
          through a minor procedure. Any sperm found can be used for ICSI, either fresh or frozen.
          Sperm cannot always be found, especially in non-obstructive cases, so doctors explain this
          carefully beforehand. Genetic tests may be advised in some men.
        </p>
      </Prose>

      <Prose title="The ICSI Treatment Process, Step by Step">
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>Assessment of both partners.</strong> Tests guide whether ICSI is needed.
          </li>
          <li>
            <strong>Ovarian stimulation and monitoring.</strong> As in IVF.
          </li>
          <li>
            <strong>Egg retrieval.</strong> A short procedure under sedation.
          </li>
          <li>
            <strong>Sperm collection.</strong> From a fresh sample, frozen sample or surgical
            retrieval.
          </li>
          <li>
            <strong>Injection.</strong> One sperm is injected into each mature egg.
          </li>
          <li>
            <strong>Embryo culture.</strong> Fertilised eggs grow in the laboratory for a few days.
          </li>
          <li>
            <strong>Embryo transfer.</strong> One embryo is placed in the uterus. Others may be
            frozen.
          </li>
          <li>
            <strong>Pregnancy test.</strong> Usually about two weeks later.
          </li>
        </ol>
      </Prose>

      <Prose title="Risks and Things to Know">
        <p>
          ICSI carries the same risks as an IVF cycle for the woman, including a rare over-response
          to stimulation medicines. A small number of eggs may be damaged during injection. Studies
          of children born after ICSI are broadly reassuring, although some suggest a small increase
          in certain risks, which may partly reflect the underlying cause of infertility. Your
          doctor can discuss what this means for you, and genetic counselling may be offered in some
          cases.
        </p>
      </Prose>

      <Prose title="Questions to Ask Your Doctor">
        <ul className="list-disc space-y-2 pl-5">
          <li>Why do you suggest ICSI rather than standard IVF for us?</li>
          <li>What did our semen analysis show, and could it improve?</li>
          <li>If sperm retrieval is needed, which procedure do you suggest?</li>
          <li>Should we have any genetic tests first?</li>
          <li>What happens to embryos we do not use straight away?</li>
        </ul>
      </Prose>

      <Prose title="Conclusion">
        <h3 className="text-[1.25rem] text-plum-900">
          Find the Right Treatment Path for Your Family
        </h3>
        <p>
          ICSI treatment can help when sperm count or movement is a concern, but it is one part of
          an IVF cycle and is advised case by case, after both partners have been assessed.
          Understanding why it is suggested, and what else could be tried, helps you decide with
          confidence.
        </p>
        <p>
          At Neo Fertility Clinic, Bangalore, we focus on assessing both partners and explaining
          treatment options based on each couple's individual needs. If you're considering ICSI or
          have questions about male fertility, you can consult our team at our clinic in
          Munnekolala, near Marathahalli Bridge, Bengaluru. For appointments or enquiries, contact
          us at{" "}
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
