import styles from './validateErrors.module.css'

interface IValidateErrorsProps {
  error: string[] | null
}

export const ValidateErrors: React.FC<IValidateErrorsProps> = (props) => {
  if (!props.error) return null
  return (
    <>
      {props.error.map((error, index) => (
        <p className={styles.errorMeassage} key={index}>
          {error}
        </p>
      ))}
    </>
  )
}
