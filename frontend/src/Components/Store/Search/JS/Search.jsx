import React, { useState } from "react";
import classes from "../CSS/Search.module.css";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ searchItem }) => {
  const [ItemName, setItemName] = useState("");
  return (
    <div className={classes.Search}>
      <div className={classes.Search_InputContainer}>
        <SearchIcon
          className={classes.Search_SearchIcon}
          onClick={(e) => {
            searchItem(ItemName);
          }}
        />
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setItemName(e.target.value);
          }}
          className={classes.Search_InputElement}
          onKeyPress={(e) => {
            if (e.key === "Enter" && ItemName !== "") {
              searchItem(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Search;
