import { requireAuth } from '@/app/_auth/server'

export async function AuthGuard({ children }: { children: React.ReactNode }) {
  await requireAuth()

  return <>{children}</>
}
