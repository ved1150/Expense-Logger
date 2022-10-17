import { useState } from "react";
import GlobalContext from "./globalContext";

function GlobalState(props) {
  const [token, setToken] = useState(null);

  let isTokenAvilable = !!token;
  const globalStore = {
    login: (token) => setToken(token),
    tokenId: token,
    userLogin: isTokenAvilable,
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
