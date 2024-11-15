import type { Timestamp } from 'firebase/firestore'

export interface ICategory {
  id: string
  name: string
  priority: number
  created_at: Timestamp
  updated_at: Timestamp
}
