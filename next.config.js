/** @type {import('next').NextConfig} */
const nextConfig = {}

//pwa
const withPWA = require("next-pwa")({
    dest: "public",
  });


// module.exports = nextConfig

module.exports = withPWA({
    nextConfig,
  });