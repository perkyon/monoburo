import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [256, 384, 640, 750],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
