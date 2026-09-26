import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: false },
      { source: '/library.html', destination: '/library', permanent: false },
    ];
  },
};

export default nextConfig;
