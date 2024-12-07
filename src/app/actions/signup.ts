'use server'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { IUser } from '@/common/interfaces/user'

import {
  COOKIE_EXPIRESIN,
  type AuthEmailFormProps,
  type AuthEmailFormState,
} from '@/common/auth_form'
import { auth } from '@/common/firebase'
import { authAdmin } from '@/common/firebase_admin'
import { TextTransformer } from '@/common/text_transformer'
import { Time } from '@/common/time'
import { UserStoreRepository } from '@/repositories/server/store/user'
import { SignupValidation } from '@/services/server/validation/signup'

const registerUser = async (authemailForm: AuthEmailFormProps) => {
  try {
    const userCredential = await (async () => {
      return await createUserWithEmailAndPassword(
        auth,
        authemailForm!.email,
        authemailForm!.password
      )
    })()

    const userEmail = userCredential.user.email

    const user: IUser = {
      id: userCredential.user.uid,
      email: userEmail || '',
      created_at: Time.nowTimestamp(),
      updated_at: Time.nowTimestamp(),
    }

    await new UserStoreRepository(user.id).create(user)

    const uid = await userCredential.user.getIdToken()

    const sessionCookie = await authAdmin.createSessionCookie(uid, {
      expiresIn: COOKIE_EXPIRESIN,
    })
    await authAdmin.verifySessionCookie(sessionCookie, true)

    const cookiesInstance = await cookies()
    cookiesInstance.set({
      name: 'session',
      value: sessionCookie,
      maxAge: COOKIE_EXPIRESIN,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    })

    return { error: null }
  } catch (error: any) {
    return { error: TextTransformer.parseFirebaseError(error) }
  }
}

export async function signup(
  prevState: AuthEmailFormState,
  formData: FormData
): Promise<AuthEmailFormState> {
  const email = formData.get('email')?.toString() || ''
  const password = formData.get('password')?.toString() || ''

  const errors = SignupValidation.validateForm(email, password)

  if (errors) {
    return {
      email,
      password,
      zodErrors: errors,
      authErrors: null,
      message: 'Input error has occurred. Please fix it.',
    }
  }

  const response = await registerUser({ email, password })
  if (response.error) {
    return {
      email,
      password,
      zodErrors: null,
      authErrors: response.error,
      message: 'Sinup failed.',
    }
  }

  redirect('/expenses')
}
