import { useEffect, useRef } from "react";
import { inView, animate, stagger } from "motion/react";

export interface RevealOptions {
  start?: string; // Kept for compatibility, though motion inView uses margin/amount
  y?: number;
  duration?: number;
  stagger?: number;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const { y = 24, duration = 0.7, stagger: staggerDuration = 0.08 } = options;
  const container = useRef<T>(null);

  useEffect(() => {
    const root = container.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    if (prefersReducedMotion()) {
      targets.forEach(t => {
        t.style.opacity = "1";
        t.style.transform = "none";
      });
      return;
    }

    // Set initial state
    targets.forEach(t => {
      t.style.opacity = "0";
      t.style.transform = `translateY(${y}px)`;
    });

    // Group elements by parent
    const groups = new Map<HTMLElement | null, HTMLElement[]>();
    targets.forEach(el => {
      const parent = el.parentElement;
      const group = groups.get(parent);
      if (group) group.push(el);
      else groups.set(parent, [el]);
    });

    // Animate each group when it comes into view
    const cleanups: VoidFunction[] = [];
    groups.forEach((els) => {
      const cleanup = inView(
        els[0],
        () => {
          animate(
            els,
            { opacity: [0, 1], y: [y, 0] },
            {
              duration,
              ease: "easeOut",
              delay: els.length > 1 ? stagger(staggerDuration) : 0,
            }
          );
        },
        { amount: "some" }
      );
      cleanups.push(cleanup);
    });

    return () => cleanups.forEach(c => c());
  }, [y, duration, staggerDuration]);

  return container;
}
