import * as React from "react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  /** Material Symbols ligature name (the About page loads that icon font). */
  icon: string;
  title: string;
  body: string;
}

/* ── shared pieces ─────────────────────────────────────────────────────── */

function Node({ icon, className }: { icon: string; className?: string }) {
  return (
    <div
      className={cn(
        "grid size-16 place-items-center rounded-full bg-ink-deep shadow-lg shadow-ink-deep/25",
        className
      )}
    >
      <span
        className="material-symbols-outlined text-[30px] text-signal"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>
    </div>
  );
}

// Inline font-family: globals.css sets an unlayered `h3 { font-family: display }`
// rule that would otherwise override a Tailwind font utility on the heading.
function Title({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{ fontFamily: "var(--font-ui)" }}
      className="text-[0.92rem] font-semibold uppercase tracking-[0.06em] text-ink-deep"
    >
      {children}
    </h3>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 font-[family-name:var(--font-body)] text-sm leading-relaxed text-muted">
      {children}
    </p>
  );
}

/* ── serpentine geometry (desktop) ─────────────────────────────────────────
 * The SVG stretches to the container (preserveAspectRatio="none"), so an x in
 * the 1120-wide viewBox maps to that fraction of the width. Nodes are placed at
 * the same fractions, and the stage height equals the viewBox height, so a y in
 * viewBox units equals a pixel — that keeps the dashed thread and the nodes
 * aligned at every width. */
const COLS = [200, 560, 920];
const ROW1_Y = 100;
const ROW2_Y = 400;
const STAGE_H = 620;
const pct = (x: number) => `${(x / 1120) * 100}%`;

export function SerpentineTimeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  // Row 1 reads left→right; row 2 reads right→left so the thread snakes.
  const nodes = [
    { x: COLS[0], y: ROW1_Y, item: items[0] },
    { x: COLS[1], y: ROW1_Y, item: items[1] },
    { x: COLS[2], y: ROW1_Y, item: items[2] },
    { x: COLS[2], y: ROW2_Y, item: items[3] },
    { x: COLS[1], y: ROW2_Y, item: items[4] },
    { x: COLS[0], y: ROW2_Y, item: items[5] },
  ].filter((n): n is { x: number; y: number; item: TimelineItem } => Boolean(n.item));

  return (
    <div className={className}>
      {/* Desktop: horizontal serpentine */}
      <div className="relative hidden lg:block" style={{ height: STAGE_H }}>
        <svg
          viewBox={`0 0 1120 ${STAGE_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <path
            d={`M ${COLS[0]} ${ROW1_Y} H ${COLS[2]} C 1035 ${ROW1_Y}, 1070 145, 1070 250 C 1070 ${ROW2_Y}, 1035 ${ROW2_Y}, ${COLS[2]} ${ROW2_Y} H ${COLS[0]}`}
            fill="none"
            stroke="var(--signal)"
            strokeWidth={2}
            strokeDasharray="2 7"
            strokeLinecap="round"
            opacity={0.55}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {nodes.map((n, i) => (
          <React.Fragment key={i}>
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: pct(n.x), top: n.y }}
            >
              <Node icon={n.item.icon} />
            </div>
            <div
              className="absolute w-[280px] -translate-x-1/2"
              style={{ left: pct(n.x), top: n.y + 48 }}
            >
              <Title>{n.item.title}</Title>
              <Body>{n.item.body}</Body>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Mobile / tablet: vertical timeline */}
      <ol className="relative flex flex-col gap-9 lg:hidden">
        <span
          aria-hidden="true"
          className="absolute bottom-8 left-8 top-8 border-l-2 border-dashed border-signal/45"
        />
        {items.map((item, i) => (
          <li key={i} className="relative flex gap-5">
            <Node icon={item.icon} className="z-10 shrink-0" />
            <div className="pt-1.5">
              <Title>{item.title}</Title>
              <Body>{item.body}</Body>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
