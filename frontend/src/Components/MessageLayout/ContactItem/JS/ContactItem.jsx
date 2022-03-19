import React from "react";
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
  console.log(name);
  return (
    <div
      className={`${classes.ContactItem} ${Active ? classes.Active : ""}`}
      onClick={(e) =>
        onClick({
          id: id,
          socketId: IsOnline ? socketId : undefined,
          friendId: friendId,
          IsOnline: IsOnline,
        })
      }
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
