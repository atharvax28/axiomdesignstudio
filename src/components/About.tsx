"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="studio" className="bg-paper py-[clamp(90px,11vw,150px)]">
      <div className="max-w-[1360px] mx-auto px-5 md:px-14">
        {/* Statement */}
        <div className="text-center mb-20 md:mb-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mb-7"
          >
            Our Philosophy
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-heading)] font-light text-[clamp(30px,4.6vw,62px)] leading-[1.08] text-ink-deep max-w-[26ch] mx-auto"
          >
            We believe that{" "}
            <span className="font-[family-name:var(--font-display)] italic text-signal">
              true luxury
            </span>{" "}
            lies in the details{" "}
            <span className="inline-flex items-center justify-center mx-1 align-middle text-signal">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="inline-block text-[0.6em]"
              >
                ✦
              </motion.span>
            </span>{" "}
            the seamless integration of design, materiality, and flawless execution.
          </motion.h2>
        </div>

        {/* Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(40px,6vw,96px)] items-center mt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/5] rounded-md overflow-hidden relative"
          >
            <Image
              src="/hero/main-9x16-1170.jpg"
              alt="Studio Detail"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-[family-name:var(--font-heading)] font-light text-[clamp(34px,4.8vw,68px)] leading-[1.08] text-ink-deep max-w-[22ch] mb-10">
              Crafting{" "}
              <span className="font-[family-name:var(--font-display)] italic text-ink-deep">
                enduring
              </span>{" "}
              spaces.
            </h3>
            <p className="text-[15.5px] text-muted mb-4 leading-relaxed">
              Axiom Design Studio was founded with a singular vision: to bridge the gap
              between visionary architectural concepts and uncompromising built reality.
            </p>
            <p className="text-[15.5px] text-muted mb-8 leading-relaxed">
              We design and build in-house — our master craftsmen, project managers, and
              material experts work in unison to deliver environments that stand the test
              of time.
            </p>
            <a
              href="#services"
              className="inline-flex items-center justify-center font-[family-name:var(--font-ui)] font-medium text-[14px] leading-none tracking-[0.14em] uppercase px-8 py-4 rounded-sm cursor-pointer transition-all duration-300 border border-hairline text-ink hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal mt-2"
            >
              Why Axiom
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
