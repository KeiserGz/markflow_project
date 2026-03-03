/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Turn off temporarily to make debugging easier
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
}

module.exports = nextConfig
module.exports = {
  webpack: (config) => {
    config.watchOptions = {
      ignored: /node_modules|System Volume Information|Recovery/,
    }
    return config
  },
}
