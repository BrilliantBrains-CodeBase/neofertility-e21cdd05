import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";
import { CLINIC } from "@/lib/clinic";
import { FERTILITY_MENU, GYNECOLOGY_MENU, ROUTES } from "@/data/navigation";

const socials = [
  { href: CLINIC.social.facebook, label: "Facebook", Icon: Facebook },
  { href: CLINIC.social.instagram, label: "Instagram", Icon: Instagram },
  { href: CLINIC.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: CLINIC.social.youtube, label: "YouTube", Icon: Youtube },
];

export function Footer() {
  const fertilityLinks = FERTILITY_MENU.flatMap((g) => g.links).slice(0, 9);
  const gynecologyLinks = GYNECOLOGY_MENU.flatMap((g) => g.links)
    .filter((l) => !l.hash)
    .slice(0, 8);

  return (
    <footer className="mt-0 bg-navy-900 pt-16 pb-28 text-paper lg:pb-16">
      <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <p className="text-[1.375rem] font-semibold">Neo Fertility Clinic</p>
          <p className="mt-3 max-w-[36ch] text-[0.9375rem] text-paper/75">
            Fertility and gynecology care led by {CLINIC.doctor}, {CLINIC.credentialsShort}, in
            Marathahalli, Bengaluru.
          </p>
          <div className="mt-5 space-y-2 text-[0.9375rem] text-paper/80">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>{CLINIC.addressLine}</span>
            </p>
            <p className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <a className="hover:underline" href={CLINIC.phoneHref}>
                {CLINIC.phoneDisplay}
              </a>
            </p>
            <p className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0" />
              <a className="hover:underline" href={`mailto:${CLINIC.email}`}>
                {CLINIC.email}
              </a>
            </p>
            <p className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0" />
              <span>{CLINIC.hours}</span>
            </p>
          </div>
          <div className="mt-5 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full border border-paper/25 hover:bg-paper/10"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Fertility services">
          <p className="text-[0.75rem] tracking-[0.16em] text-paper/60 uppercase">Fertility</p>
          <ul className="mt-3 space-y-2 text-[0.9375rem] text-paper/85">
            {fertilityLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Gynecology services">
          <p className="text-[0.75rem] tracking-[0.16em] text-paper/60 uppercase">Gynecology</p>
          <ul className="mt-3 space-y-2 text-[0.9375rem] text-paper/85">
            {gynecologyLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Clinic">
          <p className="text-[0.75rem] tracking-[0.16em] text-paper/60 uppercase">Clinic</p>
          <ul className="mt-3 space-y-2 text-[0.9375rem] text-paper/85">
            <li>
              <Link to={ROUTES.about} className="hover:underline">
                About Dr. Payal
              </Link>
            </li>
            <li>
              <Link to={ROUTES.whoWeHelp} className="hover:underline">
                Who we help
              </Link>
            </li>
            <li>
              <Link to={ROUTES.patientStories} className="hover:underline">
                Patient stories
              </Link>
            </li>
            <li>
              <Link to={ROUTES.ivfCost} className="hover:underline">
                IVF cost in Bangalore
              </Link>
            </li>
            <li>
              <Link to={ROUTES.fertilityAssessment} className="hover:underline">
                Fertility assessment
              </Link>
            </li>
            <li>
              <Link to={ROUTES.ovulationCalculator} className="hover:underline">
                Ovulation calculator
              </Link>
            </li>
            <li>
              <Link to={ROUTES.faq} className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link to={ROUTES.blogs} className="hover:underline">
                Blogs
              </Link>
            </li>
            <li>
              <Link to={ROUTES.whitefield} className="hover:underline">
                IVF clinic in Whitefield
              </Link>
            </li>
            <li>
              <Link to={ROUTES.bellandur} className="hover:underline">
                Fertility clinic in Bellandur
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container-page mt-12 border-t border-paper/15 pt-6">
        {/* Capped: this is the longest paragraph on the site and had no measure, so
            once the container became a percentage it ran to ~216 characters a line. */}
        <p className="max-w-[80ch] text-[0.8125rem] text-paper/65">{CLINIC.catchment}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[0.8125rem] text-paper/65">
          <p>© {new Date().getFullYear()} Neo Fertility Clinic. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to={ROUTES.privacy} className="hover:underline">
              Privacy Policy
            </Link>
            <Link to={ROUTES.terms} className="hover:underline">
              Terms of Use
            </Link>
          </div>
        </div>
        <p className="mt-4 max-w-[80ch] text-[0.8125rem] text-paper/55">
          Information on this website is for general education and is not a substitute for a
          consultation. Treatment outcomes vary between individuals. {CLINIC.statsAsOf}
        </p>
      </div>
    </footer>
  );
}
