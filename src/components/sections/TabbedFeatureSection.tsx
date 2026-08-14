import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckList } from "@/components/sections/blocks";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * TabbedFeatureSection — a content-agnostic tabbed feature block.
 *
 * PROPS
 *   tabs             TabbedFeatureTab[]  required. Any length; 0 renders the empty state.
 *   eyebrow          string              optional kicker above the heading.
 *   sectionTitle     ReactNode           optional heading (ReactNode so callers can pass
 *                                        split/italic markup).
 *   sectionSubtitle  string              optional line under the heading.
 *   defaultActiveId  string              optional; falls back to the first tab.
 *   mediaAspect      string              optional CSS aspect-ratio for the media frame,
 *                                        default "4/3". Any image works — object-cover.
 *   emptyLabel       string              optional empty-state copy.
 *   className        string              optional extra classes on the <section>.
 *
 * Each tab is { id, label, icon?, panel: { image?, title?, description?, bullets?, cta? } }.
 * Every panel field is optional and its block is skipped entirely when absent, so a tab
 * carrying only a title renders without empty gaps.
 *
 * BREAKPOINTS  (the 1200 split is the brief's, not Tailwind's lg=1024)
 *   >=1200  two columns, text first then media; largest type and padding.
 *    768..1199  one column, MEDIA FIRST then text.
 *    480..767  one column; smaller tab labels and icons.
 *    <480    tabs become a 2-per-row grid (chosen over a scroll strip so every tab
 *            stays visible); panel stays one column.
 *   Type is fluid via clamp() and the container is capped and centred at very wide sizes.
 *
 * THEMING — override these custom properties on the section to reskin without touching
 * markup: --tfs-section-bg, --tfs-surface, --tfs-accent, --tfs-accent-contrast,
 * --tfs-heading, --tfs-body, --tfs-radius, --tfs-divider.
 *
 * EXAMPLE
 *   <TabbedFeatureSection
 *     sectionTitle="How we help"
 *     tabs={[{ id: "a", label: "First", icon: <Star />, panel: {
 *       image: { src, alt: "…" }, title: "…", description: "…",
 *       bullets: ["…"], cta: { label: "Learn more", href: "/x/" } } }]}
 *   />
 */

export type TabbedFeatureTab = {
  id: string;
  label: string;
  icon?: ReactNode;
  panel: {
    image?: { src: string; alt: string };
    title?: string;
    description?: string;
    bullets?: string[];
    cta?: { label: string; href: string };
  };
};

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function TabbedFeatureSection({
  tabs,
  eyebrow,
  sectionTitle,
  sectionSubtitle,
  defaultActiveId,
  mediaAspect = "4/3",
  emptyLabel = "Nothing to show here yet.",
  className,
}: {
  tabs: TabbedFeatureTab[];
  eyebrow?: string;
  sectionTitle?: ReactNode;
  sectionSubtitle?: string;
  defaultActiveId?: string;
  mediaAspect?: string;
  emptyLabel?: string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelWrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(defaultActiveId ?? tabs[0]?.id ?? "");
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  /* Radix writes its own `dir` attribute on the Tabs root and defaults it to "ltr" when
     no DirectionProvider is present. That attribute shadows the page direction for the
     whole subtree: under <html dir="rtl"> the section resolved rtl but the tablist, the
     panel grid and the `rtl:` arrow variant all stayed ltr. Reading the direction the
     section actually inherits and passing it back in keeps Radix from overriding it —
     and keeps arrow-key order correct, since Radix mirrors Left/Right from `dir`. */
  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const read = () => setDir(getComputedStyle(el).direction === "rtl" ? "rtl" : "ltr");
    read();
    if (typeof MutationObserver === "undefined") return;
    const observer = new MutationObserver(read);
    const opts = { attributes: true, attributeFilter: ["dir", "style"] };
    observer.observe(document.documentElement, opts);
    observer.observe(document.body, opts);
    return () => observer.disconnect();
  }, []);

  /* A divider sits after every trigger except the last one *in its row*. CSS can express
     "not the last child" but has no notion of where a flex row wrapped, so the row-enders
     are found geometrically and flagged with a data attribute. Recomputed on resize,
     since where the wrap falls depends entirely on the available width.

     The comparison is deliberately fuzzy. Two triggers sharing a row need not share a
     top: with a 12-tab set the wrapped labels made some buttons 48px and their neighbours
     44px, and a strict `next.top > top` test then read the taller one as ending the row
     over a 2px difference, suppressing a divider that should have shown. Anything landing
     within half a button height is treated as the same row. */
  const markRowEnds = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const triggers = [...list.querySelectorAll<HTMLElement>("[role='tab']")];
    triggers.forEach((el, i) => {
      const next = triggers[i + 1];
      if (!next) {
        el.dataset["rowEnd"] = "true";
        return;
      }
      const rect = el.getBoundingClientRect();
      const endsRow = next.getBoundingClientRect().top - rect.top > rect.height / 2;
      el.dataset["rowEnd"] = String(endsRow);
    });
  }, []);

  useIsomorphicLayoutEffect(() => {
    markRowEnds();
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(markRowEnds);
    observer.observe(list);
    return () => observer.disconnect();
  }, [markRowEnds, tabs.length]);

  /* Radix unmounts the inactive panel, so a shorter panel would collapse the container
     instantly and jerk the page under the reader. The wrapper is given the measured
     height of whichever panel is mounted and transitions between the two. */
  useIsomorphicLayoutEffect(() => {
    const wrap = panelWrapRef.current;
    if (!wrap || typeof ResizeObserver === "undefined") return;
    /* The VISIBLE panel, not firstElementChild: Radix keeps every panel in the DOM and
       marks the inactive ones `hidden`, so the first child measures 0 whenever any tab
       but the first is active — which collapsed the section to nothing. */
    const visible = () =>
      wrap.querySelector<HTMLElement>("[role='tabpanel']:not([hidden])") ?? undefined;
    const measure = () => {
      const panel = visible();
      if (panel) setHeight(panel.offsetHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    const panel = visible();
    if (panel) observer.observe(panel);
    return () => observer.disconnect();
  }, [active, tabs]);

  const sectionClass = cn(
    "[--tfs-section-bg:var(--color-pink-25)] [--tfs-surface:var(--color-paper)]",
    "[--tfs-accent:var(--color-pink-600)] [--tfs-accent-contrast:var(--color-paper)]",
    "[--tfs-heading:var(--color-plum-900)] [--tfs-body:var(--color-ink-muted)]",
    "[--tfs-divider:var(--color-line)] [--tfs-radius:1.75rem]",
    /* Matches the section-y rhythm (3rem / 4.5rem at 1024) rather than running its own
       larger scale — two sections' padding stack, so the extra read as dead space. */
    "bg-[var(--tfs-section-bg)] py-[clamp(3rem,5vw,4.5rem)]",
    className,
  );

  if (tabs.length === 0) {
    return (
      <section ref={sectionRef} className={sectionClass}>
        <div className="container-page">
          <p className="text-center text-[var(--tfs-body)]">{emptyLabel}</p>
        </div>
      </section>
    );
  }

  const heading = (eyebrow || sectionTitle || sectionSubtitle) && (
    <div className="text-center">
      {/* The shared `eyebrow` utility rather than a local colour: it resolves to pink-700
          because pink-600 clears 4.5:1 on white but only reaches 4.25 on the pink-25
          band this section defaults to. */}
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      {sectionTitle && (
        <h2 className="text-[clamp(1.75rem,3.4vw,2.1875rem)] text-[var(--tfs-heading)]">
          {sectionTitle}
        </h2>
      )}
      {sectionSubtitle && (
        <p className="mx-auto mt-3 max-w-[62ch] text-[var(--tfs-body)]">{sectionSubtitle}</p>
      )}
    </div>
  );

  return (
    <section ref={sectionRef} className={sectionClass}>
      <div className="container-page">
        {heading}

        <Tabs
          value={active}
          onValueChange={setActive}
          dir={dir}
          /* Manual: arrows move focus, Enter/Space commits. Radix otherwise activates on
             focus, which fires a panel swap for every arrow press. */
          activationMode="manual"
          className={cn(heading && "mt-8")}
        >
          {/* White card strip holding the triggers, centred and wrapping. */}
          <TabsList
            ref={listRef}
            className={cn(
              /* items-stretch overrides the shadcn base's items-center: centred grid
                 items let a two-line label sit 2px off its 44px neighbour, which looked
                 ragged and made the row grouping above harder than it needed to be. */
              "mx-auto grid h-auto w-full max-w-full grid-cols-2 items-stretch gap-y-1 rounded-[var(--tfs-radius)]",
              "border border-[var(--tfs-divider)] bg-[var(--tfs-surface)] p-2",
              // From 480 up the triggers sit on one wrapping, centred row
              "min-[480px]:flex min-[480px]:w-fit min-[480px]:flex-wrap min-[480px]:justify-center",
            )}
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "group relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full",
                  /* whitespace-normal overrides the shadcn base's whitespace-nowrap, which
                     otherwise pushes long labels past the button edge in the 2-per-row
                     grid at 320px. Labels wrap instead of overflowing or truncating. */
                  "px-3 text-center whitespace-normal text-[clamp(0.8125rem,1.1vw,0.9375rem)] font-medium",
                  "text-[var(--tfs-heading)] transition-colors duration-300 ease-out",
                  "min-[480px]:px-5",
                  "data-[state=active]:bg-[var(--tfs-accent)] data-[state=active]:text-[var(--tfs-accent-contrast)]",
                  // Hover/focus previews the fill
                  "hover:bg-[var(--tfs-accent)]/10 focus-visible:bg-[var(--tfs-accent)]/10",
                  "data-[state=active]:hover:bg-[var(--tfs-accent)]",
                  /* Divider drawn as a pseudo-element in the gap, suppressed on the last
                     item of each wrapped row (see markRowEnds) and when active.
                     `inset-y-2 end-0`, not `inset-block-2 inset-inline-end-0`: the latter
                     two are not Tailwind utilities, so they emitted nothing and the
                     divider sat at height 0 — present in the DOM, never painted.
                     `inset-e` is logical, so the divider still flips under RTL. */
                  "after:pointer-events-none after:absolute after:inset-y-2 after:inset-e-0",
                  "after:w-px after:bg-[var(--tfs-divider)] after:opacity-100 after:transition-opacity",
                  "data-[row-end=true]:after:opacity-0 data-[state=active]:after:opacity-0",
                )}
              >
                {tab.icon && (
                  <span aria-hidden className="grid shrink-0 place-items-center [&_svg]:size-4">
                    {tab.icon}
                  </span>
                )}
                <span className="min-w-0">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div
            ref={panelWrapRef}
            style={reduced ? undefined : { height }}
            className={cn("mt-10 overflow-hidden", !reduced && "transition-[height] duration-500")}
          >
            {tabs.map((tab) => (
              <TabsContent
                key={tab.id}
                value={tab.id}
                tabIndex={0}
                className={cn(
                  "mt-0 rounded-[var(--tfs-radius)] focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[var(--tfs-accent)] focus-visible:ring-offset-2",
                  !reduced &&
                    "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300",
                )}
              >
                <Panel panel={tab.panel} mediaAspect={mediaAspect} />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}

/**
 * Media first below lg, text first from lg up. `order` handles the swap so the DOM keeps
 * text before media — the reading and tab order stay sensible at every width.
 */
function Panel({ panel, mediaAspect }: { panel: TabbedFeatureTab["panel"]; mediaAspect: string }) {
  const { image, title, description, bullets, cta } = panel;
  const hasText = title || description || (bullets && bullets.length > 0) || cta;

  return (
    <div
      className={cn(
        "grid items-center gap-[clamp(1.5rem,3vw,3rem)]",
        hasText && image && "min-[1200px]:grid-cols-2",
      )}
    >
      {hasText && (
        <div className="order-2 min-[1200px]:order-none">
          {title && (
            <h3 className="text-[clamp(1.25rem,2.2vw,1.75rem)] leading-tight text-[var(--tfs-heading)]">
              {title}
            </h3>
          )}
          {description && <p className="mt-4 max-w-[60ch] text-[var(--tfs-body)]">{description}</p>}
          {bullets && bullets.length > 0 && (
            <div className="mt-6">
              <CheckList items={bullets} />
            </div>
          )}
          {cta && (
            <Link
              to={cta.href}
              className={cn(
                "mt-8 inline-flex min-h-12 items-center gap-2 rounded-full px-7",
                "bg-[var(--tfs-accent)] text-[var(--tfs-accent-contrast)]",
                "transition-transform duration-200 ease-out hover:-translate-y-0.5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tfs-accent)] focus-visible:ring-offset-2",
              )}
            >
              {cta.label}
              {/* Flipped in RTL so it always points "forward" */}
              <ArrowRight aria-hidden className="size-4 rtl:rotate-180" />
            </Link>
          )}
        </div>
      )}

      {image && (
        <div
          style={{ aspectRatio: mediaAspect }}
          className="order-1 w-full overflow-hidden rounded-[var(--tfs-radius)] bg-[var(--tfs-surface)] min-[1200px]:order-none"
        >
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
