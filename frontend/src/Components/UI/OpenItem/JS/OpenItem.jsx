import React from "react";
import classes from "../CSS/OpenItem.module.css";

const OpenItem = ({ _id, Name, Quantity, Price, Description, Image, Type }) => {
  console.log(Price, typeof Price);
  return (
    <div className={classes.OpenItem}>
      <div className={classes.OpenItem_MainContainer}>
        <div className={classes.OpenItem_Header}>
          <h2>Product Info</h2>
        </div>
        <div className={classes.OpenItem_ProductInfo}>
          <div className={classes.OpenItem_ImageSide}>
            <div className={classes.OpenItem_ImageContainer}>
              <img src={Image} alt="Product" />
            </div>
          </div>
          <div className={classes.OpenItem_InfoSide}>
            <div className={classes.OpenItem_ItemSingleInfo}>
              <p className={classes.OpenItem_Key}>Name:</p>
              <p className={classes.OpenItem_Value}>{Name}</p>
            </div>
            <div className={classes.OpenItem_ItemSingleInfo}>
              <p className={classes.OpenItem_Key}>Type:</p>
              <p className={classes.OpenItem_Value}>{Type}</p>
            </div>
            <div className={classes.OpenItem_ItemSingleInfo}>
              <p className={classes.OpenItem_Key}>Description:</p>
              <p className={classes.OpenItem_Value}>{Description}</p>
            </div>
            <div className={classes.OpenItem_ItemSingleInfo}>
              <p className={classes.OpenItem_Key}>Price:</p>
              <p
                className={`${classes.OpenItem_Value} ${classes.OpenItem_Price}`}
              >
                ₹{Price.toLocaleString("en-US")}
              </p>
            </div>
            <div className={classes.OpenItem_ItemSingleInfo}>
              <p className={classes.OpenItem_Key}>Quantity:</p>
              <p className={classes.OpenItem_Value}>{Quantity} Qty</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.OpenItem_SlantDesign}></div>
    </div>
  );
};

export default OpenItem;
