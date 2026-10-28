/**
 * The single inventory of public pages, and the source both /sitemap.xml and /llms.txt
 * are built from.
 *
 * `SITE_PAGES` is typed as an exhaustive map over ROUTES (minus the blog posts, which
 * come from POSTS instead), so adding a key to ROUTES without describing it here is a
 * compile error rather than a page that silently never gets listed. That is the whole
 * point: the previous sitemap was a hand-maintained XML file that happened to be correct.
 *
 * `title` and `summary` are copied from what each route passes to pageMeta, so the
 * listings cannot contradict the pages they point at.
 */
import { ROUTES } from "@/data/navigation";

export type PageSection =
  | "fertility"
  | "hormonal"
  | "pregnancy"
  | "gynecology"
  | "locations"
  | "guides"
  | "about"
  | "legal";

export type SitePage = {
  /** A value from ROUTES — always carries its trailing slash. */
  route: string;
  title: string;
  summary: string;
  section: PageSection;
  /** Relative weight within this site only. Search engines treat it as a hint. */
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

/** Section headings for llms.txt, in the order they are rendered. */
export const PAGE_SECTIONS: { id: PageSection; heading: string }[] = [
  { id: "fertility", heading: "Fertility treatment" },
  { id: "hormonal", heading: "Hormonal and menstrual health" },
  { id: "pregnancy", heading: "Pregnancy and delivery" },
  { id: "gynecology", heading: "Gynecology and women's health" },
  { id: "locations", heading: "Areas served" },
  { id: "guides", heading: "Costs, tools and guides" },
  { id: "about", heading: "About the clinic" },
  { id: "legal", heading: "Policies" },
];

/**
 * Blog posts are excluded: they are enumerated from POSTS in src/content/blog.
 *
 * `thankYou` is excluded for a different reason — it is a noindex conversion
 * destination. Listing it in the sitemap would invite Google to index it, and an
 * indexed thank-you page collects organic traffic that fires the conversion
 * without an enquiry behind it.
 */
type NonBlogRouteKey = Exclude<
  keyof typeof ROUTES,
  | "blogWhenToSeek"
  | "blogIvfBangalore"
  | "blogMaleInfertility"
  | "blogIuiTreatment"
  | "blogSemenAnalysis"
  | "thankYou"
>;

export const SITE_PAGES: SitePage[] = [
  {
    route: ROUTES.eggFreezing,
    title: "Neo Fertility - Egg Freezing Clinic Marathahalli Bangalore",
    summary:
      "Egg freezing and preservation in Marathahalli, Bengaluru: who it suits, the process, storage, and what affects success.",
    section: "fertility",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.icsi,
    title: "Best ICSI Treatment in Marathahalli - Neo Fertility Clinic",
    summary:
      "ICSI for male infertility in Marathahalli and Whitefield, Bengaluru: how it works, costs, and success factors.",
    section: "fertility",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.infertility,
    title: "Infertility Treatment in Marathahalli - Neo Fertility Clinic",
    summary:
      "Comprehensive infertility evaluation and treatment in Marathahalli, Bengaluru: causes, tests, and personalised treatment for both partners.",
    section: "fertility",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.iui,
    title: "Intrauterine Insemination IUI - Marathahalli - Neo Fertility",
    summary:
      "IUI in Marathahalli and Whitefield, Bengaluru: how it works, who it suits, success rates and how it compares with IVF.",
    section: "fertility",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.ivf,
    title: "Neo Fertility Clinic - Best IVF Treatment in Marathahalli",
    summary:
      "Expert IVF in Marathahalli and Whitefield, Bengaluru: how the cycle works, success rates by age, costs and risks.",
    section: "fertility",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.maleInfertility,
    title: "Best Male Infertility Treatment In Marathahalli - Bangalore",
    summary:
      "Male infertility diagnosis and treatment in Marathahalli, Bengaluru: causes, tests, timelines and treatment options.",
    section: "fertility",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.donor,
    title: "Best Donor Eggs - Sperm Program Marathahalli - Neo Fertility",
    summary:
      "Donor egg and sperm programme in Marathahalli, Bengaluru: who it helps, donor screening, the process, and eligibility.",
    section: "fertility",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.fertilitySolutions,
    title: "Fertility Treatment, Marathahalli Bangalore | Neo Fertility",
    summary:
      "Compare IVF, IUI, ICSI, egg freezing, male fertility and donor programmes in Marathahalli, Bangalore: costs, success factors and who each suits.",
    section: "fertility",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.ohss,
    title: "OHSS Treatment in Bangalore | Neo Fertility Clinic",
    summary:
      "Ovarian Hyperstimulation Syndrome monitoring and treatment during IVF and IUI cycles in Marathahalli, Bangalore, with Dr. Payal Mahapatra.",
    section: "fertility",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.pcod,
    title: "Best PCOD treatment in Marathahalli - Neo Fertility Clinic",
    summary:
      "Diagnosis and management of polycystic ovarian disease (PCOD) with Dr. Payal Mahapatra in Marathahalli and Whitefield, Bangalore. Cycles and fertility.",
    section: "hormonal",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.pcos,
    title: "Best PCOS Treatment in Marathahalli - Neo Fertility Clinic",
    summary:
      "Diagnosis and treatment for polycystic ovary syndrome (PCOS) with Dr. Payal Mahapatra in Marathahalli and Whitefield, Bangalore. Periods and fertility.",
    section: "hormonal",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.menstrual,
    title: "Menstrual Bleeding - Irregular Period Treatment Marathahalli",
    summary:
      "Treatment for heavy bleeding, painful periods, irregular cycles and menopausal symptoms in Marathahalli, Bengaluru, with Dr. Payal Mahapatra.",
    section: "hormonal",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.naturalDelivery,
    title: "Natural Delivery in Marathahalli, Whitefield | Neo Fertility",
    summary:
      "Prepare for a safe natural delivery in Marathahalli and Whitefield: nutrition, movement and labour support with Dr. Payal Mahapatra. Book a visit.",
    section: "pregnancy",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.preconception,
    title: "Best Pre-conception Counselling Marathahalli - Neo Fertility",
    summary:
      "Preconception screening in Marathahalli, Bengaluru: hormone profile, pelvic ultrasound, infection screening and semen analysis before trying to conceive.",
    section: "pregnancy",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.pregnancyCare,
    title: "Best Pregnancy Care in Marathahalli - Neo Fertility Clinic",
    summary:
      "Complete antenatal care and high-risk pregnancy management in Marathahalli and Whitefield, Bengaluru, including pregnancies conceived through IVF.",
    section: "pregnancy",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.familyPlanning,
    title: "Family Planning Counselling Bangalore - Neo Fertility Clinic",
    summary:
      "Contraceptive counselling, IUD and implant fitting, and family planning advice in Marathahalli, Bengaluru, with Dr. Payal Mahapatra.",
    section: "pregnancy",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.mtp,
    title: "Medical Termination of Pregnancy MTP Marathahalli",
    summary:
      "Confidential medical termination of pregnancy under the MTP Act, in Marathahalli and Whitefield, Bengaluru, with Dr. Payal Mahapatra.",
    section: "pregnancy",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.gynecologyTreatments,
    title: "Gynecologist in Marathahalli, Bangalore | Neo Fertility",
    summary:
      "Gynecologist in Marathahalli for irregular or heavy periods, PCOS, infections, breast lumps, hysteroscopy, laparoscopy and menopause care. Open 7 days.",
    section: "gynecology",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.hysteroscopy,
    title: "Neo Fertility - Best Hysteroscopy Treatment in Marathahalli",
    summary:
      "Diagnostic and operative hysteroscopy for polyps, fibroids, adhesions and uterine septum in Marathahalli, Bengaluru.",
    section: "gynecology",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.laparoscopy,
    title: "Laparoscopic Surgery for Infertility - Neo Fertility Clinic",
    summary:
      "Minimally invasive laparoscopic surgery for endometriosis, adhesions, ovarian cysts and tubal disease in Marathahalli, Bengaluru.",
    section: "gynecology",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.breastLumps,
    title: "Breast Lumps treatment - Marathahalli - Dr Payal Mahapatra",
    summary:
      "Examination, triple assessment and treatment of breast lumps in Marathahalli and Whitefield, Bengaluru, with referral pathways where needed.",
    section: "gynecology",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.painDuringSex,
    title: "Painful Sexual Intercourse Treatment - Dr Payal Mahapatra",
    summary:
      "Confidential evaluation and treatment for pain during intercourse in Marathahalli, Bengaluru, with Dr. Payal Mahapatra, female gynecologist.",
    section: "gynecology",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.pelvicUltrasound,
    title: "Pelvic Ultrasound Scan - Marathahalli - Neo Fertility Clinic",
    summary:
      "Pelvic ultrasound and follicular study scans in Marathahalli, Bengaluru, for gynecological assessment and fertility evaluation with Dr. Payal Mahapatra.",
    section: "gynecology",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.pid,
    title: "Pelvic Inflammatory Disease - PIDs - Treatment in Bangalore",
    summary:
      "Prompt diagnosis and treatment of pelvic inflammatory disease in Bengaluru to prevent tubal damage and protect fertility.",
    section: "gynecology",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.sexualDysfunction,
    title: "Female Sexual Dysfunction Care in Bangalore | Neo Fertility",
    summary:
      "Private, judgement-free care for low desire, arousal or orgasm difficulty and painful sex, with Dr. Payal Mahapatra in Marathahalli, Bangalore.",
    section: "gynecology",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.sti,
    title: "Best Sexually Transmitted Infections (STIs) – Treatment",
    summary:
      "Confidential testing and treatment for sexually transmitted infections in Bengaluru with Dr. Payal Mahapatra at Neo Fertility Clinic.",
    section: "gynecology",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.vaginalInfection,
    title: "Best Vaginal Discharge - Infection Treatment - Marathahalli",
    summary:
      "Diagnosis and treatment of vaginal discharge, itching and odour, including bacterial vaginosis and yeast infection, in Marathahalli, Bengaluru.",
    section: "gynecology",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.firstRelationship,
    title: "First Sexual Relationship Guidance Bangalore | Neo Fertility",
    summary:
      "Confidential counselling and safe health practice guidance for a first sexual relationship, in Marathahalli, Bangalore, with Dr. Payal Mahapatra.",
    section: "gynecology",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.vaginalTightening,
    title: "Vaginal Tightening Treatment in Bangalore | Neo Fertility",
    summary:
      "Vaginal laxity after childbirth or with age: assessment, pelvic floor therapy and procedural options with Dr. Payal Mahapatra, Marathahalli, Bangalore.",
    section: "gynecology",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.bellandur,
    title: "Fertility Clinic Near Bellandur, Bangalore | Neo Fertility",
    summary:
      "IVF, IUI, ICSI, egg freezing and PCOS care for couples from Bellandur, with Dr. Payal Mahapatra on Marathahalli Bridge Road. Open all 7 days.",
    section: "locations",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.whitefield,
    title: "IVF & Fertility Specialist Near Whitefield | Neo Fertility",
    summary:
      "IVF, IUI, ICSI, egg freezing and PCOS care with Dr. Payal Mahapatra, 15 to 25 minutes from Whitefield on Marathahalli Bridge Road. Open all 7 days.",
    section: "locations",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.ivfCost,
    title: "IVF Cost in Bangalore 2026: Price Breakdown | Neo Fertility",
    summary:
      "A standard IVF cycle at Neo Fertility, Marathahalli costs ₹1–2 lakh. See ICSI, frozen embryo transfer and test costs, what is included and EMI options.",
    section: "guides",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.blogs,
    title: "Fertility & IVF Blog: Doctor-Written Guides | Neo Fertility",
    summary:
      "Doctor-written guides on IVF, IUI, male infertility and when to seek fertility help, from Dr. Payal Mahapatra at Neo Fertility Clinic, Marathahalli.",
    section: "guides",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    route: ROUTES.fertilityAssessment,
    title: "Fertility Self-Assessment | Neo Fertility Clinic, Bangalore",
    summary:
      "A short self-assessment to help you decide which fertility evaluation to start with. Not a diagnosis. Both partners tested from the start.",
    section: "guides",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.ovulationCalculator,
    title: "Ovulation Calculator | Neo Fertility Clinic, Bangalore",
    summary:
      "Estimate your ovulation day and fertile window from your last period date and cycle length. An estimate only, less reliable with irregular cycles.",
    section: "guides",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.home,
    title: "Neo Fertility - Best IVF Clinic in Marathahalli - Bangalore",
    summary:
      "Fertility and IVF care in Marathahalli and Whitefield, Bangalore. IVF, IUI, ICSI, egg freezing and PCOS care with Dr. Payal Mahapatra. Open all seven days.",
    section: "about",
    priority: 1.0,
    changeFrequency: "weekly",
  },
  {
    route: ROUTES.about,
    title: "Best Gynecologist - Fertility Doctor in Marathahalli",
    summary:
      "Dr. Payal Mahapatra, MBBS, DGO, DNB, Fellowship in Reproductive Medicine. 18 years in fertility and gynecology in Marathahalli and Whitefield, Bangalore.",
    section: "about",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.contact,
    title: "Contact Neo Fertility Clinic | Marathahalli, Bangalore",
    summary:
      "Get in touch with Neo Fertility Clinic in Marathahalli, Bangalore. Address, phone, WhatsApp, clinic hours, map and an online appointment request form.",
    section: "about",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.faq,
    title: "Frequently Asked Questions | Neo Fertility Clinic, Bangalore",
    summary:
      "Answers to common questions on fertility treatment, gynecology, costs and appointments at Neo Fertility Clinic, Marathahalli and Whitefield, Bangalore.",
    section: "about",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.whoWeHelp,
    title: "Who We Help | Fertility Care in Marathahalli, Bangalore",
    summary:
      "Care for couples trying to conceive, women with PCOS or PMOS, single women, same-sex couples, men with fertility concerns and second opinions.",
    section: "about",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.gallery,
    title: "Gallery | Neo Fertility Clinic, Bangalore",
    summary:
      "Photographs from Neo Fertility Clinic, Marathahalli and Whitefield, Bangalore — the people we have cared for and the moments they chose to share.",
    section: "about",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.patientStories,
    title: "Patient Stories | Neo Fertility Clinic, Bangalore",
    summary:
      "Anonymised stories from patients treated at Neo Fertility Clinic, Marathahalli, Bangalore. Individual results vary and outcomes are not guaranteed.",
    section: "about",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    route: ROUTES.privacy,
    title: "Privacy Policy – Neo Fertility Clinic",
    summary:
      "How Neo Fertility Clinic, Marathahalli, Bangalore collects, uses and protects your personal and medical information.",
    section: "legal",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    route: ROUTES.terms,
    title: "Terms Of Use – Neo Fertility Clinic",
    summary:
      "Terms of use governing the Neo Fertility Clinic website and online enquiry or appointment request forms.",
    section: "legal",
    priority: 0.3,
    changeFrequency: "yearly",
  },
];

/* Compile-time exhaustiveness check: every non-blog ROUTES key must appear above.
   Unused at runtime; its only job is to fail `tsc` when a new route is added. */
const _COVERED: Record<NonBlogRouteKey, true> = {
  about: true,
  bellandur: true,
  blogs: true,
  breastLumps: true,
  contact: true,
  donor: true,
  eggFreezing: true,
  familyPlanning: true,
  faq: true,
  fertilityAssessment: true,
  fertilitySolutions: true,
  firstRelationship: true,
  gallery: true,
  gynecologyTreatments: true,
  home: true,
  hysteroscopy: true,
  icsi: true,
  infertility: true,
  iui: true,
  ivf: true,
  ivfCost: true,
  laparoscopy: true,
  maleInfertility: true,
  menstrual: true,
  mtp: true,
  naturalDelivery: true,
  ohss: true,
  ovulationCalculator: true,
  painDuringSex: true,
  patientStories: true,
  pcod: true,
  pcos: true,
  pelvicUltrasound: true,
  pid: true,
  preconception: true,
  pregnancyCare: true,
  privacy: true,
  sexualDysfunction: true,
  sti: true,
  terms: true,
  vaginalInfection: true,
  vaginalTightening: true,
  whitefield: true,
  whoWeHelp: true,
};
void _COVERED;

/**
 * The child pages of a hub, for its ItemList schema.
 *
 * Derived from SITE_PAGES rather than restated per hub, so a new treatment page joins
 * its hub's structured data automatically.
 */
export function pagesInSection(
  section: PageSection,
  exclude?: string,
): { name: string; path: string }[] {
  return SITE_PAGES.filter((page) => page.section === section && page.route !== exclude)
    .sort((a, b) => b.priority - a.priority)
    .map((page) => ({ name: page.title, path: page.route }));
}
