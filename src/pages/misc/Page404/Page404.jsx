import { useLocation, useNavigate } from "react-router-dom";
import page404Styles from "./Page404.module.css";

function Page404() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={page404Styles.container}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        The page <code>{location.pathname}</code> does not exist.
      </p>
      <button
        className={page404Styles.button}
        onClick={() => {
          navigate("/");
        }}
      >
        Take Me To Home
      </button>
    </div>
  );
}

export default Page404;
