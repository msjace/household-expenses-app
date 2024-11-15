'use client'

import React, { useState, useEffect, createContext } from 'react'

import { onAuthStateChanged } from 'firebase/auth'

import type { IAuthProvider } from '@/common/interfaces/auth_provider'
import type { User } from 'firebase/auth'

import { auth } from '@/common/firebase'

export const AuthContext = createContext<IAuthProvider>({
  currentUser: null,
})

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
