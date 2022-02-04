import React from "react";
import classes from "../CSS/Alert.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faInfoCircle,
  faTimesCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const Alert = ({ type, message, show }) => {
  let icon;
  if (type === "Success") {
    icon = faCheckCircle;
  } else if (type === "Error") {
    icon = faExclamationTriangle;
  } else if (type === "Info") {
    icon = faInfoCircle;
  } else {
    icon = faTimesCircle;
  }
  return (
    <div
      className={`${classes.Alert} ${
        show === true ? classes.show : classes.hide
      }`}
    >
      <div
        className={`${classes.Alert_Icon} ${
          type === "Success"
            ? classes.Success
            : type === "Error"
            ? classes.Error
            : type === "Info"
            ? classes.Info
            : classes.Warning
        }`}
      >
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={classes.Alert_Message_Container}>
        <p
          className={`${classes.Alert_Heading} ${
            type === "Success"
              ? classes.Success
              : type === "Error"
              ? classes.Error
              : type === "Info"
              ? classes.Info
              : classes.Warning
          }`}
        >
          {type}
        </p>
        <p className={classes.Alert_Message}>{message}</p>
      </div>
    </div>
  );
};

export default Alert;
