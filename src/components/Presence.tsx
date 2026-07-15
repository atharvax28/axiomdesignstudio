"use client";

import { motion } from "motion/react";
import IndiaOperationsMap from "./IndiaOperationsMap";

export default function Presence() {
  return (
    <section className="bg-paper-2 py-[clamp(90px,11vw,150px)] relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-5 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-signal/20 bg-signal/5 mb-10">
              <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
              <span className="font-[family-name:var(--font-ui)] font-medium text-[12px] tracking-[0.14em] uppercase text-signal">
                Pan India Presence
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-[family-name:var(--font-heading)] font-light text-[clamp(40px,5vw,72px)] leading-[1.05] text-ink-deep mb-8 max-w-[15ch]">
              Bringing <span className="font-[family-name:var(--font-display)] italic text-signal">synergy.</span><br />
              Transforming lives.
            </h2>

            {/* Description */}
            <p className="text-[16px] text-muted leading-relaxed max-w-[40ch]">
              From the vibrant energy of metropolitan hubs to the emerging potential 
              of growing cities, our architectural footprint stretches across the nation, 
              delivering uncompromising luxury and precision everywhere we go.
            </p>
          </motion.div>

          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square lg:aspect-auto lg:h-[600px] bg-paper-3/50 rounded-2xl border border-hairline p-8 flex items-center justify-center"
          >
            <IndiaOperationsMap className="w-full h-full max-w-[500px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
