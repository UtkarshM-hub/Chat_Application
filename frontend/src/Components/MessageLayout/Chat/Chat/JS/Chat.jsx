import React from "react";
import classes from "../CSS/Chat.module.css";

const Chat = ({ children }) => {
  return <div className={classes.Chat}>{children}</div>;
};

export default Chat;
