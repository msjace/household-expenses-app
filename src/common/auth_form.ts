export type AuthEmailFormProps = {
  email: string
  password: string
}

export type AuthEmailFormErrors = {
  email?: string[]
  password?: string[]
} | null

export type AuthEmailFormState = AuthEmailFormProps & {
  zodErrors: AuthEmailFormErrors
  registerErrors: string | null
  message: string | null
}

export const INITIAL_AUTH_FORM_STATE: AuthEmailFormState = {
  email: '',
  password: '',
  zodErrors: null,
  registerErrors: null,
  message: null,
}
