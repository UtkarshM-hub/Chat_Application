import React from "react";
import NavBar from "../../NavBar/JS/NavBar";
import Sidebar from "../../SideBar/JS/Sidebar";
import classes from "../CSS/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={classes.Layout}>
      <NavBar />
      <main className={classes.Layout_main}>
        <Sidebar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
