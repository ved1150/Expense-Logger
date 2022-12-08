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
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoBiPW5g1kGaX_qn62asvoI-eyQqRaL88",
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
