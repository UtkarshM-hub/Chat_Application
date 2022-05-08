import React from "react";
import classes from "../CSS/MyOrderLayout.module.css";

const MyOrderLayout = ({ children }) => {
  return (
    <div className={classes.MyOrderLayout}>
      <div className={classes.MyOrderLayout_MainLayout}>{children}</div>
    </div>
  );
};

export default MyOrderLayout;
