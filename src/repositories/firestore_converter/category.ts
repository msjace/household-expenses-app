import type { ICategory } from '@/common/interfaces/category'
import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'

export const CategoryConverter: FirestoreDataConverter<ICategory> = {
  toFirestore: (category: ICategory): DocumentData => category,
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions
  ): ICategory => {
    const data = snapshot.data(options) as ICategory
    return data
  },
}
