/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: ['greenlandstrapi.herokuapp.com', 'res.cloudinary.com'],
  },
};
