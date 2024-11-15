import { z } from 'zod'

import type { AuthEmailFormErrors } from '@/common/auth_form'

const schemaSinup = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z
    .string()
    .min(8, 'Please enter a password that is at least 8 characters long.')
    .regex(
      /^(?=.*?[a-z])(?=.*?\d)(?=.*?[!@#$%^&*()_\-+=~`[\]{}|:;"'<>,.?/\\])[a-z\d!@#$%^&*()_\-+=~`[\]{}|:;"'<>,.?/\\]{8,100}$/i,
      'Please enter a password that includes a combination of letters, numbers, and at least one special character.'
    ),
})

export class SignupValidation {
  public static validateForm(
    email: string,
    password: string
  ): AuthEmailFormErrors {
    const validatedFields = schemaSinup.safeParse({
      email: email,
      password: password,
    })

    if (!validatedFields.success) {
      return validatedFields.error.flatten().fieldErrors
    }

    return null
  }
}
