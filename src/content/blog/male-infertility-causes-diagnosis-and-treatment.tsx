import { Link } from "@tanstack/react-router";
import { Prose } from "@/components/sections/ServicePage";
import { ROUTES } from "@/data/navigation";
import { CLINIC } from "@/lib/clinic";
import cover from "@/assets/treatment-male-infertility.webp";
import avatar from "@/assets/dr-payal-avatar.webp";
import type { BlogPostMeta } from "./types";

/* eslint-disable react-refresh/only-export-components --
   A post module is metadata plus its body by design; splitting `meta` into a second
   file per post would double the content tree to satisfy a dev-only HMR rule. */
export const meta: BlogPostMeta = {
  slug: "male-infertility-causes-diagnosis-and-treatment",
  title: "Male Infertility: Causes, Diagnosis and Treatment",
  excerpt:
    "Why male fertility factors matter, common causes, and the tests and treatments available.",
  intro:
    "Male factors are involved in nearly half of all infertility cases. Here is what commonly causes it, how it is diagnosed, and how it is treated.",
  category: "Male Fertility",
  readMinutes: 2, // 317 words
  author: { name: CLINIC.doctor, avatar },
  cover: {
    src: cover,
    alt: "A man sitting on a bed with his head in his hands, beside an illustration of a sperm cell under a magnifying glass",
    width: 720,
    height: 360,
  },
  metaTitle: "Male Infertility: Causes, Diagnosis and Treatment | Neo Fertility",
  metaDescription:
    "Male factors contribute to nearly half of infertility cases. Learn the common causes, how it is diagnosed, and treatment options in Bangalore.",
  related: [
    { label: "Male infertility treatment", to: ROUTES.maleInfertility },
    { label: "Infertility evaluation and treatment", to: ROUTES.infertility },
    { label: "ICSI treatment", to: ROUTES.icsi },
    { label: "IVF treatment", to: ROUTES.ivf },
    { label: "About Dr. Payal Mahapatra", to: ROUTES.about },
    { label: "Contact and directions", to: ROUTES.contact },
  ],
  cta: {
    heading: "Get both partners evaluated, together.",
    copy: "Book a joint fertility consultation with Dr. Payal Mahapatra at our Marathahalli clinic.",
    sourcePage: "blog-male-infertility",
    whatsappMessage:
      "Hi, I read your article on male infertility and would like to book a consultation.",
  },
};

export function Body() {
  return (
    <>
      <Prose title="Why male fertility factors matter">
        <p>
          Infertility is often assumed to be a female issue, but studies consistently show that male
          factors contribute to roughly 40–50% of cases, either alone or combined with a female
          factor. Because of this, at Neo Fertility Clinic we always recommend evaluating both
          partners together, right from the first visit, rather than starting with tests for the
          woman alone. Read more about our{" "}
          <Link to={ROUTES.maleInfertility} className="text-pink-700 underline">
            male infertility treatment programme
          </Link>
          .
        </p>
      </Prose>

      <Prose title="Common causes">
        <ul className="list-disc space-y-2 pl-5">
          <li>Low sperm count (oligospermia) or absent sperm (azoospermia)</li>
          <li>Poor sperm motility or abnormal sperm shape</li>
          <li>Varicocele, an enlargement of veins in the scrotum</li>
          <li>Hormonal imbalances affecting testosterone or pituitary function</li>
          <li>Undescended testes or prior surgery in the groin</li>
          <li>Infections, including untreated sexually transmitted infections</li>
          <li>
            Lifestyle factors: smoking, heavy alcohol use, obesity, chronic heat exposure, anabolic
            steroid use
          </li>
          <li>Genetic conditions such as Klinefelter syndrome</li>
        </ul>
      </Prose>

      <Prose title="How it is diagnosed">
        <p>
          The starting point is a semen analysis, which assesses sperm count, motility (movement)
          and morphology (shape). Depending on the results, further tests may include hormone blood
          tests (FSH, LH, testosterone, prolactin), a scrotal ultrasound to check for varicocele,
          and in some cases genetic testing or a testicular biopsy. A detailed history covering past
          infections, surgeries, medication use and lifestyle is equally important.
        </p>
      </Prose>

      <Prose title="Treatment options">
        <p>
          Treatment depends entirely on the underlying cause. Mild abnormalities may improve with
          lifestyle changes and a few months of monitoring. Hormonal imbalances can often be
          corrected with medication. Varicocele may be treated surgically when it is significantly
          affecting sperm parameters. Where sperm counts are low but sperm are present, IUI or IVF
          with ICSI (where a single sperm is injected directly into an egg) can achieve pregnancy
          even with significantly reduced sperm numbers. In cases of complete azoospermia, surgical
          sperm retrieval techniques combined with ICSI, or donor sperm, may be discussed.
        </p>
      </Prose>

      <Prose title="A joint approach at Neo Fertility Clinic">
        <p>
          Dr. Payal Mahapatra evaluates both partners together and coordinates with andrologists and
          urologists when a surgical opinion is needed, so couples get a single, clear treatment
          plan rather than fragmented advice from multiple specialists.
        </p>
      </Prose>
    </>
  );
}
