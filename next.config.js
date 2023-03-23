/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    reactRemoveProperties: true,
    emotion: true,
  },
};

module.exports = nextConfig;
