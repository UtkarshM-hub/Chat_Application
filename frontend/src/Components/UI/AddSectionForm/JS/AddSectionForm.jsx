import Button from "../../Button/JS/Button";
import React, { useState } from "react";
import classes from "../CSS/AddSectionForm.module.css";

const AddSectionForm = ({ addInventory }) => {
  const [Name, setName] = useState(undefined);
  const [Type, setType] = useState(undefined);
  const [Image, setImage] = useState();
  const userId = localStorage.getItem("userId");

  const SendDataHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    console.log(Name !== undefined && Type !== undefined);
    if (Name !== undefined && Type !== undefined) {
      fd.append("Name", Name);
      fd.append("Type", Type);
      fd.append("userId", userId);
      fd.append("Image", Image);
    }
    addInventory(fd);
    return;
  };
  return (
    <div className={classes.AddSectionForm}>
      <div className={classes.AddSectionForm_FormContainer}>
        <h3>Add Section</h3>
        <form>
          <div className={classes.AddSectionForm_ElementContainer}>
            <p>
              Name<span className={classes.AddSectionForm_Impo}>*</span>
            </p>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="My Food Section"
              className={classes.AddSectionForm_InputElements}
              required
            />
          </div>
          <div className={classes.AddSectionForm_ElementContainer}>
            <p>
              Type<span className={classes.AddSectionForm_Impo}>*</span>
            </p>
            <input
              onChange={(e) => setType(e.target.value)}
              type="text"
              placeholder="Food"
              className={classes.AddSectionForm_InputElements}
              required
            />
          </div>
          <div className={classes.AddSectionForm_ElementContainer}>
            <p>Image</p>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              className={classes.AddSectionForm_InputElements}
            />
          </div>
          <Button onClick={SendDataHandler} type="submit">
            ADD
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddSectionForm;
