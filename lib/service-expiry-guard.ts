export const GUARD_VERSION = '2026-10-01'
export const SERVICE_STATUS_PROTOCOL_VERSION = 1

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || ''
const ADMIN_ORIGIN = (
  process.env.NEXT_PUBLIC_ADMIN_URL ||
  process.env.HUANQIU_ADMIN_ORIGIN ||
  'https://admin.globle-trade.com'
).replace(/\/$/, '')

export function isServiceGuardExcludedPath(pathname: string): boolean {
  return (
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/service-expired' ||
    pathname === '/favicon.ico' ||
    pathname === '/icon.png' ||
    pathname === '/apple-icon.png' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/llms.txt' ||
    /\.(?:png|jpg|jpeg|webp|svg|ico|css|js|map|woff2?)$/i.test(pathname)
  )
}

export async function isWebsiteServiceAvailable(): Promise<boolean> {
  if (!TENANT_ID || !ADMIN_ORIGIN) return true
  try {
    const res = await fetch(
      `${ADMIN_ORIGIN}/api/public/service-status/${encodeURIComponent(TENANT_ID)}`,
      {
        signal: AbortSignal.timeout(2500),
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      }
    )
    if (!res.ok) return true
    const data = await res.json()
    if (!data || data.version !== SERVICE_STATUS_PROTOCOL_VERSION) return true
    if (data.available === false && data.status === 'expired') return false
    return true
  } catch {
    return true
  }
}
