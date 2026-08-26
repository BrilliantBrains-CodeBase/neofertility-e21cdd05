import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, Check, Clock, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { RelatedLinks } from "@/components/sections/blocks";
import { consumeEnquiryReceipt, type EnquiryReceipt } from "@/lib/leads";
import { CLINIC, DEFAULT_WHATSAPP_MESSAGE, buildWhatsAppUrl, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { pageMeta } from "@/lib/seo";

const PATH = ROUTES.thankYou;
const SOURCE_PAGE = "thank-you";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    /* noindex, and no JSON-LD. A confirmation page has nothing to say to a
       search engine, and an indexed one earns organic visits that fire the
       conversion with no enquiry behind them. It is also absent from
       SITE_PAGES, so it never reaches /sitemap.xml. */
    ...pageMeta({
      title: "Thank You | Neo Fertility Clinic, Bangalore",
      description:
        "Your appointment request has reached Neo Fertility Clinic. Our team will call you back during clinic hours.",
      path: PATH,
      noindex: true,
    }),
  }),
  component: Page,
});

const NEXT_STEPS = [
  {
    title: "We call you back",
    copy: `Our team reviews your request and calls the number you gave us, within clinic hours (${CLINIC.hours}).`,
  },
  {
    title: "We agree a time",
    copy: "We confirm a slot that works around your cycle where timing matters, and tell you if anything needs to be done beforehand.",
  },
  {
    title: "You come in as a couple",
    copy: "Where fertility is the question, both partners are assessed from the start. It saves months of testing one person at a time.",
  },
];

function Page() {
  /* Undefined until the effect runs — the receipt lives in sessionStorage, which
     does not exist during SSR. Only the tracking call depends on it; the copy
     below is the same either way, so there is nothing to flash. */
  const [receipt, setReceipt] = useState<EnquiryReceipt | null | undefined>(undefined);

  useEffect(() => {
    const found = consumeEnquiryReceipt();
    setReceipt(found);

    /* Fires once per actual submission. Reading the receipt clears it, so a
       refresh, a back-button or a bookmarked visit lands here and reports
       nothing — which is the point of routing the conversion through it rather
       than through a bare pageview trigger in GTM. */
    if (found) {
      track("enquiry_confirmed", {
        source_page: found.sourcePage,
        source_variant: found.sourceVariant,
        form: found.form,
        ...(found.topic ? { topic: found.topic } : {}),
      });
    }
  }, []);

  return (
    <>
      <section className="border-b border-line bg-pink-50/60 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="container-page">
          <div className="max-w-[62ch]">
            <span
              aria-hidden="true"
              className="grid size-14 place-items-center rounded-full bg-pink-600 text-paper"
            >
              <Check className="size-7" />
            </span>
            <h1 className="mt-6 max-w-[20ch]">Thank you. Your request is with the clinic.</h1>
            <p className="mt-5 text-[1.125rem] text-ink-muted">
              {CLINIC.doctor} and her team have your details. Someone will call you back during
              clinic hours to confirm a time. If you would rather not wait, the fastest route is a
              phone call.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button variant="cta" size="lg" asChild>
                <a
                  href={CLINIC.phoneHref}
                  onClick={() => track("call_click", { source_page: SOURCE_PAGE })}
                >
                  <Phone /> Call {CLINIC.phoneDisplay}
                </a>
              </Button>
              <Button variant="outlineTeal" size="lg" asChild>
                <a
                  href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("whatsapp_click", { source_page: SOURCE_PAGE })}
                >
                  <WhatsAppIcon className="size-5 text-success" /> WhatsApp
                </a>
              </Button>
              <Button variant="outlineTeal" size="lg" asChild>
                <a
                  href={CLINIC.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("booking_calendar_open", { source_page: SOURCE_PAGE })}
                >
                  <CalendarCheck /> Pick a slot yourself
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_340px] lg:py-16">
        <div className="min-w-0">
          <h2 className="text-[1.375rem]">What happens next</h2>
          <ol className="mt-6 space-y-6">
            {NEXT_STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-pink-50 text-[0.9375rem] font-semibold text-pink-700"
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-plum-900">{step.title}</p>
                  <p className="mt-1.5 text-ink-muted">{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Shown once the effect has run and found nothing — a cold visit, or a
              refresh after the receipt was consumed. The copy above still reads
              correctly for someone who did just submit and reloaded, so this only
              adds a way back rather than contradicting it. */}
          {receipt === null && (
            <div className="mt-10 rounded-xl border border-line bg-pink-25 p-5">
              <p className="text-[0.9375rem] text-ink">
                Landed here without filling anything in?{" "}
                <Link to={ROUTES.contact} className="font-medium text-pink-700 underline">
                  Send us your details
                </Link>{" "}
                and we will call you back.
              </p>
            </div>
          )}
        </div>

        <aside>
          <div className="rounded-xl border border-line bg-white p-5 shadow-rail lg:sticky lg:top-24">
            <p className="font-medium text-plum-900">{CLINIC.name}</p>
            <p className="mt-3 flex items-start gap-3 text-[0.9375rem] text-ink-muted">
              <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-pink-600" />
              {CLINIC.addressLine}
            </p>
            <p className="mt-4 flex items-center gap-3 text-[0.9375rem] text-ink-muted">
              <Clock aria-hidden className="size-5 shrink-0 text-pink-600" />
              {CLINIC.hours}
            </p>
            <a
              href={CLINIC.directionsUrl}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex text-[0.9375rem] font-medium text-pink-700 hover:underline"
            >
              Get directions
            </a>
          </div>
        </aside>
      </div>

      <RelatedLinks
        title="While you wait"
        links={[
          { label: "What IVF costs in Bangalore", to: ROUTES.ivfCost },
          { label: "Which evaluation should you start with?", to: ROUTES.fertilityAssessment },
          { label: "Fertility evaluation and treatment", to: ROUTES.infertility },
          { label: "Questions patients ask most", to: ROUTES.faq },
          { label: "Patient stories", to: ROUTES.patientStories },
          { label: "About Dr. Payal Mahapatra", to: ROUTES.about },
        ]}
      />
    </>
  );
}
