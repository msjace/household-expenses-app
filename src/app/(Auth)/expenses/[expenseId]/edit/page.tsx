import { redirect } from 'next/navigation'

import { getCategories } from '@/app/actions/category'
import { getExpense } from '@/app/actions/expense'
import { ExpenseForm } from '@/components/organisms/ExpenseForm/ExpenseForm'
import { getAuthUser } from '@/services/server/auth'

interface Props {
  params: {
    expenseId: string
  }
}

export default async function Page({
  params,
}: Props): Promise<React.ReactElement> {
  const { expenseId } = await params
  const authUser = await getAuthUser()
  if (!authUser) redirect('/login')

  const expense = await getExpense(expenseId, authUser.id)
  if (!expense) {
    redirect('/404')
  }
  const categories = await getCategories(authUser.id)
  return (
    <ExpenseForm
      categoriesJson={JSON.stringify(categories)}
      expenseJson={JSON.stringify(expense)}
      user={authUser}
    />
  )
}
