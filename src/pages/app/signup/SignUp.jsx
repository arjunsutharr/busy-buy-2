import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticationActions,
  authenticationSelector,
  signup,
} from "../../../redux/reducers/authenticationReducers";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { FormData } = useSelector(authenticationSelector);

  const signupHandler = async (e) => {
    e.preventDefault();
    const response = await dispatch(signup(FormData));
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form}>
          <p>SignUp</p>
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
          <button onClick={(e) => signupHandler(e)}>SignUp</button>
        </form>
        <p>
          Already have an account? <Link to="/signin">SignIn</Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
