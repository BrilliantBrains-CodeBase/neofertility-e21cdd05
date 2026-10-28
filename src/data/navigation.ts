/**
 * Frozen URL map. These slugs hold existing search rankings — never rename them.
 * Router is configured with trailingSlash: "always", so every rendered href
 * resolves at the canonical trailing-slash URL.
 */
export const ROUTES = {
  home: "/",
  about: "/best-gynecologist-and-fertility-doctor-in-marathahalli/",
  preconception: "/best-pre-conception-health-check-in-marathahalli-bangalore/",
  painDuringSex: "/best-doctor-for-pain-during-sex-treatment-in-bangalore/",
  pregnancyCare: "/best-pregnancy-care-in-marathahalli-whitefield-bangalore/",
  naturalDelivery: "/natural-delivery-in-marathahalli-whitefield-bangalore/",
  familyPlanning: "/family-planning-services-in-bangalore/",
  pelvicUltrasound: "/pelvic-ultrasound-scan-in-marathahalli/",
  infertility: "/infertility-treatment-in-marathahalli-whitefield-in-bangalore/",
  iui: "/intrauterine-insemination-iui-treatment-marathahalli-whitefield-in-bangalore/",
  ivf: "/best-ivf-treatment-in-marathahalli-whitefield-bangalore/",
  icsi: "/icsi-treatment-in-marathahalli-whitefield-bangalore/",
  eggFreezing: "/best-egg-freezing-clinic-in-marathahalli-bangalore/",
  maleInfertility: "/best-male-infertility-treatment-in-marathahalli-bangalore/",
  donor: "/donor-eggs-and-sperm-program-in-marathahalli-bangalore/",
  pcod: "/best-pcod-treatment-in-marathahalli-whitefield-bangalore/",
  pcos: "/best-pcos-treatment-in-marathahalli-whitefield-bangalore/",
  menstrual: "/menstrual-bleeding-and-irregular-period-treatment-in-marathahalli-bangalore/",
  sti: "/sexually-transmitted-infections-stis-treatment-in-bangalore/",
  pid: "/pelvic-inflammatory-disease-pids-treatment-in-bangalore/",
  vaginalInfection: "/vaginal-discharge-infection-treatment-in-marathahalli-bangalore/",
  breastLumps: "/breast-lumps-treatment-in-marathahalli-whitefield-bangalore/",
  mtp: "/medical-termination-of-pregnancy-mtp-marathahalli-whitefield/",
  hysteroscopy: "/best-hysteroscopy-treatment-in-marathahalli-bangalore/",
  laparoscopy: "/laparoscopic-surgery-for-infertility-in-marathahalli-bangalore/",
  blogs: "/blogs/",
  blogWhenToSeek: "/when-should-a-couple-seek-fertility-treatment/",
  blogIvfBangalore: "/ivf-treatment-in-bangalore/",
  blogMaleInfertility: "/male-infertility-causes-diagnosis-and-treatment/",
  blogIuiTreatment: "/iui-treatment-process-who-it-suits/",
  blogSemenAnalysis: "/semen-analysis-test-what-it-checks/",
  privacy: "/privacy-policy/",
  terms: "/terms-of-use/",
  fertilitySolutions: "/fertility-solutions/",
  gynecologyTreatments: "/gynecology-treatments/",
  whoWeHelp: "/who-we-help/",
  patientStories: "/patient-stories/",
  gallery: "/gallery/",
  faq: "/faq/",
  contact: "/contact/",
  /* Post-submission confirmation. noindex, and deliberately absent from
     SITE_PAGES — a conversion destination must never enter the sitemap. */
  thankYou: "/thank-you/",
  ivfCost: "/ivf-cost-in-bangalore/",
  fertilityAssessment: "/fertility-assessment/",
  ovulationCalculator: "/ovulation-calculator/",
  ohss: "/ovarian-hyperstimulation-syndrome-ohss-treatment-bangalore/",
  firstRelationship: "/first-sexual-relationship-guidance-bangalore/",
  sexualDysfunction: "/female-sexual-dysfunction-treatment-bangalore/",
  vaginalTightening: "/vaginal-tightening-treatment-bangalore/",
  whitefield: "/ivf-clinic-in-whitefield-bangalore/",
  bellandur: "/fertility-clinic-in-bellandur-bangalore/",
} as const;

export type NavLink = { label: string; to: string; hash?: string };
export type NavGroup = { heading: string; links: NavLink[] };

export const FERTILITY_MENU: NavGroup[] = [
  {
    heading: "Pregnancy Services",
    links: [
      { label: "Preconception Checkup", to: ROUTES.preconception },
      { label: "Pain While Having Sex", to: ROUTES.painDuringSex },
      { label: "Pregnancy Care", to: ROUTES.pregnancyCare },
      { label: "Natural Delivery", to: ROUTES.naturalDelivery },
      { label: "Family Planning", to: ROUTES.familyPlanning },
      { label: "Pelvic Ultrasound Scan", to: ROUTES.pelvicUltrasound },
    ],
  },
  {
    heading: "Fertility Treatment",
    links: [
      { label: "Infertility Evaluation / Treatments", to: ROUTES.infertility },
      { label: "Intra Uterine Insemination (IUI)", to: ROUTES.iui },
      { label: "In-Vitro Fertilization (IVF)", to: ROUTES.ivf },
      { label: "Intracytoplasmic Sperm Injection (ICSI)", to: ROUTES.icsi },
      { label: "Egg Freezing and Preservation", to: ROUTES.eggFreezing },
      { label: "Male Fertility Solutions", to: ROUTES.maleInfertility },
      { label: "Donor Egg and Sperm Programs", to: ROUTES.donor },
    ],
  },
  {
    heading: "Hormonal Concerns",
    links: [
      { label: "Polycystic Ovarian Disease (PCOD)", to: ROUTES.pcod },
      { label: "Polycystic ovary syndrome (PCOS)", to: ROUTES.pcos },
    ],
  },
];

export const GYNECOLOGY_MENU: NavGroup[] = [
  {
    heading: "Menstrual & Hormonal Disorders",
    links: [
      { label: "Abnormal Bleeding", to: ROUTES.menstrual, hash: "abnormal_bleeding" },
      { label: "Painful Menses", to: ROUTES.menstrual, hash: "constant_menstrual_pain" },
      {
        label: "Irregular or Abnormal Menstrual Periods",
        to: ROUTES.menstrual,
        hash: "irregular_menstrual_cycles",
      },
      { label: "Menopausal Issues", to: ROUTES.menstrual, hash: "menopausal_disorders" },
    ],
  },
  {
    heading: "Infections & Special Treatments",
    links: [
      { label: "STIs", to: ROUTES.sti },
      { label: "PIDs", to: ROUTES.pid },
      { label: "Vaginal Itching / Infection / Odour", to: ROUTES.vaginalInfection },
      { label: "Lumps in Your Breasts", to: ROUTES.breastLumps },
    ],
  },
  {
    heading: "Sexual & Reproductive Health",
    links: [
      { label: "Pain While Having Sex", to: ROUTES.painDuringSex },
      { label: "Medical Termination of Pregnancy", to: ROUTES.mtp },
    ],
  },
  {
    heading: "Surgeries",
    links: [
      { label: "Hysteroscopy", to: ROUTES.hysteroscopy },
      { label: "Laparoscopy", to: ROUTES.laparoscopy },
    ],
  },
];

export const SITE_URL = "https://neofertility.co.in";
