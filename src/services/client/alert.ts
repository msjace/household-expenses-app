import { useEffect, useRef } from 'react'

import { Flip, toast } from 'material-react-toastify'

export const showAlertErrorMessage = (message: string) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Flip,
  })
}

export type ErrorMessageState = {
  errorMessage?: string
} | null

export function useErrorAlert(state: ErrorMessageState) {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (state?.errorMessage) {
      showAlertErrorMessage(state.errorMessage)
    }
  }, [state])
}
