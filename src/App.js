import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Router, HashRouter } from "react-router-dom";
import AuthForm from "./--AUTHENTICATION--/AuthForm";
import Login from "./--AUTHENTICATION--/Login";
import ForgotPassword from "./--AUTHENTICATION--/ForgotPassword";
import Register from "./--AUTHENTICATION--/Register";
import Main from "./--PAGE--/Main";
import Home from "./--PAGE--/Home";
export default function App() {
  // const isLogin = useSelector((state) => state.auth.islogin);
  const login = useSelector((state) => state.auth.islogin);

  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setIsLogin((pre) => JSON.parse(localStorage.getItem("isLogin")));
  }, [login]);
  return (
    <HashRouter basename="/">
      <Switch>
        {!isLogin && <Route exact path="/">
          <Home />
        </Route>}
        {!isLogin &&<Route path="/login">
          <Login />
        </Route> }
        {!isLogin &&<Route path="/register">
          <Register />
        </Route> }
        {!isLogin && <Route path="/forgotpassword">
          <ForgotPassword />
        </Route> }
        {isLogin &&<Main />}
      </Switch>
    </HashRouter>
  );
}
