import {
  deleteDoc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore'

import type { CommonReferences } from '@/repositories/server/store/base/references'
import type { QueryConstraint } from 'firebase/firestore'

import { Time } from '@/common/time'

interface IdObject {
  readonly id: string
}

export abstract class StoreRepository<T extends IdObject> {
  protected userId: string

  protected abstract ref: CommonReferences<T>

  constructor(userId: string) {
    this.userId = userId
  }

  public async get(...queryConstraints: QueryConstraint[]): Promise<T[]> {
    try {
      const q = query(this.ref.collection, ...queryConstraints)
      const data = await getDocs(q)
      return data.docs.map((doc) => doc.data())
    } catch (error) {
      console.error(error)
    }
    return []
  }

  public async getRecentData(): Promise<T[]> {
    return this.get(orderBy('created_at', 'desc'))
  }

  public async findById(id: string): Promise<T | null> {
    try {
      const doc = await getDoc(this.ref.doc(id))
      if (doc.exists()) {
        return doc.data()
      }
    } catch (error) {
      console.error(error)
    }
    return null
  }

  public async create(data: T): Promise<void> {
    if ('created_at' in data) {
      data.created_at = Time.nowTimestamp()
    }
    if ('updated_at' in data) {
      data.updated_at = Time.nowTimestamp()
    }
    await setDoc(this.ref.doc(data.id), data)
  }

  public async update(id: string, data: T): Promise<void> {
    if ('updated_at' in data) {
      data.updated_at = Time.nowTimestamp()
    }
    await setDoc(this.ref.doc(id), data)
  }

  public async delete(id: string): Promise<void> {
    await deleteDoc(this.ref.doc(id))
  }
}
