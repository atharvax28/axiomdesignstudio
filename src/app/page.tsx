import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

// Only the Navbar + Hero are above the fold. Everything below is code-split so it
// stays out of the initial JS bundle — the browser paints and hydrates the hero
// first, instead of blocking the main thread hydrating the whole page (incl. the
// India map, which fetches a large HTML file). Still SSR'd, so markup + anchors +
// SEO are unaffected; only the client JS is deferred.
const Stats = dynamic(() => import("@/components/Stats"));
const Presence = dynamic(() => import("@/components/Presence"));
const About = dynamic(() => import("@/components/About"));
const Services = dynamic(() => import("@/components/Services"));
const PortfolioGrid = dynamic(() => import("@/components/PortfolioGrid"));
const Process = dynamic(() => import("@/components/Process"));
const FullBleedBand = dynamic(() => import("@/components/FullBleedBand"));
const TrustedBy = dynamic(() => import("@/components/TrustedBy"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="relative flex flex-col w-full overflow-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Presence />
      <About />
      <Services />

      {/* Selected Work — curated subset; full set lives on /projects */}
      <section id="work" className="bg-paper-3 pt-[clamp(90px,11vw,150px)]">
        <div className="max-w-[1360px] mx-auto px-5 md:px-14 flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-16">
          <div>
            <p className="u-eyebrow font-[family-name:var(--font-ui)] text-signal mb-5">
              Selected Work
            </p>
            <h2 className="font-[family-name:var(--font-heading)] font-light text-[clamp(34px,4.8vw,64px)] leading-[1.05] text-ink-deep max-w-[18ch]">
              A portfolio built on{" "}
              <span className="font-[family-name:var(--font-display)] italic text-signal">
                material honesty
              </span>
              .
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-ui)] font-medium text-[13px] leading-none tracking-[0.14em] uppercase text-ink hover:text-signal transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          >
            View all projects <span aria-hidden="true">→</span>
          </Link>
        </div>
        <PortfolioGrid limit={8} showFilters={false} />
      </section>

      <Process />
      <FullBleedBand />
      <TrustedBy />
      <Footer />
    </main>
  );
}
