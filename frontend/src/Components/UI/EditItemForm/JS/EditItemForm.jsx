import { Add } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../Button/JS/Button";
import classes from "../CSS/EditItemForm.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../../../../Store/store";

const EditItemForm = ({ toggel, ItemData }) => {
  const [Name, setName] = useState("");
  const [_id, setId] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Image, setImage] = useState("");
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
      data.append("_id", _id);
      data.append("Image", Image);
      console.log(data);

      await axios
        .post("http://localhost/Inventory/EditItemFromSection", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.status === 200) {
            toggel((prev) => !prev);
            dispatch(
              ChatActions.UpdateItemFromSection({
                data: res.data,
                SectionId: sectionId.substring(1),
                _id: _id,
              })
            );
          }
        });
    }
  };

  useEffect(() => {
    setName(ItemData.Name);
    setQuantity(ItemData.Quantity);
    setDescription(ItemData.Description);
    setPrice(ItemData.Price);
    setImage(ItemData.Image);
    setId(ItemData._id);
  }, [ItemData]);

  console.log(ItemData, Name, Quantity, Description, Price, Image);

  return (
    <div className={classes.EditItemForm}>
      <div className={classes.EditItemForm_MainContainer}>
        <form>
          <div className={classes.EditItemForm_Section}>
            <div className={classes.EditItemForm_InputContainer}>
              <h2 style={{ color: "white", margin: "0 0 0.5em 0" }}>
                Add Item
              </h2>
            </div>
            <div className={classes.EditItemForm_InputContainer}>
              <p>
                Name<span className={classes.EditItemForm_Required}>*</span>
              </p>
              <input
                value={Name}
                onChange={(e) =>
                  setName(e.target.value === "" ? undefined : e.target.value)
                }
                type="text"
                placeholder="Cadbury"
                required
              />
            </div>
            <div className={classes.EditItemForm_InputContainer}>
              <p>
                Quantity<span className={classes.EditItemForm_Required}>*</span>
              </p>
              <input
                value={Quantity}
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
            <div className={classes.EditItemForm_InputContainer}>
              <p>
                Description
                <span className={classes.EditItemForm_Required}>*</span>
              </p>
              <textarea
                value={Description}
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
            <div className={classes.EditItemForm_InputContainer}>
              <p>
                Price<span className={classes.EditItemForm_Required}>*</span>
              </p>
              <input
                value={Price}
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
            className={classes.EditItemForm_Section}
          >
            <div className={classes.EditItemForm_InputContainer}>
              <p>
                Image
                <span className={classes.EditItemForm_Required}>*</span>
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
            <div className={classes.EditItemForm_InputContainer}>
              <div className={classes.EditItemForm_ImageContainer}>
                <img
                  src={
                    ImageIsChanged === true ? URL.createObjectURL(Image) : Image
                  }
                  alt="just"
                />
              </div>
            </div>
            <div className={classes.EditItemForm_InputContainer}>
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

export default EditItemForm;
