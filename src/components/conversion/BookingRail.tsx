import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { LeadForm } from "./LeadForm";
import { CLINIC, buildWhatsAppUrl, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import portrait from "@/assets/dr-payal-portrait.jpg";

export function BookingRail({
  sourcePage,
  whatsappMessage,
}: {
  sourcePage: string;
  whatsappMessage: string;
}) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 w-[320px] rounded-xl border border-line bg-white p-5 shadow-rail">
        <div className="flex items-center gap-3">
          <img
            src={portrait}
            alt={CLINIC.doctor}
            width={72}
            height={72}
            loading="lazy"
            className="size-[72px] rounded-full object-cover object-top"
          />
          <div>
            <Link
              to={ROUTES.about}
              className="font-medium text-plum-900 hover:text-pink-600 hover:underline"
            >
              {CLINIC.doctor}
            </Link>
            <p className="text-[0.8125rem] leading-snug text-ink-muted">{CLINIC.credentials}</p>
            <p className="text-[0.8125rem] text-pink-600">18 years experience</p>
          </div>
        </div>

        <div className="mt-5">
          <LeadForm variant="rail" sourcePage={sourcePage} />
        </div>

        <div className="my-5 border-t border-line" />

        <p className="text-[0.8125rem] font-medium tracking-wide text-ink-muted uppercase">
          Or reach us directly
        </p>
        <div className="mt-3 space-y-2">
          <a
            href={CLINIC.phoneHref}
            onClick={() => track("call_click", { source_page: sourcePage })}
            className="flex h-11 items-center justify-center gap-2 rounded-md border border-pink-600 text-[0.9375rem] font-medium text-pink-700 hover:bg-pink-50"
          >
            <Phone className="size-4" /> Call {CLINIC.phoneDisplay}
          </a>
          <a
            href={buildWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("whatsapp_click", { source_page: sourcePage })}
            className="flex h-11 items-center justify-center gap-2 rounded-md border border-line text-[0.9375rem] font-medium text-plum-900 hover:bg-pink-50"
          >
            <WhatsAppIcon className="size-4 text-success" /> WhatsApp
          </a>
        </div>
        <p className="mt-4 text-[0.8125rem] text-ink-muted">Open all 7 days, 09:30 to 18:30</p>
      </div>
    </aside>
  );
}
