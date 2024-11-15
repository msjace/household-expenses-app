import type { RowData } from '@/components/atoms/Table/Table'

import { deleteCategory } from '@/app/actions/category'
import { deleteExpense } from '@/app/actions/expense'

export enum TableDataType {
  EXPENSES = 'expenses',
  CATEGORIES = 'categories',
}

export class TableService {
  public static async filterItems(
    e: React.ChangeEvent<HTMLInputElement>,
    rows: RowData[],
    setRows: React.Dispatch<React.SetStateAction<RowData[]>>
  ) {
    const value = e.target.value.toLowerCase()

    if (value) {
      setRows([
        ...rows.filter((row: RowData) => {
          const searchableValues = Object.entries(row)
            .filter(([key]) => key !== 'id')
            .map(([, val]) => val)
            .join('')
            .toLowerCase()

          return searchableValues.includes(value)
        }),
      ])
    } else {
      setRows(rows)
    }
  }

  public static sortItems(
    value: keyof RowData,
    order: 'asc' | 'desc',
    sortedRows: RowData[],
    setRows: React.Dispatch<React.SetStateAction<RowData[]>>,
    setSortKey: React.Dispatch<React.SetStateAction<keyof RowData>>
  ) {
    const sortOrder = order === 'desc' ? -1 : 1

    setSortKey(value)
    setRows([
      ...sortedRows.sort((currentItem, nextItem) => {
        const currentItemValue = currentItem[value]
        const nextItemValue = nextItem[value]

        if (
          typeof currentItemValue === 'string' &&
          typeof nextItemValue === 'string'
        ) {
          return currentItemValue.localeCompare(nextItemValue) * sortOrder
        } else if (
          typeof currentItemValue === 'number' &&
          typeof nextItemValue === 'number'
        ) {
          return (currentItemValue - nextItemValue) * sortOrder
        } else {
          return 0
        }
      }),
    ])
  }

  public static async deleteDoc(
    type: TableDataType,
    docId: string,
    userId: string,
    setRows: React.Dispatch<React.SetStateAction<RowData[]>>
  ): Promise<void> {
    switch (type) {
      case TableDataType.CATEGORIES:
        await deleteCategory(docId, userId)
        break
      case TableDataType.EXPENSES:
        await deleteExpense(docId, userId)
        break
    }
    setRows((prev) => prev.filter((row) => row.id !== docId))
  }
}
