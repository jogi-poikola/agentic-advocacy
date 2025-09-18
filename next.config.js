/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Enable static export for Vercel deployment
  output: 'export',
  trailingSlash: true,
  // Configure for static site generation
  distDir: 'out',
}

module.exports = nextConfig