import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import HomeButton from "./HomeButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className="navRight">
        <OpenModalButton
          buttonText="Log In"
          className="navButton"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          className="navButton"
          modalComponent={<SignupFormModal />}
        />
      </div>
    );
  }

  return (
    <div className="navBar">
      <div className="navLeft">
        <HomeButton />
      </div>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
