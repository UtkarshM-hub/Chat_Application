import React from "react";
import classes from "../CSS/Button.module.css";

const Button = ({ children, className, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classes.Button} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
