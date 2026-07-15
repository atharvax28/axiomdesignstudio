import AboutClient from "./AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Axiom Design Studio's design-build legacy since 2016. Meet our team and discover our approach to premium corporate, residential, and retail interiors in Mumbai.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Axiom Design Studio",
    description:
      "Learn about Axiom Design Studio's design-build legacy since 2016. Meet our team and discover our approach to premium corporate, residential, and retail interiors in Mumbai.",
    url: "https://axiomdesignstudio.in/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
