import type { IUser } from '@/common/interfaces/user'
import type { CommonReferences } from '@/repositories/server/store/base/references'

import { References } from '@/repositories/server/store/base/references'
import { StoreRepository } from '@/repositories/server/store/base/repository'

export class UserStoreRepository extends StoreRepository<IUser> {
  protected ref: CommonReferences<IUser>

  constructor(userId: string) {
    super(userId)
    this.ref = References.user
  }
}
