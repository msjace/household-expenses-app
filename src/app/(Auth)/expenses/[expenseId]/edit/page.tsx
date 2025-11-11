import { redirect } from 'next/navigation'

import { getCategories } from '@/app/actions/category'
import { getExpense } from '@/app/actions/expense'
import { ExpenseForm } from '@/components/organisms/ExpenseForm/ExpenseForm'

interface Props {
  params: {
    expenseId: string
  }
}

export default async function Page({
  params,
}: Props): Promise<React.ReactElement> {
  const { expenseId } = await params

  const expense = await getExpense(expenseId)
  if (!expense) {
    redirect('/404')
  }
  const categories = await getCategories()
  return (
    <ExpenseForm
      categoriesJson={JSON.stringify(categories)}
      expenseJson={JSON.stringify(expense)}
    />
  )
}
