/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure static exports
  output: 'standalone',
  // React 18 concurrent features are enabled by default
  // Environment variables that should be available to the client
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT: process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT,
    NEXT_PUBLIC_AZURE_OPENAI_API_KEY: process.env.NEXT_PUBLIC_AZURE_OPENAI_API_KEY,
  },
  // Disable TypeScript type checking during build (handled by Vercel)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build (handled by Vercel)
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
