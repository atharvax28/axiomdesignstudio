import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata = {
  title: "Selected Works | Axiom Design Studio",
  description: "A curated selection of our recent architectural and interior design works.",
};

export default function ProjectsPage() {
  return (
    <main className="relative flex flex-col w-full min-h-screen overflow-hidden">
      {/* This page opens on cream, not a photo — the bar must be solid from the start. */}
      <Navbar transparentAtTop={false} />

      {/* Header Section */}
      <section className="w-full max-w-[1360px] mx-auto px-5 md:px-14 pt-[clamp(120px,15vw,180px)] pb-12">
        <h1 className="font-[family-name:var(--font-heading)] font-light text-[clamp(40px,6vw,80px)] text-ink-strong mb-6 leading-none">
          Our{" "}
          <span className="font-[family-name:var(--font-display)] italic font-normal text-signal">
            Portfolio
          </span>
          .
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl leading-relaxed">
          A curated selection of our recent architectural and interior design works, spanning multiple sectors and embodying our commitment to structural integrity, material honesty, and spatial harmony.
        </p>
      </section>

      {/* Grid Component */}
      <PortfolioGrid />

      <Footer />
    </main>
  );
}
