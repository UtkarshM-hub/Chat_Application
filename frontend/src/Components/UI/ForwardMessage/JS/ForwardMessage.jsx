import React, { useState } from "react";
import { useSelector } from "react-redux";
import ForwardContact from "../../ForwardContact/JS/ForwardContact";
import classes from "../CSS/ForwardMessage.module.css";
import SearchIcon from "@mui/icons-material/Search";

export const ForwardMessage = () => {
  const state = useSelector((state) => state.Friends);
  const [Selected, setSelected] = useState([]);
  const [SearchString, setSearchString] = useState("");
  const [FilteredContacts, setFilteredContacts] = useState([]);

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

  console.log(Selected);
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
    </div>
  );
};
