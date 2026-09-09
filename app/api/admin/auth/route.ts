import { NextResponse } from 'next/server'
import {
  ADMIN_COOKIE,
  getSessionToken,
  isAdminAuthenticated,
  verifyCredentials,
} from '@/lib/admin-auth'

export async function GET() {
  return NextResponse.json({ authenticated: isAdminAuthenticated() })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const username = String(body.username || '')
  const password = String(body.password || '')

  if (!verifyCredentials(username, password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(ADMIN_COOKIE, getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete(ADMIN_COOKIE)
  return response
}
