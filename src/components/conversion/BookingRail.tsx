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
      {/* top-24 was 96px against a 134px sticky header, so the card's first rows sat
          behind it. The offset now clears the header, and the cap is measured from the
          same number.

          A sticky card only earns its place if the submit button is on screen. At full
          length this ran 1071px — 385px past the fold on a 1440x800 laptop — so the cap
          below turned into an inner scrollbar and the CTA sat under it. The form now
          folds its optional fields away (`collapseExtras`) and everything around it is
          measured to keep the whole card inside a laptop viewport; the cap stays only as
          a backstop for genuinely short screens. */}
      <div className="sticky top-[8.5rem] max-h-[calc(100vh-9.25rem)] w-[352px] overflow-y-auto rounded-2xl border border-line bg-white px-5 py-4 shadow-rail xl:w-[380px]">
        {/* One line of credentials, not three: the full string wrapped to three lines and
            pushed the first field down with it. */}
        <div className="flex items-center gap-3">
          <img
            src={portrait}
            alt={CLINIC.doctor}
            width={52}
            height={52}
            loading="lazy"
            className="size-13 shrink-0 rounded-full object-cover object-top"
          />
          <div className="min-w-0">
            <Link
              to={ROUTES.about}
              className="text-[0.9375rem] font-medium text-plum-900 hover:text-pink-600 hover:underline"
            >
              {CLINIC.doctor}
            </Link>
            <p className="text-[0.8125rem] leading-snug text-ink-muted">
              {CLINIC.credentialsShort} · <span className="text-pink-700">18 years</span>
            </p>
          </div>
        </div>

        {/* Says what the fields are for. Without it the card opened on a portrait and an
            unlabelled name box. */}
        <p className="mt-3.5 text-[1.0625rem] font-semibold text-plum-900">Book an appointment</p>

        <div className="mt-3">
          <LeadForm variant="rail" sourcePage={sourcePage} collapseExtras />
        </div>

        <div className="my-3.5 border-t border-line" />

        {/* Side by side rather than stacked — two 44px rows became one, and neither is a
            primary action competing with the submit button above. */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={CLINIC.phoneHref}
            onClick={() => track("call_click", { source_page: sourcePage })}
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-pink-600 text-[0.875rem] font-medium text-pink-700 transition-colors hover:bg-pink-50"
          >
            <Phone className="size-4 shrink-0" /> Call
          </a>
          <a
            href={buildWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("whatsapp_click", { source_page: sourcePage })}
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-line text-[0.875rem] font-medium text-plum-900 transition-colors hover:bg-pink-50"
          >
            <WhatsAppIcon className="size-4 shrink-0 text-success" /> WhatsApp
          </a>
        </div>
      </div>
    </aside>
  );
}
