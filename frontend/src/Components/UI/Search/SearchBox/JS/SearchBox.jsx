import React from "react";
import classes from "../CSS/SearchBox.module.css";

const SearchBox = ({ children, Mode }) => {
  // Handlers
  return (
    <div
      style={{ left: Mode === "Notification" ? "75%" : "9%" }}
      className={classes.SearchBox}
    >
      {children}
    </div>
  );
};

export default SearchBox;
