import { Phone, CalendarCheck, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "./AppointmentSheet";
import { CLINIC, buildWhatsAppUrl, track } from "@/lib/clinic";

/* Read through the ramp token rather than written as a literal, so the ramp stays the
   single source of colour truth. A soft brand glow off the top-right corner keeps the
   plum slab from reading as a flat rectangle. */
const CARD_GLOW =
  "radial-gradient(78% 135% at 88% 0%, color-mix(in oklab, var(--pink-500) 26%, transparent), transparent 68%)";

export function ClosingCta({
  heading,
  copy,
  sourcePage,
  whatsappMessage,
}: {
  heading: string;
  copy: string;
  sourcePage: string;
  whatsappMessage: string;
}) {
  return (
    /* White band, plum card. The related-reading block above is pink-25 and the footer
       below is plum with a white card in it — so the page closes on an alternating
       light/dark rhythm, and the final ask has its own edges instead of bleeding into
       the tint above it. */
    <section className="bg-background section-y">
      <div className="container-page">
        <div
          className="relative overflow-hidden rounded-3xl bg-plum-900 px-6 py-11 sm:px-10 lg:px-14 lg:py-14"
          style={{ backgroundImage: CARD_GLOW }}
        >
          {/* Text left, action stack right from lg. Centred-everything gave the three
              buttons equal visual weight in one row; a stack ranks them. */}
          <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
            <div>
              {/* Base layer paints every h2 plum; on this ground it needs paper. */}
              <h2 className="text-paper">{heading}</h2>
              <p className="mt-3 max-w-[52ch] text-paper/75">{copy}</p>
              {/* pink-300 is the ramp's on-dark accent (~6.8:1 on plum); pink-600 would
                  go muddy here. */}
              <p className="mt-6 flex items-center gap-2 text-[0.875rem] text-pink-300">
                <Clock className="size-4 shrink-0" aria-hidden="true" />
                {CLINIC.hours}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:min-w-[17rem]">
              <AppointmentSheet sourcePage={sourcePage}>
                <Button variant="cta" size="lg" className="w-full sm:w-auto lg:w-full">
                  <CalendarCheck /> Book an appointment
                </Button>
              </AppointmentSheet>
              <Button
                variant="outlineLight"
                size="lg"
                asChild
                className="w-full sm:w-auto lg:w-full"
              >
                <a
                  href={CLINIC.phoneHref}
                  onClick={() => track("call_click", { source_page: sourcePage })}
                >
                  <Phone /> Call {CLINIC.phoneDisplay}
                </a>
              </Button>
              <Button
                variant="outlineLight"
                size="lg"
                asChild
                className="w-full sm:w-auto lg:w-full"
              >
                <a
                  href={buildWhatsAppUrl(whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("whatsapp_click", { source_page: sourcePage })}
                >
                  {/* text-success is a dark green built for white grounds — it
                      disappears on plum, so the mark rides the button's own colour. */}
                  <WhatsAppIcon className="size-5" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
