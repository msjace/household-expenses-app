import { type User } from 'firebase/auth'

export interface IAuthProvider {
  currentUser: User | null
}
