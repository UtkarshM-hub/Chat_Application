import React from "react";
import SettingsBar from "../../SettingsBar/JS/SettingsBar";
import classes from "../CSS/SettingsContainer.module.css";

const SettingsContainer = ({ children }) => {
  return (
    <div className={classes.SettingsContainer}>
      <SettingsBar />
      <main>
        <div className={classes.SettingsContainer_Scrollable}>{children}</div>
      </main>
    </div>
  );
};

export default SettingsContainer;
