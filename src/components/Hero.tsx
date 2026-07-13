"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <header
      ref={containerRef}
      className="relative min-h-[100svh] flex items-end overflow-hidden bg-paper"
    >
      {/* React hoists these into <head>, so the LCP image starts downloading
          with the document rather than after the client bundle parses. `media`
          keeps each device to the one crop it will actually paint. */}
      <link
        rel="preload"
        as="image"
        imageSrcSet="/hero/main-16x9-1280.webp 1280w, /hero/main-16x9-1920.webp 1920w, /hero/main-16x9-2560.webp 2560w"
        imageSizes="100vw"
        type="image/webp"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        imageSrcSet="/hero/main-9x16-750.webp 750w, /hero/main-9x16-1170.webp 1170w"
        imageSizes="100vw"
        type="image/webp"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <motion.div style={{ y, scale }} className="absolute inset-0 origin-bottom">
        {/* 16:9 would be squeezed to a narrow centre slice by object-cover on a
            portrait phone, so hand small screens a 9:16 crop of the same photo.
            This is the LCP element: it stays a plain <picture> rather than
            next/image because art direction across two different crops needs
            <source media>, and the files below are already sized and encoded.
            WebP first, JPEG for anything that cannot take it. */}
        <picture className="block w-full h-full">
          <source
            media="(max-width: 767px)"
            type="image/webp"
            srcSet="/hero/main-9x16-750.webp 750w, /hero/main-9x16-1170.webp 1170w"
            sizes="100vw"
          />
          <source
            media="(max-width: 767px)"
            srcSet="/hero/main-9x16-750.jpg 750w, /hero/main-9x16-1170.jpg 1170w"
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet="/hero/main-16x9-1280.webp 1280w, /hero/main-16x9-1920.webp 1920w, /hero/main-16x9-2560.webp 2560w"
            sizes="100vw"
          />
          <img
            src="/hero/main-16x9-1920.jpg"
            srcSet="/hero/main-16x9-1280.jpg 1280w, /hero/main-16x9-1920.jpg 1920w, /hero/main-16x9-2560.jpg 2560w"
            sizes="100vw"
            alt="A residential living room designed and built by Axiom Design Studio"
            width={2560}
            height={1440}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </picture>
        {/* Legibility scrim: darkest toward the bottom, where the headline sits,
            so the light type clears 4.5:1 over the photo. Uses ink-deep rather than
            black so it matches the case-study hero. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/55 to-ink-deep/25 md:from-ink-deep/80 md:via-ink-deep/45 md:to-ink-deep/15" />
        {/* The hero photo is light at the top, so the transparent navbar's light
            links need their own scrim to stay legible before the bar goes solid. */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-ink-deep/60 to-transparent" />
        {/* Page melt: the bottom edge dissolves into the cream page below. */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-paper" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-5 md:px-14 pb-[72px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="u-eyebrow font-[family-name:var(--font-ui)] text-paper/80 mb-7 drop-shadow-[0_1px_8px_rgba(15,23,42,0.5)]"
        >
          Interior Design &amp; Build — Mumbai
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-heading)] font-light text-[clamp(52px,9.5vw,150px)] leading-[1.08] tracking-[0.01em] text-paper drop-shadow-[0_2px_16px_rgba(15,23,42,0.55)]"
        >
          Space{" "}
          <span className="font-[family-name:var(--font-display)] italic font-normal text-signal">
            that
          </span>{" "}
          speaks.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex justify-between items-end gap-6 mt-10 flex-wrap border-t border-white/20 pt-6"
        >
          <p className="max-w-[46ch] text-[15px] leading-relaxed text-paper/85 drop-shadow-[0_1px_8px_rgba(15,23,42,0.5)]">
            A Mumbai studio that designs and builds premium residential and
            commercial interiors — with you from first concept to final handover.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center font-[family-name:var(--font-ui)] font-medium text-[14px] leading-none tracking-[0.14em] uppercase px-8 py-4 rounded-sm cursor-pointer transition-colors duration-300 bg-signal text-paper hover:bg-signal-deep w-full md:w-auto"
          >
            Work With Us
          </Link>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute right-5 md:right-14 bottom-[88px] z-10 font-[family-name:var(--font-ui)] font-semibold text-[11px] leading-none tracking-[0.3em] uppercase text-paper/60 [writing-mode:vertical-rl]"
      >
        Scroll
      </motion.div>
    </header>
  );
}
