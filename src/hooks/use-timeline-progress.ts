import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const DURATION_MS = 2000;

/**
 * Drives the connector fill the page timelines share: 0 → 1 in one ease-out pass,
 * started the first time the element is scrolled into view, and never reversed.
 *
 * `progress` starts at 1 so the server renders a finished timeline; it is reset to 0
 * on mount, while the section is still below the fold. Starting at 0 would leave
 * crawlers and any no-JS visitor looking at a permanently greyed-out timeline.
 *
 * Under prefers-reduced-motion it stays at 1 and no observer is ever created, rather
 * than relying on the global transition kill-switch in styles.css — the fill is driven
 * by an inline width/height, which that switch cannot reach.
 */
export function useTimelineProgress(durationMs: number = DURATION_MS) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(1);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!reduced) setProgress(0);
  }, [reduced]);

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          setProgress(1 - Math.pow(1 - t, 3)); // ease-out cubic
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduced, durationMs]);

  return { ref, progress };
}
