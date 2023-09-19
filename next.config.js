/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "xd2kcvzsdpeyx1gu.public.blob.vercel-storage.com",
      "replicate.delivery",
    ],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/steven-tey/spirals",
        permanent: false,
      },
      {
        source: "/deploy",
        destination: "https://vercel.com/templates/next.js/spirals",
        permanent: false,
      },
      {
        source: "/t",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
