# Legacy SEO snapshot — neofertility.co.in

Full SEO and content capture of the **old WordPress site**, taken before it is replaced by
this TanStack Start application. This is a backup: nothing here is read at build time, and
nothing here should be edited. It is the record of what the old site ranked with.

| | |
| --- | --- |
| Captured | 2026-08-27 |
| Source | `https://neofertility.co.in` (WordPress, slim-seo plugin) |
| URLs | 34 total — 28 pages, 3 posts, 2 archives, 1 redirect |
| Method | `firecrawl scrape --format markdown,rawHtml`; canonical and `<h1>` parsed from raw HTML |

## Files

- **`pages.json`** — one record per URL. The machine-readable source; use it for redirect maps
  and for diffing old meta against the new site's `SITE_PAGES`.
- **`content/*.md`** — full page copy, one file per live URL (33 files). Recovers any wording
  the new site dropped.
- **`README.md`** — this file.
- **`PARITY-AUDIT.md`** — the old-vs-new comparison, what was changed to close the gaps,
  and the cutover checklist.

Raw scrape output lives in `.firecrawl/legacy/` and is gitignored; `pages.json` and `content/`
are the committed artifacts.

## Conventions worth preserving

- **Every old URL carries a trailing slash.** `ROUTES` in `src/data/navigation.ts` does too, so
  the two are directly comparable. Serving these paths without the trailing slash on the new
  site would fragment every one of them.
- **Canonicals are self-referential** on all 33 live URLs — every page has one, and every one
  points at its own trailing-slash form.
- **Robots is uniform**: `max-image-preview:large, max-snippet:-1, max-video-preview:-1`. No page
  was noindexed — including `/maintenance-mode/`, which is indexable today.

## Gap analysis — what needs a 301

Matched against `ROUTES` in `src/data/navigation.ts`. Every old URL is accounted for below.

**28 of 34 old URLs have an exact slug match on the new site** and need no redirect.
The remaining 6:

| Old URL | Type | Status today | Action needed |
| --- | --- | --- | --- |
| `/maintenance-mode/` | page | Live, 200, in sitemap | No redirect. A WP artifact that should never have been indexed — let it 404, and drop it from the new sitemap. |
| `/icsi-treatment-for-male-infertility/` | post | Live, 200 | **Needs decision.** No new equivalent. The new site's ICSI *service* page is `/icsi-treatment-in-marathahalli-whitefield-bangalore/` — either port the post or 301 there. |
| `/iui-treatment-a-complete-guide/` | post | Live, 200 | **Needs decision.** No new equivalent. Nearest new page is the IUI service page `/intrauterine-insemination-iui-treatment-marathahalli-whitefield-in-bangalore/`. |
| `/author/priyanka/` | archive | Live, 200, no meta description | 301 to `/blogs/` (or the about page). WP author archive; no new counterpart. |
| `/category/uncategorized/` | archive | Live, 200, no meta description | 301 to `/blogs/`. A WP taxonomy artifact with no new counterpart. |
| `/low-amh-can-you-still-get-pregnant-2/` | redirect | 301 → `/ivf-treatment-in-bangalore/` | **Preserve this redirect.** It already exists on the old site and must be re-created, or the link equity pointing at it is lost. |

Note on blog posts: the old site has 3, the new site has 3, but only
`/ivf-treatment-in-bangalore/` exists on both. The new site's other two
(`/when-should-a-couple-seek-fertility-treatment/`, `/male-infertility-causes-diagnosis-and-treatment/`)
are new URLs with no old-site history.

## Meta inventory

`T` and `D` are title and description character counts. Titles over ~60 and descriptions over
~155 truncate in search results. **24 of the 33 descriptions exceed 155 characters** and 3 titles
exceed 60 — so these are a baseline to improve on, not text to copy across verbatim.

### Pages (28)

| Slug | Meta title | T | Meta description | D | New route |
| --- | --- | --- | --- | --- | --- |
| `/` | Neo Fertility - Best IVF Clinic in Marathahalli - Bangalore | 59 | Your Parenthood Journey Begins Here – Advanced Fertility Treatments, High Success Rates to Help You Conceive. Expert, Personalized Care by Dr Payal Mahapatra | 157 | ✅ same |
| `/best-doctor-for-pain-during-sex-treatment-in-bangalore/` | Painful Sexual Intercourse Treatment - Dr Payal Mahapatra | 57 | Best Doctor for 'Pain During Sex' Treatment in Marathahalli Bangalore. Advanced, compassionate, and confidential care to help you regain comfort and intimacy. | 158 | ✅ same |
| `/best-egg-freezing-clinic-in-marathahalli-bangalore/` | Neo Fertility - Egg Freezing Clinic Marathahalli Bangalore | 58 | Neo Fertility Clinic, Best Egg Freezing clinic in Marathahalli Bangalore. Safe and advanced fertility preservation services for your reproductive health. | 153 | ✅ same |
| `/best-gynecologist-and-fertility-doctor-in-marathahalli/` | Best Gynecologist - Fertility Doctor in Marathahalli | 52 | Dr Payal Mahapatra - Best Gynecologist & Fertility Expert. 18 Yrs experience. Specializes in high-risk pregnancy care, infertility treatments at Marathahalli. | 158 | ✅ same |
| `/best-hysteroscopy-treatment-in-marathahalli-bangalore/` | Neo Fertility - Best Hysteroscopy Treatment in Marathahalli | 59 | Neo Fertility Clinic offers the Best Hysteroscopy Treatment in Marathahalli - Bangalore. Ensure safe, accurate, effective solution for your reproductive health. | 160 | ✅ same |
| `/best-ivf-treatment-in-marathahalli-whitefield-bangalore/` | Neo Fertility Clinic - Best IVF Treatment in Marathahalli | 57 | Neo Fertility Clinic offers advanced fertility solutions, compassionate care, and a high success rate for couples struggling with infertility in Marathahalli. | 158 | ✅ same |
| `/best-male-infertility-treatment-in-marathahalli-bangalore/` | Best Male Infertility Treatment In Marathahalli - Bangalore | 59 | At Neo Fertility Clinic in Marathahalli Bangalore, We specialize in Advanced Male Infertility treatments to help you achieve your dream of starting a family. | 157 | ✅ same |
| `/best-pcod-treatment-in-marathahalli-whitefield-bangalore/` | Best PCOD treatment in Marathahalli - Neo Fertility Clinic | 58 | At Neo Fertility Clinic, we provide expert PCOD treatment in Marathahalli - Whitefield - Bangalore to help you regain balance and improve your well-being. | 154 | ✅ same |
| `/best-pcos-treatment-in-marathahalli-whitefield-bangalore/` | Best PCOS Treatment in Marathahalli - Neo Fertility Clinic | 58 | Neo Fertility Clinic provides expert PCOS treatment in Marathahalli - Whitefield - Bangalore, helping women restore hormonal balance & improve their well-being. | 160 | ✅ same |
| `/best-pre-conception-health-check-in-marathahalli-bangalore/` | Best Pre-conception Counselling Marathahalli - Neo Fertility | 60 | At Neo Fertility Clinic, we offer the best pre-conception counselling and health check in Marathahalli Bangalore. Book An Appointment - Dr Payal Mahapatra. | 155 | ✅ same |
| `/best-pregnancy-care-in-marathahalli-whitefield-bangalore/` | Best Pregnancy Care in Marathahalli - Neo Fertility Clinic | 58 | Neo Fertility Clinic provides the Best Pregnancy Care in Marathahalli Bangalore. Ensures health & well-being of both mother and baby from conception to delivery | 160 | ✅ same |
| `/blogs/` | Blogs – Neo Fertility Clinic | 28 | BLOGS IUI Treatment: Process, Success Rates, and Costs – A Fertility Specialist’s Complete Guide When couples walk into my clinic after months or years of | 154 | ✅ same |
| `/breast-lumps-treatment-in-marathahalli-whitefield-bangalore/` | Breast Lumps treatment - Marathahalli - Dr Payal Mahapatra | 58 | Comprehensive Breast Lumps Treatment in Marathahalli. Most breast lumps are non-cancerous, but early evaluation is crucial to rule out any serious conditions. | 158 | ✅ same |
| `/donor-eggs-and-sperm-program-in-marathahalli-bangalore/` | Best Donor Eggs - Sperm Program Marathahalli - Neo Fertility | 60 | Neo Fertility Clinic - Our Donor Egg and Sperm Program in Marathahalli provides a safe and ethical solution to help couples achieve their dream of parenthood. | 158 | ✅ same |
| `/family-planning-services-in-bangalore/` | Family Planning Counselling Bangalore - Neo Fertility Clinic | 60 | Best Family Planning Services - Marathahalli offers expert consultation, advanced contraceptive methods, fertility guidance to help you make informed decisions. | 160 | ✅ same |
| `/icsi-treatment-in-marathahalli-whitefield-bangalore/` | Best ICSI Treatment in Marathahalli - Neo Fertility Clinic | 58 | At Neo Fertility Clinic, Dr Payal Mahapatra provides expert ICSI treatment in Marathahalli - Bangalore with high success rates. Start Your ICSI Journey Today! | 158 | ✅ same |
| `/infertility-treatment-in-marathahalli-whitefield-in-bangalore/` | Infertility Treatment in Marathahalli - Neo Fertility Clinic | 60 | Comprehensive Infertility Evaluation & Treatment in Marathahalli in Bangalore. Dr Payal Mahapatra - Expert diagnosis and personalized fertility treatments. | 155 | ✅ same |
| `/intrauterine-insemination-iui-treatment-marathahalli-whitefield-in-bangalore/` | Intrauterine Insemination IUI - Marathahalli - Neo Fertility | 60 | Intrauterine Insemination (IUI) is a safe, effective, and less invasive fertility treatment designed to increase your chances of pregnancy. Dr Payal Mahapatra. | 159 | ✅ same |
| `/laparoscopic-surgery-for-infertility-in-marathahalli-bangalore/` | Laparoscopic Surgery for Infertility - Neo Fertility Clinic | 59 | At Neo Fertility Clinic, we offer expert Laparoscopic Surgery for Infertility in Marathahalli Bangalore, ensuring precision treatment and faster recovery. | 154 | ✅ same |
| `/maintenance-mode/` | Maintenance Mode – Neo Fertility Clinic | 39 | This Site is Under Maintenance We will be online in a couple of days. Please call +91 - 73377 61236 for appointment with our Senior Gynecologist & IVF Expert - | 159 | ❌ **none** |
| `/medical-termination-of-pregnancy-mtp-marathahalli-whitefield/` | Medical Termination of Pregnancy MTP Marathahalli | 49 | At Neo Fertility Clinic, we provide compassionate and confidential Medical Termination of Pregnancy (MTP) in Marathahalli ensuring women’s safety and well-being | 160 | ✅ same |
| `/menstrual-bleeding-and-irregular-period-treatment-in-marathahalli-bangalore/` | Menstrual Bleeding - Irregular Period Treatment Marathahalli | 60 | At Neo Fertility Clinic, Dr Payal Mahapatra provides treatment for menstrual and hormonal disorders, ensuring long-term relief and better reproductive health. | 158 | ✅ same |
| `/pelvic-inflammatory-disease-pids-treatment-in-bangalore/` | Pelvic Inflammatory Disease - PIDs - Treatment in Bangalore | 59 | Neo Fertility Clinic, we provides expert Pelvic Inflammatory Disease - PIDs - Treatment in Marathahalli, ensuring fast recovery & long-term reproductive health. | 160 | ✅ same |
| `/pelvic-ultrasound-scan-in-marathahalli/` | Pelvic Ultrasound Scan - Marathahalli - Neo Fertility Clinic | 60 | Neo Fertility Clinic offers Pelvic Ultrasound Scan in Marathahalli for diagnosing gynecological conditions, fertility concerns, pregnancy monitoring with care. | 159 | ✅ same |
| `/privacy-policy/` | Privacy Policy – Neo Fertility Clinic | 37 | Privacy Policy Effective Date: 01-01-2025 NEOFOLLICLE AND NEOFERTILITY CLINIC LLP (“Company”, “we”, “us”, or “our”) respects the privacy of its users and is com | 160 | ✅ same |
| `/sexually-transmitted-infections-stis-treatment-in-bangalore/` | Best Sexually Transmitted Infections (STIs) – Treatment | 55 | At Neo Fertility Clinic, we offer safe, confidential, and expert treatment for Sexually Transmitted Infections (STIs) in Marathahalli Bangalore. | 144 | ✅ same |
| `/terms-of-use/` | Terms Of Use – Neo Fertility Clinic | 35 | Terms Of Use Effective Date: 01-01-2025 These Terms of Use ("Terms") govern your access to and use of the websites and services operated by NEOFOLLICLE AND NEOF | 160 | ✅ same |
| `/vaginal-discharge-infection-treatment-in-marathahalli-bangalore/` | Best Vaginal Discharge - Infection Treatment - Marathahalli | 59 | At Neo Fertility Clinic, we provide expert Vaginal Discharge / Infection Treatment in Marathahalli Bangalore, ensuring quick relief and long-term vaginal health | 160 | ✅ same |

### Posts (3)

| Slug | Meta title | T | Meta description | D | New route |
| --- | --- | --- | --- | --- | --- |
| `/icsi-treatment-for-male-infertility/` | ICSI Treatment for Male Infertility: A Fertility Specialist’s Guide to Success – Neo Fertility Clinic | 101 | Infertility is a deeply personal journey that affects not only a couple's ability to conceive but also their emotional well-being. While infertility is often th | 160 | ❌ **none** |
| `/iui-treatment-a-complete-guide/` | IUI Treatment: Process, Success Rates, and Costs – A Fertility Specialist’s Complete Guide – Neo Fertility Clinic | 113 | When couples walk into my clinic after months or years of trying to conceive, one of the most common questions I hear is, "Doctor, do we need IVF?" My answer is | 160 | ❌ **none** |
| `/ivf-treatment-in-bangalore/` | IVF Treatment in Bangalore: Everything You Need to Know – Neo Fertility Clinic | 78 | Infertility is a journey that affects millions of couples worldwide. While many couples conceive naturally within a year of trying, others may require medical a | 160 | ✅ same |

### Archives (2)

| Slug | Meta title | T | Meta description | D | New route |
| --- | --- | --- | --- | --- | --- |
| `/author/priyanka/` | Priyanka Radhakrishna – Neo Fertility Clinic | 44 | _(none)_ | — | ❌ **none** |
| `/category/uncategorized/` | Uncategorized – Neo Fertility Clinic | 36 | _(none)_ | — | ❌ **none** |

### Redirects (1)

| Slug | Meta title | T | Meta description | D | New route |
| --- | --- | --- | --- | --- | --- |
| `/low-amh-can-you-still-get-pregnant-2/` | _301 → `/ivf-treatment-in-bangalore/`_ | — | — | — | — |

## H1 vs meta title

All 33 live URLs have exactly one `<h1>`. Where it differs from the meta title, both are in
`pages.json` (`h1` and `title`) — the old site deliberately used a longer, keyword-led meta
title and a shorter human H1 on most service pages.

## Open Graph

31 of 33 live URLs carry both `og:title` and `og:description`; all og values are
captured per-record in `pages.json`. `og:image` was not emitted by the old site on any page —
the new site's `OG_DEFAULT` handling in `src/lib/seo.ts` is a straight improvement, not a regression.

Incomplete OG: `/author/priyanka/`, `/category/uncategorized/`

## Dates

30 URLs carry `article:published_time` / `article:modified_time`; both are in
`pages.json`. Preserve published dates on any post ported to the new site — resetting them
to the migration date discards the age signal.

