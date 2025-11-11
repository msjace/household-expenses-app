import { getCategories } from '@/app/actions/category'
import { ExpenseForm } from '@/components/organisms/ExpenseForm/ExpenseForm'
import { initExpense } from '@/services/server/expense'

export default async function Page(): Promise<React.ReactElement> {
  const categories = await getCategories()
  const expense = await initExpense()
  return (
    <ExpenseForm
      categoriesJson={JSON.stringify(categories)}
      expenseJson={JSON.stringify(expense)}
      isCreate
    />
  )
}
