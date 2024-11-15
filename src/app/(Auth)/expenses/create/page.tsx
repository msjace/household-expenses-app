import { redirect } from 'next/navigation'

import { getCategories } from '@/app/actions/category'
import { ExpenseForm } from '@/components/organisms/ExpenseForm/ExpenseForm'
import { getAuthUser } from '@/services/server/auth'
import { initExpense } from '@/services/server/expense'

export default async function Page(): Promise<React.ReactElement> {
  const authUser = await getAuthUser()
  if (!authUser) redirect('/login')

  const categories = await getCategories(authUser.id)
  const expense = await initExpense()
  return (
    <ExpenseForm
      categoriesJson={JSON.stringify(categories)}
      expenseJson={JSON.stringify(expense)}
      user={authUser}
      isCreate
    />
  )
}
