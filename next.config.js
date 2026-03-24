const DEFAULT_SITE_URL = 'https://www.dsnenterprises.in';
const siteUrl = (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');
const preferredHost = new URL(siteUrl).host;
const alternateHost = preferredHost.startsWith('www.')
  ? preferredHost.slice(4)
  : `www.${preferredHost}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: alternateHost,
          },
        ],
        destination: `${siteUrl}/:path*`,
        permanent: true,
        basePath: false,
      },
    ];
  },
}

module.exports = nextConfig
