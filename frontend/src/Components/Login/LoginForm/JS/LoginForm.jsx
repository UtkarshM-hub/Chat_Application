import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../UI/Button/JS/Button";
import classes from "../CSS/LoginForm.module.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const emailRegx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginForm = ({ submit }) => {
  // Declerations
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const [remember, setRemember] = useState(true);
  const [EmailIsValid, setEmailIsValid] = useState(false);
  const [PasswordIsValid, setPasswordIsValid] = useState(false);
  const [ShowError, setShowError] = useState(false);

  //   Handlers
  const FormSubmitHandler = (e) => {
    e.preventDefault();
    if (EmailIsValid && PasswordIsValid && !ShowError) {
      return submit({
        Email: EmailRef.current.value,
        Password: PasswordRef.current.value,
        Remember: remember,
      });
    } else {
      setShowError(true);
    }
  };

  const EmailHandler = (val) => {
    if (emailRegx.test(val)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };
  const PasswordHandler = (val) => {
    if (val.length >= 7) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };
  return (
    <div>
      <form onSubmit={FormSubmitHandler}>
        <div className={classes.LoginForm_FormElement}>
          <p>
            Email<span className={classes.LoginForm_Impo}>*</span>
          </p>
          <input
            ref={EmailRef}
            onChange={(e) => EmailHandler(e.target.value)}
            type="email"
            className={`${classes.LoginForm_InputElement} ${
              !EmailIsValid && ShowError ? classes.error : ""
            }`}
            placeholder="robertDowney@gmail.com"
          />
        </div>
        <div className={classes.LoginForm_FormElement}>
          <p>
            Password<span className={classes.LoginForm_Impo}>*</span>
          </p>
          <input
            ref={PasswordRef}
            onChange={(e) => PasswordHandler(e.target.value)}
            type="password"
            className={`${classes.LoginForm_InputElement} ${
              !PasswordIsValid && ShowError ? classes.error : ""
            }`}
            placeholder="FjsdfE54*******"
          />
        </div>
        <div
          className={`${classes.LoginForm_FormElement} ${classes.LoginForm_Options}`}
        >
          <div
            onClick={(e) => {
              setRemember((prev) => !prev);
            }}
            className={`${classes.LoginForm_Check} ${
              remember ? classes.activeCheck : classes.hiddenCheck
            }`}
          >
            <div className={`${classes.LoginForm_CheckBox}`}>
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <p>Remember me</p>
          </div>
          <Link to="/signup" className={classes.LoginForm_Link}>
            Forgot password?
          </Link>
        </div>
        <Button type="submit">Login</Button>
        <p className={classes.LoginForm_Redirect}>
          Not registerd yet?
          <Link className={classes.LoginForm_Link} to="/signup">
            Create an Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
