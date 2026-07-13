import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamShowcase from "@/components/team/TeamShowcase";

export const metadata = {
  title: "The Collective | Axiom Design Studio",
  description:
    "The designers and builders behind Axiom Design Studio — the same people who draw a project are accountable for it on site.",
};

export default function CollectivePage() {
  return (
    <main className="relative flex flex-col w-full min-h-screen">
      {/* Opens on cream, not a scrimmed photo — the bar must be solid from the start. */}
      <Navbar transparentAtTop={false} />
      <TeamShowcase />
      <Footer />
    </main>
  );
}
