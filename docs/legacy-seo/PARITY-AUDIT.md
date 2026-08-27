# SEO parity audit — old site vs. replacement

Measured `https://neofertility-e21cdd05.vercel.app` against the captured old site in
[`pages.json`](./pages.json), then closed the gaps in code. **The new site takes over
`neofertility.co.in` itself**, so this is a platform swap, not a domain migration: the URLs
that rank today are about to be served by different software, and parity is judged
URL-for-URL.

| | Before | After |
| --- | --- | --- |
| Shared slugs resolving 200 | 28 / 28 | 28 / 28 |
| Meta titles identical to old | **0 / 28** | **28 / 28** |
| Descriptions over the ~155 SERP cutoff | 7 | **0** |
| Pages emitting the clinic block | 1 / 47 | **47 / 47** |
| Old URLs hard-404ing | **6** | **1** (intentional) |

## What changed, and why

### 1. Meta titles restored verbatim — 28 pages

Every shared page had been rewritten from brand-first (`Neo Fertility Clinic - Best IVF
Treatment in Marathahalli`) to keyword-first (`IVF Treatment in Marathahalli, Whitefield |
Neo Fertility`). The old strings are the ones holding current rankings, and their
"Best … in Marathahalli" phrasing matches the slugs that rank, so they were restored
exactly as captured.

Four restored titles run past 60 characters and will truncate in results. They were left
alone deliberately: truncation costs less than changing a title at the same moment the
platform changes. Re-optimise them once rankings are stable post-launch, one at a time.

Titles live in two places that must not drift — each route's `pageMeta({ title })` and the
matching entry in `src/data/site-pages.ts`, which feeds `/sitemap.xml` and `/llms.txt`.
Both were updated together.

### 2. Descriptions kept new, over-length ones trimmed — 7 pages

Descriptions were **not** reverted. The old site had 24 of 33 running past the SERP cutoff;
the rewrite had 7 of 28. Reverting would have re-introduced the worse set. Instead the 7
long ones were trimmed to ≤155 with their keywords intact, and the matching `summary`
fields in `site-pages.ts` were re-synced to match.

### 3. Redirects for 5 dead URLs — `src/server.ts`

Six old URLs 404'd with nothing configured. `LEGACY_REDIRECTS` in `src/server.ts` now
301s five of them, matched with and without a trailing slash, query strings preserved.
It runs in the worker entry ahead of the router, alongside the existing `/sitemap.xml`
handler — necessary, because the `$slug` catch-all would otherwise claim these paths and
404 first.

| Old URL | → | Why |
| --- | --- | --- |
| `/low-amh-can-you-still-get-pregnant-2/` | `/ivf-treatment-in-bangalore/` | **Already a 301 on WordPress.** That rule dies with WordPress; this re-creates it |
| `/icsi-treatment-for-male-infertility/` | `/icsi-treatment-in-marathahalli-whitefield-bangalore/` | Orphaned post → same subject |
| `/iui-treatment-a-complete-guide/` | `/intrauterine-insemination-iui-treatment-…-bangalore/` | Orphaned post → same subject |
| `/category/uncategorized/` | `/blogs/` | WP taxonomy artifact |
| `/author/priyanka/` | `/blogs/` | WP author archive |
| `/maintenance-mode/` | *(404 by design)* | WP artifact, indexable by accident |

> The two orphaned posts are real content and their full text is in
> [`content/`](./content/). Porting them into `src/content/blog/` would preserve those URLs
> outright, which beats redirecting. Worth revisiting.

### 4. Clinic schema on every page — `src/routes/__root.tsx`

The old site emitted its `MedicalClinic` block (with `GeoCoordinates` and
`OpeningHoursSpecification`) on all 33 pages. The replacement emitted it on the homepage
only, dropping the local-business signal from the other 46.

`jsonLd(clinicSchema)` now sits in the root route, so it lands on every page; the duplicate
copy was removed from `index.tsx`. This also fixed a quieter bug: `contactPageSchema`
already pointed at the clinic by `@id` (`about`, `mainEntity`), and on `/contact/` that
reference resolved to nothing. It resolves now, so `/contact/` needed no edit of its own.

## Still open

### AggregateRating — blocked on content, not on code

The old site put `AggregateRating` (4.6, 233 reviews) on every page. Nothing in the new
codebase emits it, so SERP star ratings are lost.

**It was not restored, and should not be until two things are true.** Google requires
rating markup to correspond to reviews visible on the same page. `/patient-stories/` holds
narrative case studies in prose — no authors, no star values — so marking it up would be
exactly the mismatch that earns a structured-data manual action.

To unblock:

1. **Verify the number.** 4.6 / 233 is a snapshot of unknown age from the old site. Check
   it against the live Google Business Profile — already referenced in `src/lib/clinic.ts`
   as `CLINIC.google.businessProfile`.
2. **Put real reviews on a page.** Individually attributed, with ratings.

Then add `AggregateRating` to that page only — not site-wide as the old site did.

## Cutover checklist

- [ ] **`www` → apex redirect (launch blocker).** `https://www.neofertility.co.in/` 301s to
      the apex today via the WordPress host. That redirect **disappears when the domain
      moves** and nothing in this repo reproduces it. Add `www` as a domain in the hosting
      project with a permanent redirect to the apex. Hosting-dashboard action, not code.
- [ ] Resubmit `/sitemap.xml` in Search Console after cutover. The path is unchanged, and
      because the domain is the same, the property, its history and its backlinks carry
      over untouched — no Change of Address, no reverification.
- [ ] Expect the old child sitemaps (`/sitemap-post-type-page.xml` and siblings) to 404.
      Harmless; the index at `/sitemap.xml` replaces them.
- [ ] Spot-check one page in Google's Rich Results Test once live.
- [ ] Old site serves the non-trailing-slash URL as `200`; the new one `307`s it to the
      slash form. The new behaviour is better — canonicals were already carrying this — but
      confirm it survives on the custom domain.

## Verified after the changes

Against a local dev server running the real `src/server.ts` entry:

- 28/28 meta titles byte-identical to `pages.json`; 0 descriptions over 155
- All 10 redirect forms (with and without trailing slash) return 301 to the right target;
  query strings preserved; `/maintenance-mode/` still 404s; every redirect target 200s
- All 47 sitemap URLs resolve 200; every page emits exactly one `MedicalClinic` node
- Canonicals self-referential and on `neofertility.co.in`; `/thank-you/` still
  `noindex, nofollow` and still absent from the sitemap
- No `vercel.app` or `localhost` string in any canonical, `og:url`, or schema node
- `vite build` clean; the 31 changed files lint clean

## Per-page meta, after the changes

| Slug | Meta title (now identical to old) | T | Description | D |
| --- | --- | --- | --- | --- |
| `/` | Neo Fertility - Best IVF Clinic in Marathahalli - Bangalore | 59 | Fertility and IVF care in Marathahalli and Whitefield, Bangalore. IVF, IUI, ICSI, egg freezing and PCOS care with Dr. Payal Mahapatra. Open all seven days. | 155 |
| `/best-doctor-for-pain-during-sex-treatment-in-bangalore/` | Painful Sexual Intercourse Treatment - Dr Payal Mahapatra | 57 | Confidential evaluation and treatment for pain during intercourse in Marathahalli, Bengaluru, with Dr. Payal Mahapatra, female gynecologist. | 140 |
| `/best-egg-freezing-clinic-in-marathahalli-bangalore/` | Neo Fertility - Egg Freezing Clinic Marathahalli Bangalore | 58 | Egg freezing and preservation in Marathahalli, Bengaluru: who it suits, the process, storage, and what affects success. | 119 |
| `/best-gynecologist-and-fertility-doctor-in-marathahalli/` | Best Gynecologist - Fertility Doctor in Marathahalli | 52 | Dr. Payal Mahapatra, MBBS, DGO, DNB, Fellowship in Reproductive Medicine. 18 years in fertility and gynecology in Marathahalli and Whitefield, Bangalore. | 153 |
| `/best-hysteroscopy-treatment-in-marathahalli-bangalore/` | Neo Fertility - Best Hysteroscopy Treatment in Marathahalli | 59 | Diagnostic and operative hysteroscopy for polyps, fibroids, adhesions and uterine septum in Marathahalli, Bengaluru. | 116 |
| `/best-ivf-treatment-in-marathahalli-whitefield-bangalore/` | Neo Fertility Clinic - Best IVF Treatment in Marathahalli | 57 | Expert IVF in Marathahalli and Whitefield, Bengaluru: how the cycle works, success rates by age, costs and risks. | 113 |
| `/best-male-infertility-treatment-in-marathahalli-bangalore/` | Best Male Infertility Treatment In Marathahalli - Bangalore | 59 | Male infertility diagnosis and treatment in Marathahalli, Bengaluru: causes, tests, timelines and treatment options. | 116 |
| `/best-pcod-treatment-in-marathahalli-whitefield-bangalore/` | Best PCOD treatment in Marathahalli - Neo Fertility Clinic | 58 | Diagnosis and management of polycystic ovarian disease (PCOD) with Dr. Payal Mahapatra in Marathahalli and Whitefield, Bangalore. Cycles and fertility. | 151 |
| `/best-pcos-treatment-in-marathahalli-whitefield-bangalore/` | Best PCOS Treatment in Marathahalli - Neo Fertility Clinic | 58 | Diagnosis and treatment for polycystic ovary syndrome (PCOS) with Dr. Payal Mahapatra in Marathahalli and Whitefield, Bangalore. Periods and fertility. | 151 |
| `/best-pre-conception-health-check-in-marathahalli-bangalore/` | Best Pre-conception Counselling Marathahalli - Neo Fertility | 60 | Preconception screening in Marathahalli, Bengaluru: hormone profile, pelvic ultrasound, infection screening and semen analysis before trying to conceive. | 153 |
| `/best-pregnancy-care-in-marathahalli-whitefield-bangalore/` | Best Pregnancy Care in Marathahalli - Neo Fertility Clinic | 58 | Complete antenatal care and high-risk pregnancy management in Marathahalli and Whitefield, Bengaluru, including pregnancies conceived through IVF. | 146 |
| `/blogs/` | Blogs – Neo Fertility Clinic | 28 | Articles from Neo Fertility Clinic, Marathahalli, Bangalore on fertility treatment, IVF and male infertility, written for patients. | 131 |
| `/breast-lumps-treatment-in-marathahalli-whitefield-bangalore/` | Breast Lumps treatment - Marathahalli - Dr Payal Mahapatra | 58 | Examination, triple assessment and treatment of breast lumps in Marathahalli and Whitefield, Bengaluru, with referral pathways where needed. | 140 |
| `/donor-eggs-and-sperm-program-in-marathahalli-bangalore/` | Best Donor Eggs - Sperm Program Marathahalli - Neo Fertility | 60 | Donor egg and sperm programme in Marathahalli, Bengaluru: who it helps, donor screening, the process, and eligibility. | 118 |
| `/family-planning-services-in-bangalore/` | Family Planning Counselling Bangalore - Neo Fertility Clinic | 60 | Contraceptive counselling, IUD and implant fitting, and family planning advice in Marathahalli, Bengaluru, with Dr. Payal Mahapatra. | 132 |
| `/icsi-treatment-in-marathahalli-whitefield-bangalore/` | Best ICSI Treatment in Marathahalli - Neo Fertility Clinic | 58 | ICSI for male infertility in Marathahalli and Whitefield, Bengaluru: how it works, costs, and success factors. | 110 |
| `/infertility-treatment-in-marathahalli-whitefield-in-bangalore/` | Infertility Treatment in Marathahalli - Neo Fertility Clinic | 60 | Comprehensive infertility evaluation and treatment in Marathahalli, Bengaluru: causes, tests, and personalised treatment for both partners. | 139 |
| `/intrauterine-insemination-iui-treatment-marathahalli-whitefield-in-bangalore/` | Intrauterine Insemination IUI - Marathahalli - Neo Fertility | 60 | IUI in Marathahalli and Whitefield, Bengaluru: how it works, who it suits, success rates and how it compares with IVF. | 118 |
| `/ivf-treatment-in-bangalore/` | IVF Treatment in Bangalore: Everything You Need to Know – Neo Fertility Clinic | 78 | Everything to know about IVF treatment in Bangalore: the process, success rates, costs, and how to choose a clinic. By Dr. Payal Mahapatra, Marathahalli. | 153 |
| `/laparoscopic-surgery-for-infertility-in-marathahalli-bangalore/` | Laparoscopic Surgery for Infertility - Neo Fertility Clinic | 59 | Minimally invasive laparoscopic surgery for endometriosis, adhesions, ovarian cysts and tubal disease in Marathahalli, Bengaluru. | 129 |
| `/medical-termination-of-pregnancy-mtp-marathahalli-whitefield/` | Medical Termination of Pregnancy MTP Marathahalli | 49 | Confidential medical termination of pregnancy under the MTP Act, in Marathahalli and Whitefield, Bengaluru, with Dr. Payal Mahapatra. | 133 |
| `/menstrual-bleeding-and-irregular-period-treatment-in-marathahalli-bangalore/` | Menstrual Bleeding - Irregular Period Treatment Marathahalli | 60 | Treatment for heavy bleeding, painful periods, irregular cycles and menopausal symptoms in Marathahalli, Bengaluru, with Dr. Payal Mahapatra. | 141 |
| `/pelvic-inflammatory-disease-pids-treatment-in-bangalore/` | Pelvic Inflammatory Disease - PIDs - Treatment in Bangalore | 59 | Prompt diagnosis and treatment of pelvic inflammatory disease in Bengaluru to prevent tubal damage and protect fertility. | 121 |
| `/pelvic-ultrasound-scan-in-marathahalli/` | Pelvic Ultrasound Scan - Marathahalli - Neo Fertility Clinic | 60 | Pelvic ultrasound and follicular study scans in Marathahalli, Bengaluru, for gynecological assessment and fertility evaluation with Dr. Payal Mahapatra. | 152 |
| `/privacy-policy/` | Privacy Policy – Neo Fertility Clinic | 37 | How Neo Fertility Clinic, Marathahalli, Bangalore collects, uses and protects your personal and medical information. | 116 |
| `/sexually-transmitted-infections-stis-treatment-in-bangalore/` | Best Sexually Transmitted Infections (STIs) – Treatment | 55 | Confidential testing and treatment for sexually transmitted infections in Bengaluru with Dr. Payal Mahapatra at Neo Fertility Clinic. | 133 |
| `/terms-of-use/` | Terms Of Use – Neo Fertility Clinic | 35 | Terms of use governing the Neo Fertility Clinic website and online enquiry or appointment request forms. | 104 |
| `/vaginal-discharge-infection-treatment-in-marathahalli-bangalore/` | Best Vaginal Discharge - Infection Treatment - Marathahalli | 59 | Diagnosis and treatment of vaginal discharge, itching and odour, including bacterial vaginosis and yeast infection, in Marathahalli, Bengaluru. | 143 |
