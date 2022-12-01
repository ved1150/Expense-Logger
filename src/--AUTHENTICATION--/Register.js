import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import registerLogo from "../assets/registerLogo.svg";
import { authActions } from "../--STORE--/AuthReducer";
import { expensesActions } from "../--STORE--/ExpensesReducer";

export default function Register() {
  const dispatch = useDispatch()
  const email = useRef();
  const password = useRef();
  const conPassword = useRef();
  function submitRegister(event) {
    event.preventDefault();
    let emailEntered = email.current.value;
    let passwordEntered = password.current.value;
    let conPasswordEntered = conPassword.current.value;
    if (passwordEntered !== conPasswordEntered) {
      alert("Password not match");
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5BXr8sSDXdJ4Ye8lN8J9vnNi0s3nXtVg",
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
          console.log("User has successfully signed up.");
          alert("Sign-up successfully ");
          res.json().then((data) => {
          dispatch(authActions.login(data.idToken));
          localStorage.setItem('token', JSON.stringify(data.idToken));
          dispatch(expensesActions.setEmail(data.localId));
          localStorage.setItem('userId', JSON.stringify(data.localId)); 
          })
        } else {
          res.json().then((data) => alert(data.error.message));
        }
      });
    }
  }
  return (
    <div>
      {" "}
      <div className="registerPage">
        <div className="registerContent">
          <div className="registerLogo">
            <img
              src={registerLogo}
              alt="A calendar with a heart in the middle. Icon made by Free icons from www.freeicons.io"
            />
          </div>

          {/* form starts here */}
          <form className="registerForm" onSubmit={submitRegister}>
            <h2>Hello Friend!</h2>
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
            <label htmlFor="confirmedPassword">Confirmed Password</label>
            <input
              type="password"
              placeholder="abc@123"
              required
              ref={conPassword}
            />

            <Link to="/login">Already have an account? Sign in here!</Link>

            <button >Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
