/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Ignore canvas module (used by pdfjs but not needed in browser)
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    }
    
    return config
  },
}

module.exports = nextConfig
