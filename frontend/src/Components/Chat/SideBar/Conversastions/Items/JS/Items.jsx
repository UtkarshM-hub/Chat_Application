import React, { useState } from "react";
import classes from "../CSS/Items.module.css";

const Items = ({ Name, ActiveRoom }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      tabIndex="1"
      onFocus={(e) => {
        setIsActive(true);
        return ActiveRoom(Name);
      }}
      onBlur={(e) => {
        setIsActive(false);
      }}
      className={`${classes.Items} ${isActive ? classes.active : ""}`}
    >
      <p>{Name}</p>
    </div>
  );
};

export default Items;
