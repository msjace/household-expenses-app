import { notFound } from 'next/navigation'

import { getCategory } from '@/app/actions/category'
import { CategoryForm } from '@/components/organisms/CategoryForm/CategoryForm'

interface Props {
  params: {
    categoryId: string
  }
}

export default async function Page({
  params,
}: Props): Promise<React.ReactElement> {
  const { categoryId } = await params

  const category = await getCategory(categoryId)
  if (!category) notFound()

  return <CategoryForm categoryJson={JSON.stringify(category)} />
}
