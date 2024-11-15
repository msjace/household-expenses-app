import { z } from 'zod'

import type { AuthEmailFormErrors } from '@/common/auth_form'

const schemaLogin = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, 'The password is incorrect.'),
})

export class LoginValidation {
  public static validateForm(
    email: string,
    password: string
  ): AuthEmailFormErrors {
    const validatedFields = schemaLogin.safeParse({
      email: email,
      password: password,
    })

    if (!validatedFields.success) {
      return validatedFields.error.flatten().fieldErrors
    }

    return null
  }
}
