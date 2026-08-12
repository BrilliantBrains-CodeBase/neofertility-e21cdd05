import { useEffect, useMemo, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import type { CarouselApi } from "@/components/ui/carousel";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Autoplay wiring shared by every embla carousel on the site.
 *
 * Two things here are load-bearing and were both learned the hard way:
 *
 * - `playOnInit: false` plus driving playback from an effect keyed on the api.
 *   Calling play()/stop() before embla has initialised the plugin throws inside it
 *   ("cannot read internalEngine of undefined") and takes the whole page down.
 * - The plugin array is memoised to a stable identity, or embla re-initialises its
 *   plugins on every render.
 *
 * `stopOnMouseEnter` is deliberately not used: it resumes on mouse-leave, so anything
 * that steals the pointer (an opening dialog) restarts autoplay underneath itself.
 * Hover is tracked here instead, so a single `paused` rule decides whether it runs.
 *
 * Pass `paused` for section-specific reasons to hold still (an open dialog, say).
 * Autoplay never runs under reduced motion — WCAG 2.2.2 — and stops for good once
 * the visitor drags or uses the arrows.
 */
export function useCarouselAutoplay({
  delay = 4000,
  paused: pausedByCaller = false,
}: { delay?: number; paused?: boolean } = {}) {
  const [api, setApi] = useState<CarouselApi>();
  const [interacting, setInteracting] = useState(false);
  const reduced = usePrefersReducedMotion();

  const autoplay = useRef(Autoplay({ delay, playOnInit: false, stopOnInteraction: true }));
  const plugins = useMemo(() => [autoplay.current], []);

  const paused = reduced || interacting || pausedByCaller;

  useEffect(() => {
    const player = api?.plugins()?.autoplay;
    if (!player) return;
    if (paused) player.stop();
    else player.play();
  }, [api, paused]);

  /* Spread onto <Carousel>. Pointer and keyboard both hold it, so a visitor reading a
     card is never scrolled away from it mid-sentence. */
  const pauseProps = {
    onMouseEnter: () => setInteracting(true),
    onMouseLeave: () => setInteracting(false),
    onFocusCapture: () => setInteracting(true),
    onBlurCapture: () => setInteracting(false),
  };

  return { plugins, setApi, pauseProps };
}
