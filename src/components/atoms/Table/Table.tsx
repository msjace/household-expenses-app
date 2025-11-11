'use client'

import { useState } from 'react'

import styles from './table.module.css'

import type { TableDataType } from '@/services/client/table'

import { TableService } from '@/services/client/table'

export interface RowData {
  id: string
  [key: string]: string | number
}

interface ITableProps {
  type: TableDataType
  rows: RowData[]
}

export const Table: React.FC<ITableProps> = (props) => {
  const rows = props.rows

  const [sortedRows, setRows] = useState<RowData[]>(rows)
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [sortKey, setSortKey] = useState<keyof RowData>('')

  const filterItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    TableService.filterItems(e, rows, setRows)
  }

  const sortItems = (value: keyof RowData, order: 'asc' | 'desc') => {
    TableService.sortItems(value, order, sortedRows, setRows, setSortKey)
  }

  const changeOrderSortItems = () => {
    const updatedOrder = order === 'asc' ? 'desc' : 'asc'
    setOrder(updatedOrder)
    sortItems(sortKey, updatedOrder)
  }

  const deleteDoc = (categoryId: string): void => {
    TableService.deleteDoc(props.type, categoryId, setRows)
  }

  return (
    <>
      <div className={styles.filterInputWrapper}>
        <input
          className={styles.filterInput}
          type="text"
          placeholder="Filter items"
          onChange={filterItems}
        />
      </div>

      <div className={styles.controls}>
        <div className={styles.sortSelectWrapper}>
          <select
            aria-label="Sort options"
            className={styles.sortSelect}
            onChange={(event) =>
              sortItems(event.target.value as keyof RowData, order)
            }
            name="select"
          >
            <option value="">-- Select Order --</option>
            {Object.entries(rows[0]).map(([key], index) =>
              key === 'id' || key === 'description' ? null : (
                <option
                  className={styles.orderByOption}
                  value={key}
                  key={`select-${index}`}
                >
                  Order by {key}
                </option>
              )
            )}
          </select>
        </div>
        <div className={styles.orderSwitchWrapper}>
          <button
            className={styles.switchOrderbutton}
            onClick={changeOrderSortItems}
            type="button"
          >
            Switch order ({order})
          </button>
        </div>
      </div>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {Object.keys(rows[0]).map((entry, index) => (
              <th className={styles.th} key={`th-${index}`}>
                {entry === 'id' ? 'operations' : entry}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row: RowData, index: number) => (
            <tr className={styles.tr} key={`row-${index}`}>
              {Object.entries(row).map(([key, entry], columnIndex) => (
                <td className={styles.td} key={`row-value-${columnIndex}`}>
                  {key === 'id' ? (
                    <>
                      <div className={styles.operationContainer}>
                        <a
                          href={`/${props.type}/${entry}/edit`}
                          className={styles.link}
                        >
                          Edit
                        </a>
                      </div>
                      <div className={styles.operationContainer}>
                        <button
                          className={styles.deleteButton}
                          type="button"
                          onClick={() => deleteDoc(entry as string)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    entry
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
