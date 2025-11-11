import { CategoryForm } from '@/components/organisms/CategoryForm/CategoryForm'
import { initCategory } from '@/services/server/category'

export default async function Page(): Promise<React.ReactElement> {
  const category = await initCategory()
  return <CategoryForm categoryJson={JSON.stringify(category)} isCreate />
}
