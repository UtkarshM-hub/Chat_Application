import { Add } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import Button from "../../Button/JS/Button";
import classes from "../CSS/AddItemForm.module.css";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChatActions } from "../../../../Store/store";

const AddItemForm = ({ toggel }) => {
  const [Name, setName] = useState(undefined);
  const [Quantity, setQuantity] = useState(undefined);
  const [Description, setDescription] = useState(undefined);
  const [Price, setPrice] = useState(undefined);
  const [Image, setImage] = useState(undefined);
  const [ImageIsChanged, setImageIsChanged] = useState(false);
  const UserId = localStorage.getItem("userId");
  const { sectionId } = useParams();
  console.log(sectionId);
  const dispatch = useDispatch();

  const AddItemHandler = async (e) => {
    e.preventDefault();
    if (
      Name !== undefined &&
      Quantity !== undefined &&
      Description !== undefined &&
      Price !== undefined &&
      Image !== undefined &&
      Quantity > 0 &&
      Price > 0
    ) {
      const data = new FormData();
      data.append("Name", Name);
      data.append("Quantity", Quantity);
      data.append("Description", Description);
      data.append("Price", Price);
      data.append("UserId", UserId);
      data.append("SectionId", sectionId.substring(1));
      data.append("Image", Image);
      await axios
        .post("http://localhost/Inventory/AddItemToSection", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(
              ChatActions.AddItemToSection({
                data: res.data,
                sectionId: sectionId.substring(1),
              })
            );
            toggel((prev) => !prev);
          }
        });
    }
  };
  return (
    <div className={classes.AddItemForm}>
      <div className={classes.AddItemForm_MainContainer}>
        <form>
          <div className={classes.AddItemForm_Section}>
            <div className={classes.AddItemForm_InputContainer}>
              <h2 style={{ color: "white", margin: "0 0 0.5em 0" }}>
                Add Item
              </h2>
            </div>
            <div className={classes.AddItemForm_InputContainer}>
              <p>
                Name<span className={classes.AddItemForm_Required}>*</span>
              </p>
              <input
                onChange={(e) =>
                  setName(e.target.value === "" ? undefined : e.target.value)
                }
                type="text"
                placeholder="Cadbury"
                required
              />
            </div>
            <div className={classes.AddItemForm_InputContainer}>
              <p>
                Quantity<span className={classes.AddItemForm_Required}>*</span>
              </p>
              <input
                onChange={(e) =>
                  setQuantity(
                    e.target.value === "" ? undefined : e.target.value
                  )
                }
                type="number"
                placeholder="100"
                required
              />
            </div>
            <div className={classes.AddItemForm_InputContainer}>
              <p>
                Description
                <span className={classes.AddItemForm_Required}>*</span>
              </p>
              <textarea
                onChange={(e) =>
                  setDescription(
                    e.target.value === "" ? undefined : e.target.value
                  )
                }
                rows="2"
                type="text"
                placeholder="Cadbury is the product of dairymilk ....."
                required
              />
            </div>
            <div className={classes.AddItemForm_InputContainer}>
              <p>
                Price<span className={classes.AddItemForm_Required}>*</span>
              </p>
              <input
                onChange={(e) =>
                  setPrice(e.target.value === "" ? undefined : e.target.value)
                }
                type="number"
                min="1"
                placeholder="₹100"
                required
              />
            </div>
          </div>
          <div
            style={{ borderLeft: "1px solid grey" }}
            className={classes.AddItemForm_Section}
          >
            <div className={classes.AddItemForm_InputContainer}>
              <p>
                Image
                <span className={classes.AddItemForm_Required}>*</span>
              </p>
              <input
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setImageIsChanged(true);
                }}
                type="file"
                placeholder="choose it"
                required
              />
            </div>
            <div className={classes.AddItemForm_InputContainer}>
              <div className={classes.AddItemForm_ImageContainer}>
                <img
                  src={
                    ImageIsChanged === true
                      ? URL.createObjectURL(Image)
                      : "https://res.cloudinary.com/dcglxmssd/image/upload/v1649053975/pkbmp2vg8yzo2l1el7jz.png"
                  }
                  alt="just"
                />
              </div>
            </div>
            <div className={classes.AddItemForm_InputContainer}>
              <Button onClick={AddItemHandler} type="submit">
                <Add />
                ADD
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
