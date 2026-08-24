import { Prose } from "@/components/sections/ServicePage";
import { ROUTES } from "@/data/navigation";
import { CLINIC } from "@/lib/clinic";
import cover from "@/assets/treatment-fertility-diagnosis.webp";
import ogCover from "@/assets/og/og-treatment-fertility-diagnosis.jpg";
import avatar from "@/assets/dr-payal-avatar.webp";
import type { BlogPostMeta } from "./types";

/* eslint-disable react-refresh/only-export-components --
   A post module is metadata plus its body by design; splitting `meta` into a second
   file per post would double the content tree to satisfy a dev-only HMR rule. */
export const meta: BlogPostMeta = {
  slug: "when-should-a-couple-seek-fertility-treatment",
  title: "When Should a Couple Seek Fertility Treatment?",
  excerpt:
    "How long to try naturally, red flags to watch for, and when a fertility evaluation is worth booking.",
  intro:
    "A practical guide to how long to try naturally, the signs that warrant an earlier evaluation, and what a first fertility consultation looks like.",
  category: "Fertility",
  readMinutes: 2, // 335 words
  author: { name: CLINIC.doctor, avatar },
  cover: {
    src: cover,
    alt: "A doctor holding an anatomical model of the uterus while consulting with a couple",
    width: 720,
    height: 360,
    ogSrc: ogCover,
  },
  metaTitle: "When Should a Couple Seek Fertility Treatment? | Neo Fertility",
  metaDescription:
    "How long to try for a baby naturally, warning signs that shouldn't wait, and when to book a fertility evaluation in Bangalore.",
  related: [
    { label: "Infertility evaluation and treatment", to: ROUTES.infertility },
    { label: "Fertility assessment", to: ROUTES.fertilityAssessment },
    { label: "IUI treatment", to: ROUTES.iui },
    { label: "IVF treatment", to: ROUTES.ivf },
    { label: "About Dr. Payal Mahapatra", to: ROUTES.about },
    { label: "Contact and directions", to: ROUTES.contact },
  ],
  cta: {
    heading: "Not sure if it's time yet? Let's talk it through.",
    copy: "Book a consultation with Dr. Payal Mahapatra to review your history and get clarity on the right next step.",
    sourcePage: "blog-when-to-seek",
    whatsappMessage:
      "Hi, I read your article on when to seek fertility treatment and would like to book a consultation.",
  },
};

export function Body() {
  return (
    <>
      <Prose title="The general rule of thumb">
        <p>
          Most doctors advise that a couple trying to conceive through regular, unprotected
          intercourse should seek a fertility evaluation if pregnancy has not occurred after 12
          months, for women under 35. For women aged 35 and above, this window shortens to 6 months,
          because egg quantity and quality decline more quickly with age. Waiting the full year in
          this age group can mean losing valuable time.
        </p>
        <p>
          These are general guidelines. Some couples should seek an evaluation much sooner, based on
          their medical history or symptoms, rather than waiting for the standard timeline to pass.
        </p>
      </Prose>

      <Prose title="Signs you should not wait 6 to 12 months">
        <p>
          It is worth booking a consultation earlier than the standard timeline if any of the
          following apply:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Irregular, absent, or very painful periods</li>
          <li>A known diagnosis of PCOS, endometriosis, or thyroid disorder</li>
          <li>A history of pelvic infection, pelvic surgery, or a ruptured appendix</li>
          <li>One or more prior miscarriages</li>
          <li>
            The male partner has a known history of low sperm count, undescended testes, or previous
            surgery in the groin area
          </li>
          <li>The woman is 35 or older</li>
          <li>
            Either partner has a chronic illness such as diabetes or is undergoing cancer treatment
          </li>
        </ul>
      </Prose>

      <Prose title="What happens at a first consultation">
        <p>
          At Neo Fertility Clinic in Marathahalli, a first fertility consultation with Dr. Payal
          Mahapatra begins with a detailed history of both partners, including menstrual history,
          past pregnancies, surgeries, and lifestyle factors. This is usually followed by a pelvic
          ultrasound for the woman and a semen analysis for the male partner, along with basic
          hormone blood tests. These results help determine whether the cause is related to
          ovulation, tubal factors, sperm parameters, or is unexplained, and guide the treatment
          plan, whether that is lifestyle changes, ovulation induction, IUI, or IVF.
        </p>
      </Prose>

      <Prose title="Why earlier evaluation helps">
        <p>
          Fertility treatment is rarely a single step. Working through a diagnostic evaluation,
          trying a first line of treatment, and moving to a more advanced option if needed all take
          time. Starting this process earlier, especially for women over 35 or where symptoms
          already point to an underlying condition, generally gives couples more treatment options
          and a better chance of success within a shorter overall timeframe.
        </p>
      </Prose>
    </>
  );
}
