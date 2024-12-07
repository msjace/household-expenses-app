'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function userLogout() {
  const cookiesInstance = await cookies()
  cookiesInstance.delete('session')

  revalidatePath('/')
  redirect('/login')
}
