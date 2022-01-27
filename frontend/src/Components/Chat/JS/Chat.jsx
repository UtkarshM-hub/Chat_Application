import React from "react";
import classes from "../CSS/Chat.module.css";

const Chat = ({ children, Enteredmsg }) => {
  return (
    <div className={classes.Chat}>
      <div>{Enteredmsg}</div>
    </div>
  );
};

export default Chat;
