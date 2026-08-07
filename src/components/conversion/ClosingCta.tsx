import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentSheet } from "./AppointmentSheet";
import { CLINIC, buildWhatsAppUrl, track } from "@/lib/clinic";

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
    <section className="bg-clay-50 section-y">
      <div className="container-page text-center">
        <h2>{heading}</h2>
        <p className="mx-auto mt-3 max-w-[58ch] text-ink-muted">{copy}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <AppointmentSheet sourcePage={sourcePage}>
            <Button variant="cta" size="lg">
              <CalendarCheck /> Book an appointment
            </Button>
          </AppointmentSheet>
          <Button variant="outlineTeal" size="lg" asChild>
            <a href={CLINIC.phoneHref} onClick={() => track("call_click", { source_page: sourcePage })}>
              <Phone /> Call {CLINIC.phoneDisplay}
            </a>
          </Button>
          <Button variant="quiet" size="lg" asChild>
            <a
              href={buildWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("whatsapp_click", { source_page: sourcePage })}
            >
              <MessageCircle className="text-success" /> WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
