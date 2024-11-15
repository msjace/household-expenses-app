import type { IExpense } from '@/common/interfaces/expense'
import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'

export const ExpenseConverter: FirestoreDataConverter<IExpense> = {
  toFirestore: (expense: IExpense): DocumentData => expense,
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions
  ): IExpense => {
    const data = snapshot.data(options) as IExpense
    return data
  },
}
