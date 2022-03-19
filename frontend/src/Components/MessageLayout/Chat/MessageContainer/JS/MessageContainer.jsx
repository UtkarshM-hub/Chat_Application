import React from "react";
import classes from "../CSS/MessageContainer.module.css";

const MessageContainer = ({ message, id, from, to }) => {
  const userId = localStorage.getItem("userId");
  return (
    <div
      className={`${classes.MessageContainer} ${
        from === userId ? classes.MyMsg : classes.OtherMsg
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

export default MessageContainer;
