import React from "react";
import classes from "../CSS/SettingsHeader.module.css";
import { useHistory } from "react-router-dom";

const SettingsHeader = ({ Header, Text, saveHandler }) => {
  const history = useHistory();
  return (
    <div className={classes.SettingsHeader}>
      <div className={classes.SettingsHeader_Component}>
        <h2>{Header}</h2>
        <p>{Text}</p>
      </div>
      <div className={classes.SettingsHeader_ButtonComponent}>
        <button
          onClick={(e) => history.push("/")}
          className={`${classes.SettingsHeader_Btn} ${classes.SettingsHeader_CancelBtn}`}
        >
          Cancel
        </button>
        <button
          onClick={(e) => saveHandler()}
          className={`${classes.SettingsHeader_Btn} ${classes.SettingsHeader_SaveBtn}`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SettingsHeader;
