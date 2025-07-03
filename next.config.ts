import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images:{
  remotePatterns: [
    {
      protocol: 'https',
      hostname: `${process.env.HOSTNAME}`,
    },
  ],
 }
};

export default nextConfig;
