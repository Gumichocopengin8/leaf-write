/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    reactRemoveProperties: true,
    removeConsole: {
      exclude: ['error'],
    },
    emotion: true,
  },
};

module.exports = nextConfig;
