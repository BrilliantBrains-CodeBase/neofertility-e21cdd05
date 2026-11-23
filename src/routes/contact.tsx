import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { PageHero, SectionHeading } from "@/components/sections/blocks";
import { LeadForm } from "@/components/conversion/LeadForm";
import { CLINIC, LOCATIONS, buildWhatsAppUrl, isConfigured } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { OG_CLINIC, breadcrumbSchema, contactPageSchema, jsonLd, pageMeta } from "@/lib/seo";

const PATH = ROUTES.contact;

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...pageMeta({
      title: "Contact Neo Fertility Clinic | Marathahalli & Whitefield",
      description:
        "Get in touch with Neo Fertility Clinic in Marathahalli and Whitefield, Bangalore. Addresses, phone, WhatsApp, clinic hours, maps and an online appointment request form.",
      path: PATH,
      image: OG_CLINIC,
    }),
    scripts: [
      jsonLd(contactPageSchema({ path: PATH })),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Contact", path: PATH },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact Neo Fertility Clinic"
        intro="Reach us by phone, WhatsApp, or drop by our Marathahalli or Whitefield clinic. Or leave your details below and we'll call you back."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Contact" }]}
      />

      {/* Three full-width bands instead of the old two-column grid. That grid paired two
          stacked clinic maps with the callback form, so the form column ended far short of
          the maps and left a large empty block under it. Each band now carries one job, and
          the two clinics sit side by side at equal height. */}

      {/* 1. Quickest ways to reach the clinic */}
      <section aria-label="Call, WhatsApp or email" className="container-page py-10 lg:py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              Icon: Phone,
              label: "Call us",
              value: CLINIC.phoneDisplay,
              href: CLINIC.phoneHref,
              external: false,
            },
            {
              Icon: WhatsAppIcon,
              label: "WhatsApp",
              value: "Chat with us",
              href: buildWhatsAppUrl(),
              external: true,
            },
            {
              Icon: Mail,
              label: "Email",
              value: CLINIC.email,
              href: `mailto:${CLINIC.email}`,
              external: false,
            },
          ].map(({ Icon, label, value, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external && { target: "_blank", rel: "noreferrer" })}
              className="group flex items-center gap-4 rounded-xl border border-line bg-white p-5 transition-colors hover:border-pink-500"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-700 transition-colors group-hover:bg-pink-500 group-hover:text-paper">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.8125rem] text-ink-muted">{label}</span>
                <span className="block font-medium break-words text-plum-900">{value}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 2. Callback form, with what happens next beside it. Directly under the contact
          tiles, so it needs only bottom padding. */}
      <section className="container-page pt-4 pb-14 lg:pb-20">
        {/* Three cells: heading, form, then steps + hours. On mobile they stack in that
            order, so the form comes straight after the heading; from lg the form takes the
            right column across both rows. */}
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:grid-rows-[auto_1fr] lg:gap-x-14">
          <div className="lg:col-start-1 lg:row-start-1">
            <SectionHeading
              eyebrow="Request a callback"
              title="Leave your details, we'll call you back"
              copy="Share a few details and our team will get back to you to schedule your visit at either clinic."
            />
          </div>
          <div className="rounded-xl border border-line bg-white p-6 shadow-rail lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start lg:p-8">
            <LeadForm sourcePage="contact" />
          </div>
          <div className="lg:col-start-1 lg:row-start-2">
            <ol className="space-y-5">
              {[
                ["Send your details", "Your name and number are all we need to start."],
                ["We call you back", "The team calls to understand what you need."],
                [
                  "Visit the clinic",
                  "We book your consultation at Marathahalli or Whitefield, whichever suits you.",
                ],
              ].map(([title, text], index) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-pink-50 font-semibold text-pink-700">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-medium text-plum-900">{title}</span>
                    <span className="block text-[0.9375rem] text-ink-muted">{text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-xl border border-line bg-pink-25 p-5">
              <p className="flex items-center gap-2 font-medium text-plum-900">
                <Clock className="size-5 text-pink-600" aria-hidden />
                Clinic hours
              </p>
              <dl className="mt-3 space-y-2 text-[0.9375rem]">
                {LOCATIONS.map((location) => (
                  <div key={location.id} className="flex flex-wrap justify-between gap-x-4">
                    <dt className="text-plum-900">{location.area}</dt>
                    <dd className="text-ink-muted">{location.hours}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[0.9375rem] text-ink-muted">
                Prefer to talk now? Call{" "}
                <a href={CLINIC.phoneHref} className="font-medium text-pink-700 hover:underline">
                  {CLINIC.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 3. Both clinics, side by side, equal height */}
      <section className="bg-pink-25 section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our clinics"
            title="Visit us in Marathahalli or Whitefield"
            copy="Both clinics are open all seven days. Choose whichever is easier to reach."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {LOCATIONS.map((location) => (
              <article
                key={location.id}
                className="flex flex-col overflow-hidden rounded-xl border border-line bg-white"
              >
                <iframe
                  title={`Neo Fertility Clinic location, ${location.area}`}
                  src={location.mapEmbed}
                  className="aspect-[16/9] w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[1.25rem]">{location.area} clinic</h3>
                  <p className="mt-3 flex items-start gap-3 text-[0.9375rem] text-ink-muted">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-pink-600" aria-hidden />
                    {location.addressLine}
                  </p>
                  <p className="mt-3 mb-5 flex items-center gap-3 text-[0.9375rem] text-ink-muted">
                    <Clock className="size-5 shrink-0 text-pink-600" aria-hidden />
                    {location.hours}
                  </p>
                  {/* Outbound links to the map and the Business Profile. An iframe is not a
                      link, so on its own it gives crawlers nothing to follow. mt-auto pins
                      them to the bottom so both cards line up whatever the address length. */}
                  <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-[0.875rem]">
                    <a
                      className="font-medium text-pink-700 hover:underline"
                      href={location.directionsUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Get directions
                    </a>
                    {isConfigured(location.businessProfile) && (
                      <a
                        className="text-pink-700 hover:underline"
                        href={location.businessProfile}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View {location.area} on Google
                      </a>
                    )}
                    {isConfigured(location.reviewUrl) && (
                      <a
                        className="text-pink-700 hover:underline"
                        href={location.reviewUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Leave a Google review
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
