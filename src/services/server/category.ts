import { v6 as uuidv6 } from 'uuid'

import type { ICategory } from '@/common/interfaces/category'

import { Time } from '@/common/time'

export const initCategory = async (): Promise<ICategory> => {
  return {
    id: uuidv6(),
    name: '',
    priority: 0,
    created_at: Time.nowTimestamp(),
    updated_at: Time.nowTimestamp(),
  }
}
