import React from "react";
import Button from "../../../../UI/Button/JS/Button";
import Conversations from "../../Conversastions/Conversations/JS/Conversations";
import classes from "../CSS/Sidebar.module.css";

const Sidebar = ({ ActiveRoom }) => {
  return (
    <div className={classes.Sidebar}>
      <div className={classes.Sidebar_Section}>
        <p>Conversations</p>
      </div>
      <Conversations ActiveRoom={ActiveRoom} />
      <Button>Add Conversation</Button>
    </div>
  );
};

export default Sidebar;
