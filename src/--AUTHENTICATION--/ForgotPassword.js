import React, { useRef } from "react";

export default function ForgotPassword() {
  const passwordEmail = useRef();
  function sendLinkForPasswordUpdate(event) {
    event.preventDefault();
    console.log("forgot");
    let passwordEmailEntered = passwordEmail.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC5BXr8sSDXdJ4Ye8lN8J9vnNi0s3nXtVg",
      {
        method: "POST",
        body: JSON.stringify({
          email: passwordEmailEntered,
          requestType: "PASSWORD_RESET",
        }),
      }
    ).then((res) => {
      if (res.ok) {
        alert("Change password link send check your mail box");
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
  }
  return (
    <div className="loginPage">
      <div className="loginContent">
        <form onSubmit={sendLinkForPasswordUpdate}>
          <label>Enter the email with which you have registered :</label>
          <br />
          <input type="text" ref={passwordEmail} />
          <button className="forgotBtn">send link</button>
        </form>
      </div>
    </div>
  );
}
