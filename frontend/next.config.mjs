/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{
      source: '/api/v1/:path*',
      destination: 'https://7e534aa1-6621-4bfb-8572-53c2ae0a7ec0-00-3dem6micw013p.sisko.replit.dev:8000/api/v1/:path*',
    }]
  }
};

export default nextConfig;
