// frontend/src/components/LoginFormPage/index.js

import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    if ((credential && credential.length >= 4) && (password && password.length >= 6)) {
      setDisabled(false)
    }
  }, [credential, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (data) => {
        const err = await data.json();
        if (err.errors) {
          setErrors(err.errors)
        }
      })

  };

  const handleDemo = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
      .then(closeModal)
  }

  return (
    <>
      <h1 className="logo">
        <i className="fa-solid fa-ghost"></i>
      </h1>
      <form onSubmit={handleSubmit} className="modal-form">
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.message && (
          <p className='login-error'>{errors.message}</p>
        )}
        <div className="loginDiv">
          <button type="submit" className="loginButton" disabled={disabled}>Log In</button>
        </div>
      </form>
      <div className="demo-login" onClick={(e) => {handleDemo(e)}}>
        Login as Demo User
      </div>
    </>
  );
}

export default LoginFormModal;
