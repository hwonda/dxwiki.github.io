/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  experimental: {
    staticPages: {
      '/': false
    }
  }
};

module.exports = nextConfig;