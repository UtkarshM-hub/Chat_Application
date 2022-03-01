import React from "react";
import classes from "../CSS/MessageLayout.module.css";

const MessageLayout = ({ children }) => {
  return <div className={classes.MessageLayout}>{children}</div>;
};

export default MessageLayout;
