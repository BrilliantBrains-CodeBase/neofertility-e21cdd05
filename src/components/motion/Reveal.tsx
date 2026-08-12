import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/* useLayoutEffect warns when React renders on the server; the measurement below only
   ever needs to run in the browser, so fall back to useEffect there. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Fades and lifts its children into place the first time they are scrolled into view.
 *
 * Three deliberate choices:
 *
 * - It renders *visible* and only hides itself once mounted, so the server HTML, a
 *   crawler, and anyone whose JS fails all see the content. Building it the other way
 *   round means one script error hides the whole page.
 * - The hide decision happens in a layout effect, before paint, and only for elements
 *   still below the fold. Anything already on screen is left alone, so nothing that
 *   was visible on load ever flickers.
 * - Only `opacity` and `transform` are animated, so this never triggers layout and
 *   cannot contribute to CLS.
 *
 * Under prefers-reduced-motion it does nothing at all — it never enters the hidden
 * state, rather than relying on the global transition kill-switch in styles.css.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  /** Stagger offset in ms. Keep to 30–50ms steps within a group. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(true);

  useIsomorphicLayoutEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    /* Already on screen (or nearly): leave it visible. Only what the visitor has yet
       to scroll to gets the entrance. */
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setShown(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out",
        shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
