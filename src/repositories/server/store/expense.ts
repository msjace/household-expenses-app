import type { IExpense } from '@/common/interfaces/expense'
import type { CommonReferences } from '@/repositories/server/store/base/references'

import { References } from '@/repositories/server/store/base/references'
import { StoreRepository } from '@/repositories/server/store/base/repository'

export class ExpenseStoreRepository extends StoreRepository<IExpense> {
  protected ref: CommonReferences<IExpense>

  constructor(userId: string) {
    super(userId)
    this.ref = new References(userId).expense()
  }
}
