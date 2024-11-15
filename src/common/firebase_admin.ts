import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

import type { ServiceAccount } from 'firebase-admin/app'
import 'server-only'

const firebaseAdminConfig: ServiceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? '').replace(
    /\\n/g,
    '\n'
  ),
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
}

const appName = 'firebase-admin'

const app = getApps().length
  ? getApp(appName)
  : initializeApp(
      {
        credential: cert(firebaseAdminConfig),
      },
      appName
    )

export const authAdmin = getAuth(app)
