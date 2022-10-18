import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import globalContext from "../--CONTEXT--/globalContext";
import "./AuthForm.css";
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const email = useRef();
  const password = useRef();
  const conPassword = useRef();
  const passwordEmail = useRef();
  const globalStore = useContext(globalContext);
  function changeLoginState() {
    setIsLogin((pre) => !pre);
  }
  function formHandler(event) {
    event.preventDefault();

    let emailEntered = email.current.value;
    let passwordEntered = password.current.value;

    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5BXr8sSDXdJ4Ye8lN8J9vnNi0s3nXtVg",
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
          console.log("ok");
          res.json().then((data) => globalStore.login(data.idToken));
        } else {
          console.log("error");
          res.json().then((data) => alert(data.error.message));
        }
      });
    } else {
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
          } else {
            res.json().then((data) => alert(data.error.message));
          }
        });
      }
    }
  }
  function sendLinkForPasswordUpdate(){
         let passwordEmailEntered = passwordEmail.current.value;

         fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC5BXr8sSDXdJ4Ye8lN8J9vnNi0s3nXtVg",{
          method: "POST",
          body: JSON.stringify({
            email: passwordEmailEntered,
            requestType:  "PASSWORD_RESET"
          }),
        }
      ).then((res) => {
        if (res.ok) {
         
          alert("Change password link send check your mail box");
        } else {
          res.json().then((data) => alert(data.error.message));
        }
         })
  }
  return (
    <div>
      {!globalStore.passwordForgot && (
        <form onSubmit={formHandler}>
          <div className="authForm">
            <h1> {isLogin ? "Login" : "Sign-up"}</h1>
            <input type="text" placeholder="Email" required ref={email} />
            <input
              type="password"
              placeholder="Password"
              required
              ref={password}
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="confirm Password"
                required
                ref={conPassword}
              />
            )}
            <button>{isLogin ? "Login" : "Sign-up"}</button>
            {isLogin && (
              <Link
                to="/forgotpassword"
                onClick={() => globalStore.forgotbtn()}
              >
                forgot password
              </Link>
            )}
            <button onClick={changeLoginState}>
              {isLogin
                ? "what to creat a new account"
                : "have a account ? login"}
            </button>
          </div>
        </form>
      )}
      {globalStore.passwordForgot && (
        <div>
          <form>
            <label>Enter the email with which you have  registered :</label>
            <br/>
            <input type="text" ref={passwordEmail}/>
          </form>
          <button onClick={sendLinkForPasswordUpdate}>send link</button>
        </div>
      )}
    </div>
  );
}
