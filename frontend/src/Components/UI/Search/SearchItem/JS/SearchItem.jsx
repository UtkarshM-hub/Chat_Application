import React from "react";
import classes from "../CSS/SearchItem.module.css";
import RequestBtn from "../../../RequestBtn/JS/RequestBtn";

const SearchItem = ({ name, picture, id }) => {
  return (
    <div className={classes.SearchItem}>
      <div className={classes.SearchItem_Info}>
        <div className={classes.SearchItem_ImgContainer}>
          <img src={picture} alt="profile" />
        </div>
        <p>{name}</p>
      </div>
      <RequestBtn>Request</RequestBtn>
    </div>
  );
};

export default SearchItem;
