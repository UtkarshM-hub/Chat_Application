import React from "react";
import classes from "../CSS/ForwardContact.module.css";
import { Checkbox } from "@mui/material";

const ForwardContact = ({
  Name,
  id,
  Image,
  IsOnline,
  socketId,
  addSelected,
  convoId,
  removeSelected,
}) => {
  const addSelectedHandler = (e) => {
    console.log("checked");
    addSelected({
      _id: id,
      convoId: convoId,
      IsOnline: IsOnline,
      socketId: socketId,
      Name: Name,
    });
    return;
  };

  const RemoveSelectedHandler = () => {
    removeSelected({ _id: id });
  };

  return (
    <div className={classes.ForwardContact}>
      <div className={classes.ForwardContact_Main}>
        <div className={classes.ForwardContact_ImageContainer}>
          <img src={Image} alt="this is an" />
        </div>
        <div className={classes.ForwardContact_Info}>
          <p>{Name}</p>
        </div>
      </div>
      <div className={classes.ForwardContact_}>
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              addSelectedHandler();
            }
            if (!e.target.checked) {
              RemoveSelectedHandler();
            }
          }}
          color="secondary"
        />
      </div>
    </div>
  );
};

export default ForwardContact;
