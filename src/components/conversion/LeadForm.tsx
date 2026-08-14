import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays, Loader2, PhoneCall } from "lucide-react";
import { CLINIC, ENQUIRY_TIMES, ENQUIRY_TREATMENTS, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { cn } from "@/lib/utils";

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
}: {
  variant?: LeadFormVariant;
  sourcePage: string;
  onLight?: boolean;
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
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
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
    if (Object.keys(next).length) return;

    setPending(true);
    setFailed(false);

    const params = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);

    const { error } = await supabase.from("enquiries").insert({
      name: name.trim(),
      mobile: normaliseMobile(mobile),
      email: email.trim() || null,
      topic: topic || "Fertility Consultation",
      /* Same shape the home band writes ("20 Aug 2026 · 15:30"), so both forms land in
         this column in one readable format instead of two. */
      preferred_day: preferredDay || null,
      message: message.trim() || null,
      source_page: sourcePage,
      source_variant: variant,
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      consent: true,
    });

    setPending(false);

    if (error) {
      setFailed(true);
      return;
    }

    track("enquiry_submitted", { source_page: sourcePage, source_variant: variant, topic });
    setDone(true);
  }

  if (done) {
    return (
      <div
        className={cn(
          "rounded-xl border p-5",
          onLight ? "border-pink-300/60 bg-pink-50" : "border-paper/25 bg-paper/10",
        )}
        role="status"
      >
        <p className={cn("font-medium", onLight ? "text-plum-900" : "text-paper")}>Thank you.</p>
        <p className={cn("mt-1 text-[0.9375rem]", onLight ? "text-ink-muted" : "text-paper/80")}>
          We'll call you back. If it's urgent, call{" "}
          <a className="underline" href={CLINIC.phoneHref}>
            {CLINIC.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={{ before: new Date() }}
              autoFocus
            />
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
