import { Link } from "@tanstack/react-router";
import { Prose } from "@/components/sections/ServicePage";
import { ROUTES } from "@/data/navigation";
import { CLINIC } from "@/lib/clinic";
import cover from "@/assets/blogs/egg-freezing-process-cost-bangalore.webp";
import ogCover from "@/assets/og/og-blog-egg-freezing.jpg";
import avatar from "@/assets/dr-payal-avatar.webp";
import type { BlogPostMeta } from "./types";

/* eslint-disable react-refresh/only-export-components --
   A post module is metadata plus its body by design; splitting `meta` into a second
   file per post would double the content tree to satisfy a dev-only HMR rule. */
export const meta: BlogPostMeta = {
  slug: "egg-freezing-process-cost-bangalore",
  title: "Egg Freezing: Who It Suits, the Process and Cost in Bangalore",
  excerpt:
    "Thinking about egg freezing? Learn who it may suit, how the process works, why age matters and what shapes egg freezing cost in Bangalore.",
  intro:
    "More women are asking about egg freezing, whether to plan around a career, a relationship or a medical treatment that could affect fertility. Egg freezing lets a woman store eggs at her current age and use them later. It can widen future options, but it is not a guarantee of a pregnancy, and it helps to understand both sides before you decide.",
  category: "Egg Freezing",
  readMinutes: 4, // 834 words
  author: { name: CLINIC.doctor, avatar },
  cover: {
    src: cover,
    alt: "Illustration of egg freezing and storage in a fertility laboratory",
    width: 720,
    height: 360,
    ogSrc: ogCover,
  },
  metaTitle: "Egg Freezing: Process, Suitability and Cost",
  metaDescription:
    "Thinking about egg freezing? Learn who it may suit, how the process works, why age matters and what shapes egg freezing cost in Bangalore.",
  related: [
    { label: "Egg freezing and preservation", to: ROUTES.eggFreezing },
    { label: "Pre-conception health check", to: ROUTES.preconception },
    { label: "Fertility assessment", to: ROUTES.fertilityAssessment },
    { label: "IVF treatment in Bangalore", to: ROUTES.blogIvfBangalore },
    { label: "Neo Fertility home", to: ROUTES.home },
    { label: "Contact and directions", to: ROUTES.contact },
  ],
  cta: {
    heading: "Considering egg freezing?",
    copy: "Book a consultation with Dr. Payal Mahapatra at our Marathahalli clinic. We check your ovarian reserve and explain your options honestly.",
    sourcePage: "blog-egg-freezing",
    whatsappMessage:
      "Hi, I read your article on egg freezing and would like to book a consultation.",
  },
  faqs: [
    {
      q: "What is the best age to freeze eggs?",
      a: "In general, eggs frozen at a younger age are of better quality. Your doctor can advise based on your age, ovarian reserve and plans.",
    },
    {
      q: "Is egg freezing painful?",
      a: "The injections can cause mild discomfort and bloating. The retrieval is done under sedation, and most women feel only mild cramping afterwards.",
    },
    {
      q: "How long can frozen eggs be stored?",
      a: "Frozen eggs can stay viable for a long time, but storage periods are governed by Indian law. Your clinic will explain the current rules.",
    },
    {
      q: "How many eggs should I freeze?",
      a: "It depends on your age and how your ovaries respond. Some women need more than one cycle to store a sufficient number of eggs.",
    },
    {
      q: "Does freezing eggs guarantee a pregnancy later?",
      a: "No. It improves the chance of using your own younger eggs later, but not every egg survives thawing or leads to a pregnancy.",
    },
  ],
};

const linkClass = "text-pink-700 underline";

export function Body() {
  return (
    <>
      <Prose>
        <p>
          This guide explains who it may suit, how the process works, why age matters, what shapes
          the cost and what to ask before you begin.
        </p>
      </Prose>

      <Prose title="What Is Egg Freezing?">
        <p>
          Egg freezing, also called oocyte cryopreservation, collects a woman's eggs and stores them
          at very low temperatures. Most clinics now use a fast-freezing method called
          vitrification, which helps protect the eggs from damage. When the woman is ready, the eggs
          are thawed, fertilised with sperm in the laboratory and the resulting embryo is placed in
          the uterus. Our{" "}
          <Link to={ROUTES.eggFreezing} className={linkClass}>
            egg freezing
          </Link>{" "}
          page explains how the clinic approaches fertility preservation.
        </p>
      </Prose>

      <Prose title="Who Freezing Eggs May Suit">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Women planning to have children later.</strong> Career, education or
            relationship plans can mean delaying pregnancy.
          </li>
          <li>
            <strong>Women facing cancer treatment.</strong> Chemotherapy and radiation can harm the
            ovaries, so eggs may be frozen beforehand.
          </li>
          <li>
            <strong>Women needing ovarian surgery.</strong> Some operations can reduce the number of
            eggs.
          </li>
          <li>
            <strong>Women with certain conditions.</strong> Endometriosis or a family history of
            early menopause may lead a doctor to discuss it.
          </li>
          <li>
            <strong>Women with a falling ovarian reserve.</strong> Tests may show fewer eggs than
            expected for age.
          </li>
        </ul>
        <p>
          If you hope to conceive in the near future rather than years from now, a{" "}
          <Link to={ROUTES.preconception} className={linkClass}>
            pre-conception health check
          </Link>{" "}
          may be a more useful first step.
        </p>
      </Prose>

      <Prose title="Why Age Matters Most">
        <p>
          A woman is born with all the eggs she will ever have. Both the number and the quality of
          eggs fall with age, and the fall speeds up in the mid to late thirties. Eggs frozen at a
          younger age generally have a better chance of leading to a healthy pregnancy later. This
          is why doctors encourage women considering it not to wait too long. Your age at freezing
          matters more than your age when you use the eggs.
        </p>
      </Prose>

      <Prose title="Tests Before You Begin">
        <p>
          Before starting, your doctor will usually check your ovarian reserve with an AMH blood
          test and an ultrasound count of small follicles. These help predict how your ovaries may
          respond and how many eggs might be collected. A general health check is also part of the
          process. Our{" "}
          <Link to={ROUTES.fertilityAssessment} className={linkClass}>
            fertility assessment
          </Link>{" "}
          page describes the tests in more detail.
        </p>
      </Prose>

      <Prose title="The Process, Step by Step">
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <strong>Consultation and tests.</strong> Your history, ovarian reserve and goals are
            discussed.
          </li>
          <li>
            <strong>Ovarian stimulation.</strong> Daily hormone injections help several eggs mature
            at once, usually over about ten to fourteen days.
          </li>
          <li>
            <strong>Monitoring.</strong> Scans and blood tests track the growing follicles.
          </li>
          <li>
            <strong>Trigger injection.</strong> A final injection prepares the eggs for collection.
          </li>
          <li>
            <strong>Egg retrieval.</strong> A short procedure under sedation collects the eggs
            through the vagina, guided by ultrasound.
          </li>
          <li>
            <strong>Freezing and storage.</strong> Mature eggs are vitrified and stored.
          </li>
        </ol>
        <p>Most women return to normal activities within a day or two.</p>
      </Prose>

      <Prose title="Possible Side Effects and Risks">
        <p>
          Bloating, mild discomfort and mood changes are common during stimulation. Rarely, the
          ovaries over-respond to the medicines, a condition called ovarian hyperstimulation
          syndrome. Careful dosing and monitoring help reduce this risk. The retrieval itself
          carries small risks, such as bleeding or infection.
        </p>
      </Prose>

      <Prose title="What Egg Freezing Can and Cannot Do">
        <p>
          It keeps an option open, but it does not guarantee a baby. Not every egg survives thawing,
          not every egg fertilises and not every embryo implants. The number of eggs stored and the
          age at freezing both affect the chance of success. Some women need more than one cycle to
          store enough eggs. A good doctor will give you an honest, personal picture rather than a
          general promise.
        </p>
      </Prose>

      <Prose title="What Shapes Egg Freezing Cost in Bangalore">
        <p>Costs in Bangalore depend on several parts:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>The consultation and tests</li>
          <li>Stimulation medicines, which vary by dose and response</li>
          <li>Monitoring scans and blood tests</li>
          <li>The retrieval procedure</li>
          <li>Freezing and yearly storage</li>
          <li>The later cost of thawing, fertilisation and embryo transfer</li>
        </ul>
        <p>
          If more than one cycle is needed, the cost rises. Ask for a written estimate that lists
          each part separately.
        </p>
      </Prose>

      <Prose title="The Legal Framework in India">
        <p>
          The practice in India is regulated under the Assisted Reproductive Technology (Regulation)
          Act, 2021. The law sets age limits for women who use assisted reproduction, requires
          informed written consent and requires clinics and banks to be registered. Your clinic
          should explain the current rules on storage and later use during your consultation.
        </p>
      </Prose>

      <Prose title="Choosing a Fertility Specialist Near You">
        <p>
          Many women begin by searching for the best infertility specialist in Bangalore, a
          fertility specialist near me or a fertility hospital near me. Look for a clinic that tests
          your ovarian reserve before you decide, explains your realistic chances and is registered
          under the ART Act. Ask whether the clinic offers counselling to help you weigh the
          decision.
        </p>
      </Prose>

      <Prose title="Conclusion">
        <h3 className="text-[1.25rem] text-plum-900">
          Plan Your Fertility Timeline With Confidence
        </h3>
        <p>
          Freezing eggs can give you more flexibility over when to start a family, but it does not
          guarantee a future pregnancy, and the right time and approach depend on your age, ovarian
          reserve and overall health. A proper evaluation and clear information about the process,
          costs and legal requirements can help you decide.
        </p>
        <p>
          At Neo Fertility Clinic, Bangalore, we focus on explaining each option honestly and
          planning care around your individual needs. If you're considering egg freezing or want to
          understand your ovarian reserve first, you can consult our team at our clinic in
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
