'use client'

import { useActionState } from 'react'

import Link from 'next/link'

import styles from './login.module.css'

import { login } from '@/app/actions/login'
import { INITIAL_AUTH_FORM_STATE } from '@/common/auth_form'
import { FormElement } from '@/components/molecules/FormElement/FormElement'

export default function Page(): React.ReactElement {
  const [state, formAction, pending] = useActionState(
    login,
    INITIAL_AUTH_FORM_STATE
  )
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>login</h2>
        <form className={styles.form} action={formAction}>
          <FormElement
            item="email"
            value={state.email}
            errors={state.zodErrors?.email}
          />
          <FormElement
            item="password"
            value={state.password}
            errors={state.zodErrors?.password}
          />
          <div className={styles.buttonWrapper}>
            <button
              className={styles.submitButton}
              type="submit"
              disabled={pending}
            >
              {pending ? 'pending ...' : 'login'}
            </button>
          </div>
        </form>
        <div className={styles.signupLink}>
          <Link href="/signup">New to app? Create an account</Link>
        </div>
      </div>
    </div>
  )
}
