import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import { PageHero, SectionHeading } from "@/components/sections/blocks";
import { Prose } from "@/components/sections/ServicePage";
import { DEFAULT_WHATSAPP_MESSAGE } from "@/lib/clinic";
import { ROUTES } from "@/data/navigation";
import { pageMeta, jsonLd, breadcrumbSchema } from "@/lib/seo";

const PATH = ROUTES.ovulationCalculator;
const SOURCE_PAGE = "ovulation-calculator";

export const Route = createFileRoute("/ovulation-calculator")({
  head: () => ({
    ...pageMeta({
      title: "Ovulation Calculator | Neo Fertility Clinic, Bangalore",
      description:
        "Estimate your ovulation day and fertile window from your last period date and cycle length. An estimate only, less reliable with irregular cycles.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Ovulation Calculator", path: PATH },
        ]),
      ),
    ],
  }),
  component: Page,
});

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function Page() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");

  const result = useMemo(() => {
    if (!lastPeriod) return null;
    const length = Number(cycleLength);
    if (!Number.isFinite(length) || length < 20 || length > 45) return null;
    const start = new Date(lastPeriod);
    if (Number.isNaN(start.getTime())) return null;

    const ovulationDay = new Date(start);
    ovulationDay.setDate(start.getDate() + (length - 14));
    const fertileStart = new Date(ovulationDay);
    fertileStart.setDate(ovulationDay.getDate() - 5);
    const fertileEnd = new Date(ovulationDay);
    fertileEnd.setDate(ovulationDay.getDate() + 1);
    const nextPeriod = new Date(start);
    nextPeriod.setDate(start.getDate() + length);

    return { ovulationDay, fertileStart, fertileEnd, nextPeriod };
  }, [lastPeriod, cycleLength]);

  return (
    <>
      <PageHero
        eyebrow="Tool"
        title="Ovulation Calculator"
        intro="Estimate your likely ovulation day and fertile window from the first day of your last period and your usual cycle length."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Ovulation Calculator" }]}
      />

      <div className="container-page py-14 lg:py-16">
        <div className="mx-auto max-w-[640px] space-y-10">
          <form
            className="space-y-6 rounded-xl border border-line bg-white p-6"
            aria-label="Ovulation calculator"
          >
            <div>
              <Label htmlFor="lastPeriod">First day of your last period</Label>
              <Input
                id="lastPeriod"
                type="date"
                value={lastPeriod}
                onChange={(e) => setLastPeriod(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="cycleLength">Usual cycle length, in days</Label>
              <Input
                id="cycleLength"
                type="number"
                min={20}
                max={45}
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                className="mt-2"
              />
              <p className="mt-1 text-[0.8125rem] text-ink-muted">
                Count from the first day of one period to the first day of the next. Most cycles are
                21 to 35 days.
              </p>
            </div>
          </form>

          <div role="status" aria-live="polite">
            {result ? (
              <div className="rounded-xl border-l-4 border-pink-600 bg-pink-50 p-6">
                <h2 className="text-[1.25rem] text-plum-900">Your estimate</h2>
                <dl className="mt-4 space-y-2 text-ink-muted">
                  <div>
                    <dt className="inline font-medium text-plum-900">Estimated ovulation day: </dt>
                    <dd className="inline">{formatDate(result.ovulationDay)}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-plum-900">Estimated fertile window: </dt>
                    <dd className="inline">
                      {formatDate(result.fertileStart)} to {formatDate(result.fertileEnd)}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-plum-900">
                      Next period expected around:{" "}
                    </dt>
                    <dd className="inline">{formatDate(result.nextPeriod)}</dd>
                  </div>
                </dl>
              </div>
            ) : (
              <p className="text-ink-muted">
                Enter the date of your last period and your cycle length to see an estimate.
              </p>
            )}
          </div>

          <div className="rounded-xl border-l-4 border-alert bg-pink-50 p-5">
            <p className="text-[0.9375rem] text-ink">
              This is an estimate based on average cycle timing, not a measurement of ovulation. It
              becomes unreliable if your cycles are irregular, since the calculation assumes a
              consistent cycle length. If your cycles are irregular, or you have a known diagnosis
              such as{" "}
              <Link to={ROUTES.pcos} className="underline">
                PCOS
              </Link>
              , ovulation tracking by ultrasound is more reliable than a date-based estimate. If you
              have been trying to conceive for 12 months, or 6 months if you are over 35, without
              success, see our page on{" "}
              <Link to={ROUTES.infertility} className="underline">
                infertility evaluation and treatment
              </Link>
              .
            </p>
          </div>
        </div>

        <section className="mt-16">
          <SectionHeading eyebrow="Context" title="Why this is an estimate, not a diagnosis" />
          <div className="mt-6 max-w-[640px] mx-auto">
            <Prose>
              <p>
                This calculator assumes ovulation occurs roughly 14 days before the next period,
                which holds reasonably well for regular cycles but not for irregular ones. Cycle
                length can vary from month to month for many reasons, including stress, illness and
                hormonal conditions. If you are timing intercourse around this estimate and have not
                conceived within a reasonable period, or if your cycles are unpredictable, book a
                consultation rather than continuing to guess from the calendar.
              </p>
            </Prose>
          </div>
        </section>
      </div>

      <ClosingCta
        heading="Cycles that do not fit a calendar deserve a proper look"
        copy="If your periods are irregular or unpredictable, ovulation tracking by ultrasound gives a real answer."
        sourcePage={SOURCE_PAGE}
        whatsappMessage={DEFAULT_WHATSAPP_MESSAGE}
      />
    </>
  );
}
