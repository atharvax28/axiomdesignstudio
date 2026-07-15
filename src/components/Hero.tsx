"use client";

import { useRef } from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const common = {
    alt: "A residential living room designed and built by Axiom Design Studio",
    fill: true,
    priority: true,
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: "/hero/main-16x9.jpg",
  });

  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({
    ...common,
    src: "/hero/main-9x16.jpg",
  });

  return (
    <header
      ref={containerRef}
      className="relative min-h-[100svh] flex items-end overflow-hidden bg-paper"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 origin-bottom">
        {/* 16:9 would be squeezed to a narrow centre slice by object-cover on a
            portrait phone, so hand small screens a 9:16 crop of the same photo. */}
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
          <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
          <img
            {...rest}
            alt={common.alt}
            className="object-cover w-full h-full absolute inset-0"
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
        <div
          className="u-eyebrow font-[family-name:var(--font-ui)] text-paper/80 mb-7 drop-shadow-[0_1px_8px_rgba(15,23,42,0.5)] animate-fade-in-up animate-delay-200"
        >
          Interior Design &amp; Build — Mumbai
        </div>

        <h1
          className="font-[family-name:var(--font-heading)] text-[clamp(38px,9.5vw,130px)] leading-[0.95] font-light tracking-tight text-paper drop-shadow-[0_2px_16px_rgba(15,23,42,0.55)] max-w-[12ch] animate-fade-in-up"
        >
          Space{" "}
          <span className="font-[family-name:var(--font-display)] italic font-normal text-signal">
            that
          </span>
          <br />
          speaks.
        </h1>

        <div
          className="flex justify-between items-end gap-6 mt-10 flex-wrap border-t border-white/20 pt-6 animate-fade-in-up animate-delay-200"
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
        </div>
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
