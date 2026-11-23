import { createFileRoute } from "@tanstack/react-router";
import { Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "@/components/conversion/AppointmentSheet";
import { BookingRail } from "@/components/conversion/BookingRail";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import {
  PageHero,
  FaqBlock,
  RelatedLinks,
  SectionHeading,
  CheckList,
  ClinicalVolumeBand,
} from "@/components/sections/blocks";
import { Prose, DataTable } from "@/components/sections/ServicePage";
import { CLINIC, MARATHAHALLI, WHITEFIELD, DEFAULT_WHATSAPP_MESSAGE, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import {
  OG_CLINIC,
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  locationSchema,
  pageMeta,
} from "@/lib/seo";

const PATH = ROUTES.whitefield;
const SOURCE_PAGE = "whitefield";

/* This page is the website on the Whitefield Google Business Profile listing, so it is
   about the Whitefield clinic itself. Until November 2026 it described the trip to
   Marathahalli instead, written before the Whitefield clinic opened. */
const TITLE = "IVF & Fertility Clinic in Whitefield, Bangalore | Neo Fertility";
const DESCRIPTION =
  "Neo Fertility Clinic in Whitefield: IVF, IUI, ICSI, egg freezing and PCOS care with Dr. Payal Mahapatra on Sadaramangala Main Road. Open all 7 days.";

const FAQS = [
  {
    q: "Does Neo Fertility have a clinic in Whitefield?",
    a: `Yes. Neo Fertility Clinic's Whitefield clinic is at ${WHITEFIELD.addressLine}. It is the second clinic alongside the Marathahalli clinic, with fertility and gynecology care led by Dr. Payal Mahapatra.`,
  },
  {
    q: "What are the Whitefield clinic's timings?",
    a: `${WHITEFIELD.hours}. Being open every day matters during a stimulated cycle, when scans are needed every two to three days regardless of the day of the week.`,
  },
  {
    q: "How do I book an appointment at the Whitefield clinic?",
    a: `Call or WhatsApp ${CLINIC.phoneDisplay}, or request a callback on this page, and mention that you would like to be seen in Whitefield.`,
  },
  {
    q: "Can I be seen at both the Whitefield and Marathahalli clinics?",
    a: "Yes. Both clinics are part of Neo Fertility Clinic, so you can choose whichever is more convenient. Ask the team when you book which of your appointments can be done at Whitefield.",
  },
];

export const Route = createFileRoute("/ivf-clinic-in-whitefield-bangalore")({
  head: () => ({
    ...pageMeta({
      title: TITLE,
      description: DESCRIPTION,
      path: PATH,
      image: OG_CLINIC,
    }),
    scripts: [
      jsonLd(
        locationSchema({
          area: "Whitefield",
          title: TITLE,
          description: DESCRIPTION,
          path: PATH,
          location: WHITEFIELD,
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "IVF Clinic in Whitefield", path: PATH },
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
        eyebrow="Whitefield, Bangalore"
        title="IVF and Fertility Clinic in Whitefield, Bangalore"
        intro={`Neo Fertility Clinic in Whitefield, on Sadaramangala Main Road, brings fertility and gynecology care led by Dr. Payal Mahapatra closer to patients in Whitefield, Brookefield, ITPL, Kundalahalli, Varthur and Hope Farm. Open ${WHITEFIELD.hours.replace("Monday to Sunday", "all seven days")}.`}
        trail={[{ name: "Home", to: ROUTES.home }, { name: "IVF Clinic in Whitefield" }]}
      >
        <div className="flex flex-wrap gap-3">
          <AppointmentSheet sourcePage={SOURCE_PAGE}>
            <Button variant="cta" size="lg">
              <CalendarCheck /> Book a consultation
            </Button>
          </AppointmentSheet>
          <Button variant="outlineTeal" size="lg" asChild>
            <a
              href={CLINIC.phoneHref}
              onClick={() => track("call_click", { source_page: SOURCE_PAGE })}
            >
              <Phone /> Call {CLINIC.phoneDisplay}
            </a>
          </Button>
        </div>
      </PageHero>

      <div className="container-page flex gap-14 py-14 lg:py-16">
        <div className="min-w-0 flex-1 space-y-12">
          <Prose title="A clinic close to home, for treatment that runs on your cycle">
            <p>
              Fertility treatment is not a single appointment. A stimulated cycle involves scans
              every two to three days for around two weeks, and the timing of those scans is set by
              your follicles rather than your calendar. That makes two things matter more than they
              would for any other specialty: how long the journey takes, and whether the clinic is
              open on the day your scan falls due.
            </p>
            <p>
              The Whitefield clinic is {WHITEFIELD.addressLine}, and is open all seven days
              including Sundays. Neo Fertility&rsquo;s main clinic is in Marathahalli, on the
              Marathahalli Bridge service road, so patients across east Bengaluru can attend
              whichever of the two is easier on a given day.
            </p>
          </Prose>

          <section>
            <SectionHeading eyebrow="Services" title="Services available" />
            <div className="mt-6">
              <CheckList
                items={[
                  "IVF, IUI, ICSI, egg freezing and fertility preservation",
                  "Male fertility treatment including TESA and PESA",
                  "Donor egg and sperm programmes",
                  "PCOS and PMOS care",
                  "Hysteroscopy and laparoscopic surgery",
                  "Pelvic ultrasound and follicular tracking",
                  "Preconception checks, antenatal and high-risk pregnancy care",
                  "Full gynecology",
                ]}
                columns={2}
              />
            </div>
          </section>

          <section>
            <SectionHeading eyebrow="Practical detail" title="Visiting the Whitefield clinic" />
            <div className="mt-6">
              <DataTable
                head={["Detail", "Information"]}
                rows={[
                  ["Address", WHITEFIELD.addressLine],
                  ["Landmark", "Above Honda Big Wings, Sadaramangala Main Road"],
                  ["Hours", WHITEFIELD.hours],
                  ["Booking", `${CLINIC.phoneDisplay}, WhatsApp or online`],
                  ["Our other clinic", MARATHAHALLI.addressLine],
                ]}
              />
            </div>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
              <a
                className="font-medium text-pink-700 hover:underline"
                href={WHITEFIELD.directionsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Get directions to the Whitefield clinic
              </a>
              <a
                className="font-medium text-pink-700 hover:underline"
                href={WHITEFIELD.businessProfile}
                target="_blank"
                rel="noreferrer"
              >
                View the Whitefield clinic on Google
              </a>
            </p>
          </section>
        </div>
        <BookingRail sourcePage={SOURCE_PAGE} whatsappMessage={DEFAULT_WHATSAPP_MESSAGE} />
      </div>

      {/* The band ServicePage gives its 26 siblings. Without it this page's white
          body ran straight into the white FAQ with no rhythm break. */}
      <ClinicalVolumeBand />

      <FaqBlock items={FAQS} heading="Questions about the Whitefield clinic" />
      <RelatedLinks
        links={[
          { label: "Fertility clinic for Bellandur", to: ROUTES.bellandur },
          { label: "Infertility evaluation and treatment", to: ROUTES.infertility },
          { label: "IVF treatment", to: ROUTES.ivf },
          { label: "IVF cost in Bangalore", to: ROUTES.ivfCost },
          { label: "About Dr. Payal Mahapatra", to: ROUTES.about },
          { label: "Contact and directions", to: ROUTES.contact },
        ]}
      />
      <ClosingCta
        heading="Now in Whitefield, open all seven days"
        copy="Book a consultation at our Whitefield clinic and start your evaluation close to home."
        sourcePage={SOURCE_PAGE}
        whatsappMessage={DEFAULT_WHATSAPP_MESSAGE}
      />
    </>
  );
}
