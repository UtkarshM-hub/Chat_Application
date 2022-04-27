import React from "react";
import { useSelector } from "react-redux";
import classes from "../CSS/ContactItem.module.css";

const ContactItem = ({
  image,
  name,
  id,
  onClick,
  socketId,
  IsOnline,
  Active,
  friendId,
}) => {
  const state = useSelector((state) => state.Friends);
  const newSocketId = state.filter((item) => item.conversationId === id);
  console.log(newSocketId[0].friend.id.socketId);
  return (
    <div
      className={`${classes.ContactItem} ${Active ? classes.Active : ""}`}
      onClick={(e) => {
        onClick({
          id: id,
          socketId: IsOnline ? newSocketId[0].friend.id.socketId : undefined,
          friendId: friendId,
          IsOnline: IsOnline,
        });
      }}
    >
      <div className={classes.ContactItem_Both}>
        <div className={classes.ContactItem_ImageContainer}>
          <img src={image} alt="Profile" />
        </div>
        <div className={classes.ContactItem_InfoContainer}>
          <h3>{name}</h3>
          <p>Hi there! How are you</p>
        </div>
      </div>
      <div className={classes.ContactItem_DataContainer}>
        <p>6:03</p>
        <div className={classes.ContactItem_NewMSG}>
          <p>1</p>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
