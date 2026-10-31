import { Link } from "@tanstack/react-router";
import { Prose } from "@/components/sections/ServicePage";
import { ROUTES } from "@/data/navigation";
import { CLINIC } from "@/lib/clinic";
import cover from "@/assets/blogs/pcos-treatment-options-lifestyle-fertility.webp";
import ogCover from "@/assets/og/og-blog-pcos-treatment.jpg";
import avatar from "@/assets/dr-payal-avatar.webp";
import type { BlogPostMeta } from "./types";

/* eslint-disable react-refresh/only-export-components --
   A post module is metadata plus its body by design; splitting `meta` into a second
   file per post would double the content tree to satisfy a dev-only HMR rule. */
export const meta: BlogPostMeta = {
  slug: "pcos-treatment-options-lifestyle-fertility",
  title: "PCOS Treatment: Medical Options, Lifestyle and Fertility",
  excerpt:
    "Learn how PCOS is diagnosed and treated, from lifestyle steps and medicines to fertility treatment, and when to see a doctor about irregular periods.",
  intro:
    "Polycystic ovary syndrome, or PCOS, is one of the most common hormonal conditions in women of reproductive age. It can affect periods, skin, hair, weight and fertility, and it looks different from one woman to the next. That is why PCOS treatment is planned around each woman's symptoms and goals, not a single formula.",
  category: "PCOS",
  readMinutes: 4, // 830 words
  author: { name: CLINIC.doctor, avatar },
  cover: {
    src: cover,
    alt: "Illustration of the ovaries and hormone cycle in PCOS",
    width: 720,
    height: 360,
    ogSrc: ogCover,
  },
  metaTitle: "PCOS Treatment: Options, Lifestyle and Fertility",
  metaDescription:
    "Learn how PCOS is diagnosed and treated, from lifestyle steps and medicines to fertility treatment, and when to see a doctor about irregular periods.",
  related: [
    { label: "PCOS treatment", to: ROUTES.pcos },
    { label: "PCOD treatment", to: ROUTES.pcod },
    {
      label: "Irregular periods treatment",
      to: ROUTES.menstrual,
      hash: "irregular_menstrual_cycles",
    },
    { label: "IUI treatment: process and who it suits", to: ROUTES.blogIuiTreatment },
    { label: "Neo Fertility home", to: ROUTES.home },
    { label: "Contact and directions", to: ROUTES.contact },
  ],
  cta: {
    heading: "Dealing with PCOS, PCOD or irregular periods?",
    copy: "Book a consultation with Dr. Payal Mahapatra at our Marathahalli clinic. We plan care around your symptoms and goals.",
    sourcePage: "blog-pcos-treatment",
    whatsappMessage:
      "Hi, I read your article on PCOS treatment and would like to book a consultation.",
  },
  faqs: [
    {
      q: "Can PCOS be cured?",
      a: "PCOS cannot be cured, but it can be managed well. Lifestyle changes and medicines can control symptoms, and many women with PCOS conceive.",
    },
    {
      q: "Can I get pregnant with PCOS?",
      a: "Yes, many women with PCOS conceive. Some do so naturally, while others need medicines to help ovulation or treatments such as IUI or IVF.",
    },
    {
      q: "Is PCOD the same as PCOS?",
      a: "The two terms are often used for the same condition in India. Treatment depends on your symptoms and goals rather than the label.",
    },
    {
      q: "Do I need to lose weight to treat PCOS?",
      a: "Not every woman with PCOS is overweight. For those who are, a modest weight loss can improve cycles and ovulation. Your doctor can guide you.",
    },
    {
      q: "When should I see a doctor about PCOS?",
      a: "See a doctor if your periods are irregular or absent, if you have acne or excess hair that is hard to control, or if you are finding it hard to conceive.",
    },
  ],
};

const linkClass = "text-pink-700 underline";

export function Body() {
  return (
    <>
      <Prose>
        <p>
          This guide explains how PCOS is diagnosed, what treatment usually involves, how it is
          managed when you want to conceive and when to see a doctor.
        </p>
      </Prose>

      <Prose title="What Is PCOS?">
        <p>
          PCOS is a hormonal condition in which the ovaries do not release an egg regularly. Many
          women with PCOS also have higher levels of male-type hormones, called androgens, and many
          have insulin resistance. The word "polycystic" refers to the many small follicles often
          seen on the ovaries in a scan. These are not harmful cysts, and having them does not by
          itself mean a woman has PCOS. Our page on{" "}
          <Link to={ROUTES.pcos} className={linkClass}>
            PCOS treatment
          </Link>{" "}
          explains how the clinic approaches the condition.
        </p>
      </Prose>

      <Prose title="PCOS or PCOD: Is There a Difference?">
        <p>
          In India, many people use the terms PCOD and PCOS for the same condition. Some use PCOD
          for a milder pattern centred on the ovaries and PCOS for the wider hormonal syndrome. In
          practice, what matters is not the label but your symptoms, test results and goals. PCOD
          treatment and PCOS treatment follow the same principles. Our{" "}
          <Link to={ROUTES.pcod} className={linkClass}>
            PCOD treatment
          </Link>{" "}
          page covers this in more detail.
        </p>
      </Prose>

      <Prose title="Common Signs of PCOS">
        <ul className="list-disc space-y-2 pl-5">
          <li>Irregular, infrequent or absent periods</li>
          <li>Acne that is hard to control</li>
          <li>Excess hair on the face, chest or abdomen</li>
          <li>Thinning of scalp hair</li>
          <li>Weight gain, especially around the waist</li>
          <li>Dark, velvety patches of skin on the neck or underarms</li>
          <li>Difficulty getting pregnant</li>
        </ul>
        <p>
          Not every woman has every sign. Some women with PCOS have regular periods, and some are
          slim.
        </p>
      </Prose>

      <Prose title="How PCOS Is Diagnosed">
        <p>
          There is no single test for PCOS. Doctors commonly diagnose it when a woman has at least
          two of these three features:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Irregular or absent ovulation, often shown by irregular periods</li>
          <li>Signs of raised androgens, seen in symptoms or blood tests</li>
          <li>Many small follicles on an ultrasound scan</li>
        </ul>
        <p>
          Other causes, such as thyroid problems or high prolactin, are ruled out first. Blood tests
          for sugar and cholesterol are often added.
        </p>
      </Prose>

      <Prose title="Irregular Periods Treatment in PCOS">
        <p>
          Irregular periods are often the first reason women seek help. When periods are very
          infrequent, the lining of the uterus can build up over time, so doctors usually aim to
          bring on regular bleeds. Options include hormonal pills or a course of progesterone,
          depending on whether you are trying to conceive. Our page on{" "}
          <Link to={ROUTES.menstrual} hash="irregular_menstrual_cycles" className={linkClass}>
            irregular periods treatment
          </Link>{" "}
          explains the wider causes of cycle changes.
        </p>
      </Prose>

      <Prose title="Lifestyle: The Foundation of PCOS Treatment">
        <p>
          Lifestyle changes help with almost every part of PCOS. Regular physical activity and a
          balanced diet can improve insulin resistance, cycle regularity and energy. For women who
          are overweight, losing even a modest amount of weight can bring back ovulation in some
          cases. Good sleep and stress management also help. These changes work best as steady
          habits rather than short, strict diets. Your doctor or a dietitian can help you set
          realistic goals.
        </p>
      </Prose>

      <Prose title="Medicines a Doctor May Consider">
        <p>The choice depends on your symptoms and whether you want to conceive now:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Hormonal pills.</strong> These regulate periods and can improve acne and excess
            hair in women not trying to conceive.
          </li>
          <li>
            <strong>Insulin-sensitising medicines.</strong> Metformin is sometimes used,
            particularly when insulin resistance is present.
          </li>
          <li>
            <strong>Anti-androgen medicines.</strong> These can help with hair and skin symptoms,
            but are not used during pregnancy.
          </li>
          <li>
            <strong>Skin and hair treatments.</strong> Dermatology care can address acne and excess
            hair.
          </li>
        </ul>
      </Prose>

      <Prose title="PCOS Fertility Treatment">
        <p>
          Many women with PCOS conceive, some naturally and some with help. PCOS fertility treatment
          usually begins with lifestyle steps and medicines that encourage ovulation, often tablets
          such as letrozole. Scans track how the follicles respond. If tablets do not work,
          injectable medicines may be used with careful monitoring. IUI can be added in some cases.
          When other steps have not worked, or there are other factors, IVF may be suggested. Women
          with PCOS can respond strongly to fertility medicines, so dosing and monitoring need
          particular care.
        </p>
      </Prose>

      <Prose title="Long-Term Health with PCOS">
        <p>
          PCOS is a long-term condition, so follow-up matters even after symptoms settle. Women with
          PCOS have a higher risk of type 2 diabetes, high cholesterol and, if periods stay very
          infrequent, changes in the lining of the uterus. Regular check-ups can catch these early.
          Mood changes are also common, and it is worth mentioning them to your doctor.
        </p>
      </Prose>

      <Prose title="Finding a PCOS Doctor Near You">
        <p>
          If you are searching for a PCOS doctor near me, look for a specialist who looks at the
          whole picture: periods, skin, weight, long-term health and fertility. A good consultation
          should end with a clear plan and a reason for each step.
        </p>
      </Prose>

      <Prose title="Conclusion">
        <h3 className="text-[1.25rem] text-plum-900">Take Charge of PCOS With the Right Support</h3>
        <p>
          PCOS is a manageable condition, and care works best when it is matched to your symptoms,
          your goals and whether you are planning a pregnancy. Lifestyle changes, medicines and
          fertility support each have a place, and a doctor can help you decide which of them fits
          you.
        </p>
        <p>
          At Neo Fertility Clinic, Bangalore, we focus on understanding each woman's symptoms and
          recommending care based on her individual needs. If you're dealing with irregular periods,
          PCOS or PCOD, or finding it hard to conceive, you can consult our team at our clinic in
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
