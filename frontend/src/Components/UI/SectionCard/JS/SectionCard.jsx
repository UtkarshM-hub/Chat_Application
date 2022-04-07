import React, { useState } from "react";
import classes from "../CSS/SectionCard.module.css";
import { MoreVert } from "@mui/icons-material";
import EditNDelete from "../../Edit&DeleteContainer/JS/EditNDelete";
import { useDispatch } from "react-redux";
import { ChatActions } from "../../../../Store/store";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SectionCard = ({
  image,
  name,
  id,
  ToggelEditSection,
  setSectionId,
  sectionId,
}) => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const history = useHistory();
  const [OpenMoreOption, setOpenMoreOption] = useState(false);

  // Functions
  const DeleteItemHandler = async () => {
    await dispatch(ChatActions.RemoveSection({ id: id }));
    await axios
      .post(
        "http://localhost/Inventory/DeleteSection",
        JSON.stringify({ id: id, userId: userId }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => console.log(res));
  };

  const EditSectionHandler = async () => {
    ToggelEditSection((prev) => !prev);
    setSectionId(id);
  };
  return (
    <div className={classes.SectionCard}>
      <MoreVert
        onClick={(e) => setOpenMoreOption((prev) => !prev)}
        className={classes.SectionCard_MoreIcon}
      />
      {OpenMoreOption && (
        <EditNDelete
          toggelMore={setOpenMoreOption}
          DeleteItem={DeleteItemHandler}
          EditSection={EditSectionHandler}
        />
      )}
      <div
        onClick={(e) => {
          history.push(`/Inventory/:${id}`);
        }}
        className={classes.SectionCard_InfoContainer}
      >
        <div className={classes.SectionCard_ImageContainer}>
          <img src={image} alt="pic" />
        </div>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default SectionCard;
