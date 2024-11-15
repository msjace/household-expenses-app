import styles from './formElement.module.css'

import { ValidateErrors } from '@/components/molecules/validateErrors/validateErrors'

interface IFormElementProps {
  item: string
  value?: string
  errors?: string[] | null
}

export const FormElement: React.FC<IFormElementProps> = (props) => {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor={props.item}>
          {props.item}
        </label>
        <input
          id={props.item}
          name={props.item}
          placeholder={props.item}
          defaultValue={props.value}
          className={styles.input}
          type={props.item === 'password' ? 'password' : 'text'}
        />
      </div>
      {props.errors && <ValidateErrors error={props.errors} />}
    </div>
  )
}
