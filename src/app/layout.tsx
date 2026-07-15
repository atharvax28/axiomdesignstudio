import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Cormorant_Garamond, Lora } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

// Inter (UI/eyebrows), Jakarta (headings + logo) and Cormorant (the hero's italic
// accents, e.g. "that" in the headline) are preloaded so the hero renders in its
// intended fonts on first paint. Only Lora (body copy, below the fold) skips the
// high-priority preload so it doesn't starve the critical path.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://axiomdesignstudio.in"),
  title: {
    default: "Axiom Design Studio | Premium Interior Design & Build in Mumbai",
    template: "%s | Axiom Design Studio",
  },
  description:
    "Axiom Design Studio is a premier Mumbai-based interior design and turnkey execution firm. We craft bespoke corporate, hospitality, retail, and luxury residential spaces.",
  keywords: [
    "interior design Mumbai",
    "turnkey interior contractors",
    "luxury residential interiors",
    "corporate office design",
    "hospitality interior design",
    "Axiom Design Studio",
    "architecture firm Mumbai",
    "premium interior execution",
    "best interior designers in Mumbai",
  ],
  authors: [{ name: "Axiom Design Studio" }],
  creator: "Axiom Design Studio",
  publisher: "Axiom Design Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Axiom Design Studio | Premium Interior Design in Mumbai",
    description:
      "Axiom Design Studio crafts bespoke corporate, hospitality, retail, and luxury residential spaces. Explore our portfolio of premium interior execution.",
    url: "https://axiomdesignstudio.in",
    siteName: "Axiom Design Studio",
    images: [
      {
        url: "/hero/main-16x9.jpg",
        width: 1200,
        height: 630,
        alt: "Axiom Design Studio - Premium Interior Design",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axiom Design Studio | Interior Design & Build",
    description:
      "Axiom Design Studio crafts bespoke corporate, hospitality, retail, and luxury residential spaces in Mumbai.",
    images: ["/hero/main-16x9.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InteriorDesignBusiness",
  name: "Axiom Design Studio",
  image: "https://axiomdesignstudio.in/hero/main-16x9.jpg",
  "@id": "https://axiomdesignstudio.in",
  url: "https://axiomdesignstudio.in",
  telephone: "+91-98209-99296",
  address: {
    "@type": "PostalAddress",
    streetAddress: "51, Adityaraj Group, Vikhroli",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400079",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.1112,
    longitude: 72.9282,
  },
  sameAs: [
    "https://www.instagram.com/axiom_designstudio",
    "https://www.linkedin.com/company/axiom-design-studio"
  ],
  priceRange: "$$$",
  description:
    "Axiom Design Studio is a premier Mumbai-based interior design and turnkey execution firm crafting bespoke corporate, hospitality, retail, and luxury residential spaces.",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Material Symbols is only used by /about, which loads it itself. */}
      <body className="min-h-screen bg-paper text-ink font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
