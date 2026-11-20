import { Link } from "@tanstack/react-router";
import { Prose } from "@/components/sections/ServicePage";
import { ROUTES } from "@/data/navigation";
import { CLINIC } from "@/lib/clinic";
import cover from "@/assets/blogs/gynecologist-or-fertility-specialist-who-to-see.webp";
import ogCover from "@/assets/og/og-blog-gynecologist-or-fertility-specialist.jpg";
import avatar from "@/assets/dr-payal-avatar.webp";
import type { BlogPostMeta } from "./types";

/* eslint-disable react-refresh/only-export-components --
   A post module is metadata plus its body by design; splitting `meta` into a second
   file per post would double the content tree to satisfy a dev-only HMR rule. */
export const meta: BlogPostMeta = {
  slug: "gynecologist-or-fertility-specialist-who-to-see",
  title: "Gynecologist or Fertility Specialist? Who to See and When",
  excerpt:
    "Not sure whether to see a gynecologist or a fertility specialist? Learn what each does, which concerns point to which, and when to see both.",
  intro:
    'When something feels wrong with your periods, or pregnancy is taking longer than expected, the first question is often who to see. Typing "gynecologist near me" is a natural start, but some concerns are best handled by a fertility specialist. Knowing the difference can save time, tests and worry.',
  category: "Gynecology",
  readMinutes: 4, // 825 words
  author: { name: CLINIC.doctor, avatar },
  cover: {
    src: cover,
    alt: "Illustration comparing gynecology care and fertility care",
    width: 720,
    height: 360,
    ogSrc: ogCover,
  },
  metaTitle: "Gynecologist or Fertility Specialist: Who to See",
  metaDescription:
    "Not sure whether to see a gynecologist or a fertility specialist? Learn what each does, which concerns point to which, and when to see both.",
  related: [
    { label: "Gynecology treatments", to: ROUTES.gynecologyTreatments },
    { label: "When should a couple seek fertility treatment?", to: ROUTES.blogWhenToSeek },
    { label: "About Dr. Payal Mahapatra", to: ROUTES.about },
    { label: "Fertility assessment", to: ROUTES.fertilityAssessment },
    { label: "Neo Fertility home", to: ROUTES.home },
    { label: "Contact and directions", to: ROUTES.contact },
  ],
  cta: {
    heading: "Not sure whether you need a gynecologist or a fertility specialist?",
    copy: "Book a consultation with Dr. Payal Mahapatra at our Marathahalli clinic. Gynecology and fertility care are available in one place.",
    sourcePage: "blog-gynecologist-or-fertility-specialist",
    whatsappMessage:
      "Hi, I read your article on choosing a gynecologist or fertility specialist and would like to book a consultation.",
  },
  faqs: [
    {
      q: "Can a gynecologist treat infertility?",
      a: "A gynecologist can carry out first tests and treat some causes. For treatments such as IUI or IVF, a doctor with training in reproductive medicine is usually involved.",
    },
    {
      q: "When should I see a fertility doctor instead of a gynecologist?",
      a: "See a fertility doctor after a year of trying if you are under 35, or six months if you are 35 or older. Go sooner if you have a known condition.",
    },
    {
      q: "Should my partner come to the first fertility appointment?",
      a: "Yes, if possible. Fertility involves both partners, and testing both early, including a semen analysis, saves time.",
    },
    {
      q: "How often should I see a gynecologist?",
      a: "Many women benefit from a yearly check-up. See a doctor sooner if you notice new symptoms, such as changes in your periods or pelvic pain.",
    },
    {
      q: "Is a pelvic examination always needed?",
      a: "Not always. It depends on your symptoms. Your doctor should explain why an examination is advised and ask for your consent first.",
    },
  ],
};

const linkClass = "text-pink-700 underline";

export function Body() {
  return (
    <>
      <Prose>
        <p>
          This guide explains what each specialist does, which concerns point to which, and when it
          makes sense to see a doctor trained in both.
        </p>
      </Prose>

      <Prose title="What a Gynecologist Does">
        <p>
          A gynecologist cares for the female reproductive system across all stages of life. Common
          reasons to visit include:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Irregular, heavy or painful periods</li>
          <li>Vaginal discharge, itching or infection</li>
          <li>Pelvic pain</li>
          <li>Contraception and family planning</li>
          <li>Screening tests, such as a Pap smear</li>
          <li>Breast lumps or changes</li>
          <li>Menopause symptoms</li>
        </ul>
        <p>
          Many gynecologists are also obstetricians, which means they care for women during
          pregnancy and childbirth. Our{" "}
          <Link to={ROUTES.gynecologyTreatments} className={linkClass}>
            gynecology treatments
          </Link>{" "}
          page lists the conditions commonly treated.
        </p>
      </Prose>

      <Prose title="What a Fertility Specialist Does">
        <p>
          A fertility specialist is a doctor with further training in reproductive medicine. Their
          focus is helping people conceive and understanding why pregnancy is not happening. They
          assess both partners, interpret tests such as AMH levels and semen analysis, and offer
          treatments ranging from ovulation medicines to IUI, IVF and ICSI. Many fertility
          specialists first train as gynecologists, so they can manage both general gynecological
          concerns and fertility care.
        </p>
      </Prose>

      <Prose title="Concerns That Usually Start with a Gynecologist">
        <p>
          If you are not trying to conceive, most concerns begin with a gynecologist. These include
          period problems, infections, contraception, routine screening and pregnancy care. A
          gynecologist can diagnose conditions such as fibroids, cysts and infections, and refer you
          on if needed. For women who want a regular check-up or have a specific symptom, this is
          usually the right first visit.
        </p>
      </Prose>

      <Prose title="Signs It Is Time to See a Fertility Doctor">
        <p>Consider seeing a fertility doctor if:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>You have tried to conceive for a year without success and you are under 35</li>
          <li>You have tried for six months and you are 35 or older</li>
          <li>Your periods are very irregular or absent and you hope to conceive</li>
          <li>You have PCOS, endometriosis or a past pelvic infection</li>
          <li>You have had two or more pregnancy losses</li>
          <li>Your partner has a known sperm problem</li>
          <li>You plan to delay pregnancy and want to know about egg freezing</li>
          <li>You face cancer treatment and want to protect fertility</li>
        </ul>
        <p>
          Our blog on{" "}
          <Link
            to="/$slug/"
            params={{ slug: "when-should-a-couple-seek-fertility-treatment" }}
            className={linkClass}
          >
            when a couple should seek fertility treatment
          </Link>{" "}
          covers these timelines in more depth.
        </p>
        <p>
          If you are searching for a fertility doctor near me, look for one who assesses both
          partners from the first visit, explains each test and tells you clearly when treatment may
          not be needed yet.
        </p>
      </Prose>

      <Prose title="When One Doctor Can Do Both">
        <p>
          For many women, the line between gynecology and fertility is blurred. Irregular periods
          may be a gynecological concern today and a fertility concern next year. PCOS, fibroids and
          endometriosis affect both general health and fertility. Seeing a doctor trained in both
          means one person follows your care through each stage. This avoids repeat tests and a
          fresh history at every referral. At Neo Fertility Clinic, care is led by{" "}
          <Link to={ROUTES.about} className={linkClass}>
            Dr. Payal Mahapatra
          </Link>
          , a gynecologist with a fellowship in reproductive medicine.
        </p>
      </Prose>

      <Prose title="Choosing a Lady Gynecologist Near You">
        <p>
          Many women prefer to see a female doctor, and that preference is valid. Comfort makes it
          easier to talk openly about symptoms that can feel personal. If you are searching for a
          lady gynecologist near me, check the doctor's qualifications, ask how long appointments
          usually last and whether a chaperone is available. A good doctor will explain each
          examination before it begins and ask for your consent.
        </p>
      </Prose>

      <Prose title="Finding a Gynecologist in Whitefield or Marathahalli">
        <p>
          For women who live or work in East Bengaluru, distance matters, especially when treatment
          involves several visits. If you are looking for a gynecologist in Whitefield or a
          gynecologist in Marathahalli, consider how easily you can reach the clinic for scans and
          follow-ups, its opening hours and whether it can handle both gynecology and fertility care
          under one roof.
        </p>
      </Prose>

      <Prose title="How to Prepare for Your First Visit">
        <ul className="list-disc space-y-2 pl-5">
          <li>Note the dates of your last few periods</li>
          <li>List any medicines and supplements you take</li>
          <li>Bring earlier test reports and scan results</li>
          <li>Write down your questions before the visit</li>
          <li>If you are trying to conceive, ask whether your partner should attend</li>
        </ul>
      </Prose>

      <Prose title="What to Expect at the Appointment">
        <p>
          The doctor will ask about your periods, past pregnancies, medical history and goals. An
          abdominal or pelvic examination may follow, along with an ultrasound scan if needed. Blood
          tests may be suggested. You should leave with a clear explanation of the likely cause and
          the next steps. It is fine to ask the doctor to repeat or explain anything you did not
          understand.
        </p>
      </Prose>

      <Prose title="Conclusion">
        <h3 className="text-[1.25rem] text-plum-900">Get Care That Fits Your Stage of Life</h3>
        <p>
          Whether you need routine gynecology care or are finding it hard to conceive, the right
          doctor is one who listens, explains your options and refers you onward when needed.
          Knowing when to move from a general check-up to a fertility assessment can save you time
          and worry.
        </p>
        <p>
          At Neo Fertility Clinic, Bangalore, gynecology and fertility care are available in one
          place, so your care can continue smoothly if your needs change. If you're looking for a
          gynecologist in Marathahalli or Whitefield, or have questions about trying to conceive,
          you can consult our team at our clinic in Munnekolala, near Marathahalli Bridge,
          Bengaluru. For appointments or enquiries, contact us at{" "}
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
