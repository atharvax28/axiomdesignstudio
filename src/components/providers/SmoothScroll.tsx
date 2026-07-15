"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Global smooth-scroll provider.
 *
 * Wraps the app in a Lenis-driven smooth scroll.
 * Respects `prefers-reduced-motion` by skipping Lenis entirely for those users.
 *
 * Scroll restoration: saves the Y position before any client-side navigation
 * (Next.js Link clicks use pushState) and restores it via Lenis when the user
 * presses Back/Forward, preventing Lenis from fighting the browser's native
 * scroll restoration and getting stuck at the bottom.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  // pathname -> saved Lenis scroll position
  const scrollMap = useRef<Map<string, number>>(new Map());
  // Set to true when browser fires popstate (back/forward)
  const isPopState = useRef(false);

  // ── 1. Track popstate so we know when to restore ─────────────────
  useEffect(() => {
    const mark = () => { isPopState.current = true; };
    window.addEventListener("popstate", mark);
    return () => window.removeEventListener("popstate", mark);
  }, []);

  // ── 2. Save scroll before Next.js link navigations ───────────────
  //    Next.js <Link> calls history.pushState, not a full reload.
  //    We intercept every anchor click (capture phase, so we run first)
  //    and record the current Lenis scroll for the departing pathname.
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
    
    const save = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      // Only internal client-side navigations
      if (href.startsWith("/") || href.startsWith("#")) {
        scrollMap.current.set(
          pathname,
          lenisRef.current?.scroll ?? window.scrollY
        );
      }
    };
    document.addEventListener("click", save, true);
    return () => document.removeEventListener("click", save, true);
  }, [pathname]);

  // ── 3. On pathname change: restore or reset scroll ────────────────
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (isPopState.current) {
      const saved = scrollMap.current.get(pathname) ?? 0;
      isPopState.current = false;
      // We need a slightly longer delay if images/fonts are shifting layout
      // so we use requestAnimationFrame in a timeout to ensure it runs after paint.
      const id = setTimeout(() => {
        requestAnimationFrame(() => {
          lenis.scrollTo(saved, { immediate: true });
        });
      }, 150);
      return () => clearTimeout(id);
    } else {
      // Normal forward navigation — go to top
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  // ── 4. Init Lenis once, off the critical path ─────────────────────
  //    Deferred to idle so the smooth-scroll setup + rAF loop don't compete
  //    with first paint / hydration. Smooth scroll engages a beat after the
  //    page is interactive; the initial paint is left untouched.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenisRef.current = lenis;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    // requestIdleCallback where available (not in older Safari), else a short
    // timeout fallback. `typeof` guard keeps this safe at runtime and typed.
    const useRIC = typeof window.requestIdleCallback === "function";
    const handle = useRIC
      ? window.requestIdleCallback(start, { timeout: 500 })
      : window.setTimeout(start, 200);

    return () => {
      cancelled = true;
      if (useRIC && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(handle);
      } else {
        clearTimeout(handle);
      }
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
