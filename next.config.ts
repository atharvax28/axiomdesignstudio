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
};

export default nextConfig;
