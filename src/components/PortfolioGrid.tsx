"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import { useGsapReveal } from "@/lib/gsap";
import imageMetadata from "@/data/imageMetadata.json";

const categories = ["All Projects", "Corporate", "Hospitality", "Retail", "Residential"];

interface PortfolioGridProps {
  /** Cap the number of cards shown (curated subset for the home page). Default: all. */
  limit?: number;
  /** Show the category filter bar. Default: true. Curated home views set this false. */
  showFilters?: boolean;
}

export default function PortfolioGrid({ limit, showFilters = true }: PortfolioGridProps) {
  const [activeTab, setActiveTab] = useState("All Projects");

  const filteredProjects = projects
    .filter((p) => (activeTab === "All Projects" ? true : p.category === activeTab))
    .slice(0, limit ?? projects.length);

  // GSAP scroll-reveal for card entrance (staggered per grid).
  const gridRef = useGsapReveal<HTMLDivElement>();

  return (
    <div className="w-full max-w-[1360px] mx-auto px-5 md:px-14 pb-[clamp(90px,11vw,150px)]">
      {/* Filter Bar */}
      {showFilters && (
        <section className="w-full flex flex-wrap gap-3 mb-12 border-b border-hairline pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-4 py-1.5 rounded border font-[family-name:var(--font-ui)] text-xs tracking-[0.14em] uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
                activeTab === cat
                  ? "border-signal text-signal bg-signal/[0.06]"
                  : "border-hairline text-muted hover:border-signal/40 hover:text-ink"
              )}
            >
              {cat}
            </button>
          ))}
        </section>
      )}

      {/* Project Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-7 w-full"
      >
        {filteredProjects.map((project) => {
          // `image` is the card's chosen preview; it usually mirrors photos[0] but
          // can be pointed at any shot without disturbing the case-study gallery,
          // whose hero reads photos[0].
          const previewImage =
            project.image ?? (project.photos?.length ? project.photos[0] : undefined);

          const imgMeta = (imageMetadata as { url: string; altText?: string }[]).find(
            (m) => m.url === previewImage
          );
          const altText = imgMeta?.altText || project.title;

          return (
            <article key={project.id} data-reveal className="group flex flex-col">
              <Link
                href={`/project/${project.id}`}
                className="block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
              >
                <div className="w-full aspect-[4/3] rounded-md overflow-hidden relative bg-paper">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt={altText}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="w-full h-full bg-paper-3 flex items-center justify-center text-stone text-sm">
                      No image available
                    </div>
                  )}

                  {/* Red category tag */}
                  <span className="absolute top-4 left-4 z-10 font-[family-name:var(--font-ui)] text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm bg-signal text-paper">
                    {project.category}
                  </span>

                  {/* Warm ink overlay + legible label on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/80 via-ink-deep/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute bottom-4 left-4 z-10 font-[family-name:var(--font-ui)] text-[11px] font-semibold tracking-[0.2em] uppercase text-paper opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    View Project →
                  </span>
                </div>

                <div className="flex flex-col gap-2 mt-5 px-0.5">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="font-[family-name:var(--font-display)] text-[26px] leading-tight text-ink-deep group-hover:text-signal transition-colors">
                      {project.title}
                    </h3>
                    <span className="shrink-0 font-[family-name:var(--font-ui)] text-sm text-stone">
                      {project.year}
                    </span>
                  </div>

                  <p className="u-eyebrow font-[family-name:var(--font-ui)] text-stone">
                    {[project.location, project.category, project.year]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
