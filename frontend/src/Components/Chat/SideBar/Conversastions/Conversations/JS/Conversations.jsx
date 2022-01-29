import React from "react";
import Items from "../../Items/JS/Items";
import classes from "../CSS/Conversations.module.css";

const Conversations = ({ conversations, ActiveRoom }) => {
  return (
    <div className={classes.Conversations}>
      <Items ActiveRoom={ActiveRoom} Name="JS" />
      <Items ActiveRoom={ActiveRoom} Name="CSS" />
      <Items ActiveRoom={ActiveRoom} Name="HTML" />
    </div>
  );
};

export default Conversations;
