import { createHash } from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'tlr_admin_session'

export function getSessionToken() {
  const username = process.env.ADMIN_USERNAME || ''
  const password = process.env.ADMIN_PASSWORD || ''
  return createHash('sha256')
    .update(`${username}:${password}:tlr-admin`)
    .digest('hex')
}

export function verifyCredentials(username: string, password: string) {
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  )
}

export function isAdminAuthenticated() {
  return cookies().get(ADMIN_COOKIE)?.value === getSessionToken()
}
