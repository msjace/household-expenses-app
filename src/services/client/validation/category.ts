import type { ICategory } from '@/common/interfaces/category'

export class CategoryValidation {
  public static validateForm(category: ICategory): void {
    if (!category.name) {
      throw new Error('Please enter a expense name')
    }

    if (category.priority < 0) {
      throw new Error('Priority must be greater than or equal to 0')
    }
  }
}
