/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  async redirects() {
    return [
      // Short author URL redirects → full author profile pages (301 permanent)
      {
        source: '/kaushal',
        destination: '/authors/kaushal-b',
        permanent: true,
      },
      {
        source: '/kaushal-banginwar',
        destination: '/authors/kaushal-b',
        permanent: true,
      },
      {
        source: '/akshat',
        destination: '/authors/akshat-soni',
        permanent: true,
      },
      {
        source: '/akshat-soni',
        destination: '/authors/akshat-soni',
        permanent: true,
      },
      {
        source: '/indrajit',
        destination: '/authors/indrajit-kshirsagar',
        permanent: true,
      },
      {
        source: '/indrajit-kshirsagar',
        destination: '/authors/indrajit-kshirsagar',
        permanent: true,
      },
    ];
  },
}
module.exports = nextConfig

