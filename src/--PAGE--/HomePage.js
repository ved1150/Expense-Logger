import React, { useContext, useEffect, useRef, useState } from "react";
import globalContext from "../--CONTEXT--/globalContext";
import "./HomePage.css";
export default function HomePage() {
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
          idToken: globalStore.tokenId,
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
  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
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
    </div>
  );
}
