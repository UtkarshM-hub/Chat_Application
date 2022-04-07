import { Description, MoreVert } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import EditNDelete from "../../Edit&DeleteContainer/JS/EditNDelete";
import classes from "../CSS/SectionItemCard.module.css";
import { ChatActions } from "../../../../Store/store";

const SectionItemCard = ({
  Name,
  Price,
  Quantity,
  _id,
  Image,
  sectionId,
  Description,
  userId,
  setData,
  showEdit,
  openInfo,
  setCurrentOpenItemInfo,
}) => {
  const [ToggelOptions, setToggelOptions] = useState(false);
  const dispatch = useDispatch();

  const DeleteItemHandler = async () => {
    await axios
      .post(
        "http://localhost/Inventory/DeleteItem",
        JSON.stringify({ _id: _id, SectionId: sectionId, userId: userId }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            ChatActions.RemoveItemFromSection({
              _id: _id,
              SectionId: sectionId,
            })
          );
        }
      });
  };

  const EditItemHandler = async () => {
    setData({
      _id: _id,
      Name: Name,
      Image: Image,
      Quantity: Quantity,
      Description: Description,
      Price: parseInt(Price),
      _id: _id,
    });
    showEdit(true);
  };
  return (
    <div className={classes.SectionItemCard}>
      <MoreVert
        className={classes.SectionItemCard_MoreIcon}
        onClick={(e) => setToggelOptions((prev) => !prev)}
      />
      {ToggelOptions && (
        <EditNDelete
          toggelMore={setToggelOptions}
          DeleteItem={DeleteItemHandler}
          EditSection={EditItemHandler}
        />
      )}
      <div
        className={classes.SectionItemCard_MainContainer}
        onClick={(e) => {
          e.preventDefault();
          setCurrentOpenItemInfo({
            _id: _id,
            Name: Name,
            Image: Image,
            Quantity: Quantity,
            Description: Description,
            Price: parseInt(Price),
            _id: _id,
          });
          openInfo((prev) => !prev);
        }}
      >
        <div className={classes.FirstContainer}>
          <div className={classes.SectionItemCard_ImageContainer}>
            <img src={Image} alt="nice" />
          </div>
          <div className={classes.SectionItemCard_NameContainer}>
            <h3>{Name}</h3>
          </div>
        </div>
        <div className={classes.SectionItemCard_InfoContianer}>
          <div className={classes.SectionItemCard_MoreInfoContainer}>
            <p className={classes.SectionItemCard_Price}>
              ₹{Price.toLocaleString("en-US")}
            </p>
            <p className={classes.SectionItemCard_Qty}>{Quantity} Qty</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionItemCard;
