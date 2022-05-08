import React from "react";
import classes from "../CSS/AddressContainer.module.css";
import { Radio } from "@mui/material";
import { useDispatch } from "react-redux";
import { ChatActions } from "../../../../Store/store";
import axios from "axios";

const AddressContainer = ({
  _id,
  Name,
  Address,
  Edit,
  checked,
  checkedValue,
  Selected,
}) => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  return (
    <div className={classes.AddressContainer}>
      <Radio
        onClick={(e) => {
          dispatch(ChatActions.SetSelectedAddress({ _id: _id }));
          let time = setTimeout(async () => {
            await axios
              .post(
                "http://localhost/users/SetSelectedAddress",
                JSON.stringify({ userId: userId, _id: _id }),
                {
                  headers: { "Content-Type": "application/json" },
                }
              )
              .then((res) => console.log(res));
          }, 2000);
        }}
        checked={Selected === _id}
        onChange={(e) => {
          checked(e.target.value);
        }}
        value={_id}
        name="radio-buttons"
      />
      <p>{Name}</p>
      <p>{Address}</p>
    </div>
  );
};

export default AddressContainer;
