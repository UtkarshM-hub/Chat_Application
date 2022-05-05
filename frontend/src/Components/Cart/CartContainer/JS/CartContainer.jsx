import React from "react";
import classes from "../CSS/CartContainer.module.css";

const CartContainer = ({ children }) => {
  return <div className={classes.CartContainer}>{children}</div>;
};

export default CartContainer;
