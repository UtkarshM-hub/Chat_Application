import React, { useEffect, useState } from "react";
import classes from "../CSS/ProductDetailsComponent.module.css";

const ProductDetailsComponent = ({
  _id,
  Image,
  Name,
  Description,
  Price,
  Quantity,
  AddToCart,
}) => {
  const [QuantityNumber, setQuantityNumber] = useState(1);

  return (
    <div className={classes.ProductDetails}>
      <div className={classes.ProductDetailsComponent_Adjuster}>
        <div className={classes.ProductDetails_ImageContainer}>
          <img src={Image} alt="product" />
        </div>
        <div className={classes.ProductDetails_InfoContainer}>
          <div
            className={`${classes.ProductDetails_MainInfo} ${classes.ProductDetailsComponent_MarginClass}`}
          >
            <h2>{Name}</h2>
            <p>{Description}</p>
          </div>
          <div
            className={`${classes.ProductDetails_MoreDetails} ${classes.ProductDetailsComponent_MarginClass}`}
          >
            <div className={classes.ProductDetails_PriceContainer}>
              {Quantity !== 0 && (
                <>
                  <p>Price:</p>
                  <p className={classes.ProductDetailsComponent_PriceTag}>
                    ₹{Price}
                  </p>
                </>
              )}
              {Quantity === 0 && (
                <h2 className={classes.ProductDetailsComponent_SoldOut}>
                  Out Of Stock!
                </h2>
              )}
            </div>
            <div className={classes.ProductDetails_QuantityContainer}>
              <p>Qty:</p>
              <div
                className={classes.ProductDetails_QuantityElement}
                onClick={(e) =>
                  setQuantityNumber((prev) => {
                    if (prev === 1) {
                      return 1;
                    } else {
                      return prev - 1;
                    }
                  })
                }
              >
                -
              </div>
              <div className={classes.ProductDetails_QuantityElement}>
                {QuantityNumber}
              </div>
              <div
                className={classes.ProductDetails_QuantityElement}
                onClick={(e) =>
                  setQuantityNumber((prev) => {
                    return prev + 1;
                  })
                }
              >
                +
              </div>
            </div>
          </div>
          <div
            className={`${classes.ProductDetailsComponent_ButtonContainer} ${classes.ProductDetailsComponent_MarginClass}`}
          >
            <button
              onClick={(e) =>
                Quantity !== 0
                  ? AddToCart({ ProductId: _id, Quantity: QuantityNumber })
                  : ""
              }
              className={classes.ProductDetailsComponent_AddToCartBtn}
            >
              Add To Cart
            </button>
            <button className={classes.ProductDetailsComponent_BuyBtn}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsComponent;
