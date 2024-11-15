import {
  collection,
  doc,
  type CollectionReference,
  type DocumentReference,
} from 'firebase/firestore'

import type { ICategory } from '@/common/interfaces/category'
import type { IExpense } from '@/common/interfaces/expense'
import type { IUser } from '@/common/interfaces/user'
import type { FirestoreDataConverter } from 'firebase/firestore'

import { firestore } from '@/common/firebase'
import { CategoryConverter } from '@/repositories/firestore_converter/category'
import { ExpenseConverter } from '@/repositories/firestore_converter/expense'
import { UserConverter } from '@/repositories/firestore_converter/user'

export interface CommonReferences<T> {
  collection: CollectionReference<T>
  doc: (id: string) => DocumentReference<T>
}

export class References {
  public userId: string

  constructor(userId: string) {
    this.userId = userId
  }

  public static user: CommonReferences<IUser> = {
    collection: collection(firestore, 'users').withConverter<IUser>(
      UserConverter
    ),
    doc: (teamId: string) => doc(this.user.collection, teamId),
  }

  private collectionOfUser<T>(
    collectionName: string,
    converter: FirestoreDataConverter<T>
  ): CollectionReference<T> {
    return collection(
      References.user.doc(this.userId),
      collectionName
    ).withConverter(converter)
  }

  public category(): CommonReferences<ICategory> {
    return {
      collection: this.collectionOfUser<ICategory>(
        'categories',
        CategoryConverter
      ),
      doc: (id: string) => doc(this.category().collection, id),
    }
  }

  public expense(): CommonReferences<IExpense> {
    return {
      collection: this.collectionOfUser<IExpense>('expenses', ExpenseConverter),
      doc: (id: string) => doc(this.expense().collection, id),
    }
  }
}
