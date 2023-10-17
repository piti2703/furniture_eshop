import styles from "./Home.module.scss";
import {MdKeyboardDoubleArrowDown} from "react-icons/md";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__banner}>
        <h2>Furniture E-shop</h2>
        <h3>Check our products</h3>
        <MdKeyboardDoubleArrowDown size={50} className={styles.home__icon} />
      </div>
    </div>
  );
};

export default Home;
