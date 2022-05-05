import React, { useEffect, useState } from "react";
import classes from "../CSS/CartItemComponent.module.css";

const CartItemComponent = ({
  _id,
  Name,
  Quantity,
  Image,
  Price,
  objectId,
  IncreaseItemQty,
  ReduceQtyHandler,
  RemoveFromCartHandler,
}) => {
  const [CurrentQuantity, setCurrentQuantity] = useState(+Quantity);
  console.log(typeof +Price);
  return (
    <div className={classes.CartItemComponent}>
      <div className={classes.CartItemComponent_MainDataContainer}>
        <div className={classes.CartItemComponent_ImageContainer}>
          <img src={Image} alt="this" />
        </div>
        <div className={classes.CartItemComponent_OtherDetails}>
          <h3>{Name}</h3>
          <p
            onClick={(e) => RemoveFromCartHandler(objectId)}
            className={classes.CartItemComponent_RemoveBtn}
          >
            Remove
          </p>
        </div>
      </div>
      <div className={classes.CartItemComponent_QuantityContainer}>
        <p>Qty:</p>
        <div
          className={classes.CartItemComponent_QuantityElement}
          onClick={(e) =>
            setCurrentQuantity((prev) => {
              if (prev === 1) {
                return 1;
              } else {
                ReduceQtyHandler(_id, Quantity - 1);
                return prev - 1;
              }
            })
          }
        >
          -
        </div>
        <div className={classes.CartItemComponent_QuantityElement}>
          {CurrentQuantity}
        </div>
        <div
          className={classes.CartItemComponent_QuantityElement}
          onClick={(e) =>
            setCurrentQuantity((prev) => {
              console.log(prev);
              console.log(typeof prev);
              IncreaseItemQty(_id, Quantity + 1);
              return prev + 1;
            })
          }
        >
          +
        </div>
      </div>
      <div className={classes.CartItemComponent_PriceContainer}>
        <p>
          <span>Price:</span>₹{Price}
        </p>
      </div>
      <div className={classes.CartItemComponent_TotalPriceContainer}>
        <p>
          <span>Total Price:</span>₹{+Price * CurrentQuantity}
        </p>
      </div>
    </div>
  );
};

export default CartItemComponent;
