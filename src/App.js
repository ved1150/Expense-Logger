import React, { useContext } from "react";
import { Route } from "react-router-dom";
import AuthForm from "./--AUTHENTICATION--/AuthForm";
import globalContext from "./--CONTEXT--/globalContext";
import HomePage from "./--PAGE--/HomePage";
export default function App() {
  let globalStore = useContext(globalContext);
  console.log(globalStore.userLogin);
  return (
    <div>
      {!globalStore.userLogin && <AuthForm />}
      {globalStore.userLogin && <HomePage />}
    </div>
  );
}
