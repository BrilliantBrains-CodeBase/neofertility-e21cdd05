import { AppointmentSheet } from "./AppointmentSheet";

export function BookNowTab({ sourcePage }: { sourcePage: string }) {
  /* Vertically centred so it clears the WhatsAppFloat at right-6 bottom-8. Hidden below
     lg, where the MobileActionBar already carries a Book button. AppointmentSheet fires
     booking_sheet_open itself, so there is no track() call here.

     The padding axes are swapped, and deliberately so: Tailwind v4's px-/py- are the
     logical padding-inline/padding-block, and vertical-rl turns the inline axis
     vertical. So px- sets this tab's HEIGHT and py- sets its WIDTH, not the reverse. */
  return (
    <AppointmentSheet sourcePage={sourcePage}>
      <button
        type="button"
        className="fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 rounded-l-md bg-pink-600 px-7 py-2.5 text-[1.125rem] font-normal whitespace-nowrap text-paper shadow-rail transition-colors [writing-mode:vertical-rl] hover:bg-pink-700 lg:block"
      >
        Book Now
      </button>
    </AppointmentSheet>
  );
}
