import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.5.0.2", "*.local"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
