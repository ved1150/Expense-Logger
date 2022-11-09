import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GlobalState from "./--CONTEXT--/GlobalState";
import store from "./--STORE--";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GlobalState>
      <App />
    </GlobalState>
  </Provider>
);
