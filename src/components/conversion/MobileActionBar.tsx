import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { AppointmentSheet } from "./AppointmentSheet";
import { CLINIC, buildWhatsAppUrl, track } from "@/lib/clinic";

export function MobileActionBar({
  sourcePage,
  whatsappMessage,
}: {
  sourcePage: string;
  whatsappMessage: string;
}) {
  const segment =
    "flex h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[0.75rem] font-medium";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-line bg-sand shadow-bar lg:hidden">
      <a
        href={CLINIC.phoneHref}
        onClick={() => track("call_click", { source_page: sourcePage })}
        className={`${segment} text-teal-900`}
      >
        <Phone className="size-5" />
        Call
      </a>
      <a
        href={buildWhatsAppUrl(whatsappMessage)}
        target="_blank"
        rel="noreferrer"
        onClick={() => track("whatsapp_click", { source_page: sourcePage })}
        className={`${segment} border-x border-line text-teal-900`}
      >
        <MessageCircle className="size-5 text-success" />
        WhatsApp
      </a>
      <AppointmentSheet sourcePage={sourcePage}>
        <button type="button" className={`${segment} bg-clay-600 text-sand`}>
          <CalendarCheck className="size-5" />
          Book
        </button>
      </AppointmentSheet>
    </div>
  );
}
