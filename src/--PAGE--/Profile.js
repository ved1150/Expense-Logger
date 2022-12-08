import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from './Userprofile';
import { toggleActions } from '../--STORE--/ChangeTheameReducer';

const Profile = () => {
  const dispatch = useDispatch();
    const [error, setError] = useState('');
    const token = useSelector((state) => state.auth.token);

    const verifyEmailHandler = () => {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAoBiPW5g1kGaX_qn62asvoI-eyQqRaL88",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            requestType: "VERIFY_EMAIL",
          }),
        }
      ).then((res) => {
        if (res.ok) {
          alert("Check in your mail box");
          // setIsVerifyEmail(true);
        } else {
          res.json().then((data) => alert(data.error.message));
        }
      });
      };

    return (
        <section className='profile'>
            <button className='closeProfile' onClick={() => dispatch(toggleActions.openProfile())}>×</button>
            <h1>Complete Your Profile</h1>
                <UserProfile />
            <h2>Verify your email adress</h2>
            <button onClick={verifyEmailHandler} className= "sendEmail">Verify your email</button>
            {error === 'INVALID_ID_TOKEN' && (
                <p>
                    The user's credential is no longer valid. The user must sign in again.
                </p>
            )}
            {error === "USER_NOT_FOUND" && (
                <p>
                    There is no user record corresponding to this identifier. The user may
                    have been deleted.
                </p>
            )}
        </section>
    )
};

export default Profile;