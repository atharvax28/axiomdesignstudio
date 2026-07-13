import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Cormorant_Garamond, Lora } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The headline face. Left as a variable font rather than a list of static
 * weights: the type is set `font-light` in twenty-odd places, 300 was never
 * among the weights loaded, and the browser was quietly substituting 500 — so
 * the light headings the design asks for were never actually rendering. One
 * variable file covers the whole range and ships fewer bytes than the three
 * static cuts it replaces.
 */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The italic display accent. Cormorant has no variable cut, so weights are
 * explicit — and only the one the site actually uses (400, roman and italic).
 * It was loading 500/600/700 in both styles: six files, none of them at a
 * weight any class asked for.
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

/**
 * Absolute base for Open Graph / preview images. Vercel injects the deployment
 * host, so previews resolve on branch deploys too; set NEXT_PUBLIC_SITE_URL once
 * the studio's own domain is attached, and that wins.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Axiom Design Studio | Interior Design & Build",
    template: "%s",
  },
  description: "Axiom Design Studio — a Mumbai interior design and execution studio crafting corporate, hospitality, retail, and residential spaces.",
  openGraph: {
    siteName: "Axiom Design Studio",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${cormorant.variable} ${lora.variable} antialiased scroll-smooth`}
    >
      {/* Material Symbols is only used by /about, which loads it itself. */}
      <body className="min-h-screen bg-paper text-ink font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
