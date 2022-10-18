import { useState } from "react";
import GlobalContext from "./globalContext";

function GlobalState(props) {
  const [token, setToken] = useState(null);
  const [forgot,setForgot] = useState(false)
  let isTokenAvilable = !!token;
  const globalStore = {
    login: (token) => setToken(token),
    tokenId: token,
    userLogin: isTokenAvilable,
    userlogout : () => setToken(null),
    forgotbtn : () => setForgot(true),
    passwordForgot : forgot ,
    preinfo: {
      name: "",
      url: "",
    },
  };
  return (
    <GlobalContext.Provider value={globalStore}>
      {props.children}
    </GlobalContext.Provider>
  );
}
export default GlobalState;
