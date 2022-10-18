import React, { useContext } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import AuthForm from "./--AUTHENTICATION--/AuthForm";
import globalContext from "./--CONTEXT--/globalContext";
import ForgotPassword from "./--PAGE--/ForgotPassword";
import HomePage from "./--PAGE--/HomePage";
export default function App() {
  let globalStore = useContext(globalContext);
  console.log(globalStore.userLogin);
  return (
    <Router>
      <Switch>
       
          {/* <Route path="/" exact> */}
          { !globalStore.userLogin && <AuthForm />  }
          {/* </Route> */}
          <HomePage />    
         
             {/* {globalStore.userLogin &&   } */}
          <Route path="/forgotpassword">
             {/* {!globalStore.userLogin && <ForgotPassword />    } */}
          </Route>
      </Switch>
    </Router>
  );
}
