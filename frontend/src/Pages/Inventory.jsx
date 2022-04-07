import React, { useEffect, useState } from "react";
import Alignment from "../Components/Inventory/Alignment/JS/Alignment";
import { ItemsContainer } from "../Components/Inventory/ItemsContainer/JS/ItemsContainer";
import ItemCard from "../Components/UI/ItemCard/JS/ItemCard";
import { Add } from "@mui/icons-material";
import InventoryCard from "../Components/Inventory/InventoryCard/JS/InventoryCard";
import BackgroundBlur from "../Components/UI/BackgroundBlur/JS/BackgroundBlur";
import AddSectionForm from "../Components/UI/AddSectionForm/JS/AddSectionForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../Store/store";
import SectionCard from "../Components/UI/SectionCard/JS/SectionCard";
import EditSectionForm from "../Components/UI/EditSectionForm/JS/EditSectionForm";

const Inventory = () => {
  const dispatch = useDispatch();
  const { Inventory } = useSelector((state) => state);
  const [ShowAddSectionForm, setShowAddSectionForm] = useState(false);
  const [ToggelEditSection, setToggelEditSection] = useState(false);
  const [SectionId, setSectionId] = useState();
  const userId = localStorage.getItem("userId");
  console.log(Inventory);
  const AddInventoryHandler = async (data) => {
    await axios
      .post("http://localhost/Inventory/AddSection", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.status === 500) {
          console.log("Error occured");
        }
        if (res.status === 200) {
          dispatch(ChatActions.AddSection(res.data));
          setShowAddSectionForm(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getInventoryHandler = async () => {
      await axios
        .post(
          "http://localhost/Inventory/getInventory",
          JSON.stringify({ userId: userId }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          dispatch(ChatActions.setInventory(res.data));
        })
        .catch((err) => console.log(err));
    };
    getInventoryHandler();
  }, []);

  return (
    <Alignment>
      {ShowAddSectionForm && (
        <BackgroundBlur onClick={setShowAddSectionForm}>
          <AddSectionForm addInventory={AddInventoryHandler} />
        </BackgroundBlur>
      )}
      {ToggelEditSection && (
        <BackgroundBlur onClick={setToggelEditSection}>
          <EditSectionForm
            sectionId={SectionId}
            onClick={setToggelEditSection}
          />
        </BackgroundBlur>
      )}
      <h1 style={{ color: "white", margin: "0 0 1em 0" }}>INVENTORY</h1>
      <ItemsContainer>
        <ItemCard height="10em" width="10em" onclick={setShowAddSectionForm}>
          <InventoryCard>
            <Add style={{ fontSize: "5em", color: "#95959f" }} />
            <p style={{ color: "#95959f" }}>Add Section</p>
          </InventoryCard>
        </ItemCard>
        {Inventory[0] !== undefined &&
          Inventory.map((item) => (
            <ItemCard
              key={item._id}
              height="10em"
              width="10em"
              onclick={() => 0}
            >
              <InventoryCard>
                <SectionCard
                  id={item._id}
                  image={item.Image}
                  name={item.Name}
                  ToggelEditSection={setToggelEditSection}
                  setSectionId={setSectionId}
                />
              </InventoryCard>
            </ItemCard>
          ))}
      </ItemsContainer>
    </Alignment>
  );
};

export default Inventory;
