/** @type {import('next').NextConfig} */
const adminUrl = (
  process.env.NEXT_PUBLIC_ADMIN_URL ||
  process.env.HUANQIU_ADMIN_ORIGIN ||
  'https://admin.globle-trade.com'
)
  .trim()
  .replace(/[\r\n]/g, '')
  .replace(/\/$/, '')

const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (!adminUrl) return []
    return {
      afterFiles: [
        { source: '/admin', destination: `${adminUrl}/admin` },
        { source: '/admin/:path*', destination: `${adminUrl}/admin/:path*` },
        { source: '/api/admin/:path*', destination: `${adminUrl}/api/admin/:path*` },
      ],
    }
  },
}

export default nextConfig
