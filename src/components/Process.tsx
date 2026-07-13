"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useGsapReveal } from "@/lib/gsap";

// The studio's engagement sequence. Every stage restates a capability already
// claimed elsewhere on the site (Consultancy, Interior Design, Design & Build,
// and the handover promised in Services) — no new service is introduced here.
const steps = [
  {
    title: "Consult",
    desc: "Brief, site survey, and feasibility. The critical decisions are de-risked before the first wall goes up.",
  },
  {
    title: "Design",
    desc: "Concept through general arrangement to detail — spatial ideas resolved to the millimetre.",
  },
  {
    title: "Build",
    desc: "In-house fabrication and site execution, closing the gap between the drawing and the finished surface.",
  },
  {
    title: "Handover",
    desc: "Snagging, defects liability, and a clean exit. The space is finished when it is genuinely finished.",
  },
];

export default function Process() {
  const containerRef = useGsapReveal<HTMLDivElement>();
  const railRef = useRef<HTMLSpanElement>(null);
  const spineRef = useRef<HTMLSpanElement>(null);

  // The connecting rule draws itself as the section enters. Kept separate from
  // useGsapReveal so no element is ever animated twice.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: horizontal rail grows left-to-right. Mobile: vertical spine
      // grows top-to-bottom. Both are transform-only.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(railRef.current, {
          scaleX: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%", once: true },
        });
      });

      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(spineRef.current, {
          scaleY: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section className="bg-paper py-[clamp(90px,11vw,150px)] relative z-10">
      <div ref={containerRef} className="max-w-[1360px] mx-auto px-5 md:px-14">
        <p
          data-reveal
          className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mb-6"
        >
          Our Process
        </p>
        <h2
          data-reveal
          className="font-[family-name:var(--font-heading)] font-light text-[clamp(34px,4.8vw,68px)] leading-[1.05] text-ink-deep mb-6 max-w-[16ch]"
        >
          From brief to{" "}
          <span className="font-[family-name:var(--font-display)] italic text-signal">
            handover
          </span>
          .
        </h2>
        <p
          data-reveal
          className="text-[15px] md:text-[16px] text-muted leading-[1.7] max-w-[52ch] mb-16 md:mb-24"
        >
          A single accountable team at every stage — so nothing is lost in translation
          between the drawing and the finished surface.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop rail: runs through the centre of every node. */}
          <span
            ref={railRef}
            aria-hidden="true"
            className="hidden md:block absolute left-0 right-0 top-[6px] h-px bg-hairline origin-left"
          />
          {/* Mobile spine: runs down through the nodes. */}
          <span
            ref={spineRef}
            aria-hidden="true"
            className="md:hidden absolute left-[6px] top-3 bottom-6 w-px bg-hairline origin-top"
          />

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-y-12 md:gap-x-10">
            {steps.map((step, i) => (
              <li key={step.title} data-reveal className="relative pl-9 md:pl-0">
                {/* Node. The paper ring masks the rule passing behind it. */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[3px] md:relative md:left-auto md:top-auto md:mb-7 block h-[13px] w-[13px] rounded-full bg-signal ring-4 ring-paper"
                />
                <span className="u-eyebrow font-[family-name:var(--font-ui)] text-stone block mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[24px] md:text-[28px] leading-tight text-ink-deep mb-3">
                  {step.title}
                </h3>
                <p className="text-[14.5px] text-muted leading-[1.65]">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
