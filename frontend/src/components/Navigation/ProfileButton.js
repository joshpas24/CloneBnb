import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
import SpotForm from "../SpotForm/CreateSpot";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
            }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/")
  };

  const createSpot = () => {
    history.push("/spots/create")
    // return (
    //   <SpotForm formtype={'create'} />
    // )
  }

  const manageSpots = () => {
    history.push("/spots/current")
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="navRight">
      <div className="newSpot" onClick={() => createSpot()}>Create New Spot</div>
      <div className="dropdown-container">
        <button onClick={openMenu} className="navButton">
          <i className="fa-solid fa-poo"></i>
        </button>
        <ul className={ulClassName} ref={ulRef}>
          <li>Hello, {user.username}!</li>
          <li>{user.email}</li>
          <li className="manage-profile" onClick={() => manageSpots()}>
            Manage Spots
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileButton;
