'use server'

import { cookies } from 'next/headers'

import type { IAuthUser } from '@/common/interfaces/user'

import { authAdmin } from '@/common/firebase_admin'

export async function setCookies(token: string) {
  const expiresIn = 60 * 60 * 24 * 10
  const sessionCookie = await authAdmin.createSessionCookie(token, {
    expiresIn: expiresIn * 1000,
  })

  await authAdmin.verifySessionCookie(sessionCookie, true)
  ;(await cookies()).set({
    name: 'session',
    value: sessionCookie,
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  })
}

export async function getAuthUser(): Promise<IAuthUser | null> {
  const session = (await cookies()).get('session')?.value
  if (!session) {
    return null
  }

  try {
    const token = await authAdmin.verifySessionCookie(session, true)
    const authUser: IAuthUser = {
      id: token.uid,
      email: token.email ?? '',
    }
    return authUser
  } catch {
    return null
  }
}
