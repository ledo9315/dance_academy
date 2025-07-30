import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["angelasdanceacademy.com", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "blob.vercel-storage.com",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
