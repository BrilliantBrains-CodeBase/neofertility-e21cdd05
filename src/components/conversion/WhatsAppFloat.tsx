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
      className="fixed right-4 bottom-[4.75rem] z-40 flex size-12 items-center justify-center rounded-full bg-teal-900 text-sand shadow-rail transition-colors hover:bg-teal-700 sm:right-6 md:size-14 lg:bottom-8"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
