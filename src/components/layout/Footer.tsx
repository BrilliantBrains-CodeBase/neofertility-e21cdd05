import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";
import { CLINIC, isConfigured } from "@/lib/clinic";
import { FERTILITY_MENU, GYNECOLOGY_MENU, ROUTES } from "@/data/navigation";
import logoAsset from "@/assets/neo-logo-trimmed.png";
/* Its own asset, not the shared appointment-mother-baby.webp: that file is also the
   backdrop of the home page's appointment form, so overwriting it would have changed a
   section nobody asked about. */
import cardImage from "@/assets/footer-mother-baby.webp";

const socials = [
  { href: CLINIC.social.facebook, label: "Facebook", Icon: Facebook },
  { href: CLINIC.social.instagram, label: "Instagram", Icon: Instagram },
  { href: CLINIC.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: CLINIC.social.youtube, label: "YouTube", Icon: Youtube },
];

const clinicLinks = [
  { label: "About Dr. Payal", to: ROUTES.about },
  { label: "Who we help", to: ROUTES.whoWeHelp },
  { label: "Patient stories", to: ROUTES.patientStories },
  { label: "IVF cost in Bangalore", to: ROUTES.ivfCost },
  { label: "Fertility assessment", to: ROUTES.fertilityAssessment },
  { label: "Gallery", to: ROUTES.gallery },
  { label: "Blogs", to: ROUTES.blogs },
  { label: "Contact", to: ROUTES.contact },
];

/* Catchment-SEO links. They live beside the catchment paragraph rather than in the
   Clinic column — that paragraph names the same neighbourhoods, so the two belong
   together, and the column was ten items deep with them in it. */
const areaLinks = [
  { label: "IVF clinic in Whitefield", to: ROUTES.whitefield },
  { label: "Fertility clinic in Bellandur", to: ROUTES.bellandur },
];

const linkClass = "text-ink-muted transition-colors hover:text-pink-700";

/* The `eyebrow` utility is pink-700, which is a text colour for white grounds and
   goes near-invisible on plum. Same metrics, pink-300 instead — the ramp's on-dark
   accent, ~6.8:1 here. */
const darkEyebrow = "text-[0.75rem] font-medium tracking-[0.16em] text-pink-300 uppercase";

export function Footer() {
  /* Six each, not nine and eight. The full catalogue is now listed on the homepage's
     Services section and on the two hub pages linked at the foot of each list, so the
     footer no longer has to carry a near-complete index — it was 27 links deep, which is
     what made it read as a wall. */
  const fertilityLinks = FERTILITY_MENU.flatMap((g) => g.links).slice(0, 6);
  const gynecologyLinks = GYNECOLOGY_MENU.flatMap((g) => g.links)
    .filter((l) => !l.hash)
    .slice(0, 6);

  return (
    /* Plum, not navy: this is the announcement bar's colour, so the page opens and
       closes on the same band. pb-28 clears the MobileActionBar, which is fixed to the
       bottom of the viewport below lg. */
    <footer className="bg-plum-900 pt-14 pb-28 lg:pb-14">
      <div className="container-page">
        {/* White card floating on the band. Everything inside it is dark-on-light, so
            none of the paper/xx opacities used on the old navy slab apply here. */}
        <div className="rounded-3xl bg-background p-6 sm:p-10 lg:p-12">
          {/* Full width on phones, 2-up from sm, 4-up from lg. Two columns on a 390px
              screen leaves 153px a column, and "Intracytoplasmic Sperm Injection (ICSI)"
              then wraps to three lines — the columns have to be wide enough for the
              labels or the density gets worse rather than better. */}
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
            {/* Flex column so the photo can absorb whatever height the link columns set.
                Fixed at 4/3 it ran the brand column ~220px past the tallest list, which
                left the right half of the card empty below the links. */}
            <div className="flex flex-col sm:col-span-2 lg:col-span-1">
              <Link to={ROUTES.home} className="inline-flex self-start">
                <img
                  src={logoAsset}
                  alt="Neo Fertility Clinic"
                  width={413}
                  height={240}
                  className="h-14 w-auto object-contain"
                />
              </Link>
              <p className="mt-4 max-w-[36ch] text-[0.9375rem] text-ink-muted">
                Fertility and gynecology care led by {CLINIC.doctor}, {CLINIC.credentialsShort}, in
                Marathahalli, Bengaluru.
              </p>
              {/* flex-1 with a floor: it stretches to the row height on lg, and holds
                  13rem on the stacked breakpoints where there is no row to match. */}
              <img
                src={cardImage}
                alt=""
                width={1366}
                height={768}
                loading="lazy"
                className="mt-6 min-h-[13rem] w-full flex-1 rounded-2xl object-cover"
              />
            </div>

            <nav aria-label="Fertility services">
              <p className="eyebrow">Fertility</p>
              <ul className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed">
                {fertilityLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to={ROUTES.fertilitySolutions}
                    className="font-medium text-plum-900 hover:text-pink-700"
                  >
                    All fertility services
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Gynecology services">
              <p className="eyebrow">Gynecology</p>
              <ul className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed">
                {gynecologyLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to={ROUTES.gynecologyTreatments}
                    className="font-medium text-plum-900 hover:text-pink-700"
                  >
                    All gynecology treatments
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Clinic">
              <p className="eyebrow">Clinic</p>
              <ul className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed">
                {clinicLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact strip. Four across the full card rather than stacked in the brand
              column — that is what fills the width the link lists leave behind, and it
              keeps the address on one line instead of wrapping to three in a quarter
              column. */}
          <div className="mt-12 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-x-8">
            <p className="flex gap-3 text-[0.9375rem] text-ink-muted">
              <MapPin className="mt-0.5 size-4 shrink-0 text-pink-700" aria-hidden />
              {/* The address text is unchanged — it has to match the Google Business
                  Profile listing character for character — but it now carries the
                  directions link rather than sitting inert. */}
              <a
                className="hover:text-pink-700"
                href={CLINIC.directionsUrl}
                target="_blank"
                rel="noreferrer"
              >
                {CLINIC.addressLine}
              </a>
            </p>
            <p className="flex gap-3 text-[0.9375rem] text-ink-muted">
              <Phone className="mt-0.5 size-4 shrink-0 text-pink-700" aria-hidden />
              <a className="hover:text-pink-700" href={CLINIC.phoneHref}>
                {CLINIC.phoneDisplay}
              </a>
            </p>
            <p className="flex gap-3 text-[0.9375rem] text-ink-muted">
              <Mail className="mt-0.5 size-4 shrink-0 text-pink-700" aria-hidden />
              <a className="break-all hover:text-pink-700" href={`mailto:${CLINIC.email}`}>
                {CLINIC.email}
              </a>
            </p>
            <p className="flex gap-3 text-[0.9375rem] text-ink-muted">
              <Clock className="mt-0.5 size-4 shrink-0 text-pink-700" aria-hidden />
              <span>{CLINIC.hours}</span>
            </p>
          </div>

          {/* Socials left, copyright right — the reference's bottom rule. Moving them out
              of the brand column is half of what evened the columns up. */}
          <div className="mt-8 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-full bg-pink-50 text-plum-900 transition-colors hover:bg-pink-500 hover:text-paper"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              {/* Hidden until CLINIC.google.reviewUrl is filled in — see isConfigured. */}
              {isConfigured(CLINIC.google.reviewUrl) && (
                <a
                  className="text-[0.8125rem] text-ink-muted underline underline-offset-4 hover:text-pink-700"
                  href={CLINIC.google.reviewUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Review us on Google
                </a>
              )}
              <p className="text-[0.8125rem] text-ink-muted">
                © {new Date().getFullYear()} Neo Fertility Clinic. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* On the plum, below the card. Laid out on the same four-column track as the
            card so the fine print spreads across the page instead of stacking in one
            left-hand column — at 90% container width an 80ch measure only reached the
            halfway mark, which left the whole right side empty. White at 70% measures
            ~8.3:1 here, and the pink-300 eyebrows ~6.8:1. */}
        <div className="mt-10 grid gap-x-8 gap-y-10 text-[0.8125rem] text-paper/70 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2">
            <p className={darkEyebrow}>Areas we serve</p>
            {/* Capped: this is the longest paragraph on the site and had no measure, so
                once the container became a percentage it ran to ~216 characters a line. */}
            <p className="mt-4 max-w-[80ch] leading-relaxed">{CLINIC.catchment}</p>
          </div>

          <nav aria-label="Nearby clinics">
            <p className={darkEyebrow}>Nearby clinics</p>
            <ul className="mt-4 space-y-3">
              {areaLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-paper/85 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className={darkEyebrow}>Legal</p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to={ROUTES.privacy} className="text-paper/85 hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={ROUTES.terms} className="text-paper/85 hover:underline">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-10 max-w-[100ch] border-t border-paper/15 pt-6 text-[0.8125rem] leading-relaxed text-paper/60">
          Information on this website is for general education and is not a substitute for a
          consultation. Treatment outcomes vary between individuals. {CLINIC.statsAsOf}
        </p>
      </div>
    </footer>
  );
}
