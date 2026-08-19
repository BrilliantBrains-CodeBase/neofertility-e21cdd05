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
import { CLINIC, DEFAULT_WHATSAPP_MESSAGE, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, faqSchema, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.whitefield;
const SOURCE_PAGE = "whitefield";

const FAQS = [
  {
    q: "Is there a good IVF clinic near Whitefield?",
    a: "Neo Fertility Clinic is approximately 9 km from Whitefield on Marathahalli Bridge Service Road, a 15 to 25 minute journey. It provides IVF, IUI, ICSI, egg freezing and PCOS care with Dr. Payal Mahapatra, and is open all seven days.",
  },
  {
    q: "How far is Neo Fertility Clinic from Whitefield?",
    a: "About 9 km, or 15 to 25 minutes depending on traffic, via Varthur Road or ITPL Main Road to the Marathahalli Bridge service road. The clinic is before the bridge, opposite Purva Apartments.",
  },
  {
    q: "Is the clinic open on weekends for patients travelling from Whitefield?",
    a: "Yes, all seven days from 09:30 to 18:30. This matters during a stimulated cycle, when scans are needed every two to three days regardless of the day of the week.",
  },
  {
    q: "Can I have follicular tracking scans done near Whitefield?",
    a: "Follicular tracking is performed at the clinic by Dr. Payal Mahapatra rather than delegated, because in fertility treatment the scan is the clinical decision. Patients from Whitefield, Brookefield, ITPL and Kundalahalli attend for tracking through the cycle.",
  },
];

export const Route = createFileRoute("/ivf-clinic-in-whitefield-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "IVF & Fertility Clinic Near Whitefield, Bangalore | Neo Fertility",
      description:
        "Fertility and IVF treatment for patients from Whitefield, Bangalore. IVF, IUI, ICSI, egg freezing and PCOS care with Dr. Payal Mahapatra, 15 minutes from Whitefield on Marathahalli Bridge Road.",
      path: PATH,
    }),
    scripts: [
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "IVF Clinic for Whitefield", path: PATH },
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
        title="IVF and Fertility Treatment for Whitefield, Bangalore"
        intro="Neo Fertility Clinic serves patients from Whitefield at its clinic on Marathahalli Bridge Service Road, approximately 9 km and 15 to 25 minutes from Whitefield depending on traffic. The clinic provides IVF, IUI, ICSI, egg freezing, PCOS and PMOS care and full gynecology services, led by Dr. Payal Mahapatra, and is open all seven days from 09:30 to 18:30."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "IVF Clinic for Whitefield" }]}
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
          <Prose title="Why Whitefield patients travel to Marathahalli">
            <p>
              Fertility treatment is not a single appointment. A stimulated cycle involves scans
              every two to three days for around two weeks, and the timing of those scans is set by
              your follicles rather than your calendar. That makes two things matter more than they
              would for any other specialty: how long the journey takes at the times you will
              actually be travelling, and whether the clinic is open on the day your scan falls due.
            </p>
            <p>
              Neo Fertility Clinic is on the Marathahalli Bridge service road, before the bridge
              coming from Whitefield, and is open all seven days including Sundays. For patients in
              Whitefield, Brookefield, ITPL, Kundalahalli, Varthur, Hope Farm and Hagadur, that is a
              15 to 25 minute journey against the flow of the worst morning traffic.
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
            <SectionHeading eyebrow="Practical detail" title="For Whitefield patients" />
            <div className="mt-6">
              <DataTable
                head={["Detail", "Information"]}
                rows={[
                  ["Distance", "Approximately 9 km from Whitefield Main Road"],
                  ["Travel time", "15 to 25 minutes, depending on time of day"],
                  [
                    "Route",
                    "Whitefield Main Road to Varthur Road or ITPL Main Road, then Marathahalli Bridge Service Road. The clinic is before the bridge, opposite Purva Apartments",
                  ],
                  ["Nearest landmark", "Marathahalli Bridge, opposite Purva Apartments"],
                  ["Hours", "All seven days, 09:30 to 18:30"],
                  ["Booking", `${CLINIC.phoneDisplay}, WhatsApp or online`],
                ]}
              />
            </div>
          </section>
        </div>
        <BookingRail sourcePage={SOURCE_PAGE} whatsappMessage={DEFAULT_WHATSAPP_MESSAGE} />
      </div>

      {/* The band ServicePage gives its 26 siblings. Without it this page's white
          body ran straight into the white FAQ with no rhythm break. */}
      <ClinicalVolumeBand />

      <FaqBlock items={FAQS} heading="Questions from Whitefield patients" />
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
        heading="15 to 25 minutes from Whitefield, open all seven days"
        copy="Book a consultation and start your evaluation without the journey getting in the way of your cycle."
        sourcePage={SOURCE_PAGE}
        whatsappMessage={DEFAULT_WHATSAPP_MESSAGE}
      />
    </>
  );
}
