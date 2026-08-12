import { WhatsAppBadge } from "@/components/icons/WhatsAppIcon";
import { buildWhatsAppUrl, track } from "@/lib/clinic";

export function WhatsAppFloat({
  sourcePage,
  whatsappMessage,
}: {
  sourcePage: string;
  whatsappMessage: string;
}) {
  /* Hidden below lg: MobileActionBar already carries a WhatsApp segment there, and
     two WhatsApp entry points stacked on top of each other is just noise. */
  return (
    <a
      href={buildWhatsAppUrl(whatsappMessage)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Neo Fertility Clinic on WhatsApp"
      onClick={() => track("whatsapp_click", { source_page: sourcePage })}
      className="fixed right-6 bottom-8 z-40 hidden size-14 rounded-full shadow-rail transition-transform hover:scale-105 lg:block"
    >
      <WhatsAppBadge className="size-14" />
    </a>
  );
}
