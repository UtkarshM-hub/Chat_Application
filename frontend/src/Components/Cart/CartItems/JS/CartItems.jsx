import React from "react";
import classes from "../CSS/CartItems.module.css";

const CartItems = ({ children }) => {
  return (
    <div className={classes.CartItems}>
      <div className={classes.CartItems_MainContainer}>{children}</div>
    </div>
  );
};

export default CartItems;
