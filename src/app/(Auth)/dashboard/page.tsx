import { getCategories } from '@/app/actions/category'
import { getExpenses } from '@/app/actions/expense'
import { LinkButton } from '@/components/atoms/Button/LinkButton'
import { DashboardBody } from '@/components/organisms/DashboardBody/DashboardBody'

export default async function Page(): Promise<React.ReactElement> {
  const expenses = await getExpenses()
  if (expenses.length === 0) {
    return (
      <LinkButton
        content="Create Expense"
        nextPage="/expenses/create"
        position="center"
      />
    )
  }
  const categories = await getCategories()

  return (
    <DashboardBody
      expensesJson={JSON.stringify(expenses)}
      categoriesJson={JSON.stringify(categories)}
    />
  )
}
