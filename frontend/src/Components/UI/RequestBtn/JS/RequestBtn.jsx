import React from "react";
import classes from "../CSS/RequestBtn.module.css";

const RequestBtn = ({ children, className, onClick, type, Btype }) => {
  return (
    <button
      className={`${
        Btype === "Normal" ? classes.RequestBtn : classes.Requested
      } ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default RequestBtn;
