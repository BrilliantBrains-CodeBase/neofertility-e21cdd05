import { lazy, Suspense, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { insertEnquiry, warmEnquiriesDb } from "@/lib/enquiries-db";
import { markEnquiryComplete, submitToSheet } from "@/lib/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CalendarDays, ChevronDown, Loader2, PhoneCall } from "lucide-react";
import { CLINIC, ENQUIRY_TIMES, ENQUIRY_TREATMENTS, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { cn } from "@/lib/utils";

/* The date picker (react-day-picker) only renders inside the popover, so it is split out
   and fetched the first time a patient opens it rather than with every page view. */
const Calendar = lazy(() =>
  import("@/components/ui/calendar").then((m) => ({ default: m.Calendar })),
);

export type LeadFormVariant = "inline" | "rail" | "sheet" | "hero";

type Errors = Partial<Record<"name" | "mobile" | "email" | "topic" | "consent", string>>;

function normaliseMobile(raw: string) {
  return raw.replace(/[\s-()]/g, "").replace(/^\+?91/, "");
}

function validateMobile(raw: string) {
  const digits = normaliseMobile(raw);
  return /^[6-9]\d{9}$/.test(digits) ? "" : "Enter a 10 digit Indian mobile number.";
}

export function LeadForm({
  variant = "inline",
  sourcePage,
  onLight = true,
  collapseExtras = false,
  onSubmitted,
}: {
  variant?: LeadFormVariant;
  sourcePage: string;
  onLight?: boolean;
  /** Fold email, preferred day and message behind a disclosure. The rail sets this: it
   *  is the one place the form has to fit a viewport alongside a sticky CTA. */
  collapseExtras?: boolean;
  /**
   * Fired once the enquiry is stored, just before the redirect.
   *
   * Hosts that outlive the route have to dismiss themselves here. Header,
   * MobileActionBar and BookNowTab render outside the router outlet, so their
   * dialog survives the navigation to /thank-you/ and would otherwise sit over
   * it with this form still spinning inside.
   */
  onSubmitted?: () => void;
}) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [extrasOpen, setExtrasOpen] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  /* Spam signal for the sheet: near-instant submissions are almost always bots.
     Measured from first render rather than first keystroke, so a form that sat
     open in a background tab reads as slow, not fast. */
  const renderedAt = useRef(Date.now());
  const [failed, setFailed] = useState(false);

  /* Every variant now asks exactly what the home band asks. The rail used to drop the
     email, treatment and message fields, so the same patient reached the clinic with a
     different amount of detail depending on which form they happened to land on.
     `variant` still distinguishes the styling and the analytics source. */
  const preferredDay =
    date && time
      ? `${format(date, "d MMM yyyy")} · ${time}`
      : date
        ? format(date, "d MMM yyyy")
        : "";

  const labelClass = cn(
    "text-[0.8125rem] font-medium",
    onLight ? "text-plum-900" : "text-paper/90",
  );
  const fieldClass = cn(
    "mt-1.5 h-11 rounded-lg",
    onLight
      ? "border-input bg-white text-ink placeholder:text-ink-muted/70"
      : "border-paper/25 bg-paper/10 text-paper placeholder:text-paper/50",
  );

  function setError(key: keyof Errors, value: string) {
    setErrors((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (honeypot) return;

    const next: Errors = {};
    if (!name.trim()) next.name = "Please tell us your name.";
    const mobileError = validateMobile(mobile);
    if (mobileError) next.mobile = mobileError;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Check this email address.";
    if (!topic) next.topic = "Choose what you would like to discuss.";
    if (!consent) next.consent = "Please confirm we may contact you.";
    setErrors(next);
    /* Email is the only validated field that can be folded away. Surfacing the group
       first means the message never points at something the patient cannot see. */
    if (next.email) setExtrasOpen(true);
    if (Object.keys(next).length) return;

    setPending(true);
    setFailed(false);

    const params = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);

    const enquiry = {
      name: name.trim(),
      mobile: normaliseMobile(mobile),
      email: email.trim() || null,
      topic: topic || "Fertility Consultation",
      message: message.trim() || null,
    };
    /* Same shape the home band writes ("20 Aug 2026 · 15:30"), so both forms land in
       this column in one readable format instead of two. */
    const preferred = preferredDay || null;

    /* Two destinations, neither blocking the other. Supabase stays the record of
       truth; the sheet is what the front desk actually works from and is the leg
       that emails the clinic. Run in parallel rather than in sequence so a slow
       Supabase does not hold up the thank-you, and so either one landing is
       enough for the enquiry to have been captured. */
    const [db, sheet] = await Promise.all([
      insertEnquiry({
        ...enquiry,
        preferred_day: preferred,
        source_page: sourcePage,
        source_variant: variant,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        consent: true,
      }),
      submitToSheet({
        form: "lead",
        sourcePage,
        sourceVariant: variant,
        honeypot,
        fillMs: Date.now() - renderedAt.current,
        data: { ...enquiry, preferredDay: preferred, consent: true },
      }),
    ]);

    /* Only a total loss is worth telling the patient about. Showing the failure
       path when one leg saved the enquiry talks the clinic out of a booking it
       already has. */
    if (!db && !sheet) {
      setPending(false);
      setFailed(true);
      return;
    }

    track("enquiry_submitted", {
      source_page: sourcePage,
      source_variant: variant,
      topic,
      stored_db: db,
      stored_sheet: sheet,
    });

    markEnquiryComplete({ form: "lead", sourcePage, sourceVariant: variant, topic });
    /* Before the navigation, so a dialog that outlives the route is already
       closing rather than being left open over the thank-you page. */
    onSubmitted?.();
    /* `pending` is deliberately left true. Clearing it re-enables the form for
       the frame or two before the router swaps the page, which reads as the
       submit having done nothing and invites a second one. Every host either
       unmounts with the route or dismisses itself in `onSubmitted`, so the
       spinner never outlives the submit. */
    void navigate({ to: ROUTES.thankYou });
  }

  /* Everything the clinic likes to have but does not need in order to call a patient
     back. Kept in every variant so the enquiry record has the same shape wherever it
     was filled in — the rail just folds them away until asked for. */
  const extraFields = (
    <>
      <div>
        <Label htmlFor={`lf-email-${variant}`} className={labelClass}>
          Your Email <span className="font-normal opacity-70">(optional)</span>
        </Label>
        <Input
          id={`lf-email-${variant}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
          autoComplete="email"
        />
        {errors.email && <p className="mt-1 text-xs text-pink-600">{errors.email}</p>}
      </div>

      <div>
        <Label className={labelClass}>
          Preferred Date &amp; Time <span className="font-normal opacity-70">(optional)</span>
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                fieldClass,
                "flex w-full items-center justify-between border px-3 text-start text-[0.9375rem]",
                !preferredDay && (onLight ? "text-ink-muted/70" : "text-paper/50"),
              )}
            >
              <span className="truncate">{preferredDay || "Any date"}</span>
              <CalendarDays aria-hidden className="size-4 shrink-0 text-pink-600" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-3">
            <Suspense fallback={<div aria-hidden className="h-[18.5rem] w-[15.5rem]" />}>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={{ before: new Date() }}
                autoFocus
              />
            </Suspense>
            <div className="mt-3 border-t border-line pt-3">
              <label
                htmlFor={`lf-time-${variant}`}
                className="block text-[0.8125rem] font-medium text-plum-900"
              >
                Preferred time
              </label>
              <select
                id={`lf-time-${variant}`}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2 text-[0.9375rem] text-ink"
              >
                <option value="">Any time</option>
                {ENQUIRY_TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label htmlFor={`lf-message-${variant}`} className={labelClass}>
          Message <span className="font-normal opacity-70">(optional)</span>
        </Label>
        <Textarea
          id={`lf-message-${variant}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className={cn(
            "mt-1.5 rounded-lg",
            onLight
              ? "border-input bg-white text-ink"
              : "border-paper/25 bg-paper/10 text-paper placeholder:text-paper/50",
          )}
        />
      </div>
    </>
  );

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={warmEnquiriesDb}
      noValidate
      /* The rail is the one variant with a height budget; everywhere else keeps the
         roomier rhythm. */
      className={collapseExtras ? "space-y-3.5" : "space-y-4"}
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div>
        <Label htmlFor={`lf-name-${variant}`} className={labelClass}>
          Your Name
        </Label>
        <Input
          id={`lf-name-${variant}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setError("name", name.trim() ? "" : "Please tell us your name.")}
          className={fieldClass}
          autoComplete="name"
          required
        />
        {errors.name && <p className="mt-1 text-xs text-pink-600">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor={`lf-mobile-${variant}`} className={labelClass}>
          Phone Number
        </Label>
        <Input
          id={`lf-mobile-${variant}`}
          value={mobile}
          inputMode="tel"
          onChange={(e) => setMobile(e.target.value)}
          onBlur={() => setError("mobile", validateMobile(mobile))}
          className={fieldClass}
          autoComplete="tel"
          required
        />
        {errors.mobile && <p className="mt-1 text-xs text-pink-600">{errors.mobile}</p>}
      </div>

      <div>
        <Label htmlFor={`lf-topic-${variant}`} className={labelClass}>
          Treatment Interested In
        </Label>
        <select
          id={`lf-topic-${variant}`}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={cn(fieldClass, "w-full border px-3 text-[0.9375rem]")}
          required
        >
          <option value="">Choose one</option>
          {ENQUIRY_TREATMENTS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.topic && <p className="mt-1 text-xs text-pink-600">{errors.topic}</p>}
      </div>

      {/* Required first, optional behind a disclosure. A sticky rail only works if its
          submit button is on screen; at full length this card ran 1071px and the button
          sat below the fold on every laptop. */}
      {collapseExtras ? (
        <Collapsible open={extrasOpen} onOpenChange={setExtrasOpen}>
          <CollapsibleTrigger
            type="button"
            className="group flex w-full items-center justify-between gap-2 rounded-lg border border-dashed border-line px-3 py-2.5 text-[0.8125rem] font-medium text-pink-700 transition-colors hover:border-pink-600 hover:bg-pink-50"
          >
            Add email, a preferred day or a message
            <ChevronDown
              aria-hidden="true"
              className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-4">{extraFields}</CollapsibleContent>
        </Collapsible>
      ) : (
        extraFields
      )}

      <div className="flex items-start gap-2.5">
        <Checkbox
          id={`lf-consent-${variant}`}
          checked={consent}
          onCheckedChange={(v) => {
            setConsent(Boolean(v));
            if (v) setError("consent", "");
          }}
          className={cn("mt-0.5", onLight ? "border-pink-600" : "border-paper/50")}
        />
        <Label
          htmlFor={`lf-consent-${variant}`}
          className={cn(
            "text-[0.8125rem] leading-snug font-normal",
            onLight ? "text-ink-muted" : "text-paper/80",
          )}
        >
          I agree to be contacted about my enquiry. See our{" "}
          <Link to={ROUTES.privacy} className="underline">
            Privacy Policy
          </Link>
          .
        </Label>
      </div>
      {errors.consent && <p className="text-xs text-pink-600">{errors.consent}</p>}

      <Button type="submit" variant="cta" size="lg" className="w-full" disabled={pending}>
        {pending && <Loader2 className="animate-spin" />}
        Book Appointment
      </Button>

      {failed && (
        <p
          className={cn(
            "flex items-center gap-2 text-[0.875rem]",
            onLight ? "text-pink-600" : "text-paper",
          )}
        >
          <PhoneCall className="size-4" />
          Something went wrong. Please call us on{" "}
          <a className="underline" href={CLINIC.phoneHref}>
            {CLINIC.phoneDisplay}
          </a>
          .
        </p>
      )}
    </form>
  );
}
