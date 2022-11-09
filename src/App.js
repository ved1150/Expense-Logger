import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import AuthForm from "./--AUTHENTICATION--/AuthForm";
import ForgotPassword from "./--PAGE--/ForgotPassword";
import HomePage from "./--PAGE--/HomePage";
export default function App() {
  const isLogin = useSelector(state => state.auth.islogin)
  return (
    <Router>
      <Switch>
        {!isLogin  && <AuthForm />}
        <HomePage />
        <Route path="/forgotpassword"></Route>
      </Switch>
    </Router>
  );
}
