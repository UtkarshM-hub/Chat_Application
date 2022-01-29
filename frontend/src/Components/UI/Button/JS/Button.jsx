import React from "react";
import classes from "../CSS/Button.module.css";

const Button = ({ children, onClick, className, type }) => {
  return (
    <>
      <button
        type={type}
        className={`${classes.Button} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
