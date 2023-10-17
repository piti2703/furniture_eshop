import Content from "../content/Content";
import styles from "./Header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { PiArmchairBold } from "react-icons/pi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slices/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/HiddenLink";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavMobile = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName,
            userID: user.uid,
          })
        );
      } else {
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, []);

  const NavMobile = () => {
    return ReactDOM.createPortal(
      <nav
        className={
          isOpen
            ? `${styles["header__nav-mobile"]} ${styles["header__nav-mobile--active"]}`
            : `${styles["header__nav-mobile"]}`
        }
      >
        <NavLink to="/cart" onClick={toggleNavMobile}>
          Admin
        </NavLink>
        <ShowOnLogin>
          <NavLink to="/orders" onClick={toggleNavMobile}>
            My Orders
          </NavLink>
          <NavLink to="/" onClick={toggleNavMobile}>
            Logout
          </NavLink>
        </ShowOnLogin>
        <ShowOnLogout>
          <NavLink to="/login" onClick={toggleNavMobile}>
            Login
          </NavLink>
          <NavLink to="/register" onClick={toggleNavMobile}>
            Register
          </NavLink>
        </ShowOnLogout>
        <NavLink to="/cart" onClick={toggleNavMobile}>
          <span>Cart</span>
          <AiOutlineShoppingCart color="#996633" size={24} />
        </NavLink>
      </nav>,
      document.getElementById("nav-mobile")
    );
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <header className={styles.header}>
      <Content className={styles.header__content}>
        <div className={styles.header__logo}>
          <PiArmchairBold color="#996633" size={24} />
          <NavLink to="/">Furniture-eShop</NavLink>
        </div>
        <nav className={styles.header__nav}>
        <NavLink to="/cart" onClick={toggleNavMobile}>
          Admin
        </NavLink>
          <ShowOnLogin>
            <NavLink to="/orders">My Orders</NavLink>
            <NavLink onClick={logoutUser}>Logout</NavLink>
          </ShowOnLogin>
          <ShowOnLogout>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </ShowOnLogout>
          <NavLink to="/cart">
            <span>Cart</span>
            <AiOutlineShoppingCart color="#996633" size={24} />
          </NavLink>
        </nav>
        <GiHamburgerMenu
          className={styles.header__hamburger}
          size={24}
          onClick={toggleNavMobile}
        />
        {/* 
        {isOpen && <NavMobile />} */}
        <NavMobile />
      </Content>
    </header>
  );
};

export default Header;
