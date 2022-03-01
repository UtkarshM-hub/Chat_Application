import React, { useState } from "react";
import classes from "../CSS/SearchItem.module.css";
import RequestBtn from "../../../RequestBtn/JS/RequestBtn";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SearchItem = ({
  name,
  picture,
  id,
  addFriend,
  RemoveFriend,
  Deny,
  Accept,
}) => {
  const userId = localStorage.getItem("userId");
  const state = useSelector((state) => state);
  const [Requested, setRequested] = useState(false);
  const [AcceptButtons, setAcceptButtons] = useState(false);
  let IsRequestedTheUser, IsRequested;
  useEffect(() => {
    if (state.Notifications.Requests !== undefined) {
      IsRequestedTheUser = state.Notifications.Requests.map(
        (item) => item.from._id.toString() === id
      )[0];
    }
    if (IsRequestedTheUser === true) {
      setAcceptButtons(true);
    }
    if (state.Notifications.Requested !== undefined) {
      IsRequested = state.Notifications.Requested.map((item) => {
        console.log(item._id, id);
        return item.To === id;
      })[0];
    }
    if (IsRequested === true) {
      setRequested(true);
    }
  }, []);
  return (
    <div className={classes.SearchItem}>
      <div className={classes.SearchItem_Info}>
        <div className={classes.SearchItem_ImgContainer}>
          <img src={picture} alt="profile" />
        </div>
        <p>{name}</p>
      </div>
      {AcceptButtons === false && (
        <RequestBtn
          Btype={Requested ? "Requested" : "Normal"}
          onClick={(e) => {
            setRequested((prev) => !prev);
            if (!Requested) {
              addFriend({ friendId: id, userId: userId });
            } else {
              RemoveFriend({ friendId: id, userId: userId });
            }
          }}
        >
          {Requested ? "Requested" : "Request"}
        </RequestBtn>
      )}
      {AcceptButtons && (
        <>
          <RequestBtn
            Btype="Normal"
            onClick={(e) => {
              Accept({ friendId: id, userId: userId });
            }}
          >
            Accept
          </RequestBtn>
          <RequestBtn
            Btype="Requested"
            onClick={() => Deny({ friendId: id, userId: userId })}
          >
            Delete
          </RequestBtn>
        </>
      )}
    </div>
  );
};

export default SearchItem;
