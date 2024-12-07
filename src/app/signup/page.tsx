'use client'

import { useActionState } from 'react'

import Link from 'next/link'

import styles from './signup.module.css'

import { signup } from '@/app/actions/signup'
import { INITIAL_AUTH_FORM_STATE } from '@/common/auth_form'
import { FormElement } from '@/components/molecules/FormElement/FormElement'

export default function Page(): React.ReactElement {
  const [state, formAction, pending] = useActionState(
    signup,
    INITIAL_AUTH_FORM_STATE
  )
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>signup</h2>
        {state.authErrors && (
          <div className={styles.errorMeassage}>{state.authErrors}</div>
        )}
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
              {pending ? 'pending ...' : 'signup'}
            </button>
          </div>
        </form>
        <div className={styles.loginLink}>
          <Link href="/login">Already have an account? Login here.</Link>
        </div>
      </div>
    </div>
  )
}
