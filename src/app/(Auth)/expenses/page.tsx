import { redirect } from 'next/navigation'

import type { RowData } from '@/components/atoms/Table/Table'

import { getCategories } from '@/app/actions/category'
import { getExpenses } from '@/app/actions/expense'
import { LinkButton } from '@/components/atoms/Button/LinkButton'
import { Table } from '@/components/atoms/Table/Table'
import { TableDataType } from '@/services/client/table'
import { getAuthUser } from '@/services/server/auth'

export default async function Page(): Promise<React.ReactElement> {
  const authUser = await getAuthUser()
  if (!authUser) redirect('/login')

  const expenses = await getExpenses(authUser.id)
  if (expenses.length === 0) {
    return (
      <LinkButton
        content="Create"
        nextPage="/expenses/create"
        position="center"
      />
    )
  }

  const categories = await getCategories(authUser.id)
  const convertedExpenses: RowData[] = expenses.map((ex) => ({
    id: ex.id,
    amount: ex.amount,
    description: ex.description,
    category: categories.find((cat) => cat.id === ex.category_id)?.name || '',
    date: ex.date,
  }))

  return (
    <>
      <LinkButton
        content="Create"
        nextPage="/expenses/create"
        position="right"
      />
      <Table
        type={TableDataType.EXPENSES}
        rows={convertedExpenses}
        userId={authUser.id}
      />
    </>
  )
}
