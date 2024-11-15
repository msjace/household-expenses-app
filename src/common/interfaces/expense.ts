import type { Timestamp } from 'firebase/firestore'

export interface IExpense {
  id: string
  amount: number
  description: string
  category_id: string
  date: string
  created_at: Timestamp
  updated_at: Timestamp
}

export interface ITableExpense {
  id: string
  amount: number
  description: string
  category: string
  date: string
}
