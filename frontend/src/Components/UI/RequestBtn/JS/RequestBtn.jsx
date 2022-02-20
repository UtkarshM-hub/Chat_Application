import React from "react";
import classes from "../CSS/RequestBtn.module.css";

const RequestBtn = ({ children, className, onClick, type }) => {
  return (
    <button
      className={`${classes.RequestBtn} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default RequestBtn;
