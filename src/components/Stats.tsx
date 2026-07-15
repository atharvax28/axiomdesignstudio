"use client";

import { motion } from "motion/react";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "22", label: "Projects Delivered" },
  { value: "10+", label: "Locations Served Pan India" },
  { value: "250k", label: "Sq. Ft. Delivered" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Stats() {
  return (
    <section className="bg-ink-deep">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1360px] mx-auto grid grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className={`
              relative py-12 md:py-16 px-6 md:px-10
              ${i < stats.length - 1 ? "lg:border-r lg:border-white/10" : ""}
              ${i === 0 ? "border-b lg:border-b-0 border-white/10" : ""}
              ${i === 1 ? "border-b lg:border-b-0 border-white/10 lg:border-r" : ""}
              ${i === 2 ? "border-b lg:border-b-0 border-white/10" : ""}
            `}
          >
            <span className="block font-[family-name:var(--font-heading)] font-light text-[clamp(40px,5vw,64px)] leading-none text-white mb-3">
              {stat.value}
            </span>
            <span className="font-[family-name:var(--font-ui)] font-medium text-[11px] md:text-[12px] leading-[1.6] tracking-[0.2em] uppercase text-white/50">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
