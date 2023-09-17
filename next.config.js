/** @type {import('next').NextConfig} */
const nextConfig = {}

//pwa
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    disable: process.env.NODE_ENV === "development",
    
  });


// module.exports = nextConfig

module.exports = withPWA({
    nextConfig,
  });

