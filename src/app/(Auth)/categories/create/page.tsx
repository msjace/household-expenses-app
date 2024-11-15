import { redirect } from 'next/navigation'

import { CategoryForm } from '@/components/organisms/CategoryForm/CategoryForm'
import { getAuthUser } from '@/services/server/auth'
import { initCategory } from '@/services/server/category'

export default async function Page(): Promise<React.ReactElement> {
  const authUser = await getAuthUser()
  if (!authUser) redirect('/login')

  const category = await initCategory()
  return (
    <CategoryForm
      user={authUser}
      categoryJson={JSON.stringify(category)}
      isCreate
    />
  )
}
