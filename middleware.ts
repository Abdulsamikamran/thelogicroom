import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_COOKIE = 'tlr_admin_session'

async function getSessionToken() {
  const data = `${process.env.ADMIN_USERNAME || ''}:${process.env.ADMIN_PASSWORD || ''}:tlr-admin`
  const encoded = new TextEncoder().encode(data)
  const hash = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminApi = pathname.startsWith('/api/admin')
  const isAuthApi = pathname === '/api/admin/auth'

  if (!isAdminApi) return NextResponse.next()
  if (isAuthApi) return NextResponse.next()

  const token = request.cookies.get(ADMIN_COOKIE)?.value
  const expected = await getSessionToken()

  if (token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/admin/:path*'],
}
