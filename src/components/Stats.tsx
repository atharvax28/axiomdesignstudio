"use client";

import { motion } from "framer-motion";
import { TextAnimate } from "@/components/ui/text-animate";
import { projects } from "@/data/projects";
import { yearsInPractice } from "@/data/studio";

// --- Real figures, derived from src/data/projects.ts (not invented) ---------
const projectCount = projects.length; // 22 delivered projects

const locationCount = new Set(projects.map((p) => p.location)).size;

const totalSqFt = projects.reduce(
  (sum, p) => sum + Number(p.size?.replace(/[^\d]/g, "") ?? 0),
  0,
);
const totalSqFtLabel = "250k";

const stats = [
  { value: `${yearsInPractice()}+`, label: "Years Experience" },
  { value: `${projectCount}`, label: "Projects Delivered" },
  { value: "10+", label: "locations served pan india" },
  { value: totalSqFtLabel, label: "Sq. Ft. Delivered" },
];

// Projects-by-typology, counted from the `category` field, largest first.
const typologyOrder = ["Corporate", "Residential", "Retail", "Hospitality"];
const typologyData = typologyOrder
  .map((name) => ({
    name,
    count: projects.filter((p) => p.category === name).length,
  }))
  .filter((d) => d.count > 0)
  .sort((a, b) => b.count - a.count);

const maxCount = Math.max(...typologyData.map((d) => d.count));

const SIGNAL = "#C00000";
const TRACK = "#F4E9D8";
const INK = "#2C2C2C";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Stats() {
  return (
    <section className="bg-paper-2 border-y border-hairline">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1360px] mx-auto px-5 md:px-14 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center"
      >
        {/* KPIs — primary */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:gap-x-12">
          {stats.map((stat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <TextAnimate
                animation="slideUp"
                by="character"
                className="block font-[family-name:var(--font-heading)] font-light text-[clamp(38px,4.4vw,60px)] leading-none text-ink-deep mb-3"
              >
                {stat.value}
              </TextAnimate>
              <span className="font-[family-name:var(--font-ui)] font-semibold text-[11px] leading-[1.5] tracking-[0.22em] uppercase text-muted">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Custom thin progress bars — secondary */}
        <motion.div variants={itemVariants} className="w-full pl-0 lg:pl-10">
          <p className="u-eyebrow font-[family-name:var(--font-ui)] text-stone mb-8">
            Projects by Typology
          </p>
          <div className="flex flex-col gap-6">
            {typologyData.map((item, index) => (
              <div key={item.name} className="w-full">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-[family-name:var(--font-ui)] text-[13px] text-ink">
                    {item.name}
                  </span>
                  <span className="font-[family-name:var(--font-ui)] text-[13px] font-medium text-stone">
                    {item.count}
                  </span>
                </div>
                <div 
                  className="h-[3px] w-full rounded-full overflow-hidden"
                  style={{ backgroundColor: TRACK }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(item.count / maxCount) * 100}%` }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 1.2, 
                      ease: [0.22, 1, 0.36, 1], 
                      delay: 0.1 + index * 0.1 
                    }}
                    className="h-full"
                    style={{ backgroundColor: SIGNAL }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
