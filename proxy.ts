import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  const { pathname } = request.nextUrl

  // Define paths that are always accessible
  const isAuthPage = pathname === '/login' || pathname === '/'
  const isPublicAsset = pathname.startsWith('/_next') || pathname.includes('.')

  if (!session && !isAuthPage && !isPublicAsset) {
    // If not logged in and trying to access a protected page, redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (session && isAuthPage && pathname !== '/') {
    // If logged in and trying to access login page, redirect to world
    return NextResponse.redirect(new URL('/world', request.url))
  }

  return NextResponse.next()
}

// Support both naming conventions
export default middleware;
export const proxy = middleware;

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
