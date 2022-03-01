import React from "react";
import classes from "../CSS/FriendRequest.module.css";
import RequestBtn from "../../RequestBtn/JS/RequestBtn";

const FriendRequest = ({ name, picture, id, DeleteRequest, Accept }) => {
  const userId = localStorage.getItem("userId");
  return (
    <div className={classes.FriendRequest}>
      <div className={classes.FriendRequest_Info}>
        <div className={classes.FriendRequest_ImgContainer}>
          <img src={picture} alt="profile" />
        </div>
        <p>{name}</p>
      </div>
      <RequestBtn
        Btype="Normal"
        onClick={(e) => {
          Accept({ friendId: id, userId: userId });
        }}
      >
        Accept
      </RequestBtn>
      <RequestBtn
        Btype="Invert"
        onClick={(e) => {
          return DeleteRequest({ friendId: id, userId: userId });
        }}
      >
        Delete
      </RequestBtn>
    </div>
  );
};

export default FriendRequest;
