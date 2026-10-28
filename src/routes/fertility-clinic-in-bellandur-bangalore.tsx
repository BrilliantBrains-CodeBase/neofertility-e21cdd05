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
import {
  OG_CLINIC,
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  locationSchema,
  pageMeta,
} from "@/lib/seo";

const PATH = ROUTES.bellandur;
const SOURCE_PAGE = "bellandur";

const FAQS = [
  {
    q: "Is there a fertility clinic near Bellandur?",
    a: "Neo Fertility Clinic is approximately 6 km from Bellandur on Marathahalli Bridge Service Road, generally a 15 to 20 minute journey outside peak hours. It provides IVF, IUI, ICSI, egg freezing and PCOS care with Dr. Payal Mahapatra, and is open all seven days.",
  },
  {
    q: "How far is Neo Fertility Clinic from Bellandur?",
    a: "About 6 km via the Outer Ring Road to Marathahalli, then the bridge service road. Journey time varies more than the distance suggests, since the Outer Ring Road stretch through Bellandur carries heavy office traffic on weekday mornings and evenings.",
  },
  {
    q: "Is the clinic open on weekends for patients from Bellandur?",
    a: "Yes, all seven days from 09:30 to 18:30. Many Bellandur patients prefer weekend or early appointments to avoid the Outer Ring Road at peak times.",
  },
  {
    q: "Can I get follicular tracking scans done if I live in Bellandur?",
    a: "Yes. Follicular tracking is performed at the clinic by Dr. Payal Mahapatra rather than delegated, since in fertility treatment the scan is the clinical decision. Patients from Bellandur, Sarjapur Road and HSR Layout attend for tracking through a stimulated cycle.",
  },
];

export const Route = createFileRoute("/fertility-clinic-in-bellandur-bangalore")({
  head: () => ({
    ...pageMeta({
      title: "Fertility Clinic Near Bellandur, Bangalore | Neo Fertility",
      description:
        "IVF, IUI, ICSI, egg freezing and PCOS care for couples from Bellandur, with Dr. Payal Mahapatra on Marathahalli Bridge Road. Open all 7 days.",
      path: PATH,
      image: OG_CLINIC,
    }),
    scripts: [
      jsonLd(
        locationSchema({
          area: "Bellandur",
          title: "Fertility Clinic Near Bellandur, Bangalore | Neo Fertility",
          description:
            "IVF, IUI, ICSI, egg freezing and PCOS care for couples from Bellandur, with Dr. Payal Mahapatra on Marathahalli Bridge Road. Open all 7 days.",
          path: PATH,
        }),
      ),
      jsonLd(faqSchema(FAQS)),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Fertility Clinic for Bellandur", path: PATH },
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
        eyebrow="Bellandur, Bangalore"
        title="Fertility Clinic and IVF Treatment for Bellandur, Bangalore"
        intro="Neo Fertility Clinic serves patients from Bellandur at its clinic on Marathahalli Bridge Service Road, approximately 6 km away and usually 15 to 20 minutes outside peak Outer Ring Road traffic. The clinic provides IVF, IUI, ICSI, egg freezing, PCOS and PMOS care and full gynecology services, led by Dr. Payal Mahapatra, and is open all seven days from 09:30 to 18:30."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Fertility Clinic for Bellandur" }]}
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
          <Prose title="Why Bellandur patients choose Marathahalli">
            <p>
              Bellandur has grown quickly as a residential and office hub, but a stimulated IVF or
              IUI cycle needs scans every two to three days, timed to your follicles rather than a
              convenient slot. Bellandur itself does not have a comparable dedicated fertility
              set-up, and the short run up the Outer Ring Road to Marathahalli is a journey most
              patients are already used to making for work.
            </p>
            <p>
              Neo Fertility Clinic is on the Marathahalli Bridge service road and is open all seven
              days including Sundays, which matters when a scan falls due on a day you would rather
              not be at the office.
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
            <SectionHeading eyebrow="Practical detail" title="For Bellandur patients" />
            <div className="mt-6">
              <DataTable
                head={["Detail", "Information"]}
                rows={[
                  ["Distance", "Approximately 6 km from Bellandur"],
                  [
                    "Travel time",
                    "15 to 20 minutes off peak; longer during Outer Ring Road office hours",
                  ],
                  [
                    "Route",
                    "Outer Ring Road toward Marathahalli, then Marathahalli Bridge Service Road, before the bridge, opposite Purva Apartments",
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

      <FaqBlock items={FAQS} heading="Questions from Bellandur patients" />
      <RelatedLinks
        links={[
          { label: "IVF clinic for Whitefield", to: ROUTES.whitefield },
          { label: "Infertility evaluation and treatment", to: ROUTES.infertility },
          { label: "IVF treatment", to: ROUTES.ivf },
          { label: "IVF cost in Bangalore", to: ROUTES.ivfCost },
          { label: "About Dr. Payal Mahapatra", to: ROUTES.about },
          { label: "Contact and directions", to: ROUTES.contact },
        ]}
      />
      <ClosingCta
        heading="A short run up the Outer Ring Road, open all seven days"
        copy="Book a consultation and keep your scan schedule realistic against Bellandur traffic."
        sourcePage={SOURCE_PAGE}
        whatsappMessage={DEFAULT_WHATSAPP_MESSAGE}
      />
    </>
  );
}
