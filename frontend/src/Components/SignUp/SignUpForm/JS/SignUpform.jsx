import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../UI/Button/JS/Button";
import classes from "../CSS/SignUpForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const emailRegx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignUpForm = ({ SignIn }) => {
  // Declerations
  const [Next, setNext] = useState(false);
  const [Show, setShow] = useState(false);
  const [ShowSecond, setShowSecond] = useState(false);

  const [UserNameVal, setUserNameVal] = useState("");
  const [UserNameIsValid, setUserNameIsValid] = useState(false);

  const [EmailVal, setEmailVal] = useState("");
  const [EmailIsValid, setEmailIsValid] = useState(false);

  const [PasswordVal, setPasswordVal] = useState("");
  const [PasswordIsValid, setPasswordIsValid] = useState(false);

  const [ConfPasswordVal, setConfPasswordVal] = useState("");
  const [ConfPasswordIsValid, setConfPasswordIsValid] = useState(false);

  const [NameVal, setNameVal] = useState("");
  const [NameIsValid, setNameIsValid] = useState(false);

  const [ProfilePicVal, setProfilePicVal] = useState("");

  const [DescriptionVal, setDescriptionVal] = useState("");

  // Handlers
  const setNextHandler = (e) => {
    e.preventDefault();
    if (!Next) {
      if (
        UserNameIsValid &&
        PasswordIsValid &&
        EmailIsValid &&
        ConfPasswordIsValid
      ) {
        setShow(false);
        return setNext(true);
      } else {
        return setShow(true);
      }
    }
    if (
      Next &&
      NameIsValid &&
      UserNameIsValid &&
      PasswordIsValid &&
      EmailIsValid &&
      ConfPasswordIsValid
    ) {
      const data = new FormData();
      data.append("UserName", UserNameVal);
      data.append("Email", EmailVal);
      data.append("Password", PasswordVal);
      data.append("Name", NameVal);
      data.append("Description", DescriptionVal);
      data.append("picture", ProfilePicVal);
      return SignIn(data);
    } else {
      return setShowSecond(true);
    }
  };

  const checkUserNameHandler = (value) => {
    setUserNameVal(value);
    if (value !== "") {
      setUserNameIsValid(true);
    } else {
      setUserNameIsValid(false);
    }
  };

  const checkEmailHandler = (value) => {
    setEmailVal(value);
    if (emailRegx.test(value)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const checkPasswordHandler = (value) => {
    setPasswordVal(value);
    if (value.length >= 7) {
      setPasswordIsValid(true);
      if (value === ConfPasswordVal) {
        setConfPasswordIsValid(true);
      }
    } else {
      setPasswordIsValid(false);
    }
  };

  const checkConfPasswordHandler = (value) => {
    setConfPasswordVal(value);
    if (value === PasswordVal) {
      setConfPasswordIsValid(true);
    } else {
      setConfPasswordIsValid(false);
    }
  };

  const NameChangeHandler = (value) => {
    setNameVal(value);
    if (value !== "") {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
  };

  const DescriptionChangeHandler = (value) => {
    setDescriptionVal(value);
  };

  const FileChangeHandler = (file) => {
    setProfilePicVal(file);
  };

  return (
    <>
      {Next && (
        <div
          onClick={() => {
            setNext((prev) => !prev);
          }}
          className={classes.SignUpform_Back}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
      )}
      <form className={classes.SignUpform_Form}>
        {!Next && (
          <div className={classes.SignUpform_First}>
            <div className={classes.SignUpform_Element}>
              <p>
                Username<span className={classes.SignUpform_Impo}>*</span>
              </p>
              <input
                value={UserNameVal}
                onChange={(e) => checkUserNameHandler(e.target.value)}
                className={`${classes.SignUpform_InputElement} ${
                  Show && !UserNameIsValid ? classes.error : ""
                }`}
                type="text"
                placeholder="robertDowney"
              />
            </div>
            <div className={classes.SignUpform_Element}>
              <p>
                Email<span className={classes.SignUpform_Impo}>*</span>
              </p>
              <input
                value={EmailVal}
                onChange={(e) => checkEmailHandler(e.target.value)}
                className={`${classes.SignUpform_InputElement} ${
                  Show && !EmailIsValid ? classes.error : ""
                }`}
                type="email"
                placeholder="robertD@gmail.com"
              />
            </div>
            <div className={classes.SignUpform_Element}>
              <p>
                Password<span className={classes.SignUpform_Impo}>*</span>
              </p>
              <input
                value={PasswordVal}
                onChange={(e) => checkPasswordHandler(e.target.value)}
                className={`${classes.SignUpform_InputElement} ${
                  Show && !PasswordIsValid ? classes.error : ""
                }`}
                type="password"
                placeholder="FjsdfE54*******"
              />
            </div>
            <div className={classes.SignUpform_Element}>
              <p>
                ConfirmPassword
                <span className={classes.SignUpform_Impo}>*</span>
              </p>
              <input
                value={ConfPasswordVal}
                onChange={(e) => checkConfPasswordHandler(e.target.value)}
                className={`${classes.SignUpform_InputElement} ${
                  Show && !ConfPasswordIsValid ? classes.error : ""
                }`}
                type="password"
                placeholder="FjsdfE54*******"
              />
            </div>
          </div>
        )}
        {Next && (
          <div className={classes.SignUpform_Second}>
            <div className={classes.SignUpform_Element}>
              <p>
                Name<span className={classes.SignUpform_Impo}>*</span>
              </p>
              <input
                value={NameVal}
                className={`${classes.SignUpform_InputElement} ${
                  ShowSecond && !NameIsValid ? classes.error : ""
                }`}
                onChange={(e) => NameChangeHandler(e.target.value)}
                type="text"
                placeholder="Robert Downey Jr"
              />
            </div>
            <div className={classes.SignUpform_Element}>
              <p>Profile Pic</p>
              <input
                onChange={(e) => FileChangeHandler(e.target.files[0])}
                className={classes.SignUpform_InputElement}
                type="file"
              />
            </div>
            <div className={classes.SignUpform_Element}>
              <p>Description</p>
              <textarea
                value={DescriptionVal}
                onChange={(e) => DescriptionChangeHandler(e.target.value)}
                placeholder="Hi there!"
                rows="5"
                className={classes.SignUpform_InputElement}
                type="text"
              />
            </div>
          </div>
        )}
        <Button type="submit" onClick={setNextHandler}>
          {Next && "Sign Up"}
          {!Next && "Next"}
        </Button>
        <p className={classes.SignUpform_Redirect}>
          Already have an Account?{" "}
          <Link to="/" className={classes.SignUpform_link}>
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUpForm;
