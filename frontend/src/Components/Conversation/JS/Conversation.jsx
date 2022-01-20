import React from "react";
import classes from "../CSS/Conversation.module.css";

const Conversation = ({ id, name, onClick, isActive }) => {
  return (
    <div
      onClick={() => onClick()}
      className={`${classes.Conversation} ${isActive ? classes.active : ""}`}
    >
      <p>{name}</p>
    </div>
  );
};

export default Conversation;
