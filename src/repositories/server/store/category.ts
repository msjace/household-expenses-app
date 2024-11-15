import type { ICategory } from '@/common/interfaces/category'
import type { CommonReferences } from '@/repositories/server/store/base/references'

import { References } from '@/repositories/server/store/base/references'
import { StoreRepository } from '@/repositories/server/store/base/repository'

export class CategoryStoreRepository extends StoreRepository<ICategory> {
  protected ref: CommonReferences<ICategory>

  constructor(userId: string) {
    super(userId)
    this.ref = new References(userId).category()
  }
}
