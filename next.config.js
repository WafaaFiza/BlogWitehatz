/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'witehatz-56a837b76c4a.herokuapp.com',
      },
    ],
  },
}

module.exports = nextConfig 