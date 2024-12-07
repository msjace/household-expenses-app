import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

const igorePaths = [
  '/_next/static/css/ReactToastify.css.map',
  '/_next/static/react-toastify.esm.mjs.map',
]

export const middleware = (request: NextRequest): NextResponse => {
  const url = request.nextUrl
  if (igorePaths.some((path) => url.pathname.startsWith(path))) {
    return NextResponse.next()
  }
  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/expenses', request.url))
  }

  return NextResponse.next()
}
