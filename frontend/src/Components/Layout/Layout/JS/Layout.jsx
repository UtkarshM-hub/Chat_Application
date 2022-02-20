import React from "react";
import NavBar from "../../NavBar/JS/NavBar";
import classes from "../CSS/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={classes.Layout}>
      <NavBar />
      <main className={classes.Layout_main}>{children}</main>
    </div>
  );
};

export default Layout;
