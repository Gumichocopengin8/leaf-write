import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: true,
    emotion: true,
  },
  transpilePackages: ['@mui/x-data-grid', '@mui/x-data-grid-pro', '@mui/x-data-grid-premium'],
};

export default nextConfig;
