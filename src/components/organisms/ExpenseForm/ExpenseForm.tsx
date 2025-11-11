'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import styles from './ExpenseForm.module.css'

import type { ICategory } from '@/common/interfaces/category'
import type { IExpense } from '@/common/interfaces/expense'
import type { ErrorMessageState } from '@/services/client/alert'

import { useErrorAlert } from '@/services/client/alert'
import { InputType } from '@/services/client/expense_form'
import { ExpenseFormService } from '@/services/client/expense_form'

interface IExpenseFormProps {
  categoriesJson: string
  expenseJson: string
  isCreate?: boolean
}

export const ExpenseForm: React.FC<IExpenseFormProps> = (props) => {
  const router = useRouter()
  const [expense, setExpense] = useState<IExpense>(
    JSON.parse(props.expenseJson)
  )
  const [errorMessage, setErrorMessage] = useState<ErrorMessageState>(null)

  useErrorAlert(errorMessage)

  const onChangeInput = (
    type: InputType,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => ExpenseFormService.onChangeInput(type, e, setExpense)

  const save = () => {
    ExpenseFormService.save(router, expense, setErrorMessage, props.isCreate)
  }

  return (
    <div className={styles.formContainer}>
      <form>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="amount">
            amount
          </label>
          <input
            type="number"
            id="amount"
            value={expense.amount}
            onChange={(e): void => onChangeInput(InputType.AMOUNT, e)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={expense.description}
            onChange={(e): void => onChangeInput(InputType.DESCRIPTION, e)}
            className={styles.textarea}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={expense.category_id}
            onChange={(e): void => onChangeInput(InputType.CATEGORY_ID, e)}
            className={styles.select}
          >
            <option value="">--Select--</option>
            {JSON.parse(props.categoriesJson)
              .sort((a: ICategory, b: ICategory) => a.priority - b.priority)
              .map((c: ICategory) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="date">
            Date
          </label>
          <input
            id="date"
            type="date"
            defaultValue={expense.date}
            onChange={(e): void => onChangeInput(InputType.DATE, e)}
            className={styles.input}
          />
        </div>

        <button className={styles.submitButton} onClick={save} type="button">
          Submit
        </button>
      </form>
    </div>
  )
}
