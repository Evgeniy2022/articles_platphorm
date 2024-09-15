import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../api";
import { useForm } from "react-hook-form";

import styles from "./SignInForm.module.css";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/slices/userSlice";

interface ErrorSignIn {
  errors: {
    "email or password": string;
  };
}

interface IFormLogInInput {
  email: string;
  password: string;
}

export const SignInForm: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormLogInInput>();
  const navigate = useNavigate();
  const dispath = useDispatch()
  const [err, setErr] = useState<ErrorSignIn>({
    errors: {
      "email or password": "",
    },
  });

  async function hanleSubmitForm(values: IFormLogInInput) {
    try {
      const res = await loginUser(values.email, values.password);
      if(res.ok){
        const data = await res.json()
        localStorage.setItem("token", JSON.stringify(data.user.token));
        dispath(logIn())
        navigate("/");
        setErr({
          errors: {
            "email or password": "",
          },
        });
      } else {
        const {errors} = await res.json()
        setErr({
          errors: {
            "email or password": errors["email or password"],
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign In</h1>
        <form onSubmit={handleSubmit(hanleSubmitForm)} className={styles.form}>
          <label className={styles.emailLabel} htmlFor="uname">
            Email address
          </label>
          <input
            className={styles.emailInput}
            type="text"
            id="uname"
            placeholder="Email address"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
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

          <label className={styles.passLabel} htmlFor="password">
            Password
          </label>
          <input
            className={styles.passInput}
            type="password"
            placeholder="Password"
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
                    transform: "translateY(-18px)",
                    color: "rgba(245, 34, 45, 1)",
                    fontSize: "14px",
                  }}
                >
                  {errors.password.message}
                </p>
              )}
            </>
          ) : null}
          {err.errors["email or password"] ? (
            <div
              className={styles.error}
            >{`email or password ${err.errors["email or password"]}`}</div>
          ) : null}
          <button className={styles.btn} type="submit">
            Login
          </button>
        </form>
        <div className={styles.link}>
          <p>
            Don’t have an account?{" "}
            <Link to="/sign-up" className={styles.signup}>
              Sign Up.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
