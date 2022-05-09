import React from "react";
import classes from "../CSS/SalesContainer.module.css";

const SalesContainer = ({ children }) => {
  return (
    <div className={classes.SalesContainer}>
      <div className={classes.SalesContainer_MainContainer}>{children}</div>
    </div>
  );
};

export default SalesContainer;
