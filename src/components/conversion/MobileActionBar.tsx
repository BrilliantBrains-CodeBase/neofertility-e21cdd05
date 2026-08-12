import { Phone, CalendarCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { AppointmentSheet } from "./AppointmentSheet";
import { CLINIC, buildWhatsAppUrl, track } from "@/lib/clinic";

export function MobileActionBar({
  sourcePage,
  whatsappMessage,
}: {
  sourcePage: string;
  whatsappMessage: string;
}) {
  /* Side actions. min-h-14 rather than a fixed height so the row can grow with the
     raised centre button without the labels drifting off their baseline. */
  const side =
    "flex min-h-14 flex-col items-center justify-center gap-1 pb-1 text-[0.75rem] font-medium text-teal-900";

  return (
    /* No overflow clipping here: the Book button deliberately breaks the top edge. */
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-sand shadow-bar lg:hidden">
      <div className="grid grid-cols-3 items-end pt-1">
        <a
          href={CLINIC.phoneHref}
          onClick={() => track("call_click", { source_page: sourcePage })}
          className={side}
        >
          <Phone className="size-5" />
          Call
        </a>

        <AppointmentSheet sourcePage={sourcePage}>
          <button
            type="button"
            className="flex flex-col items-center justify-end gap-1 pb-1 text-[0.75rem] font-medium text-teal-900"
          >
            {/* -mt-7 lifts the disc through the bar's top edge; the sand ring cuts it
                free of the page content it now overlaps. */}
            <span className="-mt-7 grid size-14 place-items-center rounded-full bg-clay-600 text-sand shadow-rail ring-4 ring-sand">
              <CalendarCheck className="size-6" />
            </span>
            Book
          </button>
        </AppointmentSheet>

        <a
          href={buildWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("whatsapp_click", { source_page: sourcePage })}
          className={side}
        >
          <WhatsAppIcon className="size-5 text-success" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
