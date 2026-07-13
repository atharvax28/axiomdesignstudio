import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Next blocks cross-origin requests to dev-only assets (`/_next/*`, HMR) unless
   * the origin is listed here. Without this, opening the dev server's Network URL
   * from a phone or another machine loads the HTML but fails to fetch the dev
   * chunks — so client components never hydrate and every GSAP/Framer reveal stays
   * at opacity 0, looking as though the section did not load.
   *
   * Development only; has no effect on `next build` / `next start`.
   *
   * The LAN address is DHCP-assigned and will change. Add whatever `next dev`
   * prints as its "Network:" host.
   */
  allowedDevOrigins: ["10.5.0.2", "*.local"],

  images: {
    /** The source photography is print-resolution JPEG/PNG straight off the
     *  shoot; served as-is a single card was pulling several megabytes. AVIF
     *  first, WebP for anything that cannot decode it. */
    formats: ["image/avif", "image/webp"],
    /** Cards render at ~660px, gallery at ~1000px, case-study heroes full-bleed.
     *  Trimmed from the defaults so we generate fewer variants than we serve. */
    deviceSizes: [640, 828, 1080, 1200, 1600, 1920, 2560],
    imageSizes: [256, 384, 512],
    /** Optimised derivatives are immutable — the source files never change in
     *  place — so let the CDN hold them for a year. */
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
