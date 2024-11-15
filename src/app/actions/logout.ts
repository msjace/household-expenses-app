'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function userLogout() {
  ;(await cookies()).delete('session')
  revalidatePath('/')
  redirect('/login')
}
