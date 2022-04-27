import React, { useState } from "react";
import { useSelector } from "react-redux";
import ForwardContact from "../../ForwardContact/JS/ForwardContact";
import classes from "../CSS/ForwardMessage.module.css";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ChatActions } from "../../../../Store/store";

export const ForwardMessage = ({ message, CloseHandler }) => {
  const userId = localStorage.getItem("userId");
  const state = useSelector((state) => state.Friends);
  const [Selected, setSelected] = useState([]);
  const [SearchString, setSearchString] = useState("");
  const dispatch = useDispatch();

  const addSelected = (data) => {
    setSelected((prev) => {
      let newData = [...prev, data];
      return newData;
    });
  };

  const removeSelected = (data) => {
    setSelected((prev) => {
      let newPrev = prev.filter(
        (item) => item._id.toString() !== data._id.toString()
      );
      return newPrev;
    });
  };

  const regex = new RegExp(`${SearchString}`, "i");
  if (SearchString !== "") {
    let filteredList = state.filter(
      (item) => item.friend.id.Name.search(regex) !== -1
    );
  }

  // const ForwardMessageHandler=async()=>{

  // }
  const ForwardMessageHandler = async () => {
    if (Selected[0] !== undefined) {
      const data = {
        userId: userId,
        data: Selected,
        message: message,
      };
      await axios
        .post(
          "http://localhost/Connection/ForwardMessage",
          JSON.stringify(data),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => console.log(res));

      dispatch(
        ChatActions.ForwardMessage({ message: message, data: Selected })
      );
      CloseHandler((prev) => !prev);
    }
  };

  return (
    <div className={classes.ForwardMessage}>
      <div className={classes.ForwardMessage_Header}>
        <h3>Forward Message to</h3>
      </div>
      <div className={classes.ForwardMessage_Search}>
        <SearchIcon className={classes.ForwardMessage_SearchIcon} />
        <input
          className={classes.ForwardMessage_Input}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          type="text"
          placeholder="Search"
        />
      </div>
      <div className={classes.ForwardMessage_Contacts}>
        <div className={classes.ForwardMessage_ContactsContainer}>
          {SearchString === "" &&
            state.map((item) => (
              <ForwardContact
                key={item._id}
                Name={item.friend.id.Name}
                Image={item.friend.id.ProfilePic}
                id={item.friend.id._id}
                convoId={item.conversationId}
                IsOnline={item.friend.id.IsOnline}
                socketId={item.friend.id.socketId}
                addSelected={addSelected}
                removeSelected={removeSelected}
              />
            ))}
          {SearchString !== "" &&
            state
              .filter((item) => item.friend.id.Name.search(regex) !== -1)
              .map((item) => (
                <ForwardContact
                  key={item._id}
                  Name={item.friend.id.Name}
                  Image={item.friend.id.ProfilePic}
                  id={item._id}
                  convoId={item.conversationId}
                  IsOnline={item.friend.id.IsOnline}
                  socketId={item.friend.id.socketId}
                  addSelected={addSelected}
                  removeSelected={removeSelected}
                />
              ))}
        </div>
      </div>
      <div className={classes.ForwardMessage_SendContainer}>
        <div className={classes.ForwardMessage_ContactsList}>
          {Selected[0] !== undefined &&
            Selected.map((item) => (
              <p key={item._id}>{item.Name.split(" ")[0]} ,</p>
            ))}
        </div>
        <div
          className={classes.ForwardMessage_ForwardIconContainer}
          onClick={ForwardMessageHandler}
        >
          <SendIcon className={classes.ForwardMessage_SendIcon} />
        </div>
      </div>
    </div>
  );
};
