import React, { useState } from "react";
import classes from "../CSS/MessageContainer.module.css";
import ReplyIcon from "@mui/icons-material/Reply";

const MessageContainer = ({
  message,
  id,
  from,
  to,
  showForward,
  setForwardMessage,
}) => {
  const userId = localStorage.getItem("userId");
  return (
    <div
      className={`${classes.MessageContainer} ${
        from === userId ? classes.MyMsg : classes.OtherMsg
      }`}
    >
      {from === userId && (
        <ReplyIcon
          onClick={(e) => {
            showForward({ id: id, message: message });
            setForwardMessage(message);
          }}
          className={classes.MessageContainer_MoreIcon}
        />
      )}
      <div
        className={`${classes.Under} ${
          from === userId ? classes.MyMsgContainer : classes.OtherMsgContainer
        }`}
      >
        <p>{message}</p>
      </div>
      {from !== userId && (
        <ReplyIcon
          onClick={(e) => {
            showForward({ id: id, message: message });
            setForwardMessage(message);
          }}
          className={classes.MessageContainer_MoreIcon}
        />
      )}
    </div>
  );
};

export default MessageContainer;
