import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["10.5.0.2", "*.local"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
