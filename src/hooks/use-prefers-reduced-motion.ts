import { useEffect, useState } from "react";

/**
 * Tracks the `prefers-reduced-motion` media query, starting at `false` so the server
 * and the first client render agree. Anything that moves on its own — autoplay,
 * count-ups, scroll-driven fills — should stand down when this returns true.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduced;
}
