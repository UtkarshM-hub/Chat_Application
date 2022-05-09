import React from "react";
import classes from "../CSS/OrderContainer.module.css";
import CloseIcon from "@mui/icons-material/Close";

const OrderContainer = ({ _id, Totalamount, Items, Time }) => {
  return (
    <div className={classes.OrderContainer}>
      <div className={classes.OrderContainer_Info}>
        <h3 className={classes.OrderContainer_OrderId}>#{_id}</h3>
        <p>Date: {Time.split("T")[0]}</p>
      </div>
      <div className={classes.OrderContainer_Items}>
        {Items !== undefined &&
          Items.map((item) => (
            <div className={classes.OrderContainer_ItemsContainer}>
              <div className={classes.OrderContainer_ProductInfo}>
                <div className={classes.OrderContainer_ImageContainer}>
                  <img src={item.ProductId.Image} alt="this" />
                </div>
                <div className={classes.OrderContainer_BasicInfo}>
                  <h3>{item.ProductId.Name}</h3>
                  <div className={classes.OrderContainer_Together}>
                    <p>Qty:{item.Quantity}</p>
                    <p className={classes.OrderContainer_PriceNumber}>
                      ₹{item.ProductId.Price * item.Quantity}
                    </p>
                  </div>
                </div>
              </div>
              <div className={classes.OrderContainer_MetaData}>
                <div className={classes.OrderContainer_Status}>
                  <h3>Status</h3>
                  <p
                    className={
                      item.Status === "In-Progress"
                        ? classes.OrderContainer_Progress
                        : classes.OrderContainer_Delivered
                    }
                  >
                    {item.Status}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className={classes.OrderContainer_Action}>
        {/* <div className={classes.OrderContainer_CancelOrder}>
          <CloseIcon />
          Cancel Order
        </div> */}
        <h2 className={classes.OrderContainer_Amount}>
          ₹{Totalamount.toLocaleString("en-US")}
        </h2>
      </div>
    </div>
  );
};

export default OrderContainer;
