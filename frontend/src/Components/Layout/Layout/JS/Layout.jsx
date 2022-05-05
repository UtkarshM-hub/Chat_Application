import React from "react";
import NavBar from "../../NavBar/JS/NavBar";
import Sidebar from "../../SideBar/JS/Sidebar";
import classes from "../CSS/Layout.module.css";

const Layout = ({ children }) => {
  const type = localStorage.getItem("Type");
  return (
    <div className={classes.Layout}>
      <NavBar />
      <main className={classes.Layout_main}>
        {type === "Business" && <Sidebar />}
        {children}
      </main>
    </div>
  );
};

export default Layout;
