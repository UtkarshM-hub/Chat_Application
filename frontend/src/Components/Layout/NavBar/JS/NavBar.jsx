import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import classes from "../CSS/NavBar.module.css";
import { faSearch, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import SearchBox from "../../../UI/Search/SearchBox/JS/SearchBox";

const NavBar = () => {
  // Declerations
  const [searchText, setSearchText] = useState("");
  const [ShowSearchBox, setShowSearchBox] = useState(false);
  const [InputElement, setInputElement] = useState();
  const [SearchResult, setSearchResult] = useState([]);
  // handlers
  const FindUserHandler = async () => {
    await axios
      .post(
        "http://localhost:80/users/findUsers",
        { Name: searchText },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setSearchResult(res.data.Data);
        setShowSearchBox(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.NavBar}>
      <div className={classes.NavBar_ContentContianer}>
        <div className={classes.NavBar_Logo}>
          <div className={classes.NavBar_LogoSec}>
            <p>
              C<span>.</span>
            </p>
          </div>
          <div className={classes.NavBar_Search}>
            <FontAwesomeIcon
              className={classes.NavBar_SearchIcon}
              icon={faSearch}
            />
            <input
              value={searchText}
              // onKeyPress={(e) => (e.key === "Enter" ? FindUserHandler() : "")}
              onChange={(e) => {
                setSearchText(e.target.value);
                setInputElement(e.target);
                let val = e.target.value;
                setTimeout(() => {
                  if (e.target.value === val) {
                    FindUserHandler();
                  }
                }, 1000);
                if (e.target.value === "") {
                  setSearchResult([]);
                }
              }}
              onBlur={(e) => {
                setShowSearchBox(false);
              }}
              className={classes.NavBar_SearchInput}
              type="text"
              placeholder="Search for people"
            />
            {searchText.length > 0 && (
              <p
                onClick={() => {
                  setSearchText("");
                  InputElement.focus();
                  setShowSearchBox(false);
                }}
                className={classes.NavBar_XMark}
              >
                &#x2715;
              </p>
            )}
            {ShowSearchBox && searchText !== "" && (
              <SearchBox items={SearchResult} />
            )}
          </div>
        </div>
        <div className={classes.NavBar_Profile}>
          <div className={classes.NavBar_Notification}>
            <FontAwesomeIcon
              className={classes.NavBar_BellIcon}
              icon={faBell}
            />
          </div>
          <div className={classes.NavBar_ProfileContainer}>
            <div className={classes.NavBar_ProfilePic}>
              <img
                src="https://res.cloudinary.com/dcglxmssd/image/upload/v1645077249/a7hirutoylqsdlt1w8e8.jpg"
                alt="profile pic"
              />
            </div>
            <p>Utkarsh Mandape</p>
            <FontAwesomeIcon
              className={classes.NavBar_ToggleIcon}
              icon={faAngleDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
