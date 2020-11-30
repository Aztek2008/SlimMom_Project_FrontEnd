import React, { useState } from "react";
import style from "./login.module.css";
import useForm from "./useForm";
import validate from "./validationRules";
import { NavLink } from "react-router-dom";
import Logo from "../../Components/Logo";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const history = useHistory();
  const [message, setMessage] = useState();
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );

  function login() {
    const data = JSON.stringify(values);
    console.log(data);
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("https://slimmom.herokuapp.com/users/login/", data, {
        headers,
      })
      .then((response) => {
        console.log(response);
        setMessage({
          data: "Login sucess ,You will transfer to dashboard..",
          type: "alert-success",
        });

        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          history.push("/dashboard");
        }, 1000);
      })
      .catch((error) => {
        setMessage({
          data: "Wrong Credentials",
          type: "alert-danger",
        });
        console.error("There was an error!", error);
      });
  }

  return (
    <>
      <nav>
        <div className={style.container}>
          <NavLink className={style.logoContainer} exact to="/">
            <Logo />
          </NavLink>

          <div className={style.navContainer}>
            <NavLink exact to="/login" className={style.login}>
              <span>Вход</span>
            </NavLink>
            <NavLink exact to="/register">
              <span>Регистрация</span>
            </NavLink>
          </div>
        </div>
      </nav>

      <div className={style.pageWrapper}>
        <div className={style.loginWrapper}>
          <div className={`${style.messageContainer} `}>
            <div className={style.registrationFormContainer}>
              {message && (
                <div className={` ${message.type}`} role="alert">
                  {message.data}
                  <span
                    aria-hidden="true"
                    className={style.cursorPointer}
                    onClick={() => setMessage(null)}
                  >
                    &times;
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className={style.registerTitle}>вход</div>
          <form onSubmit={handleSubmit} noValidate>
            <div className={style.inputModule}>
              <input
                type="text"
                name="login"
                placeholder="Логин *"
                className={style.input}
                onChange={handleChange}
                value={values.login || ""}
                required
              />

              {errors.login && <p className={style.error}>{errors.login}</p>}

              <input
                autoComplete="nope"
                type="password"
                name="password"
                placeholder="Пароль *"
                className={style.input}
                onChange={handleChange}
                value={values.password || ""}
                required
              />

              {errors.password && (
                <p className={style.error}>{errors.password}</p>
              )}
            </div>

            <div className={style.butModule}>
              <button type="submit" className={style.activeButton}>
                Вход
              </button>
              <NavLink className={style.noActiveButton} exact to="/register">
                <span>Регистрация</span>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
