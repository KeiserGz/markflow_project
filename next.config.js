/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        '**/node_modules',
        '**/System Volume Information',
        '**/Recovery',
      ],
    }
    return config
  },
  turbopack: {},
}

module.exports = nextConfig
