import React from "react";
import classes from "../CSS/ItemsContainer.module.css";

export const ItemsContainer = ({ children }) => {
  return (
    <div className={classes.ItemsContainer}>
      <div className={classes.ItemsContainer_Scrollable}>
        <div className={classes.ItemsContainer_ActualContainer}>{children}</div>
      </div>
    </div>
  );
};
