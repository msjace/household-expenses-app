import type { FirestoreConverter } from '@/common/firestore'
import type { IUser } from '@/common/interfaces/user'

export const UserConverter: FirestoreConverter<IUser> = {
  toFirestore: (user) => user,
  fromFirestore: (snapshot, options?): IUser => {
    const data = snapshot.data(options) as IUser
    return data
  },
}
