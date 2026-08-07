import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadForm } from "./LeadForm";
import { CLINIC, track } from "@/lib/clinic";
import portrait from "@/assets/dr-payal-portrait.jpg";

export function AppointmentSheet({
  children,
  sourcePage,
}: {
  children: ReactNode;
  sourcePage: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) track("booking_sheet_open", { source_page: sourcePage });
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-xl bg-sand sm:max-w-lg">
        <DialogTitle className="sr-only">Book an appointment</DialogTitle>
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <img
            src={portrait}
            alt={CLINIC.doctor}
            width={56}
            height={56}
            loading="lazy"
            className="size-14 rounded-full object-cover object-top"
          />
          <div>
            <p className="font-medium text-teal-900">{CLINIC.doctor}</p>
            <p className="text-[0.8125rem] text-ink-muted">{CLINIC.credentialsShort}</p>
            <p className="text-[0.8125rem] text-teal-600">Usually replies within an hour</p>
          </div>
        </div>

        <Tabs defaultValue="callback" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="callback">Request a callback</TabsTrigger>
            <TabsTrigger value="online">Book online</TabsTrigger>
          </TabsList>
          <TabsContent value="callback" className="pt-4">
            <LeadForm variant="sheet" sourcePage={sourcePage} />
          </TabsContent>
          <TabsContent value="online" className="pt-4">
            <p className="text-[0.9375rem] text-ink-muted">
              Pick a slot in Dr. Payal Mahapatra's calendar. Clinic hours are {CLINIC.hours}.
            </p>
            <a
              href={CLINIC.bookingUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("booking_calendar_open", { source_page: sourcePage })}
              className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-md bg-clay-600 px-6 text-[0.9375rem] font-medium text-sand hover:bg-clay-700"
            >
              Open the booking calendar
            </a>
            <p className="mt-3 text-[0.8125rem] text-ink-muted">
              Prefer to talk? Call{" "}
              <a className="underline" href={CLINIC.phoneHref}>
                {CLINIC.phoneDisplay}
              </a>
              .
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
