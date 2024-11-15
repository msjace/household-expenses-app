import type client from 'firebase/firestore'
import type admin from 'firebase-admin/firestore'

export type FirestoreConverter<T> = {
  toFirestore: (
    data: T | admin.WithFieldValue<T>
  ) => client.DocumentData | admin.WithFieldValue<T>
  fromFirestore: (
    snapshot:
      | client.QueryDocumentSnapshot<client.DocumentData>
      | admin.QueryDocumentSnapshot,
    options?: client.SnapshotOptions
  ) => T
}
