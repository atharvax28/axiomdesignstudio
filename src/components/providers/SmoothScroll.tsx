"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Where each route was left, for the lifetime of the tab. */
const KEY = (path: string) => `axiom:scroll:${path}`;

/**
 * Global smooth-scroll provider.
 *
 * Wraps the app in a Lenis-driven smooth scroll and keeps GSAP's
 * ScrollTrigger in sync by driving Lenis from the GSAP ticker. Respects
 * `prefers-reduced-motion` by skipping Lenis entirely for those users.
 *
 * It also owns scroll restoration. The browser's own restoration cannot be
 * trusted here: it fires before the case-study images have laid out, so the
 * position it saved against a tall page got clamped to whatever the shorter,
 * not-yet-painted page could offer — which is how going Back from a project
 * dumped the reader at the footer. We turn the browser's restoration off and
 * put the reader back ourselves, once the layout is real.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  /** True when the pending navigation came from Back/Forward rather than a link. */
  const isPopRef = useRef(false);

  useEffect(() => {
    // Accessibility: never hijack scrolling for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Guard against React strict/dev double-effect: destroy any prior instance.
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      // Lenis owns anchor scrolling now that `scroll-behavior: smooth` is gone
      // from <html> — two smooth-scroll engines on one document fight.
      anchors: true,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger updated on every Lenis scroll.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker so both share one RAF loop.
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // The route we are currently on, readable from listeners that outlive a render.
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  // Bank the current position, and take scroll restoration off the browser.
  //
  // The position is captured at the moment a navigation is *requested* — the
  // link click, or the Back press — and never from a scroll listener. The App
  // Router scrolls the window to the top as part of committing a navigation,
  // while the old route is still mounted, so a scroll listener would faithfully
  // record that 0 over the position we actually wanted to keep.
  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";

    const save = () => {
      sessionStorage.setItem(KEY(pathnameRef.current), String(window.scrollY));
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.("a");
      if (link && link.getAttribute("href")?.startsWith("/")) save();
    };

    const onPopState = () => {
      // Runs before the router swaps the route, so scrollY is still the outgoing
      // page's — bank it, then flag the arrival as a restore.
      save();
      isPopRef.current = true;
    };

    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("popstate", onPopState);
    window.addEventListener("pagehide", save);

    return () => {
      history.scrollRestoration = previous;
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("pagehide", save);
    };
  }, []);

  // On arrival: a Back/Forward returns you to where you were, a fresh link
  // starts you at the top.
  useEffect(() => {
    const restoring = isPopRef.current;
    isPopRef.current = false;

    const target = restoring
      ? Number(sessionStorage.getItem(KEY(pathname)) ?? 0)
      : 0;

    const apply = () => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { immediate: true, force: true });
      } else {
        // Reduced-motion users have no Lenis instance.
        window.scrollTo(0, target);
      }
    };

    // Both directions have to be asserted, and asserted repeatedly.
    //
    // Lenis holds its own scroll position and re-applies it every frame, so it
    // carries the previous route's offset onto the new one — the router's
    // scroll-to-top gets overwritten and you arrive mid-page. Equally, on a
    // Back the router's scroll-to-top lands *after* our restore. So we hold the
    // target for a few hundred ms while the route settles (case-study images are
    // still decoding, which moves the page height under us), and give it up the
    // moment the reader scrolls for themselves.
    let done = false;
    const deadline = performance.now() + 600;

    const release = () => {
      done = true;
    };
    const opts = { passive: true, once: true } as const;
    window.addEventListener("wheel", release, opts);
    window.addEventListener("touchstart", release, opts);
    window.addEventListener("keydown", release, opts);

    let frame = requestAnimationFrame(function hold(now) {
      if (done) return;
      if (Math.abs(window.scrollY - target) > 2) apply();
      if (now < deadline) {
        frame = requestAnimationFrame(hold);
      } else {
        ScrollTrigger.refresh();
      }
    });

    return () => {
      done = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
    };
  }, [pathname]);

  return <>{children}</>;
}
