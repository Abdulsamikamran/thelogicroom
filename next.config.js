/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: '/icon.png',
        permanent: true,
      },
    ];
  },
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
