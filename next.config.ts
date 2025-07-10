import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images:{
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
    {
      protocol: 'http',
      hostname: '**',
    },
  ],
 },

 async redirects() {
  return [
    {
      source: "/admin",
      destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-admin`,
      permanent: true,
    },
  ];
},
};

export default nextConfig;
