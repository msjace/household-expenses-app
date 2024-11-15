import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export const middleware = (request: NextRequest): NextResponse => {
  return NextResponse.redirect(new URL('/expenses', request.url))
}

export const config = {
  matcher: ['/'],
}
