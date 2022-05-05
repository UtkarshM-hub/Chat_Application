import React, { useEffect, useState } from "react";
import Alignment from "../Components/Inventory/Alignment/JS/Alignment";
import { useParams } from "react-router-dom";
import axios from "axios";
import SectionInfo from "../Components/Section/SectionInfo/JS/SectionInfo";
import { ItemsContainer } from "../Components/Inventory/ItemsContainer/JS/ItemsContainer";
import ItemCard from "../Components/UI/ItemCard/JS/ItemCard";
import InventoryCard from "../Components/Inventory/InventoryCard/JS/InventoryCard";
import { Add, Description } from "@mui/icons-material";
import BackgroundBlur from "../Components/UI/BackgroundBlur/JS/BackgroundBlur";
import AddItemForm from "../Components/UI/AddItemForm/JS/AddItemForm";
import SectionItemCard from "../Components/UI/SectionItemCard/JS/SectionItemCard";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../Store/store";
import EditItemForm from "../Components/UI/EditItemForm/JS/EditItemForm";
import OpenItem from "../Components/UI/OpenItem/JS/OpenItem";

const Section = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Inventory);
  const [ShowAddItemForm, setShowAddItemForm] = useState(false);
  const [ShowEditItemForm, setShowEditItemForm] = useState(false);
  const [ItemData, setItemData] = useState("");
  const { sectionId } = useParams();
  const [SectionData, setSectionData] = useState();
  const userId = localStorage.getItem("userId");
  const [OpenItemInfo, setOpenItemInfo] = useState(false);
  const [OpenedItemInfo, setOpenedItemInfo] = useState();

  useEffect(() => {
    const getSectionInfo = async () => {
      await axios
        .post(
          "http://localhost/Inventory/getInventory",
          JSON.stringify({ userId: userId, sectionId: sectionId.substring(1) }),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          dispatch(ChatActions.setInventory(res.data));
        });
    };

    getSectionInfo();
  }, [sectionId]);

  useEffect(() => {
    let data = state.filter((item) => item._id === sectionId.substring(1));
    setSectionData(data[0]);
  }, [state]);
  console.log(SectionData);
  return (
    <>
      <Alignment>
        {ShowAddItemForm && (
          <BackgroundBlur onClick={setShowAddItemForm}>
            <AddItemForm toggel={setShowAddItemForm} />
          </BackgroundBlur>
        )}
        {ShowEditItemForm && (
          <BackgroundBlur onClick={setShowEditItemForm}>
            <EditItemForm toggel={setShowEditItemForm} ItemData={ItemData} />
          </BackgroundBlur>
        )}
        {OpenItemInfo === true && (
          <BackgroundBlur onClick={setOpenItemInfo}>
            <OpenItem
              id={OpenedItemInfo._id}
              Name={OpenedItemInfo.Name}
              Quantity={OpenedItemInfo.Quantity}
              Price={OpenedItemInfo.Price}
              Description={OpenedItemInfo.Description}
              Image={OpenedItemInfo.Image}
              Type={SectionData.Type}
            />
          </BackgroundBlur>
        )}
        {SectionData !== undefined && (
          <SectionInfo
            image={SectionData.Image}
            name={SectionData.Name}
            type={SectionData.Type}
          />
        )}
        <ItemsContainer>
          <ItemCard height="15em" width="12em" onclick={setShowAddItemForm}>
            <InventoryCard>
              <Add style={{ fontSize: "5em", color: "#95959f" }} />
              <p style={{ color: "#95959f" }}>Add Item</p>
            </InventoryCard>
          </ItemCard>
          {SectionData !== undefined &&
            SectionData.Items !== undefined &&
            SectionData.Items.map((item) => (
              <ItemCard
                height="15em"
                width="12em"
                key={item._id}
                onclick={(e) => 0}
              >
                <SectionItemCard
                  Name={item.ProductId.Name}
                  Quantity={item.ProductId.Quantity}
                  Price={parseInt(item.ProductId.Price)}
                  Image={item.ProductId.Image}
                  Description={item.ProductId.Description}
                  _id={item.ProductId._id}
                  sectionId={sectionId.substring(1)}
                  userId={userId}
                  setData={setItemData}
                  showEdit={setShowEditItemForm}
                  openInfo={setOpenItemInfo}
                  setCurrentOpenItemInfo={setOpenedItemInfo}
                />
              </ItemCard>
            ))}
        </ItemsContainer>
      </Alignment>
    </>
  );
};

export default Section;
