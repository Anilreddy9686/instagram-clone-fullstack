// A:/instagram-clone-fullstack/next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
      },
    ],
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
}

export default nextConfig