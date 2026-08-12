import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, PhoneCall } from "lucide-react";
import { CLINIC, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { cn } from "@/lib/utils";

export type LeadFormVariant = "inline" | "rail" | "sheet" | "hero";

const TOPICS = [
  "Fertility treatment",
  "PCOS or periods",
  "Pregnancy care",
  "Gynecology",
  "Second opinion",
  "Other",
];

const DAYS = ["Any", "Weekday", "Weekend"];

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
  compact = false,
  onLight = true,
}: {
  variant?: LeadFormVariant;
  sourcePage: string;
  compact?: boolean;
  onLight?: boolean;
}) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [day, setDay] = useState("Any");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);

  const isRail = variant === "rail";
  const showFullFields = !isRail && !compact;

  const labelClass = cn("text-[0.8125rem] font-medium", onLight ? "text-teal-900" : "text-sand/90");
  const fieldClass = cn(
    "mt-1.5 h-11 rounded-lg",
    onLight
      ? "border-input bg-white text-ink placeholder:text-ink-muted/70"
      : "border-sand/25 bg-sand/10 text-sand placeholder:text-sand/50",
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
    if (!isRail && !topic) next.topic = "Choose what you would like to discuss.";
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
      topic: topic || "Fertility treatment",
      preferred_day: day,
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
          onLight ? "border-teal-300/60 bg-teal-50" : "border-sand/25 bg-sand/10",
        )}
        role="status"
      >
        <p className={cn("font-medium", onLight ? "text-teal-900" : "text-sand")}>Thank you.</p>
        <p className={cn("mt-1 text-[0.9375rem]", onLight ? "text-ink-muted" : "text-sand/80")}>
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
          Name
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
        {errors.name && <p className="mt-1 text-xs text-clay-600">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor={`lf-mobile-${variant}`} className={labelClass}>
          Mobile number
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
        {errors.mobile && <p className="mt-1 text-xs text-clay-600">{errors.mobile}</p>}
      </div>

      {showFullFields && (
        <div>
          <Label htmlFor={`lf-email-${variant}`} className={labelClass}>
            Email <span className="font-normal opacity-70">(optional)</span>
          </Label>
          <Input
            id={`lf-email-${variant}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            autoComplete="email"
          />
          {errors.email && <p className="mt-1 text-xs text-clay-600">{errors.email}</p>}
        </div>
      )}

      {!isRail && (
        <div>
          <Label htmlFor={`lf-topic-${variant}`} className={labelClass}>
            I'd like to discuss
          </Label>
          <select
            id={`lf-topic-${variant}`}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={cn(fieldClass, "w-full border px-3 text-[0.9375rem]")}
            required
          >
            <option value="">Choose one</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.topic && <p className="mt-1 text-xs text-clay-600">{errors.topic}</p>}
        </div>
      )}

      <div>
        <Label htmlFor={`lf-day-${variant}`} className={labelClass}>
          Preferred day
        </Label>
        <select
          id={`lf-day-${variant}`}
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className={cn(fieldClass, "w-full border px-3 text-[0.9375rem]")}
        >
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {showFullFields && (
        <div>
          <Label htmlFor={`lf-message-${variant}`} className={labelClass}>
            Anything you'd like us to know{" "}
            <span className="font-normal opacity-70">(optional)</span>
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
                : "border-sand/25 bg-sand/10 text-sand placeholder:text-sand/50",
            )}
          />
        </div>
      )}

      <div className="flex items-start gap-2.5">
        <Checkbox
          id={`lf-consent-${variant}`}
          checked={consent}
          onCheckedChange={(v) => {
            setConsent(Boolean(v));
            if (v) setError("consent", "");
          }}
          className={cn("mt-0.5", onLight ? "border-teal-600" : "border-sand/50")}
        />
        <Label
          htmlFor={`lf-consent-${variant}`}
          className={cn(
            "text-[0.8125rem] leading-snug font-normal",
            onLight ? "text-ink-muted" : "text-sand/80",
          )}
        >
          I agree to be contacted about my enquiry. See our{" "}
          <Link to={ROUTES.privacy} className="underline">
            Privacy Policy
          </Link>
          .
        </Label>
      </div>
      {errors.consent && <p className="text-xs text-clay-600">{errors.consent}</p>}

      <Button type="submit" variant="cta" size="lg" className="w-full" disabled={pending}>
        {pending && <Loader2 className="animate-spin" />}
        {isRail ? "Request a callback" : "Request a callback"}
      </Button>

      {failed && (
        <p
          className={cn(
            "flex items-center gap-2 text-[0.875rem]",
            onLight ? "text-clay-600" : "text-sand",
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
