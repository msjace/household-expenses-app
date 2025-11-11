import type { RowData } from '@/components/atoms/Table/Table'

import { getCategories } from '@/app/actions/category'
import { Time } from '@/common/time'
import { LinkButton } from '@/components/atoms/Button/LinkButton'
import { Table } from '@/components/atoms/Table/Table'
import { TableDataType } from '@/services/client/table'

export default async function Page(): Promise<React.ReactElement> {
  const categories = await getCategories()
  if (categories.length === 0) {
    return (
      <LinkButton
        content="Create"
        nextPage="/categories/create"
        position="center"
      />
    )
  }
  const convertedCategories: RowData[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    priority: category.priority,
    createdAt: Time.dateFormat(category.created_at),
  }))

  return (
    <>
      <LinkButton
        content="Create"
        nextPage="/categories/create"
        position="right"
      />
      <Table type={TableDataType.CATEGORIES} rows={convertedCategories} />
    </>
  )
}
