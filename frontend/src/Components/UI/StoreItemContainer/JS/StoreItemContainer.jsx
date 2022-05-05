import React from "react";
import classes from "../CSS/StoreItemContainer.module.css";

const StoreItemContainer = ({ children }) => {
  return (
    <div className={classes.StoreItemContainer}>
      <div className={classes.StoreItemContainer_Inner}>
        <div className={classes.StoreItemContainer_Actual}>{children}</div>
      </div>
    </div>
  );
};

export default StoreItemContainer;
