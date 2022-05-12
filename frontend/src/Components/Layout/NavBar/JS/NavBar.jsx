import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import classes from "../CSS/NavBar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { faSearch, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import SearchBox from "../../../UI/Search/SearchBox/JS/SearchBox";
import SearchItem from "../../../UI/Search/SearchItem/JS/SearchItem";
import { useDispatch, useSelector } from "react-redux";
import FriendRequest from "../../../UI/FriendRequestNotificaiton/JS/FriendRequest";
import { ChatActions } from "../../../../Store/store";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ProfileDropDown from "../../../UI/ProfileDropDown/JS/ProfileDropDown";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const NavBar = () => {
  // Declerations
  const history = useHistory();
  const [ShowOptions, setShowOptions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [ShowSearchBox, setShowSearchBox] = useState(false);
  const [ShowNotificationBox, setShowNotificationBox] = useState(false);
  const [InputElement, setInputElement] = useState();
  const [SearchResult, setSearchResult] = useState([]);
  const [Notification, setNotification] = useState({});
  const state = useSelector((state) => state);
  const cartItems = useSelector((state) => state.cart);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [User, setUser] = useState({});
  // handlers
  const FindUserHandler = async () => {
    await axios
      .post(
        "http://localhost:80/users/findUsers",
        { Name: searchText, userId: userId },
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

  const AddFriendRequestHandler = async (data) => {
    dispatch(ChatActions.AddRequested({ id: data.friendId }));
    await axios
      .post("http://localhost/Connection/friendRequest", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => console.log(res))
      .catch((Err) => console.log(Err));
  };
  useEffect(() => {
    setNotification(state.Notifications);
  }, [state]);

  const DeleteRequestHandler = async (data) => {
    if (state.Notification === undefined) {
      setShowNotificationBox(false);
    }
    dispatch(ChatActions.DenyRequest(data));

    await axios
      .post("http://localhost/Connection/DenyRequest", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const getNotificationHandler = async () => {
    await axios
      .post(
        "http://localhost/Connection/getNotifications",
        { userId: userId },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        dispatch(
          ChatActions.AddNotification({
            notification: res.data.notification,
            Requests: res.data.Requests,
            Requested: res.data.Requested,
          })
        );
        console.log({
          notification: res.data.notification,
          Requests: res.data.Requests,
          Requested: res.data.Requested,
        });
        setNotification({
          notification: res.data.notification,
          Requests: res.data.Requests,
          Requested: res.data.Requested,
        });
      })
      .catch((err) => console.log(err));
  };

  const RemoveFriendRequestHandler = async (data) => {
    dispatch(ChatActions.RemoveRequested({ id: data.friendId }));
    await axios
      .post("http://localhost/Connection/DeleteRequest", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const FetchUserData = async () => {
    await axios
      .post(
        "http://localhost/users/GetUserData",
        JSON.stringify({ userId: userId }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setUser({
          Name: res.data.Name,
          ProfilePic: res.data.ProfilePic,
          _id: res.data._id,
          Type: res.data.Type,
        });
        localStorage.setItem("Type", res.data.Type);
        localStorage.setItem("Name", res.data.Name);
        localStorage.setItem("Email", res.data.Email);
        dispatch(
          ChatActions.setUser({
            Name: res.data.Name,
            ProfilePic: res.data.ProfilePic,
            _id: res.data._id,
            Type: res.data.Type,
            Description: res.data.Description,
            Email: res.data.Email,
            UserName: res.data.UserName,
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const AcceptRequestHandler = async (data) => {
    if (state.Notification === undefined) {
      setShowNotificationBox(false);
    }
    dispatch(ChatActions.DenyRequest(data));

    await axios
      .post("http://localhost/Connection/AcceptRequest", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => dispatch(ChatActions.AddFriend(res.data)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    FetchUserData();
    getNotificationHandler();
  }, []);
  return (
    <div className={classes.NavBar}>
      <div className={classes.NavBar_ContentContianer}>
        <div className={classes.NavBar_Logo}>
          <div
            className={classes.NavBar_LogoSec}
            onClick={(e) => history.push("/")}
          >
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
              <SearchBox Mode={"Search"}>
                {SearchResult !== "User Not Found" &&
                  SearchResult.map((item) => {
                    return (
                      <SearchItem
                        name={item.Name}
                        picture={item.ProfilePic}
                        key={item._id}
                        id={item._id}
                        addFriend={AddFriendRequestHandler}
                        RemoveFriend={RemoveFriendRequestHandler}
                        Deny={DeleteRequestHandler}
                        Accept={AcceptRequestHandler}
                      />
                    );
                  })}
                {SearchResult === "User Not Found" && <p>No Result</p>}
              </SearchBox>
            )}
          </div>
        </div>
        <div className={classes.NavBar_Profile}>
          <div className={classes.NavBar_ShopContainer}>
            <NavLink
              to="/Shop"
              className={classes.NavBar_Link}
              activeClassName={classes.active}
            >
              <ShoppingBagOutlinedIcon
                onClick={(e) => {
                  history.push("/Shop");
                  return;
                }}
                className={classes.NavBar_Shop}
              />
            </NavLink>
          </div>
          <div className={classes.NavBar_Notification}>
            <NavLink to="/Cart" activeClassName={classes.active}>
              <ShoppingCartOutlinedIcon className={classes.NavBar_Cart} />
              {cartItems !== undefined && cartItems[0] !== undefined && (
                <div className={classes.NavBar_Dot}></div>
              )}
            </NavLink>
          </div>
          <div className={classes.NavBar_Notification}>
            <FontAwesomeIcon
              onClick={(e) => {
                setShowNotificationBox((prev) => !prev);
              }}
              className={classes.NavBar_BellIcon}
              icon={faBell}
            />
            {Notification.Requests !== undefined &&
              Notification.Requests[0] !== undefined && (
                <div className={classes.NavBar_Dot}>1</div>
              )}
          </div>
          {ShowNotificationBox && Notification.Requests !== undefined && (
            <SearchBox Mode={"Notification"}>
              {Notification.Requests.map((item) => (
                <FriendRequest
                  name={item.from.Name}
                  picture={item.from.ProfilePic}
                  key={item.from._id}
                  id={item.from._id}
                  DeleteRequest={DeleteRequestHandler}
                  Accept={AcceptRequestHandler}
                />
              ))}
            </SearchBox>
          )}
          {ShowOptions && <ProfileDropDown />}
          <div
            className={classes.NavBar_ProfileContainer}
            onClick={(e) => setShowOptions((prev) => !prev)}
          >
            <div className={classes.NavBar_ProfilePic}>
              <img src={state.user.ProfilePic} alt="profile pic" />
            </div>
            <p>{state.user.Name}</p>
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
