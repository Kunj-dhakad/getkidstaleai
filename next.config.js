/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // target: 'server',
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    // domains: ['images.pexels.com,remotionlambda-useast1-qe2jk3zrmz.s3.us-east-1.amazonaws.com'],
    domains: [
      "images.pexels.com",
      "picsum.photos",
      "kdmeditor.s3.us-east-1.amazonaws.com",
      "cdn.aivideocreatorfx.in",
      "remotionlambda-useast1-qe2jk3zrmz.s3.us-east-1.amazonaws.com",
      "aivideobuilderfx.in",
      "cdn.aivideobuilderfx.in",
      "cdn.aiappsempire.com",
      "www.aitubestar.com",
      "cdn.aitubestar.com",
      "mahesh.aitubestar.com",
      "www.aibrandifly.com",
      "cdn.aibrandifly.com",
    ],
  },
  env: {
    REMOTION_AWS_ACCESS_KEY_ID: process.env.REMOTION_AWS_ACCESS_KEY_ID,
    REMOTION_AWS_SECRET_ACCESS_KEY: process.env.REMOTION_AWS_SECRET_ACCESS_KEY,

    KD_PEXEL_API_KEY: process.env.KD_PEXEL_API_KEY,

    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  },
};

module.exports = nextConfig;
