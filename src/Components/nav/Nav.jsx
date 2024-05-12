import { Link, NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

import { BsHandbag } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticationSelector,
  signOutUser,
} from "../../redux/reducers/authenticationReducers";

function Nav() {
  const { isLoggedIn } = useSelector(authenticationSelector);
  const dispatch = useDispatch();

  return (
    <>
      <nav>
        <div className={styles.nav_container}>
          <Link className={styles.logoLink} to="/">
            <div className={styles.nav_logo_wrapper}>
              <h3>BusyBuy</h3>
            </div>
          </Link>
          <div className={styles.nav_details}>
            {isLoggedIn ? (
              <div>
                <NavLink className={styles.navLink} to="/orders">
                  My Orders
                </NavLink>

                <NavLink className={styles.navLink} to="/cart">
                  <BsHandbag /> Cart
                </NavLink>

                <NavLink
                  onClick={() => dispatch(signOutUser())}
                  className={`${styles.navLink} ${styles.logoutLink}`}
                >
                  <MdLogout />
                  Signout
                </NavLink>
              </div>
            ) : (
              <NavLink
                className={`${styles.navLink} ${styles.logoutLink} ${styles.signinLink}`}
                to="/signin"
              >
                <MdLogin />
                SignIn
              </NavLink>
            )}
          </div>
        </div>
      </nav>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default Nav;
