import React, { Children } from "react";
import classes from "../CSS/ChatContainer.module.css";

const ChatContainer = ({ children }) => {
  return <div className={classes.ChatContainer}>{children}</div>;
};

export default ChatContainer;
