import React, { useContext, useEffect, useRef, useState } from "react";
import globalContext from "../--CONTEXT--/globalContext";
import ExpensesForm from "../--LAYOUT--/ExpensesForm";
import { toggleActions } from "../--STORE--/ChangeTheameReducer";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../--STORE--/ExpensesReducer";
import { authActions } from "../--STORE--/AuthReducer";
import { Link } from "react-router-dom";
import Profile from "./Profile";
export default function HomePage() {
  const openProfile = useSelector((state) => state.toggle.profile);
  console.log(openProfile);
  const isLogin = useSelector((state) => state.auth.islogin);
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
  const userName = useRef();
  const userUrl = useRef();
  const [name, setName] = useState();
  const [url, seturl] = useState();
  // function updateDetail(event) {
  //   event.preventDefault();
  //   const nameEnter = userName.current.value;
  //   const urlEnter = userUrl.current.value;
  //   setName(nameEnter);
  //   seturl(urlEnter);
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   fetch(
  //     "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAoBiPW5g1kGaX_qn62asvoI-eyQqRaL88",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         idToken: token,
  //         displayName: nameEnter,
  //         photoUrl: urlEnter,
  //         deleteAttribute: "Display_Name",
  //         returnSecureToken: true,
  //       }),
  //     }
  //   ).then((res) => {
  //     if (res.ok) {
  //       alert("your form is updated");
  //       res.json().then((data) => {
  //         console.log(data);
  //         // seturl(data.users[0].photoUrl);
  //         // setname(data.users[0].email);
  //       });
  //     } else {
  //       res.json().then((data) => data);
  //     }
  //   });
  // }
  // useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   fetch(
  //     "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAoBiPW5g1kGaX_qn62asvoI-eyQqRaL88",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         idToken: token,
  //       }),
  //     }
  //   ).then((res) => {
  //     if (res.ok) {
  //       res.json().then((data) => {
  //         seturl(data.users[0].photoUrl);
  //         setName(data.users[0].email);
  //       });
  //     } else {
  //       res.json().then((data) => console.log(data));
  //     }
  //   });
  // }, [isLogin]);
  // function verifyEmail() {
  //   fetch(
  //     "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAoBiPW5g1kGaX_qn62asvoI-eyQqRaL88",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         idToken: globalStore.tokenId,
  //         requestType: "VERIFY_EMAIL",
  //       }),
  //     }
  //   ).then((res) => {
  //     if (res.ok) {
  //       alert("Check in your mail box");
  //       setIsVerifyEmail(true);
  //     } else {
  //       res.json().then((data) => alert(data.error.message));
  //     }
  //   });
  // }
  function logout() {
    dispatch(authActions.logout(null));
    localStorage.clear();
      window.location.reload();

  }
  const mode = !toggle.mode ? "darkmode" : "mainContent";
  return (
    <div className={mode}>
      <header>
        <h1>Welcome to Expense Tracker</h1>
        <Link to="/" onClick={logout} className="logout">
          Logout
        </Link>

        <Link
          to=""
          className="profileBtn"
          onClick={() => dispatch(toggleActions.openProfile())}
        >
          Profile
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

      
      <hr />
      {a && (
        <form>
          <div className="detailBox">
            <div className="closeDetail">
              <h3>Contact Details</h3>
              <button onClick={() => setA(false)}>cancel</button>
            </div>
            <div className="inputBox">
              <label>Full name:</label>
              <input type="text" ref={userName} defaultValue={name} />
              <label>profile photo URl</label>
              <input type="text" required ref={userUrl} defaultValue={url} />
            </div>
            <button>Update</button>
          </div>
        </form>
      )}
      <div className="newLog">
        <button
          className="newLogPlus"
          onClick={() => dispatch(expensesActions.showExpenseForm())}
        >
          +
        </button>
        <label className="visuallyhidden">add a log</label>
      </div>
      <span> </span>
      <div className="newLog">
        <button
          className="newLogPlus"
        >
          ⇩
        </button>
        <label className="visuallyhidden">download</label>
      </div>
      
      <ExpensesForm />
      {openProfile && <Profile />}
    </div>
  );
}
