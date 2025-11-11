import { v6 as uuidv6 } from 'uuid'

import type { ICategory } from '@/common/interfaces/category'
import type { ErrorMessageState } from '@/services/client/alert'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { createCategory, updateCategory } from '@/app/actions/category'
import { Time } from '@/common/time'
import { CategoryValidation } from '@/services/client/validation/category'

export const InputType = {
  NAME: 'name',
  PRIORITY: 'priority',
} as const
export type InputType = (typeof InputType)[keyof typeof InputType]

export class CategoryFormService {
  public static init(): ICategory {
    return {
      id: uuidv6(),
      name: '',
      priority: 0,
      created_at: Time.nowTimestamp(),
      updated_at: Time.nowTimestamp(),
    }
  }

  public static onChangeInput(
    type: InputType,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    setCategory: React.Dispatch<React.SetStateAction<ICategory>>
  ): void {
    const newCategory: Partial<ICategory> = (() => {
      switch (type) {
        case InputType.NAME:
          return { name: e.target.value }
        case InputType.PRIORITY:
          if (isNaN(Number(e.target.value))) {
            return { priority: 0 }
          }
          return { priority: Number(e.target.value) }
      }
    })()

    setCategory((prev) => ({ ...prev, ...newCategory }))
  }

  public static async save(
    router: AppRouterInstance,
    category: ICategory,
    setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageState>>,
    isCreate = false
  ): Promise<void> {
    try {
      CategoryValidation.validateForm(category)

      if (isCreate) {
        await createCategory(category)
      } else {
        await updateCategory(category)
      }

      router.push('/categories')
      return
    } catch (error: any) {
      setErrorMessage({ errorMessage: error.message })
    }
  }
}
