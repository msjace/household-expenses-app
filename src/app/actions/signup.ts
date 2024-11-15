'use server'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { redirect } from 'next/navigation'

import type { AuthEmailFormProps, AuthEmailFormState } from '@/common/auth_form'
import type { IUser } from '@/common/interfaces/user'

import { auth } from '@/common/firebase'
import { Time } from '@/common/time'
import { UserStoreRepository } from '@/repositories/server/store/user'
import { setCookies } from '@/services/server/auth'
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
    await setCookies(uid)

    return { error: null }
  } catch (error: any) {
    return { error: error.message as string }
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
      registerErrors: null,
      message: 'Input error has occurred. Please fix it.',
    }
  }

  const response = await registerUser({ email, password })
  if (response.error) {
    return {
      email,
      password,
      zodErrors: null,
      registerErrors: response.error,
      message: 'Sinup failed.',
    }
  }

  redirect('/expenses')
}
