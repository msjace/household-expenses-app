import 'server-only'

import { cache } from 'react'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { IAuthUser } from '@/common/interfaces/user'

import { authAdmin } from '@/common/firebase_admin'

const getAuthUser = cache(async (): Promise<IAuthUser | null> => {
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
})

export const requireAuth = async (): Promise<IAuthUser> => {
  const authUser = await getAuthUser()
  if (!authUser) redirect('/login')
  return authUser
}
