/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      // Vercel'in TypeScript hatalarını görmezden gelmesini sağlar
      ignoreBuildErrors: true,
    },
    eslint: {
      // Vercel'in ESLint (kod yazım uyarıları) hatalarını görmezden gelmesini sağlar
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig;
  