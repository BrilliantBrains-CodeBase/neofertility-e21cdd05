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
  MapPin,
  PenLine,
  Phone,
  RotateCcw,
  User,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CLINIC, track } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/* ─────────────────────────── CONFIG ───────────────────────────
 * ENDPOINT — the deployed Google Apps Script Web App URL.
 *   Deploy with "Execute as: Me" and "Who has access: Anyone".
 *   While this is empty, submitting shows the error path; it never
 *   reports a false success.
 *
 *   IMPORTANT — Apps Script does NOT answer CORS preflight (OPTIONS).
 *   The post below uses Content-Type: text/plain so it stays a "simple
 *   request" and skips preflight. In doPost(e), read e.postData.contents
 *   and JSON.parse it. Do not switch this to application/json.
 *
 * MAP_SRC — from CLINIC so the clinic location has one source of truth.
 *   Alternative if this ever misbehaves in an iframe:
 *   https://www.google.com/maps?cid=1851221529633718164&hl=en-US&output=embed
 *
 * PIN_NUDGE_X/Y — small px knobs; Google draws the place card slightly
 *   off the geometric centre. Default 0.
 * --form-cover is set per breakpoint on the map layer below (0 / 58% / 50%).
 * ─────────────────────────────────────────────────────────────── */
const ENDPOINT = "";
const MAP_SRC = CLINIC.mapEmbed;
const PIN_NUDGE_X = "0px";
const PIN_NUDGE_Y = "0px";

const TREATMENTS = [
  "IVF",
  "IUI",
  "ICSI",
  "Fertility Consultation",
  "PCOS / Irregular Cycles",
  "Male Infertility",
  "Other",
];

const TIMES = [
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

type Errors = Partial<Record<"name" | "mobile" | "email" | "treatment" | "consent", string>>;

const inputBase =
  "peer min-h-[60px] w-full rounded-full border-2 border-ink-muted/30 bg-white ps-5 pe-12 py-[15px] text-start text-[15px] text-ink duration-300 placeholder:text-transparent focus:border-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700/40";

/* Floated label clears the pill entirely instead of sitting on the border. A notch
   straddling a 2px border on a fully-rounded pill leaves the text visibly cut in
   half, because no single background colour can mask both the white inside and the
   section colour outside. The wrapper carries pt-6 to make room above the field. */
const labelBase =
  "pointer-events-none absolute start-5 top-[15px] z-10 origin-[0] -translate-y-10 scale-75 bg-transparent px-2 text-[15px] font-medium text-teal-700 duration-300 peer-placeholder-shown:translate-y-1.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-ink-muted/60 peer-focus:-translate-y-10 peer-focus:scale-75 peer-focus:text-teal-700";

/* Same resting place as a floated `labelBase`, for controls with no peer input */
const labelFloated =
  "pointer-events-none absolute start-5 top-[15px] z-10 origin-[0] -translate-y-10 scale-75 px-2 text-[15px] font-medium text-teal-700";

const fieldWrap = "mb-2.5 w-full pt-6 sm:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.75rem)]";

const iconBase = "pointer-events-none absolute top-[13px] end-[5px] px-5 py-[5px] text-teal-600";

export function AppointmentMapForm({ sourcePage }: { sourcePage: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const recenterTimer = useRef<number | undefined>(undefined);
  const renderedAt = useRef(Date.now());
  const ids = useId();

  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [mapLive, setMapLive] = useState(false);

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

  /* The iframe src is only assigned once the section is reached, so no request
     goes to Google until then — lazy and privacy-friendlier. */
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

  useEffect(() => () => window.clearTimeout(recenterTimer.current), []);

  /* Reassigning src restores Google's default framing, which puts the marker back
     in the centre of the visible strip. */
  const recenter = () => {
    const frame = iframeRef.current;
    if (frame) frame.src = MAP_SRC;
    setMapLive(false);
  };

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

    const payload = {
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim() || null,
      treatment,
      preferredDay,
      message: message.trim() || null,
      sourcePage,
      consent: true,
      utmSource: params.get("utm_source"),
      utmMedium: params.get("utm_medium"),
      utmCampaign: params.get("utm_campaign"),
      /* Spam signal: near-instant submissions are almost always bots.
         Hook a captcha in here if you add one — nothing is auto-solved. */
      fillMs: Date.now() - renderedAt.current,
    };

    try {
      if (!ENDPOINT) throw new Error("Lead endpoint is not configured");
      /* text/plain keeps this a simple request — Apps Script cannot answer a
         CORS preflight, so application/json would fail in the browser. */
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      track("enquiry_submitted", {
        source_page: sourcePage,
        source_variant: "map_form",
        treatment,
      });
      setDone(true);
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
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
      className="relative z-[1] overflow-hidden bg-clay-25"
    >
      {/* ── Map layer ───────────────────────────────────────────────
          The iframe's leading edge is pinned at 0 and it grows only to the
          trailing side by --form-cover, so Google's always-centred marker lands
          in the middle of the strip NOT covered by the form. Pure CSS, so it
          survives any resize without JS geometry. */}
      <div
        aria-hidden={!inView}
        onMouseLeave={() => {
          if (!mapLive) return;
          window.clearTimeout(recenterTimer.current);
          recenterTimer.current = window.setTimeout(recenter, 4000);
        }}
        onMouseEnter={() => window.clearTimeout(recenterTimer.current)}
        style={
          {
            "--pin-nudge-x": PIN_NUDGE_X,
            "--pin-nudge-y": PIN_NUDGE_Y,
          } as React.CSSProperties
        }
        className={cn(
          "relative h-[320px] w-full overflow-hidden rounded-[15px] [--form-cover:0%] sm:h-[380px]",
          /* 65%, not the old 58%/50% pair: the form is lg:w-2/3 of a container that is
             now a constant 90% of the section, so its trailing edge sits at
             5% + (90% × 2/3) = 65% at every width. The marker lands at (100+F)/2, so
             F = 65% puts it at 82.5% — the middle of the uncovered strip. The old split
             values were tuned for a container whose share of the viewport changed with
             screen size. */
          "lg:absolute lg:inset-0 lg:z-0 lg:h-auto lg:rounded-none lg:[--form-cover:65%]",
          // muted by default so the form stays readable; comes alive on interaction
          "[filter:grayscale(1)_contrast(.95)_brightness(1.05)] opacity-90 transition-[filter,opacity,transform] duration-700 ease-out",
          "hover:opacity-100 hover:[filter:grayscale(0)] focus-within:opacity-100 focus-within:[filter:grayscale(0)]",
          // entrance fade
          !reduced && "will-change-transform",
          !reduced && !inView && "scale-[1.04] opacity-0",
          !reduced && inView && "scale-100",
          // edge dissolve — map melts into the surface behind the form
          "lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,.15)_18%,rgba(0,0,0,.6)_34%,#000_52%)]",
          "lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,.15)_18%,rgba(0,0,0,.6)_34%,#000_52%)]",
        )}
      >
        {/* Reserves the box so nothing shifts while the iframe loads */}
        <div aria-hidden className="absolute inset-0 bg-teal-50" />

        {inView && (
          <iframe
            ref={iframeRef}
            title="Neo Fertility Clinic location on Google Maps"
            src={MAP_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className={cn(
              "absolute top-1/2 border-0 ltr:left-0 rtl:right-0",
              "h-[calc(100%+var(--v-bleed,0px))] w-[calc(100%+var(--form-cover))]",
              "translate-y-[-50%] translate-x-[var(--pin-nudge-x)]",
              mapLive ? "pointer-events-auto" : "pointer-events-none",
            )}
          />
        )}

        {/* Scroll guard: the map cannot swallow page scroll until asked. */}
        {!mapLive && (
          <button
            type="button"
            onClick={() => setMapLive(true)}
            className="absolute bottom-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white/90 px-4 text-[0.875rem] font-medium text-teal-900 shadow-rail backdrop-blur ltr:right-4 rtl:left-4"
          >
            <MapPin aria-hidden className="size-4" />
            Explore map
          </button>
        )}
        {mapLive && (
          <button
            type="button"
            onClick={recenter}
            aria-label="Recenter map"
            className="absolute bottom-4 z-10 grid size-11 place-items-center rounded-full border border-line bg-white/90 text-teal-900 shadow-rail backdrop-blur ltr:right-4 rtl:left-4"
          >
            <RotateCcw aria-hidden className="size-4" />
          </button>
        )}
      </div>

      {/* Fallback for browsers without mask-image support */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden supports-[not_(mask-image:linear-gradient(#000,#000))]:lg:block ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-sand via-sand/70 to-transparent"
      />

      <div className="relative z-10 container-page">
        <div className="w-full py-[50px] pb-10 lg:me-[110px] lg:w-2/3 2xl:pt-[115px] 2xl:pb-[130px]">
          <Reveal className="mb-10">
            <p className="flex items-center gap-2 text-[1.125rem] font-semibold tracking-[0.08em] text-teal-600 uppercase">
              <CalendarDays aria-hidden className="size-5" />
              Book a consultation
            </p>
            <h2 id={`${ids}-heading`} className="mt-3">
              Make An <span className="text-clay-600">Appointment</span>
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
                  {TREATMENTS.map((option) => (
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
                      className="block text-[0.8125rem] font-medium text-teal-900"
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
                      {TIMES.map((t) => (
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
                  className="mt-1 size-4 shrink-0 accent-clay-600"
                  {...fieldProps("consent")}
                />
                <span>
                  I agree to be contacted by phone/WhatsApp about my enquiry and accept the{" "}
                  <Link to={ROUTES.privacy} className="text-teal-700 underline underline-offset-2">
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
                className="group inline-flex min-h-[60px] items-center gap-2 rounded-full bg-clay-600 px-8 text-[0.9375rem] font-medium text-sand transition-colors hover:bg-clay-700 focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
                  <span className="font-medium text-teal-700">
                    Thanks — we&rsquo;ll call you back shortly.
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

          {/* Keyboard-reachable route to the map data, and the fallback when the
              iframe is blocked by an ad blocker or consent gate. */}
          <div className="mt-8 inline-flex max-w-[34ch] flex-col gap-1 rounded-2xl border border-line bg-white/90 p-4 backdrop-blur lg:hidden">
            <p className="font-medium text-teal-900">Neo Fertility Clinic</p>
            <p className="text-[0.875rem] text-ink-muted">{CLINIC.addressLine}</p>
            <a
              href={CLINIC.directionsUrl}
              target="_blank"
              rel="noopener"
              className="mt-1 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-teal-700 hover:underline"
            >
              Open in Google Maps
              <ExternalLink aria-hidden className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Same card, positioned over the map on the trailing side from lg up */}
      <div className="pointer-events-none absolute inset-y-0 z-10 hidden items-end lg:flex ltr:right-8 rtl:left-8">
        <div className="pointer-events-auto mb-10 flex max-w-[30ch] flex-col gap-1 rounded-2xl border border-line bg-white/90 p-4 shadow-rail backdrop-blur">
          <p className="font-medium text-teal-900">Neo Fertility Clinic</p>
          <p className="text-[0.875rem] text-ink-muted">{CLINIC.addressLine}</p>
          <a
            href={CLINIC.directionsUrl}
            target="_blank"
            rel="noopener"
            className="mt-1 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-teal-700 hover:underline"
          >
            Open in Google Maps
            <ExternalLink aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
