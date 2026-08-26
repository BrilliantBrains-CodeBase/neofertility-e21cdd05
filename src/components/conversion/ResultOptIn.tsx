import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { submitToSheet, type LeadFormName } from "@/lib/leads";
import { CLINIC, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";

/**
 * Opt-in capture attached to a calculator's result.
 *
 * The self-assessment and the ovulation calculator work out their answers in the
 * browser and send nothing. That is deliberate: the inputs are reproductive
 * health answers — cycle regularity, a PCOS diagnosis, whether a partner has had
 * a semen analysis — which are sensitive personal data under the DPDP Act, and
 * neither page asks for consent to collect anything, because until now there was
 * nothing to consent to.
 *
 * So the result still computes and displays with nothing leaving the page. Only
 * a deliberate tick here sends it, and the tick names what is being sent. A
 * patient who ignores this panel is in exactly the position they were before.
 */
export function ResultOptIn({
  form,
  sourcePage,
  data,
  heading = "Want this sent to you?",
  copy,
}: {
  form: LeadFormName;
  sourcePage: string;
  /** The computed result and the inputs behind it. Sent only on submit. */
  data: Record<string, unknown>;
  heading?: string;
  copy: string;
}) {
  const renderedAt = useRef(Date.now());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (honeypot) return;

    const cleanEmail = email.trim();
    const cleanMobile = mobile.replace(/[\s-()]/g, "").replace(/^\+?91/, "");

    if (!cleanEmail && !cleanMobile) {
      setError("Add an email address or a mobile number so we can reach you.");
      return;
    }
    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Check this email address.");
      return;
    }
    if (cleanMobile && !/^[6-9]\d{9}$/.test(cleanMobile)) {
      setError("Enter a 10 digit Indian mobile number.");
      return;
    }
    if (!consent) {
      setError("Please confirm we may store and use these answers.");
      return;
    }

    setError("");
    setPending(true);

    const ok = await submitToSheet({
      form,
      sourcePage,
      sourceVariant: "result_optin",
      honeypot,
      fillMs: Date.now() - renderedAt.current,
      data: {
        ...data,
        name: name.trim(),
        email: cleanEmail || null,
        mobile: cleanMobile || null,
        consent: true,
      },
    });

    setPending(false);

    if (!ok) {
      setError(`That didn't send. Please call ${CLINIC.phoneDisplay} instead.`);
      return;
    }

    track("result_optin_submitted", { source_page: sourcePage, form });
    setDone(true);
  }

  if (done) {
    return (
      <div className="mt-6 rounded-xl border border-pink-300/60 bg-white p-5" role="status">
        <p className="font-medium text-plum-900">Sent.</p>
        <p className="mt-1 text-[0.9375rem] text-ink-muted">
          Our team will follow up. If it&rsquo;s urgent, call{" "}
          <a className="underline" href={CLINIC.phoneHref}>
            {CLINIC.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-6 rounded-xl border border-line bg-white p-5"
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

      <p className="font-medium text-plum-900">{heading}</p>
      <p className="mt-1 text-[0.9375rem] text-ink-muted">{copy}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor={`optin-name-${form}`} className="text-[0.8125rem] font-medium">
            Your name
          </Label>
          <Input
            id={`optin-name-${form}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 h-11"
            autoComplete="name"
          />
        </div>
        <div>
          <Label htmlFor={`optin-email-${form}`} className="text-[0.8125rem] font-medium">
            Email
          </Label>
          <Input
            id={`optin-email-${form}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 h-11"
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor={`optin-mobile-${form}`} className="text-[0.8125rem] font-medium">
            Mobile
          </Label>
          <Input
            id={`optin-mobile-${form}`}
            inputMode="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="mt-1.5 h-11"
            autoComplete="tel"
          />
        </div>
      </div>

      {/* Names what is being sent. "I agree to be contacted" would not be informed
          consent for health answers the patient never chose to hand over. */}
      <div className="mt-4 flex items-start gap-2.5">
        <Checkbox
          id={`optin-consent-${form}`}
          checked={consent}
          onCheckedChange={(v) => setConsent(Boolean(v))}
          className="mt-0.5 border-pink-600"
        />
        <Label
          htmlFor={`optin-consent-${form}`}
          className="text-[0.8125rem] leading-snug font-normal text-ink-muted"
        >
          I agree that Neo Fertility Clinic may store the answers I entered above along with my
          contact details, and contact me about them. See our{" "}
          <Link to={ROUTES.privacy} className="underline">
            Privacy Policy
          </Link>
          .
        </Label>
      </div>

      {error && (
        <p className="mt-3 text-xs text-pink-600" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" variant="cta" className="mt-4 w-full sm:w-auto" disabled={pending}>
        {pending && <Loader2 className="animate-spin" />}
        Send me this
      </Button>
    </form>
  );
}
