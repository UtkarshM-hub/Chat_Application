import React, { useState } from "react";
import classes from "../CSS/SalesItemContainer.module.css";
import DoneIcon from "@mui/icons-material/Done";

const SalesItemContainer = ({
  _id,
  Name,
  time,
  Status,
  Address,
  Phone,
  Email,
  Items,
  TotalAmount,
}) => {
  const [Open, setOpen] = useState(false);
  return (
    <div className={classes.SalesItemContainer}>
      <div
        className={classes.SalesItemContainer_VisiblePart}
        onClick={(e) => setOpen((prev) => !prev)}
      >
        <div className={classes.SalesItemContainer_IdContainer}>
          <p>#{_id}</p>
        </div>
        <div className={classes.SalesItemContainer_DateContainer}>
          <p>{time.split("T")[0]}</p>
        </div>
        <div className={classes.SalesItemContainer_Name}>
          <p>Name: {Name}</p>
        </div>
        <div className={classes.SalesItemContainer_Quantity}>
          <p>Items: {Items.length}</p>
        </div>
        <div className={classes.SalesItemContainer_Status}>
          <p>Status:</p>
          <div className={classes.SalesItemContainer_StatusContainer}>
            <div
              className={`${
                Status === "Pending"
                  ? classes.SalesItemContainer_ProgressDot
                  : classes.SalesItemContainer_DeliveredDot
              }`}
            ></div>
            <p>{Status}</p>
          </div>
        </div>
      </div>
      <div
        className={`${classes.SalesItemContainer_Invisible} ${
          Open
            ? classes.SalesItemContainer_ShowIt
            : classes.SalesItemContainer_HideIt
        }`}
      >
        <div className={classes.SalesItemContainer_AddressInfo}>
          <h3 style={{ color: "white", margin: "0.5em 0" }}>Address: </h3>
          <div className={classes.SalesItemContainer_AddressInfoContainer}>
            <h4>Name: </h4>
            <p>{Name}</p>
          </div>
          <div className={classes.SalesItemContainer_AddressInfoContainer}>
            <h4>Email: </h4>
            <p>{Email}</p>
          </div>
          <div className={classes.SalesItemContainer_AddressInfoContainer}>
            <h4>Address: </h4>
            <p>{Address}</p>
          </div>
          <div className={classes.SalesItemContainer_AddressInfoContainer}>
            <h4>Phone No: </h4>
            <p>{Phone}</p>
          </div>
        </div>
        <div className={classes.SalesItemContainer_ItemContainer}>
          <h3 style={{ color: "white", margin: "0.5em" }}>Items:</h3>
          <div className={classes.SalesItemContainer_Fixer}>
            {Items !== undefined &&
              Items.map((item) => (
                <div
                  key={item._id}
                  className={classes.SalesItemContainer_AdjustedDiv}
                >
                  <div className={classes.SalesItemContainer_InfoContainer}>
                    <div className={classes.SalesItemContainer_ImageContainer}>
                      <img src={item.ProductId.Image} alt="item" />
                    </div>
                    <div className={classes.SalesItemContainer_NormalInfo}>
                      <h3>{item.ProductId.Name}</h3>
                      <p>Qty:{item.Quantity}</p>
                      <h3 className={classes.SalesItemContainer_NormalPrice}>
                        ₹{item.ProductId.Price}
                      </h3>
                    </div>
                  </div>
                  <div className={classes.SalesItemContainer_Price}>
                    <h3>TotalAmount:</h3>
                    <h3 className={classes.SalesItemContainer_TotalAmount}>
                      ₹{item.ProductId.Price * item.Quantity}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className={classes.SalesItemContainer_ITemDeliveredContainer}>
          <button className={classes.SalesItemContainer_SentBtn}>
            <p>Sent</p>
            {/* <DoneIcon /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesItemContainer;
