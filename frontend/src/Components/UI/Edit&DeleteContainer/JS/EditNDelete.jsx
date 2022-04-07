import React from "react";
import classes from "../CSS/EditNDelete.module.css";

const EditNDelete = ({ id, type, DeleteItem, EditSection, toggelMore }) => {
  return (
    <div className={classes.EditNDelete}>
      <div
        className={classes.EditNDelete_Options}
        onClick={(e) => {
          EditSection();
          toggelMore((prev) => !prev);
        }}
      >
        <p>Edit</p>
      </div>
      <div
        className={classes.EditNDelete_Options}
        onClick={(e) => {
          DeleteItem();
          toggelMore((prev) => !prev);
        }}
      >
        <p className={classes.EditNDelete_DeleteOpt}>Delete</p>
      </div>
    </div>
  );
};

export default EditNDelete;
