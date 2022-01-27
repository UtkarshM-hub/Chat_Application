import React from "react";
import Chat from "../../Chat/JS/Chat";
import InputContainer from "../../InputContainer/JS/InputContainer";
import classes from "../CSS/MessagesContainer.module.css";

const MessagesContainer = ({ id, Entered }) => {
  return (
    <div className={classes.MessagesContainer}>
      <Chat />
      <InputContainer id={id} />
    </div>
  );
};

export default MessagesContainer;
