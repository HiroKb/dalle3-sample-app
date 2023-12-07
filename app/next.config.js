/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.STORAGE_PUBLIC_PROTOCOL,
        hostname: process.env.STORAGE_PUBLIC_HOSTNAME,
        port: process.env.STORAGE_PUBLIC_PORT,
      }
    ]
  }
}

module.exports = nextConfig
