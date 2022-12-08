import axios from 'axios';
// import { BsGithub, BsGlobe } from 'react-icons/bs';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const nameInputRef = useRef();
    const urlInputRef = useRef();
    const idToken = useSelector(state => state.auth.token)
    
//   useEffect(() => {
//     axios.post(
//         "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAoBiPW5g1kGaX_qn62asvoI-eyQqRaL88",
//         {idToken: idToken}
//     ).then((res) => {
//         console.log(res);
//         console.log(res.data.users[0])

//         const displayName = res.data.users[0].displayName;
//         const photoUrl = res.data.users[0].photoUrl;

//         nameInputRef.current.value = displayName;
//         urlInputRef.current.value = photoUrl;
//       }).catch ((err) => {
//         console.log(err);
//     })
//   });

useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAoBiPW5g1kGaX_qn62asvoI-eyQqRaL88",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
            console.log(data)
            const displayName = data.users[0].displayName;
            const photoUrl = data.users[0].photoUrl;

            nameInputRef.current.value = displayName;
            urlInputRef.current.value = photoUrl;
        });
      } else {
        res.json().then((data) => console.log(data));
      }
    });
  });
    
    // const updateProfiletHandler = async(event) => {
    //     event.preventDefault();

    //     const enteredName = nameInputRef.current.value;
    //     const enteredUrl = urlInputRef.current.value;

    //     const updatedInfo = {
    //         idToken: idToken,
    //         displayName: enteredName,
    //         photoUrl: enteredUrl,
    //         deleteAttribute: null,
    //         returnSecureToken: true	
    //     }
    //     try {
    //         const res = await axios.post (
    //             "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAoBiPW5g1kGaX_qn62asvoI-eyQqRaL88"
    //             , updatedInfo 
    //         );
    //             console.log(res);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
        function updateProfiletHandler(event) {
            event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredUrl = urlInputRef.current.value;
        const token = JSON.parse(localStorage.getItem("token"));
        const updatedInfo = {
            idToken: token,
            displayName: enteredName,
            photoUrl: enteredUrl,
            deleteAttribute: null,
            returnSecureToken: true	
        }
          
            fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAoBiPW5g1kGaX_qn62asvoI-eyQqRaL88",
              {
                method: "POST",
                body: JSON.stringify(updatedInfo),
              }
            ).then((res) => {
              if (res.ok) {
                alert("your form is updated");
                res.json().then((data) => {
                  console.log(data);
                  
                });
              } else {
                res.json().then((data) => data);
              }
            });
          }
    return (
        <section className='user-profile'>
                <h2>Contact Details</h2>
            <form onSubmit={updateProfiletHandler}>
                    {/* <BsGithub size={25} /> */}
                    <label htmlFor='name'>Full Name</label>
                    <input 
                        id='name'
                        type='text'
                        name='name'
                        required
                        ref={nameInputRef}
                    />
                    {/* <BsGlobe size={25} /> */}
                    <label htmlFor='name'>Profile Photo URL</label>
                    <input 
                        id='url'
                        type='url'
                        name='url'
                        
                        ref={urlInputRef}
                    />
                <button>Update</button>
            </form>
        </section>
    )
};

export default UserProfile;