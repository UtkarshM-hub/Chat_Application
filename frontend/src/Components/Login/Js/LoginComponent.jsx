import React, { useRef } from "react";
import classes from "../CSS/LoginComponent.module.css";

const Login = ({ onLogin, isUserExist }) => {
  const usernameRef = useRef();
  const roomRef = useRef();
  return (
    <div className={classes.LoginComponent}>
      <form className={classes.LoginComponent_form}>
        <h2>Login</h2>
        <div className={classes.LoginComponent_inputContainer}>
          <input
            ref={usernameRef}
            className={`${classes.LoginComponent_inputElements}`}
            type="text"
            placeholder="enter your username"
          />
          {isUserExist && (
            <p style={{ color: "red" }}>Username already exists!!</p>
          )}
          <input
            ref={roomRef}
            className={`${classes.LoginComponent_inputElements}`}
            type="room"
            placeholder="enter your room name"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              onLogin(usernameRef.current.value, roomRef.current.value);
            }}
            className={`${classes.LoginComponent_joinBtn} ${classes.LoginComponent_inputElements}`}
          >
            Join
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
