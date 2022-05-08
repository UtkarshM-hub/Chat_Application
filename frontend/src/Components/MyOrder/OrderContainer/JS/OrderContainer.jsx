import React from "react";
import classes from "../CSS/OrderContainer.module.css";
import CloseIcon from "@mui/icons-material/Close";

const OrderContainer = ({ _id, Totalamount, Date, Items, Status }) => {
  return (
    <div className={classes.OrderContainer}>
      <div className={classes.OrderContainer_Info}>
        <h3 className={classes.OrderContainer_OrderId}>#252415124214</h3>
        <p>Date: 34/34/33</p>
      </div>
      <div className={classes.OrderContainer_Items}>
        <div className={classes.OrderContainer_ItemsContainer}>
          <div className={classes.OrderContainer_ProductInfo}>
            <div className={classes.OrderContainer_ImageContainer}>
              <img
                src="http://res.cloudinary.com/dcglxmssd/image/upload/v1649258150/khtq5w66mvofkybcmioe.jpg"
                alt="this"
              />
            </div>
            <div className={classes.OrderContainer_BasicInfo}>
              <h3>Name</h3>
              <div className={classes.OrderContainer_Together}>
                <p>Qty:1</p>
                <p className={classes.OrderContainer_PriceNumber}>₹100</p>
              </div>
            </div>
          </div>
          <div className={classes.OrderContainer_MetaData}>
            <div className={classes.OrderContainer_Status}>
              <h3>Status</h3>
              <p>{Status}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.OrderContainer_Action}>
        <div className={classes.OrderContainer_CancelOrder}>
          <CloseIcon />
          Cancel Order
        </div>
        <h2 className={classes.OrderContainer_Amount}>₹{Totalamount}</h2>
      </div>
    </div>
  );
};

export default OrderContainer;
