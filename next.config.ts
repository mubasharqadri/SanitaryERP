import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Uploads are written after build, so /uploads/* is served by the API route
    // rather than the static public/ handler (which only knows files present at build time).
    return [{ source: "/uploads/:path*", destination: "/api/uploads/:path*" }];
  },
};

export default nextConfig;
