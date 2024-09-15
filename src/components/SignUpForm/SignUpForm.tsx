import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./SignUpForm.module.css";
import { registratiomNewUser } from "../../api";

interface IFormSignUpInput {
  email: string;
  password: string;
  username: string;
  checkbox: boolean;
}

interface IErrorSignUp {
  email: string;
  username: string;
}

export const SignUpForm: FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const navigate = useNavigate()
  const [err, setErr] = useState<IErrorSignUp | string>("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormSignUpInput>();

  async function handleChange(data: IFormSignUpInput) {
    try {
      if (inputData === data.password) {
        const res = await registratiomNewUser(data.username, data.email, data.password);
        if (res.ok) {
          navigate("/sign-in");
          setErr('')
        } else {
          const { errors } = await res.json();
          setErr({
            email: JSON.stringify(errors.email),
            username: JSON.stringify(errors.username),
          });
        }
      } else {
        setErr('Passwords do not match');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create new account</h1>
        <form onSubmit={handleSubmit(handleChange)} className={styles.form}>
          <label htmlFor="uname">Username</label>
          <input
            className={styles.usernameInput}
            type="text"
            id="uname"
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
            id="email"
            placeholder="alex@example.com"
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

          <label htmlFor="password2">Password</label>
          <input
            className={styles.passInput}
            type="password"
            placeholder="Password"
            id="password2"
            {...register("password", {
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

          <label htmlFor="password">Repeat Password</label>
          <input
            className={styles.passInput}
            type="password"
            placeholder="Password"
            id="password"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />

          <div className={styles.inputChcekboxBlock}>
            <input
              className={styles.inputChcekbox}
              type="checkbox"
              id="checkbox"
              {...register("checkbox", {
                required: true,
              })}
            />
            <label htmlFor="checkbox" className={styles.labelChcekbox}>
              I agree to the processing of my personal information
            </label>
          </div>

          {typeof err === "string" ? (
            <div className={styles.error}>{err}</div>
          ) : null}

          {typeof err === "object" ? (
            <div className={styles.error}>
              {err.email !== undefined && JSON.parse(err.email) ? (
                <p>{`email ${JSON.parse(err.email)}`}</p>
              ) : null}
              {err.username !== undefined && JSON.parse(err.username) ? (
                <p>{`username ${JSON.parse(err.username)}`}</p>
              ) : null}
            </div>
          ) : null}

          <button className={styles.btn} type="submit">
            Create
          </button>
        </form>
        <div className={styles.link}>
          <p>
            Already have an account?{" "}
            <Link to="/sign-in" className={styles.signin}>
              Sign In.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
