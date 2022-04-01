import React from "react";
import classes from "../CSS/InventoryCard.module.css";

const InventoryCard = ({ children }) => {
  return <div className={classes.InventoryCard}>{children}</div>;
};

export default InventoryCard;
