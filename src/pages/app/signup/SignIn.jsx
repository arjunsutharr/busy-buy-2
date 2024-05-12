import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticationActions,
  authenticationSelector,
  signin,
} from "../../../redux/reducers/authenticationReducers";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { FormData } = useSelector(authenticationSelector);

  const signinHandler = async (e) => {
    e.preventDefault();
    const response = await dispatch(signin(FormData));
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form}>
          <p>SignIn</p>

          <input
            value={FormData.email}
            required
            type="email"
            placeholder="Email address"
            onChange={(e) =>
              dispatch(authenticationActions.updateEmail(e.target.value))
            }
          />
          <input
            value={FormData.password}
            required
            type="password"
            placeholder="Password"
            onChange={(e) =>
              dispatch(authenticationActions.updatePassword(e.target.value))
            }
          />
          <button onClick={(e) => signinHandler(e)}>SignIn</button>
        </form>
        <p>
          Create an account. <Link to="/signup">SignUp</Link>
        </p>
      </div>
    </>
  );
}

export default SignIn;
