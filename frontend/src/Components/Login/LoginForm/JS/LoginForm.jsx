import React, { useRef } from "react";
import Button from "../../../UI/Button/JS/Button";
import classes from "../CSS/LoginForm.module.css";

const LoginForm = ({ submit, message }) => {
  // Decleration
  const userName = useRef();
  const roomName = useRef();

  return (
    <div className={classes.LoginForm_Container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return submit({
            userName: userName.current.value,
            roomName: roomName.current.value,
          });
        }}
        className={classes.LoginForm_form}
      >
        <h3>Join</h3>
        <div className={classes.LoginForm_InputContainer}>
          <p>
            UserName
            {message !== undefined ? (
              <span
                className={
                  message.type === "error" ? classes.error : classes.success
                }
              >
                {message.message}
              </span>
            ) : (
              ""
            )}
          </p>
          <input ref={userName} type="text" />
        </div>
        <div className={classes.LoginForm_InputContainer}>
          <p>Room Name</p>
          <input ref={roomName} type="text" />
        </div>
        <Button type="submit">Join</Button>
      </form>
    </div>
  );
};

export default LoginForm;
