import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://www.michaelzingraf.com/**')],
  },
  // Disable Next.js development overlay and floating icons
  devIndicators: false,
  // Disable React Strict Mode warnings overlay
  reactStrictMode: false,
};

export default nextConfig;
