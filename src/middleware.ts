import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

const publicPaths = ['/login', '/signup']

export const middleware = (request: NextRequest): NextResponse => {
  const url = request.nextUrl
  if (url.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  if (publicPaths.some((path) => url.pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const session = request.cookies.get('session')?.value
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/expenses', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt).*)'],
}