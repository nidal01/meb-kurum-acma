import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: false },
  // Bozuk webpack/.next ile birlikte RSC paketinde 500'e yol açabiliyor; geliştirme için gerekmiyorsa kapalı tut.
  experimental: {
    devtoolSegmentExplorer: false
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.meb.gov.tr",
        pathname: "/assets/img/**"
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "image.pollinations.ai",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;

