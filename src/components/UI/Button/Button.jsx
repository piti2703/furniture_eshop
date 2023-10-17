import styles from "./Button.module.scss";

const Button = ({ onClick, className, type, children }) => {
  const classNames = `${className} ${styles.button}`;
  return (
    <button onClick={onClick} type={type} className={classNames}>
      {children}
    </button>
  );
};

export default Button;
