import React from "react";
import SearchItem from "../../SearchItem/JS/SearchItem";
import classes from "../CSS/SearchBox.module.css";

const SearchBox = ({ items }) => {
  console.log(items);
  return (
    <div className={classes.SearchBox}>
      {items !== "User Not Found" &&
        items.map((item) => (
          <SearchItem
            name={item.Name}
            picture={item.ProfilePic}
            key={item._id}
            id={item._id}
          />
        ))}
      {items === "User Not Found" && <p>No Result</p>}
    </div>
  );
};

export default SearchBox;
