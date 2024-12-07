'use server'

import { cookies } from 'next/headers'

import type { IAuthUser } from '@/common/interfaces/user'

import { authAdmin } from '@/common/firebase_admin'

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
