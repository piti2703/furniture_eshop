import styles from './Input.module.scss'

const Input = ({name, register, placeholder, error, type}) => {
  return (
    <div className={styles.input}>
        <input className={styles.input__input} {...register(name)} placeholder={placeholder} type={type} />
        {error && <p role="alert" className={styles['input__input-error']}>{error.toString()}</p>}
    </div>
  )
}

export default Input