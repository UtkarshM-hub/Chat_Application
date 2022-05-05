import React from "react";
import classes from "../CSS/StoreItem.module.css";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useHistory } from "react-router-dom";

const StoreItem = ({
  _id,
  Name,
  Description,
  Price,
  Image,
  Quantity,
  addToCart,
}) => {
  const history = useHistory();
  return (
    <div className={classes.StoreItem}>
      <div className={classes.StoreItem_ImageContainer}>
        <img src={Image} alt="store" />
      </div>
      <div className={classes.StoreItem_Info}>
        <div
          className={classes.StoreItem_Name}
          onClick={(e) => history.push(`/ProductDetails/:${_id}`)}
        >
          <p>{Name}</p>
        </div>
        <div className={classes.StoreItem_OtherInfo}>
          <div className={classes.StoreItem_PriceContainer}>
            {Quantity !== 0 && (
              <>
                <p className={classes.StoreItem_Tag}>Price</p>
                <p className={classes.StoreItem_PriceTag}>₹{Price}</p>
              </>
            )}
            {Quantity === 0 && (
              <h3 className={classes.StoreItem_StockOut}>Out Of Stock!</h3>
            )}
          </div>
          <div
            className={classes.StoreItem_AddToCart}
            onClick={(e) => console.log("It is also working")}
          >
            {Quantity !== 0 && (
              <ShoppingBagOutlinedIcon
                onClick={(e) =>
                  Quantity !== 0
                    ? addToCart({ ProductId: _id, Quantity: 1 })
                    : ""
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
