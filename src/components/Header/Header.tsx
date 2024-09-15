import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { logOut } from "../../redux/slices/userSlice";

import styles from "./Header.module.css";

export const Header: FC = () => {
  const userData = useSelector((state: RootState) => state.userSlice.user);
  const auth = useSelector((state: RootState) => state.userSlice.isAuth);

  const dispath = useDispatch();

  function logOutFunction() {
    localStorage.removeItem("token");
    dispath(logOut());
    window.location.reload();
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Realworld Blog
      </Link>

      {auth ? (
        <div className={styles.auth}>
          <Link to="/new-article" className={styles.create}>
            Create article
          </Link>
          <Link to="/profile" className={styles.editProfile}>
            <div className={styles.body}>
              <div className={styles.name}>{userData.username}</div>
              {userData.image ? (
                <img
                  className={styles.avatar}
                  src={userData.image}
                  alt="avatar"
                />
              ) : (
                <div className={styles.defImg}></div>
              )}
            </div>
          </Link>
          <button onClick={logOutFunction} className={styles.logOut}>
            Log Out
          </button>
        </div>
      ) : (
        <div className={styles.auth}>
          <Link to="sign-in" className={styles.signin}>
            Sign In
          </Link>
          <Link to="sign-up" className={styles.signup}>
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};
