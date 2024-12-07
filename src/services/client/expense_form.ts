import { v6 as uuidv6 } from 'uuid'

import type { IExpense } from '@/common/interfaces/expense'
import type { ErrorMessageState } from '@/services/client/alert'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { createExpense, updateExpense } from '@/app/actions/expense'
import { Time } from '@/common/time'
import { ExpenseValidation } from '@/services/client/validation/expense'

export const InputType = {
  AMOUNT: 'amount',
  DESCRIPTION: 'description',
  CATEGORY_ID: 'category_id',
  DATE: 'date',
} as const
export type InputType = (typeof InputType)[keyof typeof InputType]

export class ExpenseFormService {
  public static init(): IExpense {
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

  public static onChangeInput(
    type: InputType,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    setExpense: React.Dispatch<React.SetStateAction<IExpense>>
  ): void {
    const newExpense: Partial<IExpense> = (() => {
      switch (type) {
        case InputType.AMOUNT:
          if (isNaN(Number(e.target.value))) {
            return { amount: 0 }
          }
          return { amount: Number(e.target.value) }
        case InputType.DESCRIPTION:
          return { description: e.target.value }
        case InputType.CATEGORY_ID:
          return { category_id: e.target.value }
        case InputType.DATE:
          return { date: e.target.value }
      }
    })()

    setExpense((prev) => ({ ...prev, ...newExpense }))
  }

  public static async save(
    router: AppRouterInstance,
    expense: IExpense,
    userId: string,
    setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageState>>,
    isCreate = false
  ): Promise<void> {
    try {
      ExpenseValidation.validateForm(expense)

      if (isCreate) {
        await createExpense(expense, userId)
      } else {
        await updateExpense(expense, userId)
      }

      router.push('/expenses')
    } catch (error: any) {
      setErrorMessage({ errorMessage: error.message })
    }
  }
}
