import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, track } from "@/lib/clinic";

export function WhatsAppFloat({
  sourcePage,
  whatsappMessage,
}: {
  sourcePage: string;
  whatsappMessage: string;
}) {
  return (
    <a
      href={buildWhatsAppUrl(whatsappMessage)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Neo Fertility Clinic on WhatsApp"
      onClick={() => track("whatsapp_click", { source_page: sourcePage })}
      className="fixed right-6 bottom-8 z-40 hidden size-14 items-center justify-center rounded-full bg-teal-900 text-sand shadow-rail transition-colors hover:bg-teal-700 lg:flex"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
