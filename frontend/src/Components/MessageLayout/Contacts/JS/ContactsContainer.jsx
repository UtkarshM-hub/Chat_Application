import React from "react";
import classes from "../CSS/ContactsContainer.module.css";

const ContactsContainer = ({ children }) => {
  return (
    <div className={classes.ContactsContainer}>
      <div className={classes.ContactsContainer_ItemsContainer}>{children}</div>
    </div>
  );
};

export default ContactsContainer;
