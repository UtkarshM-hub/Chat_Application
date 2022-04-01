import React from "react";
import classes from "../CSS/ItemsContainer.module.css";

export const ItemsContainer = ({ children }) => {
  return <div className={classes.ItemsContainer}>{children}</div>;
};
