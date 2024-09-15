import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { editingUserData } from "../../api";
import styles from "./EditingProfile.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

interface IFormEditingInput {
  email: string;
  password: string;
  avatar: string;
  username: string;
}

export const EditingProfile: FC = () => {
  const userData = useSelector((state: RootState) => state.userSlice.user);
  const [inpState, setInpState] = useState({
    username: userData.username,
    email: userData.email,
  });
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormEditingInput>();

  useEffect(() => {
    setInpState({ username: userData.username, email: userData.email });
  }, [userData]);

  async function editingUserDataForm(data: IFormEditingInput) {
    try {
      if (data.password.trim()) {
         await editingUserData(
          data.username,
          data.email,
          data.password,
          data.avatar
        );
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.title}>Edit Profile</h1>
        <form
          onSubmit={handleSubmit(editingUserDataForm)}
          className={styles.form}
        >
          <label htmlFor="uname">Username</label>
          <input
            className={styles.usernameInput}
            type="text"
            id="uname"
            value={inpState.username}
            placeholder="some-username"
            {...register("username", {
              maxLength: {
                value: 20,
                message: "Your username have more than 20 characters.",
              },
              minLength: {
                value: 3,
                message: "Your username needs to be at least 3 characters.",
              },
              onChange: (e) =>
                setInpState({ ...inpState, username: e.target.value }),
            })}
          />
          {errors.username ? (
            <>
              {(errors.username.type === "maxLength" ||
                errors.username.type === "minLength") && (
                <p
                  style={{
                    transform: "translateY(-10px)",
                    color: "rgba(245, 34, 45, 1)",
                    fontSize: "14px",
                  }}
                >
                  {errors.username.message}
                </p>
              )}
            </>
          ) : null}

          <label htmlFor="email">Email address</label>
          <input
            className={styles.emailInput}
            type="text"
            value={inpState.email}
            id="email"
            placeholder="alex@example.com"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
              onChange: (e) =>
                setInpState({ ...inpState, email: e.target.value }),
            })}
          />
          {errors.email ? (
            <>
              {errors.email.type === "pattern" && (
                <p
                  style={{
                    transform: "translateY(-10px)",
                    color: "rgba(245, 34, 45, 1)",
                    fontSize: "14px",
                  }}
                >
                  {errors.email.message}
                </p>
              )}
            </>
          ) : null}

          <label htmlFor="password">New password</label>
          <input
            className={styles.passInput}
            type="password"
            placeholder="New password"
            id="password"
            {...register("password", {
              required: true,
              maxLength: {
                value: 40,
                message: "Your password have more than 40 characters.",
              },
              minLength: {
                value: 6,
                message: "Your password needs to be at least 6 characters.",
              },
            })}
          />
          {errors.password ? (
            <>
              {(errors.password.type === "maxLength" ||
                errors.password.type === "minLength") && (
                <p
                  style={{
                    transform: "translateY(-12px)",
                    color: "rgba(245, 34, 45, 1)",
                    fontSize: "14px",
                  }}
                >
                  {errors.password.message}
                </p>
              )}
            </>
          ) : null}

          <label htmlFor="avatar">Avatar image (url)</label>
          <input
            className={styles.avatar}
            type="text"
            placeholder="Avatar image"
            id="avatar"
            {...register("avatar", {
              required: true,
              pattern: {
                value: /^https?:\S+.(?:jpe?g|png)$/,
                message: "You mast have an avatar",
              },
            })}
          />
          {errors.avatar ? (
            <>
              {errors.avatar.type === "pattern" && (
                <p
                  style={{
                    transform: "translateY(-18px)",
                    color: "rgba(245, 34, 45, 1)",
                    fontSize: "14px",
                  }}
                >
                  {errors.avatar.message}
                </p>
              )}
            </>
          ) : null}

          <button className={styles.btn}>Create</button>
        </form>
      </div>
    </div>
  );
};
