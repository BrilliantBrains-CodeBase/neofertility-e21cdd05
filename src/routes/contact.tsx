import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/blocks";
import { LeadForm } from "@/components/conversion/LeadForm";
import { CLINIC, buildWhatsAppUrl } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.contact;

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...pageMeta({
      title: "Contact Neo Fertility Clinic | Marathahalli, Bangalore",
      description:
        "Get in touch with Neo Fertility Clinic in Marathahalli, Bangalore. Address, phone, WhatsApp, clinic hours, map and an online appointment request form.",
      path: PATH,
    }),
    scripts: [
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
        intro="Reach us by phone, WhatsApp, or drop by our Marathahalli clinic. Or leave your details below and we'll call you back."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Contact" }]}
      />

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div className="space-y-8">
          <div className="rounded-xl border border-line bg-white p-6">
            <h2 className="text-[1.375rem]">Clinic address</h2>
            <p className="mt-3 flex items-start gap-3 text-ink-muted">
              <MapPin className="mt-0.5 size-5 shrink-0 text-teal-600" />
              {CLINIC.addressLine}
            </p>
            <p className="mt-4 flex items-center gap-3 text-ink-muted">
              <Clock className="size-5 shrink-0 text-teal-600" />
              {CLINIC.hours}
            </p>
            <p className="mt-4 flex items-center gap-3 text-ink-muted">
              <Phone className="size-5 shrink-0 text-teal-600" />
              <a href={CLINIC.phoneHref} className="hover:underline">
                {CLINIC.phoneDisplay}
              </a>
            </p>
            <p className="mt-4 flex items-center gap-3 text-ink-muted">
              <MessageCircle className="size-5 shrink-0 text-teal-600" />
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Chat with us on WhatsApp
              </a>
            </p>
            <p className="mt-4 text-[0.9375rem] text-ink-muted">
              Email: <a href={`mailto:${CLINIC.email}`} className="hover:underline">{CLINIC.email}</a>
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-line">
            <iframe
              title="Neo Fertility Clinic location, Marathahalli"
              src={CLINIC.mapEmbed}
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="rounded-xl border border-line bg-white p-6 lg:p-7">
          <h2 className="text-[1.375rem]">Request a callback</h2>
          <p className="mt-2 text-[0.9375rem] text-ink-muted">
            Share a few details and our team will get back to you to schedule your visit.
          </p>
          <div className="mt-6">
            <LeadForm sourcePage="contact" />
          </div>
        </div>
      </div>
    </>
  );
}
