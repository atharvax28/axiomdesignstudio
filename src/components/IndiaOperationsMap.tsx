"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
 * City marker data — coordinates reference the SVG viewBox 0 0 612 696.
 * Anchors prevent label overlap for nearby cities.
 * ──────────────────────────────────────────────────────────────*/
const CITIES = [
  { name: "Delhi",     x: 186.3, y: 210.4, anchor: "top"    },
  { name: "Ghaziabad", x: 221.0, y: 201.8, anchor: "right"  },
  { name: "Jaipur",    x: 161.5, y: 248.9, anchor: "left"   },
  { name: "Indore",    x: 160.9, y: 347.7, anchor: "right"  },
  { name: "Mumbai",    x: 103.5, y: 426.0, anchor: "left"   },
  { name: "Pune",      x: 118.6, y: 441.8, anchor: "bottom" },
  { name: "Kolhapur",  x: 114.2, y: 486.0, anchor: "bottom" },
  { name: "Sangli",    x: 145.9, y: 472.5, anchor: "right"  },
  { name: "Hyderabad", x: 218.1, y: 467.4, anchor: "top"    },
  { name: "Bangalore", x: 196.9, y: 563.4, anchor: "bottom" },
] as const;

/** States containing a project city — permanently "lit" */
const PROJECT_STATE_IDS = new Set([
  "dl", "up", "rj", "mp", "mh", "tg", "ka",
]);

const SVG_VB_W = 612;
const SVG_VB_H = 696;

/* ──────────────────────────────────────────────────────────── */

interface Props {
  className?: string;
}

export default function IndiaOperationsMap({ className = "" }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ label: string; x: number; y: number } | null>(null);
  const [ready, setReady] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  /* Defer the 190KB map HTML fetch + SVG parse until the map is near the
     viewport, so it never competes with the initial page load. */
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* inject the SVG once from the embedded HTML source file */
  useEffect(() => {
    if (!shouldLoad) return;
    let cancelled = false;
    (async () => {
      try {
        // Fetch the self-contained HTML that holds the SVG in a <script type="text/plain">
        const resp = await fetch("/india-map-preview-1.html");
        const html = await resp.text();

        // Pull the SVG text out of the <script id="indiaSvgSource"> block
        const match = html.match(
          /<script[^>]*id="indiaSvgSource"[^>]*>([\s\S]*?)<\/script>/i
        );
        if (!match || cancelled) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(match[1], "image/svg+xml");
        const svg = doc.documentElement;

        // Clean up attributes
        ["width", "height", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin"]
          .forEach((a) => svg.removeAttribute(a));

        svg.querySelectorAll("a").forEach((a) => {
          while (a.firstChild) a.parentNode?.insertBefore(a.firstChild, a);
          a.remove();
        });
        svg.querySelectorAll("title").forEach((t) => t.remove());

        // Light up project states and fix accessibility roles
        svg.querySelectorAll("path").forEach((path) => {
          if (path.hasAttribute("id") && PROJECT_STATE_IDS.has(path.getAttribute("id") ?? "")) {
            path.classList.add("state-lit");
          }
          if (path.hasAttribute("aria-label") || path.hasAttribute("id")) {
            path.setAttribute("role", "img");
            if (!path.hasAttribute("aria-label") && path.hasAttribute("id")) {
              path.setAttribute("aria-label", path.getAttribute("id") ?? "");
            }
          }
        });

        // Insert into our ref container
        const container = svgRef.current;
        if (container && !cancelled) {
          // Replace all children
          container.innerHTML = "";
          // Import each child from the parsed SVG
          Array.from(svg.childNodes).forEach((node) => {
            container.appendChild(document.importNode(node, true));
          });
          // Copy viewBox
          container.setAttribute("viewBox", svg.getAttribute("viewBox") ?? "0 0 612 696");
          container.setAttribute("aria-label", "Map of India");
          container.setAttribute("role", "img");
          setReady(true);
        }
      } catch (err) {
        console.error("Map SVG load error:", err);
      }
    })();
    return () => { cancelled = true; };
  }, [shouldLoad]);

  /* tooltip handlers */
  const handleMouseEnter = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const target = (e.target as Element).closest("path");
    if (!target) return;
    const label = target.getAttribute("aria-label") || target.getAttribute("id") || "";
    setTooltip({ label, x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  return (
    <div className={`india-ops-map ${className}`}>
      {/* Ambient glow */}
      <div className="india-ops-map__glow" />

      <div className="india-ops-map__stage" ref={stageRef}>
        {/* SVG — paths are injected via useEffect */}
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 612 696"
          className="india-ops-map__svg"
          role="img"
          aria-label="Map of India Operations"
          onMouseOver={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseLeave}
        />

        {/* City markers */}
        {ready &&
          CITIES.map((city, i) => {
            const leftPct = (city.x / SVG_VB_W) * 100;
            const topPct = (city.y / SVG_VB_H) * 100;
            const delay = i * 350;

            return (
              <div
                key={city.name}
                className={`india-ops-map__marker india-ops-map__marker--${city.anchor}`}
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  animationDelay: `${delay}ms`,
                }}
              >
                <span className="india-ops-map__core" />
                <span
                  className="india-ops-map__label"
                  style={{ animationDelay: `${delay + 200}ms` }}
                >
                  {city.name}
                </span>
              </div>
            );
          })}
      </div>

      {/* City chips list */}
      {ready && (
        <div className="india-ops-map__chips">
          {CITIES.map((city, i) => (
            <div
              key={city.name}
              className="india-ops-map__chip"
              style={{ animationDelay: `${i * 350 + 300}ms` }}
            >
              <span className="india-ops-map__chip-dot" />
              {city.name}
            </div>
          ))}
        </div>
      )}

      {/* Floating tooltip */}
      {tooltip && (
        <div
          className="india-ops-map__tooltip"
          style={{ left: tooltip.x + 12, top: tooltip.y - 28 }}
        >
          {tooltip.label}
        </div>
      )}

      {/* Scoped styles */}
      <style jsx>{`
        .india-ops-map {
          position: relative;
          width: 100%;
        }

        /* Ambient glow behind map */
        .india-ops-map__glow {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(192, 0, 0, 0.10) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* Stage */
        .india-ops-map__stage {
          position: relative;
          width: 100%;
          z-index: 1;
        }

        /* SVG map */
        .india-ops-map__svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .india-ops-map__svg :global(path) {
          fill: transparent;
          stroke: rgba(58, 90, 140, 0.45);
          stroke-width: 0.7;
          cursor: pointer;
          transition: fill 0.3s ease, stroke 0.3s ease, filter 0.3s ease;
        }

        .india-ops-map__svg :global(path:hover) {
          fill: rgba(58, 90, 140, 0.10);
          stroke: rgba(58, 90, 140, 0.80);
          stroke-width: 1;
          filter: drop-shadow(0 0 6px rgba(58, 90, 140, 0.20));
        }

        .india-ops-map__svg :global(path.state-lit) {
          fill: rgba(192, 0, 0, 0.12);
          stroke: rgba(192, 0, 0, 0.55);
          stroke-width: 1;
          filter: drop-shadow(0 0 5px rgba(192, 0, 0, 0.20));
        }

        .india-ops-map__svg :global(path.state-lit:hover) {
          fill: rgba(192, 0, 0, 0.22);
          stroke: rgba(192, 0, 0, 0.80);
        }

        /* ─── City Markers ─── */
        .india-ops-map__marker {
          position: absolute;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 10;
          opacity: 0;
          animation: iomap-fadeInMarker 0.6s ease forwards;
        }

        .india-ops-map__core {
          width: 7.2px;
          height: 7.2px;
          background: var(--signal, #C00000);
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 0 4px rgba(192, 0, 0, 0.4));
          display: block;
        }


        .india-ops-map__label {
          position: absolute;
          white-space: nowrap;
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: var(--ink, #2C2C2C);
          background: rgba(245, 239, 230, 0.95);
          border: 1px solid rgba(28, 28, 28, 0.12);
          border-radius: 6px;
          padding: 2px 7px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
          opacity: 0;
          pointer-events: none;
          z-index: 20;
          animation: iomap-fadeInLabel 0.5s ease forwards;
          font-family: var(--font-ui, 'Inter', sans-serif);
        }

        /* Label anchor positions */
        .india-ops-map__marker--top .india-ops-map__label {
          bottom: 100%;
          left: 50%;
          margin-bottom: 8px;
          transform: translateX(-50%);
        }
        .india-ops-map__marker--bottom .india-ops-map__label {
          top: 100%;
          left: 50%;
          margin-top: 8px;
          transform: translateX(-50%);
        }
        .india-ops-map__marker--left .india-ops-map__label {
          right: 100%;
          top: 50%;
          margin-right: 8px;
          transform: translateY(-50%);
        }
        .india-ops-map__marker--right .india-ops-map__label {
          left: 100%;
          top: 50%;
          margin-left: 8px;
          transform: translateY(-50%);
        }

        /* ─── City Chips ─── */
        .india-ops-map__chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem 1rem;
          margin-top: 1.25rem;
          position: relative;
          z-index: 1;
        }

        .india-ops-map__chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid var(--hairline, rgba(28, 28, 28, 0.12));
          background: var(--paper, #F5EFE6);
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--muted, #334155);
          opacity: 0;
          animation: iomap-chipIn 0.4s ease forwards;
          font-family: var(--font-ui, 'Inter', sans-serif);
        }

        .india-ops-map__chip-dot {
          width: 7px;
          height: 7px;
          background: var(--signal, #C00000);
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          box-shadow: 0 0 6px rgba(192, 0, 0, 0.4);
          flex-shrink: 0;
          display: block;
        }

        /* ─── Tooltip ─── */
        .india-ops-map__tooltip {
          position: fixed;
          pointer-events: none;
          background: var(--ink-deep, #0F172A);
          color: var(--paper, #F5EFE6);
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          white-space: nowrap;
          z-index: 50;
          font-family: var(--font-ui, 'Inter', sans-serif);
        }

        /* ─── Keyframes ─── */
        @keyframes iomap-fadeInMarker {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes iomap-fadeInLabel {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes iomap-chipIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Fixes */
        @media (max-width: 768px) {
          .india-ops-map__label {
            font-size: 0.45rem;
            padding: 1px 4px;
            background: rgba(245, 239, 230, 0.85);
            border: none;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          }
          .india-ops-map__marker--top .india-ops-map__label { margin-bottom: 5px; }
          .india-ops-map__marker--bottom .india-ops-map__label { margin-top: 5px; }
          .india-ops-map__marker--left .india-ops-map__label { margin-right: 5px; }
          .india-ops-map__marker--right .india-ops-map__label { margin-left: 5px; }
        }
      `}</style>
    </div>
  );
}
