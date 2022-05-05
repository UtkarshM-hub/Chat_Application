import React from "react";
import classes from "../CSS/Checkout.module.css";

const Checkout = ({ TotalAmount, Items, display }) => {
  return (
    <div className={classes.Checkout}>
      <div className={classes.Checkout_Amount}>
        <p>Total Items: </p>
        <p className={classes.Checkout_TotalAmount}>{Items}</p>
      </div>
      <div className={classes.Checkout_Amount}>
        <p>Total Amount: </p>
        <p className={classes.Checkout_Price}>
          ₹{TotalAmount.toLocaleString("en-US")}
        </p>
      </div>
      <button
        onClick={(e) => display()}
        className={classes.Checkout_CheckoutBtn}
      >
        CHECKOUT
      </button>
    </div>
  );
};

export default Checkout;
