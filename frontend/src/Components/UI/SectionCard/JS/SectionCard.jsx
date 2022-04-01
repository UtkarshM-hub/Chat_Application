import React from "react";
import classes from "../CSS/SectionCard.module.css";
import { MoreVert } from "@mui/icons-material";

const SectionCard = ({ image, name, id }) => {
  return (
    <div
      onClick={(e) => console.log("Not this")}
      className={classes.SectionCard}
    >
      <MoreVert
        onClick={(e) => console.log("Clicked")}
        className={classes.SectionCard_MoreIcon}
      />
      <div className={classes.SectionCard_ImageContainer}>
        <img src={image} alt="pic" />
      </div>
      <p>{name}</p>
    </div>
  );
};

export default SectionCard;
