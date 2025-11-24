import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    serverComponentsExternalPackages: ["@supabase/ssr"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
