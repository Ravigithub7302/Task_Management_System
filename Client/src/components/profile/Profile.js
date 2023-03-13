import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { BsArrowLeftShort } from 'react-icons/bs';
import axios from 'axios';
// import toast from 'react-hot-toast';
import "./profile.css"
const Profile = () => {
  const [userInfo, setUser] = useState({
    fName: '',
    lName:'',
    email: '',
  });
  const data = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (
      async () => {
        try {
          const fName = data.fName;
          const lName = data.lName;
          const email = data.email; 
          setUser({fName,lName,email});
        } catch (err) {
          console.log(err);
        }
      }
    )();
  }, []);

  // const updateUserInfo = (e,key) => {
  //   const info = { ...userInfo };
  //   info[key] = e.target.value;
  //   setUser(info);
  // };
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:8000/api/user/updateuser',{userInfo});
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='div'>
      <div className='div'>
        <h1>Profile</h1>
        <form className="editForm"
          onSubmit={updateProfile}
        >
          <label htmlFor="name">
            First Name:
            <input
              name="name"
              type="text"
              placeholder="First Name"
              required
              value={userInfo.fName}
              // onChange={(e) => updateUserInfo(e, "fName")}
            />
          </label>
          <label htmlFor="name">
            Last Name:
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              required
              value={userInfo.lName}
              // onChange={(e) => updateUserInfo(e, "lName")}
            />
          </label>
          <label htmlFor="email">
            email:
            <input
              name="email"
              type="email"
              placeholder="email"
              required
              value={userInfo.email}
              // onChange={(e) => updateUserInfo(e, "email")}
            />
          </label>
          {/* <button type="submit">Save</button> */}
        </form>
      </div>
    </div>
  )
}

export default Profile
