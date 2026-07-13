"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextAnimate } from "@/components/ui/text-animate";

export default function FullBleedBand() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[78vh] min-h-[520px] overflow-hidden bg-ink-deep"
    >
      {/* Parallax materiality image */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558211583-d26f610c1eb1?q=80&w=2000&auto=format&fit=crop"
          alt="Materiality"
          className="w-full h-[130%] object-cover object-center opacity-45"
        />
      </motion.div>

      {/* Dark wash keeps this a single dramatic break and holds the copy legible */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink-deep via-ink-deep/75 to-ink-deep/45" />

      <div className="relative z-10 h-full max-w-[1360px] mx-auto px-5 md:px-14 flex flex-col justify-end pb-[clamp(48px,7vw,88px)]">
        <p className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mb-6">
          Obsessive Curation
        </p>

        <TextAnimate
          animation="blurInUp"
          by="word"
          className="font-[family-name:var(--font-heading)] font-light text-[clamp(34px,5vw,72px)] leading-[1.04] text-paper max-w-[16ch]"
        >
          The material palette is where luxury begins.
        </TextAnimate>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-9"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center font-[family-name:var(--font-ui)] font-medium text-[14px] leading-none tracking-[0.14em] uppercase px-8 py-4 rounded-sm bg-signal text-paper transition-colors duration-300 hover:bg-signal-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            Start a Project
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
