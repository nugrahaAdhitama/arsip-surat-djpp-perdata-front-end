/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "http://resource-arsip-suratmasuk-suratkeluar.wuaze.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
