"use client";

import { useReveal } from "@/lib/reveal";

// Re-expressed from the studio's real disciplines (formerly the "Our Disciplines"
// list) as numbered "why us" pillars, plus a delivery-commitment pillar.
// Numbering is derived from position so the list can be reordered or trimmed
// without leaving gaps.
const pillars = [
  {
    title: "Consultancy",
    desc: "Advisory grounded in delivery experience, de-risking the critical decisions before the first wall goes up.",
  },
  {
    title: "Interior Design",
    desc: "Spatial concepts resolved to the millimetre, balancing materiality, light, and function.",
  },
  {
    title: "Design & Build",
    desc: "Design and construction under one roof, with in-house execution that closes the gap between drawing and reality.",
  },
  {
    title: "On-Time Delivery",
    desc: "Programmes planned to the day and held to it, with sequenced milestones, snags closed early, and handover on the date committed.",
  },
];

export default function Services() {
  const containerRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="services"
      className="bg-paper-2 border-y border-hairline py-[clamp(90px,11vw,150px)]"
    >
      <div
        ref={containerRef}
        className="max-w-[1360px] mx-auto px-5 md:px-14 flex flex-col md:flex-row gap-16 md:gap-24"
      >
        {/* Left column: section header */}
        <div className="w-full md:w-[35%] shrink-0 md:sticky md:top-28 self-start">
          <p
            data-reveal
            className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mb-6"
          >
            Why Axiom
          </p>
          <h2
            data-reveal
            className="font-[family-name:var(--font-heading)] font-light text-[clamp(40px,4.5vw,56px)] leading-[1.05] tracking-tight text-ink-deep mb-8"
          >
            One team, accountable from concept to handover.
          </h2>
          <p
            data-reveal
            className="text-[15px] md:text-[16px] text-muted leading-[1.7] max-w-[34ch]"
          >
            A rigorous, integrated approach to interior contracting, ensuring material
            fidelity and structural integrity from conception to handover.
          </p>
        </div>

        {/* Right column: numbered pillars */}
        <div className="w-full md:w-[65%] mt-4 md:mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12">
            {pillars.map((item, i) => (
              <div
                key={item.title}
                data-reveal
                className="flex flex-col border-t border-hairline pt-5"
              >
                <span className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[24px] md:text-[28px] leading-tight text-ink-deep mb-3">
                  {item.title}
                </h3>
                <p className="text-[14.5px] text-muted leading-[1.65]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
