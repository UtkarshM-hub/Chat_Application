import React from "react";
import classes from "../CSS/ItemCard.module.css";

const ItemCard = ({ children, height, width, onclick }) => {
  return (
    <div
      onClick={(e) => onclick(true)}
      style={{ height: height, width: width }}
      className={classes.ItemCard}
    >
      {children}
    </div>
  );
};

export default ItemCard;
