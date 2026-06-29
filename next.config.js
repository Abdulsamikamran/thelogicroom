/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'your-supabase-project.supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
  transpilePackages: ['three'],
  webpack: (config) => {
    config.externals = config.externals || [];
    return config;
  },
};

module.exports = nextConfig;
