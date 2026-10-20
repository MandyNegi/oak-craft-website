import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first (~30% smaller than WebP), fall back to WebP
    formats: ["image/avif", "image/webp"],
    // Cache optimised images on Vercel's CDN for 30 days (default is 60s)
    minimumCacheTTL: 2592000,
    // Explicit breakpoints — avoids generating redundant intermediate sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
