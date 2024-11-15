import { redirect } from 'next/navigation'

import { getCategories } from '@/app/actions/category'
import { getExpenses } from '@/app/actions/expense'
import { LinkButton } from '@/components/atoms/Button/LinkButton'
import { DashboardBody } from '@/components/organisms/DashboardBody/DashboardBody'
import { getAuthUser } from '@/services/server/auth'

export default async function Page(): Promise<React.ReactElement> {
  const authUser = await getAuthUser()
  if (!authUser) redirect('/login')

  const expenses = await getExpenses(authUser.id)
  if (expenses.length === 0) {
    return (
      <LinkButton
        content="Create Expense"
        nextPage="/expenses/create"
        position="center"
      />
    )
  }
  const categories = await getCategories(authUser.id)

  return (
    <DashboardBody
      expensesJson={JSON.stringify(expenses)}
      categoriesJson={JSON.stringify(categories)}
    />
  )
}
