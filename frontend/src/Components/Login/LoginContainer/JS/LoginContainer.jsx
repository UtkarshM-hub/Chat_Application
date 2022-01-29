import React from "react";
import classes from "../CSS/LoginContainer.module.css";

const LoginContainer = ({ children }) => {
  return <div className={classes.LoginContainer}>{children}</div>;
};

export default LoginContainer;
