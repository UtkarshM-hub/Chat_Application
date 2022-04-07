import { ArrowBackIosNew, Circle } from "@mui/icons-material";
import React from "react";
import { useHistory } from "react-router-dom";
import classes from "../CSS/SectionInfo.module.css";

const SectionInfo = ({ image, name, type }) => {
  const history = useHistory();
  return (
    <div className={classes.Section_InfoContainer}>
      <div className={classes.SectionInfo_MainInfo}>
        <div className={classes.Section_SectionImageContainer}>
          <img src={image} alt="section" />
        </div>
        <div className={classes.SectionInfo_details}>
          <h1>{name}</h1>
          <div className={classes.SectionInfo_tag}>
            <Circle />
            <p>{type}</p>
          </div>
        </div>
      </div>
      <div
        className={classes.SectionInfo_Backbtn}
        onClick={(e) => history.push("/inventory")}
      >
        <div className={classes.SectionInfo_IconContainer}>
          <ArrowBackIosNew />
        </div>
      </div>
    </div>
  );
};

export default SectionInfo;
