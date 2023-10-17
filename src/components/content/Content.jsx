/* eslint-disable react/prop-types */
import styles from "./Content.module.scss";

const Content = ({ children, className }) => {

    const classes = `${styles.content} ${className}`
  return <div className={classes}>{children}</div>;
};

export default Content;
