import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  output: "export",
  basePath: "/VEIL",
  assetPrefix: "/VEIL/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
