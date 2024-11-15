import type { IExpense } from '@/common/interfaces/expense'

export class ExpenseValidation {
  public static validateForm(expense: IExpense): void {
    if (expense.amount <= 0) {
      throw new Error('Date must be greater than 0')
    }

    if (!expense.category_id) {
      throw new Error('Please select a category')
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!expense.date) {
      throw new Error('Please select a date')
    }
  }
}
