import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // TODO: change from cookie when API is implemented
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value
  const isLoginPage = request.nextUrl.pathname === '/login'

  // Redirect to login if not logged in and trying to access protected routes
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to dashboard if logged in and trying to access login page
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Configure which paths should be protected
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
} 