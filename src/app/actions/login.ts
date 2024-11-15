'use server'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { redirect } from 'next/navigation'

import type { AuthEmailFormProps, AuthEmailFormState } from '@/common/auth_form'

import { auth } from '@/common/firebase'
import { setCookies } from '@/services/server/auth'
import { LoginValidation } from '@/services/server/validation/login'

const loginUser = async (authemailForm: AuthEmailFormProps) => {
  try {
    const userCredential = await (async () => {
      return signInWithEmailAndPassword(
        auth,
        authemailForm.email,
        authemailForm.password
      )
    })()

    const uid = await userCredential.user.getIdToken()
    await setCookies(uid)

    return { error: null }
  } catch (error: any) {
    return { error: error.message as string }
  }
}

export async function login(
  prevState: AuthEmailFormState,
  formData: FormData
): Promise<AuthEmailFormState> {
  const email = formData.get('email')?.toString() || ''
  const password = formData.get('password')?.toString() || ''

  const errors = LoginValidation.validateForm(email, password)

  if (errors) {
    return {
      email,
      password,
      zodErrors: errors,
      registerErrors: null,
      message:
        'Input error has occurred.  Please check your email and password.',
    }
  }

  const response = await loginUser({ email, password })
  if (response.error) {
    return {
      email,
      password,
      zodErrors: null,
      registerErrors: response.error,
      message: 'Login failed.',
    }
  }

  redirect('/expenses')
}
