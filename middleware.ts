import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/admin-session'
import { isServiceGuardExcludedPath, isWebsiteServiceAvailable } from '@/lib/service-expiry-guard'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    const isPublicAdmin =
      pathname.startsWith('/admin/login') || pathname.startsWith('/admin/logout')
    if (!isPublicAdmin && !request.cookies.get(SESSION_COOKIE)?.value) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      loginUrl.searchParams.set('reason', 'unauthorized')
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  if (isServiceGuardExcludedPath(pathname)) {
    return NextResponse.next()
  }

  const available = await isWebsiteServiceAvailable()
  if (!available) {
    const url = request.nextUrl.clone()
    url.pathname = '/service-expired'
    return NextResponse.rewrite(url)
  }

  const isZh = pathname === '/zh' || pathname.startsWith('/zh/')
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', isZh ? 'zh' : 'en')
  requestHeaders.set('x-pathname', pathname)

  if (isZh) {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = pathname === '/zh' ? '/' : pathname.slice(3) || '/'
    return NextResponse.rewrite(rewriteUrl, { request: { headers: requestHeaders } })
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)'],
}
