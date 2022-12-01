import React, { useContext, useEffect, useRef, useState } from "react";
import globalContext from "../--CONTEXT--/globalContext";
import ExpensesForm from "../--LAYOUT--/ExpensesForm";
import { toggleActions } from "../--STORE--/ChangeTheameReducer";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../--STORE--/ExpensesReducer";
import { authActions } from "../--STORE--/AuthReducer";
import { Link } from "react-router-dom";
export default function HomePage() {
  const toggle = useSelector((state) => {
    return {
      mode: state.toggle.lightMode,
      premiumAccount: state.toggle.premiumAccount,
    };
  });
  const activePremiumAccount = useSelector(
    (state) => state.Expense.activePremiumAccount
  );
  console.log(activePremiumAccount);
  const deactiveButton = useSelector((state) => state.Expense.deactiveButton);
  console.log(deactiveButton);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [a, setA] = useState(false);
  const [isverifyEmail, setIsVerifyEmail] = useState(false);
  const globalStore = useContext(globalContext);
  const name = useRef();
  const url = useRef();
  function updateDetail(event) {
    event.preventDefault();
    const nameEnter = name.current.value;
    const urlEnter = url.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC5BXr8sSDXdJ4Ye8lN8J9vnNi0s3nXtVg",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: globalStore.tokenId,
          displayName: nameEnter,
          photoUrl: urlEnter,
          deleteAttribute: "Display_Name",
          returnSecureToken: true,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        alert("your form is updated");
        res.json().then((data) => console.log(data));
      } else {
        res.json().then((data) => data);
      }
    });
  }
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC5BXr8sSDXdJ4Ye8lN8J9vnNi0s3nXtVg",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          globalStore.preinfo.name = data.users[0].email;
          globalStore.preinfo.url = data.users[0].photoUrl;
        });
      } else {
        res.json().then((data) => console.log(data));
      }
    });
  }, []);
  function verifyEmail() {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC5BXr8sSDXdJ4Ye8lN8J9vnNi0s3nXtVg",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: globalStore.tokenId,
          requestType: "VERIFY_EMAIL",
        }),
      }
    ).then((res) => {
      if (res.ok) {
        alert("Check in your mail box");
        setIsVerifyEmail(true);
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
  }
  function logout() {
    dispatch(authActions.logout(null));
  }
  const mode = !toggle.mode ? "darkmode" : "mainContent";
  return (
    <div className={mode}>
      <header>
        <h1>Welcome to Expense Tracker</h1>
        <Link to="/" onClick={logout} className="logout">
          Logout
        </Link>
        {activePremiumAccount && !deactiveButton && (
          <Link
            className="premium"
            onClick={() => dispatch(toggleActions.premiumAccount())}
          >
            Activate Premium
          </Link>
        )}
        {!deactiveButton && toggle.premiumAccount && (
          <img
            src="https://cdn-icons-png.flaticon.com/512/5683/5683501.png"
            alt="toggle-icon"
            className="toggle-icon"
            onClick={() => dispatch(toggleActions.changeMode())}
          />
        )}
      </header>

      <h4>
        Your profile is incomplete.
        <button onClick={() => setA(true)}>complete now</button>
      </h4>
      {!isverifyEmail && <button onClick={verifyEmail}>verify email</button>}
      <hr />
      {a && (
        <form onSubmit={updateDetail}>
          <div className="detailBox">
            <div className="closeDetail">
              <h3>Contact Details</h3>
              <button onClick={() => setA(false)}>cancel</button>
            </div>
            <div className="inputBox">
              <label>Full name:</label>
              <input type="text" ref={name} value={globalStore.preinfo.name} />
              <label>profile photo URl</label>
              <input
                type="text"
                required
                ref={url}
                value={globalStore.preinfo.url}
              />
            </div>
            <button>Update</button>
          </div>
        </form>
      )}
      <div className="newLog">
        <button className="newLogPlus" onClick={() => dispatch(expensesActions.showExpenseForm())}>+</button>
        <label className="visuallyhidden">add a log</label>
      </div>
      <ExpensesForm />
    </div>
  );
}
