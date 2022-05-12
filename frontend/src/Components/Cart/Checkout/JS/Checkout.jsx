import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ChatActions } from "../../../../Store/store";
import classes from "../CSS/Checkout.module.css";

const Checkout = ({ TotalAmount, Items, display }) => {
  const state = useSelector((state) => state.Settings);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const SelectedAddress = state.GeneralDetails.SelectedAddress;
  let address;
  if (state.GeneralDetails.Addresses !== undefined) {
    address = state.GeneralDetails.Addresses.filter(
      (item) => item._id.toString() === SelectedAddress.toString()
    )[0];
  }

  useEffect(() => {
    GetSettings();
  }, []);

  const GetSettings = async () => {
    await axios
      .post(
        "http://localhost/users/getSettingsHandler",
        JSON.stringify({ userId: userId }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => dispatch(ChatActions.SetSettings(res.data)));
  };
  console.log(address);
  return (
    <div className={classes.Checkout}>
      <h3>Checkout:</h3>
      {state.GeneralDetails.Addresses !== undefined && (
        <div className={classes.Checkout_Address}>
          <p className={classes.Checkout_Header}>Address:</p>
          {address !== undefined && (
            <div className={classes.Checkout_Address}>
              <p>
                {address.FirstName} {address.LastName},<br />
                {address.Address},{address.District},<br />
                {address.State},{address.PinCode}
              </p>
            </div>
          )}

          <NavLink to="/Settings/General">Choose Different Address</NavLink>
        </div>
      )}
      <p className={classes.Checkout_Header}>Order Summary:</p>
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
