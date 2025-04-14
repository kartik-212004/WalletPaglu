import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "media1.giphy.com",
      },
      {
        hostname: "media.tenor.com",
      },
    ],
  },
};

export default nextConfig;
