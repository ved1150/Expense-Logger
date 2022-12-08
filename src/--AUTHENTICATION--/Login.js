import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../--STORE--/AuthReducer";
import { expensesActions } from "../--STORE--/ExpensesReducer";
import calendarLogo from "../assets/calendarLogo.svg";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  
  function formHandler(event) {
    event.preventDefault();

    let emailEntered = email.current.value;
    let passwordEntered = password.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoBiPW5g1kGaX_qn62asvoI-eyQqRaL88",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailEntered,
          password: passwordEntered,
          returnSecureToken: true,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          
          let userEmail = data.email.replace(
            /[&,+()$~%@.'":*?<>{}]/g,
            ""
          );
          localStorage.setItem("token", JSON.stringify(data.idToken));
          localStorage.setItem("isLogin", JSON.stringify(true));
          localStorage.setItem("userEmail", JSON.stringify(userEmail));
          let token =  JSON.parse(localStorage.getItem("token"));
          let email =  JSON.parse(localStorage.getItem("userEmail"));
          dispatch(authActions.login(token))
          dispatch(expensesActions.setEmail(email)) 
          // dispatch(authActions.login(data.idToken));
          // localStorage.setItem('token', JSON.stringify(data.idToken));
          // dispatch(expensesActions.setEmail(userEmail));
          // localStorage.setItem('userEmail', JSON.stringify(userEmail));
        });
      } else {
        console.log("error");
        res.json().then((data) => alert(data.error.message));
      }
    });
  }
  return (
    <div className="loginPage">
      <div className="loginContent">
        <div className="loginLogo">
          <img
            src={calendarLogo}
            alt="A calendar with a check mark inside. Icon made by Free icons from www.freeicons.io"
          />
        </div>

        <form className="loginForm" onSubmit={formHandler}>
          <h2>Welcome Back!</h2>
          <label htmlFor="email">Emaill address</label>
          <input
            type="email"
            placeholder="sample@alice.com"
            name="email"
            required
            ref={email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="abc@123"
            required
            ref={password}
          />
          <Link to="/forgotpassword">ForgotPassword? Click here!</Link>
          <Link to="/register">Don't have an account yet? Register here!</Link>
          <button>Log In</button>
        </form>
      </div>
    </div>
  );
}
