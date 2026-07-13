import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

// Register the ScrollTrigger plugin exactly once. ES modules are cached, so
// this runs a single time no matter how many files import from here.
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger };

/** Options for {@link useGsapReveal}. */
export interface GsapRevealOptions {
  /** ScrollTrigger start position. Defaults to `"top 85%"`. */
  start?: string;
  /** Vertical travel distance in px. Defaults to `24`. */
  y?: number;
  /** Tween duration in seconds. Defaults to `0.7`. */
  duration?: number;
  /** Per-element stagger when siblings share a parent. Defaults to `0.08`. */
  stagger?: number;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll-triggered reveal for any descendant marked with `data-reveal`.
 *
 * Each `[data-reveal]` element fades and slides up into view once, when it
 * crosses the viewport threshold. Elements sharing a parent are staggered.
 * Fully reduced-motion safe: if the user prefers reduced motion, elements are
 * simply shown with no animation.
 *
 * @example
 * function Section() {
 *   const ref = useGsapReveal();
 *   return (
 *     <section ref={ref}>
 *       <h2 data-reveal>Title</h2>
 *       <p data-reveal>Body copy…</p>
 *     </section>
 *   );
 * }
 */
export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  options: GsapRevealOptions = {}
) {
  const { start = "top 85%", y = 24, duration = 0.7, stagger = 0.08 } = options;
  const container = useRef<T>(null);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;

      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      if (targets.length === 0) return;

      // Reduced motion: reveal immediately, no animation.
      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
        return;
      }

      // Anything already on screen when the script runs is left alone.
      //
      // `gsap.from` starts these at opacity 0, which is invisible ink until GSAP
      // has loaded and hydrated. For content below the fold that costs nothing —
      // the reader has not reached it. For content in the first viewport it is
      // the difference between painting with the document and painting after the
      // JavaScript does: it made a headline the page's largest contentful paint
      // at nearly six seconds on a throttled phone. Those elements are already
      // visible in the server-rendered HTML; the reveal simply skips them.
      const offscreen = targets.filter((el) => {
        const { top } = el.getBoundingClientRect();
        return top >= window.innerHeight;
      });
      if (offscreen.length === 0) return;

      // Group elements by their parent so siblings stagger together.
      const groups = new Map<HTMLElement | null, HTMLElement[]>();
      offscreen.forEach((el) => {
        const parent = el.parentElement;
        const group = groups.get(parent);
        if (group) group.push(el);
        else groups.set(parent, [el]);
      });

      groups.forEach((els) => {
        gsap.from(els, {
          opacity: 0,
          y,
          duration,
          ease: "power2.out",
          stagger: els.length > 1 ? stagger : 0,
          scrollTrigger: {
            trigger: els[0],
            start,
            once: true,
          },
        });
      });
    },
    { scope: container }
  );

  return container;
}
