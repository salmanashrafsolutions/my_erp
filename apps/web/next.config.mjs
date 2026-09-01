/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@erp/shared-types', '@erp/shared-ui'],
  reactStrictMode: true,
};

export default nextConfig;
