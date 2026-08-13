import { LeadForm } from "./LeadForm";
import { CLINIC } from "@/lib/clinic";
import portrait from "@/assets/dr-payal-portrait.jpg";

export function LeadFormBand({
  heading,
  copy,
  sourcePage,
}: {
  heading: string;
  copy: string;
  sourcePage: string;
}) {
  return (
    <section className="bg-navy-900 section-y">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-paper">{heading}</h2>
          <p className="mt-4 max-w-[46ch] text-paper/80">{copy}</p>
          <div className="mt-8 flex items-center gap-4">
            <img
              src={portrait}
              alt={CLINIC.doctor}
              width={64}
              height={64}
              loading="lazy"
              className="size-16 rounded-full object-cover object-top"
            />
            <div>
              <p className="font-medium text-paper">{CLINIC.doctor}</p>
              <p className="text-[0.8125rem] text-paper/70">{CLINIC.credentials}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-paper/15 bg-pink-700/30 p-6">
          <LeadForm variant="inline" sourcePage={sourcePage} onLight={false} />
        </div>
      </div>
    </section>
  );
}
