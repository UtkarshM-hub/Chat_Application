import React from "react";
import classes from "../CSS/BackgroundBlur.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const BackgroundBlur = ({ children, onClick }) => {
  return (
    <div className={classes.BackgroundBlur}>
      <FontAwesomeIcon
        onClick={(e) => onClick(false)}
        className={classes.BackgroundBlur_CancelBtn}
        icon={faCircleXmark}
      />
      {children}
    </div>
  );
};

export default BackgroundBlur;
