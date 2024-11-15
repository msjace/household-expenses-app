import { notFound, redirect } from 'next/navigation'

import { getCategory } from '@/app/actions/category'
import { CategoryForm } from '@/components/organisms/CategoryForm/CategoryForm'
import { getAuthUser } from '@/services/server/auth'

interface Props {
  params: {
    categoryId: string
  }
}

export default async function Page({
  params,
}: Props): Promise<React.ReactElement> {
  const { categoryId } = await params

  const authUser = await getAuthUser()
  if (!authUser) redirect('/login')

  const category = await getCategory(categoryId, authUser.id)
  if (!category) notFound()

  return (
    <CategoryForm user={authUser} categoryJson={JSON.stringify(category)} />
  )
}
