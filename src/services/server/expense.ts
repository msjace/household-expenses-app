import { v6 as uuidv6 } from 'uuid'

import type { IExpense } from '@/common/interfaces/expense'

import { Time } from '@/common/time'

export const initExpense = async (): Promise<IExpense> => {
  return {
    id: uuidv6(),
    amount: 0,
    description: '',
    category_id: '',
    date: Time.DatetimeLocalFormat(),
    created_at: Time.nowTimestamp(),
    updated_at: Time.nowTimestamp(),
  }
}
