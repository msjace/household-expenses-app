import type { Timestamp } from 'firebase/firestore'

export interface IUser {
  id: string
  email: string
  created_at: Timestamp
  updated_at: Timestamp
}

export interface IAuthUser {
  id: string
  email: string
}
