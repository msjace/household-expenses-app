'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import styles from './categoryForm.module.css'

import type { ICategory } from '@/common/interfaces/category'
import type { IAuthUser } from '@/common/interfaces/user'
import type { ErrorMessageState } from '@/services/client/alert'

import { useErrorAlert } from '@/services/client/alert'
import { CategoryFormService, InputType } from '@/services/client/category_form'

interface ICategoryFormProps {
  user: IAuthUser
  categoryJson: string
  isCreate?: boolean
}

export const CategoryForm: React.FC<ICategoryFormProps> = (props) => {
  const router = useRouter()
  const [category, setCategory] = useState<ICategory>(
    JSON.parse(props.categoryJson)
  )

  const [errorMessage, setErrorMessage] = useState<ErrorMessageState>(null)

  useErrorAlert(errorMessage)

  const onChangeInput = (
    type: InputType,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => CategoryFormService.onChangeInput(type, e, setCategory)

  const save = () => {
    CategoryFormService.save(
      router,
      category,
      props.user.id,
      setErrorMessage,
      props.isCreate
    )
  }
  return (
    <div className={styles.formContainer}>
      <form>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="name">
            name
          </label>
          <input
            type="text"
            id="name"
            value={category.name}
            onChange={(e): void => onChangeInput(InputType.NAME, e)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="priority">
            Priority
          </label>
          <input
            id="priority"
            value={category.priority}
            type="number"
            onChange={(e): void => onChangeInput(InputType.PRIORITY, e)}
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
