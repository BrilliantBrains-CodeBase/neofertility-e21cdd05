import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ExternalLink,
  Loader2,
  Mail,
  PenLine,
  Phone,
  User,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { submitToSheet } from "@/lib/leads";
import { CLINIC, ENQUIRY_TIMES, ENQUIRY_TREATMENTS, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import backdrop from "@/assets/appointment-mother-baby.webp";

type Errors = Partial<Record<"name" | "mobile" | "email" | "treatment" | "consent", string>>;

/* Matches LeadForm. Without it the same patient is stored as "+91 98765 43210"
   here and "9876543210" there, and the two rows never dedupe. */
function normaliseMobile(raw: string) {
  return raw.replace(/[\s-()]/g, "").replace(/^\+?91/, "");
}

const inputBase =
  "peer min-h-[60px] w-full rounded-full border-2 border-ink-muted/30 bg-white ps-5 pe-12 py-[15px] text-start text-[15px] text-ink duration-300 placeholder:text-transparent focus:border-pink-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-700/40";

/* Floated label clears the pill entirely instead of sitting on the border. A notch
   straddling a 2px border on a fully-rounded pill leaves the text visibly cut in
   half, because no single background colour can mask both the white inside and the
   section colour outside. The wrapper carries pt-6 to make room above the field. */
const labelBase =
  "pointer-events-none absolute start-5 top-[15px] z-10 origin-[0] -translate-y-10 scale-75 bg-transparent px-2 text-[15px] font-medium text-pink-700 duration-300 peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-ink-muted/60 peer-focus:-translate-y-10 peer-focus:scale-75 peer-focus:text-pink-700";

/* Same resting place as a floated `labelBase`, for controls with no peer input */
const labelFloated =
  "pointer-events-none absolute start-5 top-[15px] z-10 origin-[0] -translate-y-10 scale-75 px-2 text-[15px] font-medium text-pink-700";

const fieldWrap = "mb-2.5 w-full pt-6 sm:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.75rem)]";

const iconBase = "pointer-events-none absolute top-[13px] end-[5px] px-5 py-[5px] text-pink-600";

export function AppointmentMapForm({ sourcePage }: { sourcePage: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const renderedAt = useRef(Date.now());
  const ids = useId();

  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [treatment, setTreatment] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /* Gates the backdrop's entrance fade so it plays when the section is reached. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* No weekday: "Thu 20 Aug 2026, 15:30" wraps to two lines inside the pill at the
     narrowest column width, and the weekday adds nothing the date does not. */
  const preferredDay =
    date && time
      ? `${format(date, "d MMM yyyy")} · ${time}`
      : date
        ? format(date, "d MMM yyyy")
        : "";

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please tell us your name.";
    const digits = mobile.replace(/[\s-()+]/g, "");
    if (!digits) next.mobile = "Please add a phone number.";
    else if (!/^\d{10,13}$/.test(digits)) next.mobile = "That does not look like a valid number.";
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim()))
      next.email = "Please check the email address.";
    if (!treatment) next.treatment = "Please choose what you would like help with.";
    if (!consent) next.consent = "Please accept the privacy policy to continue.";
    return next;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (honeypot) return; // bot filled the hidden field

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setPending(true);
    setFailed(false);

    const params = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);

    const enquiry = {
      name: name.trim(),
      mobile: normaliseMobile(mobile),
      email: email.trim() || null,
      /* `topic`, not `treatment`: this form used its own key, so the home page's
         leads arrived under a different name than every other form's. */
      topic: treatment,
      message: message.trim() || null,
    };
    const preferred = preferredDay || null;

    /* Was a bare fetch at a hardcoded ENDPOINT that had never been filled in, so
       every enquiry from the home page — the only lead form on it — failed. Now
       the same dual write as LeadForm: Supabase as the record of truth, the sheet
       as the clinic's call list, either one landing counting as captured. */
    const [db, sheet] = await Promise.all([
      supabase
        .from("enquiries")
        .insert({
          ...enquiry,
          preferred_day: preferred,
          source_page: sourcePage,
          source_variant: "map_form",
          utm_source: params.get("utm_source"),
          utm_medium: params.get("utm_medium"),
          utm_campaign: params.get("utm_campaign"),
          consent: true,
        })
        .then(({ error }) => !error),
      submitToSheet({
        form: "lead",
        sourcePage,
        sourceVariant: "map_form",
        honeypot,
        /* Spam signal: near-instant submissions are almost always bots.
           Hook a captcha in here if you add one — nothing is auto-solved. */
        fillMs: Date.now() - renderedAt.current,
        data: { ...enquiry, preferredDay: preferred, consent: true },
      }),
    ]);

    setPending(false);

    if (!db && !sheet) {
      setFailed(true);
      return;
    }

    track("enquiry_submitted", {
      source_page: sourcePage,
      source_variant: "map_form",
      treatment,
      stored_db: db,
      stored_sheet: sheet,
    });
    setDone(true);
  }

  const err = (key: keyof Errors) => errors[key];
  const fieldProps = (key: keyof Errors) => ({
    "aria-invalid": err(key) ? true : undefined,
    "aria-describedby": err(key) ? `${ids}-${key}-error` : undefined,
  });

  const FieldError = ({ name: key }: { name: keyof Errors }) =>
    err(key) ? (
      <p id={`${ids}-${key}-error`} className="mt-1.5 ps-5 text-[13px] text-destructive">
        {err(key)}
      </p>
    ) : null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby={`${ids}-heading`}
      /* clip rather than hidden — see TreatmentGrid: `hidden` leaves the section a
         scrollport a few pixels wider than its box, which lets it slide sideways. */
      className="relative z-[1] overflow-clip bg-pink-25"
    >
      {/* ── Backdrop image ─────────────────────────────────────────
          Decorative, so aria-hidden with an empty alt: the form beside it carries all
          the meaning. object-right keeps the mother and baby in the strip the form does
          not cover — they sit in the right half of the source frame, and the form takes
          the leading ~65%. */}
      <div
        aria-hidden
        className={cn(
          "relative h-[320px] w-full overflow-hidden rounded-[15px] sm:h-[380px]",
          "lg:absolute lg:inset-0 lg:z-0 lg:h-auto lg:rounded-none",
          "transition-[opacity,transform] duration-700 ease-out",
          !reduced && "will-change-transform",
          !reduced && !inView && "scale-[1.04] opacity-0",
          !reduced && inView && "scale-100 opacity-100",
          /* Edge dissolve so the photo melts into the surface behind the form rather
             than ending on a hard vertical line. It stays fully transparent to 60% —
             past the form's trailing edge at 65% — because body copy over a photograph
             has no guaranteed contrast: the consent row landed on the mother's hair at
             2.64:1 when the ramp finished at 52%. The old map could sit under the form
             because it was greyed and flattened; a photo cannot. */
          "lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,transparent_60%,rgba(0,0,0,.35)_72%,#000_88%)]",
          "lg:[mask-image:linear-gradient(to_right,transparent_0%,transparent_60%,rgba(0,0,0,.35)_72%,#000_88%)]",
        )}
      >
        <img
          src={backdrop}
          alt=""
          width={1366}
          height={768}
          loading="lazy"
          className="size-full object-cover object-right"
        />
      </div>

      {/* Fallback for browsers without mask-image support */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden supports-[not_(mask-image:linear-gradient(#000,#000))]:lg:block ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-paper via-paper/70 to-transparent"
      />

      <div className="relative z-10 container-page">
        <div className="w-full py-[50px] pb-10 lg:me-[110px] lg:w-2/3 2xl:pt-[115px] 2xl:pb-[130px]">
          <Reveal className="mb-10">
            <p className="flex items-center gap-2 text-[1.125rem] font-semibold tracking-[0.08em] text-pink-600 uppercase">
              <CalendarDays aria-hidden className="size-5" />
              Book a consultation
            </p>
            <h2 id={`${ids}-heading`} className="mt-3">
              Make An <span className="text-pink-600">Appointment</span>
            </h2>
          </Reveal>

          <form onSubmit={handleSubmit} noValidate className="flex flex-wrap gap-x-4">
            {/* Honeypot — hidden from people, catnip for bots */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <div className={fieldWrap}>
              <div className="relative">
                <input
                  id={`${ids}-name`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  autoComplete="name"
                  required
                  className={inputBase}
                  {...fieldProps("name")}
                />
                <label htmlFor={`${ids}-name`} className={labelBase}>
                  Your Name
                </label>
                <User aria-hidden className={cn(iconBase, "size-5")} />
              </div>
              <FieldError name="name" />
            </div>

            <div className={fieldWrap}>
              <div className="relative">
                <input
                  id={`${ids}-mobile`}
                  type="tel"
                  inputMode="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Phone Number"
                  autoComplete="tel"
                  required
                  className={inputBase}
                  {...fieldProps("mobile")}
                />
                <label htmlFor={`${ids}-mobile`} className={labelBase}>
                  Phone Number
                </label>
                <Phone aria-hidden className={cn(iconBase, "size-5")} />
              </div>
              <FieldError name="mobile" />
            </div>

            <div className={fieldWrap}>
              <div className="relative">
                <input
                  id={`${ids}-email`}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  autoComplete="email"
                  className={inputBase}
                  {...fieldProps("email")}
                />
                <label htmlFor={`${ids}-email`} className={labelBase}>
                  Your Email
                </label>
                <Mail aria-hidden className={cn(iconBase, "size-5")} />
              </div>
              <FieldError name="email" />
            </div>

            <div className={fieldWrap}>
              <div className="relative">
                <select
                  id={`${ids}-treatment`}
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  required
                  className={cn(inputBase, "appearance-none cursor-pointer")}
                  {...fieldProps("treatment")}
                >
                  <option value="">Treatment Interested In</option>
                  {ENQUIRY_TREATMENTS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden className={cn(iconBase, "size-5")} />
              </div>
              <FieldError name="treatment" />
            </div>

            <div className={fieldWrap}>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      inputBase,
                      "relative flex items-center text-start whitespace-nowrap",
                      !preferredDay && "text-ink-muted/60",
                    )}
                  >
                    <span className="truncate">{preferredDay || "Preferred Date & Time"}</span>
                    {/* The button has no peer input, so the float is driven by state */}
                    {preferredDay && <span className={labelFloated}>Preferred Date & Time</span>}
                    <CalendarDays aria-hidden className={cn(iconBase, "size-5")} />
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
                      htmlFor={`${ids}-time`}
                      className="block text-[0.8125rem] font-medium text-plum-900"
                    >
                      Preferred time
                    </label>
                    <select
                      id={`${ids}-time`}
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

            <div className={fieldWrap}>
              <div className="relative">
                <input
                  id={`${ids}-message`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message (optional)"
                  className={inputBase}
                />
                <label htmlFor={`${ids}-message`} className={labelBase}>
                  Message (optional)
                </label>
                <PenLine aria-hidden className={cn(iconBase, "size-5")} />
              </div>
            </div>

            <div className="mb-2.5 w-full">
              <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] text-ink-muted">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-1 size-4 shrink-0 accent-pink-600"
                  {...fieldProps("consent")}
                />
                <span>
                  I agree to be contacted by phone/WhatsApp about my enquiry and accept the{" "}
                  <Link to={ROUTES.privacy} className="text-pink-700 underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              <FieldError name="consent" />
            </div>

            <div className="w-full">
              <button
                type="submit"
                disabled={pending || !consent}
                className="group inline-flex min-h-[60px] items-center gap-2 rounded-full bg-pink-600 px-8 text-[0.9375rem] font-medium text-paper transition-colors hover:bg-pink-700 focus-visible:ring-2 focus-visible:ring-pink-700 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {pending ? (
                  <>
                    <Loader2 aria-hidden className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Book Appointment
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <p aria-live="polite" className="mt-4 text-[0.9375rem]">
                {done && (
                  <span className="font-medium text-pink-700">
                    Thanks, we&rsquo;ll call you back shortly.
                  </span>
                )}
                {failed && (
                  <span className="text-destructive">
                    That didn&rsquo;t send. Please try again, or call {CLINIC.phoneDisplay}.
                  </span>
                )}
              </p>
            </div>
          </form>

          {/* The section no longer embeds a map, so this card is now the only place it
              gives the clinic's location — and the only route to directions. */}
          <div className="mt-8 inline-flex max-w-[34ch] flex-col gap-1 rounded-2xl border border-line bg-white/90 p-4 backdrop-blur lg:hidden">
            <p className="font-medium text-plum-900">Neo Fertility Clinic</p>
            <p className="text-[0.875rem] text-ink-muted">{CLINIC.addressLine}</p>
            <a
              href={CLINIC.directionsUrl}
              target="_blank"
              rel="noopener"
              className="mt-1 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-pink-700 hover:underline"
            >
              Open in Google Maps
              <ExternalLink aria-hidden className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Same card, over the backdrop image on the trailing side from lg up */}
      <div className="pointer-events-none absolute inset-y-0 z-10 hidden items-end lg:flex ltr:right-8 rtl:left-8">
        <div className="pointer-events-auto mb-10 flex max-w-[30ch] flex-col gap-1 rounded-2xl border border-line bg-white/90 p-4 shadow-rail backdrop-blur">
          <p className="font-medium text-plum-900">Neo Fertility Clinic</p>
          <p className="text-[0.875rem] text-ink-muted">{CLINIC.addressLine}</p>
          <a
            href={CLINIC.directionsUrl}
            target="_blank"
            rel="noopener"
            className="mt-1 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-pink-700 hover:underline"
          >
            Open in Google Maps
            <ExternalLink aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
