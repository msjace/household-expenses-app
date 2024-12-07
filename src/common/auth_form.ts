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
  authErrors: string | null
  message: string | null
}

export const INITIAL_AUTH_FORM_STATE: AuthEmailFormState = {
  email: '',
  password: '',
  zodErrors: null,
  authErrors: null,
  message: null,
}

export const COOKIE_EXPIRESIN = 60 * 60 * 24 * 10 * 1000
