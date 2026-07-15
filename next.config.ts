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
    // Serve modern formats. next/image negotiates AVIF first, then WebP, then the
    // original — so the browser always gets the smallest encoding it supports.
    formats: ["image/avif", "image/webp"],
    // Cache optimized images at the edge for a year (source assets are immutable).
    minimumCacheTTL: 31536000,
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    // Security headers applied to every route. Kept conservative: no strict CSP,
    // so the inline JSON-LD script and Next's inline styles keep working.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
