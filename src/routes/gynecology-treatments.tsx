import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import { PageHero, SectionHeading, FaqBlock } from "@/components/sections/blocks";
import { GYNECOLOGY_MENU, ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const WHAT_WE_TREAT = [
  {
    title: "Menstrual and hormonal disorders",
    copy: "Heavy menstrual bleeding, irregular or absent periods, painful periods, bleeding between periods, and perimenopausal and menopausal symptoms. Investigation covers pelvic ultrasound, thyroid and prolactin, androgen profile, and endometrial assessment where indicated.",
  },
  {
    title: "PCOS, PMOS and PCOD",
    copy: "Cycle regulation, insulin resistance management, androgen-related symptoms and fertility support. In May 2026 polycystic ovary syndrome was formally renamed polyendocrine metabolic ovarian syndrome, PMOS, in a global consensus published in The Lancet. Diagnosis and treatment are unchanged.",
  },
  {
    title: "Infections",
    copy: "Vaginal discharge, itching and odour, bacterial vaginosis, yeast infection and trichomoniasis. Sexually transmitted infection testing and treatment, offered confidentially. Pelvic inflammatory disease, where speed of treatment directly determines whether fertility is preserved.",
  },
  {
    title: "Breast health",
    copy: "Examination of breast lumps, triple assessment with ultrasound or mammography and biopsy where indicated, nipple discharge assessment, and referral to breast surgical oncology where malignancy is confirmed or suspected.",
  },
  {
    title: "Sexual and reproductive health",
    copy: "Pain during intercourse and vaginismus, low desire and sexual dysfunction, premarital and first-relationship consultation, contraception including IUD and implant fitting, and medical termination of pregnancy under the MTP Act.",
  },
  {
    title: "Surgery",
    copy: "Hysteroscopy for polyps, submucous fibroids, intrauterine adhesions and uterine septum. Laparoscopy for endometriosis, pelvic adhesions, ovarian cysts, tubal disease and ovarian drilling.",
  },
];

const WHEN_TO_BOOK = [
  { symptom: "Irregular periods", book: "The pattern has lasted three months or more" },
  {
    symptom: "Heavy bleeding",
    book: "You soak a pad hourly, pass clots larger than a rupee coin, or bleed more than seven days",
  },
  {
    symptom: "Period pain",
    book: "Ordinary painkillers no longer control it, or the pain has worsened over the years",
  },
  {
    symptom: "Pain during intercourse",
    book: "It has happened more than a few times, or is getting worse",
  },
  {
    symptom: "Vaginal discharge or odour",
    book: "It is new, or an over-the-counter treatment has already failed once",
  },
  {
    symptom: "Pelvic pain with discharge",
    book: "Same week. Untreated pelvic infection scars the fallopian tubes within weeks",
  },
  { symptom: "A breast lump", book: "Any new lump, regardless of whether it hurts" },
  { symptom: "Bleeding after menopause", book: "Promptly, in every case" },
  { symptom: "Bleeding after intercourse", book: "Promptly, in every case" },
];

const FAQS = [
  {
    q: "Is there a female gynecologist in Marathahalli open on Sundays?",
    a: "Yes. Dr. Payal Mahapatra practises at Neo Fertility Clinic on Marathahalli Bridge Service Road, open all seven days from 09:30 to 18:30.",
  },
  {
    q: "What is the difference between PCOD, PCOS and PMOS?",
    a: "PCOD is the older, looser term for the ovarian appearance and irregular ovulation. PCOS is the recognised syndrome, which also requires raised androgens and carries a metabolic dimension. PMOS is the new name for PCOS, adopted globally in May 2026. All three refer to the same spectrum, and treatment is unchanged.",
  },
  {
    q: "When should I see a gynecologist about irregular periods?",
    a: "If the pattern has lasted three months or more, if you are also experiencing weight change, acne, excess hair or hair loss, or if you are trying to conceive. Thyroid disorders and raised prolactin are common, easily tested and easily treated causes.",
  },
  {
    q: "Do I need a referral for gynecology consultation?",
    a: "No. You can book directly by phone, WhatsApp or online. Bring previous scans and reports if you have them.",
  },
  {
    q: "Is gynecology consultation confidential?",
    a: "Yes. Consultations, testing and results are confidential. If confidentiality is a particular concern, raise it at the start and ask how you will be contacted and what appears on records.",
  },
];

export const Route = createFileRoute("/gynecology-treatments")({
  head: () => {
    const base = pageMeta({
      title: "Gynecologist in Marathahalli, Bangalore | Neo Fertility Clinic",
      description:
        "Gynecology care in Marathahalli and Whitefield, Bangalore. Irregular and heavy periods, PCOS and PMOS, infections, breast health, hysteroscopy, laparoscopy and menopause care.",
      path: ROUTES.gynecologyTreatments,
    });
    return {
      ...base,
      scripts: [
        jsonLd(faqSchema(FAQS)),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: ROUTES.home },
            { name: "Gynecology Treatments", path: ROUTES.gynecologyTreatments },
          ]),
        ),
      ],
    };
  },
  component: GynecologyTreatmentsPage,
});

function GynecologyTreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Gynecology Treatments"
        title="Gynecology and Women's Health in Marathahalli, Bangalore"
        intro="Neo Fertility Clinic provides gynecology care in Marathahalli, Bengaluru, covering menstrual and hormonal disorders, PCOS and PMOS, pelvic and vaginal infections, sexually transmitted infections, breast health assessment, contraception, medical termination of pregnancy, hysteroscopy, laparoscopic surgery and menopause care. Consultations are with Dr. Payal Mahapatra, a female gynecologist, all seven days."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Gynecology Treatments" }]}
      />

      <section className="bg-pink-25 section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we treat"
            title="Every area of gynecology, under one roof"
          />
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_TREAT.map((item) => (
              <div key={item.title} className="border-t border-line pt-5">
                <h3>{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-muted">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Don't wait" title="When to book rather than wait" />
          <div className="mt-8 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[560px] text-left text-[0.9375rem]">
              <tbody>
                {WHEN_TO_BOOK.map((row) => (
                  <tr key={row.symptom} className="border-t border-line first:border-t-0">
                    <td className="p-4 font-medium text-plum-900">{row.symptom}</td>
                    <td className="p-4 text-ink-muted">{row.book}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {GYNECOLOGY_MENU.map((group) => (
        <section key={group.heading} className="bg-pink-25 section-y border-t border-line">
          <div className="container-page">
            <SectionHeading eyebrow="Explore" title={group.heading} />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    {...(link.hash ? { hash: link.hash } : {})}
                    className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-4 py-3 text-[0.9375rem] text-plum-900 hover:border-pink-600"
                  >
                    {link.label}
                    <ArrowRight className="size-4 shrink-0 text-pink-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <FaqBlock items={FAQS} />

      <ClosingCta
        heading="A gynecology consultation, confidential and same-week where it matters"
        copy="Bring previous scans and reports where you have them. No referral is needed."
        sourcePage="gynecology_treatments_closing"
        whatsappMessage="Hi, I'd like to book a gynecology consultation."
      />
    </>
  );
}
