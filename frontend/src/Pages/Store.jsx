import React, { useState } from "react";
import Alignment from "../Components/Inventory/Alignment/JS/Alignment";
import Search from "../Components/Store/Search/JS/Search";
import { ItemsContainer } from "../Components/Inventory/ItemsContainer/JS/ItemsContainer";
import axios from "axios";
import ItemCard from "../Components/UI/ItemCard/JS/ItemCard";
import StoreItem from "../Components/UI/StoreItem/JS/StoreItem";
import StoreItemContainer from "../Components/UI/StoreItemContainer/JS/StoreItemContainer";
import { useHistory } from "react-router-dom";

const Store = () => {
  const [Products, setProducts] = useState([]);
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const SearchItemHandler = async (itemName) => {
    console.log(itemName);
    await axios
      .post(
        "http://localhost/Shop/GetProducts",
        JSON.stringify({ ItemName: itemName }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setProducts(res.data);
      });
  };

  const AddToCartHandler = async (data) => {
    await axios
      .post(
        "http://localhost/Shop/AddToCart",
        JSON.stringify({ _id: userId, data: data }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          history.push("/Cart");
        }
      });
  };

  return (
    <Alignment>
      <h1 style={{ color: "white", margin: "0 0 0.6em 0" }}>STORE</h1>
      <Search searchItem={SearchItemHandler} />
      <StoreItemContainer>
        {Products[0] === undefined && (
          <h2 style={{ color: "white" }}>No Results!</h2>
        )}
        {Products[0] !== undefined &&
          Products.map((item) => (
            <StoreItem
              key={item._id}
              _id={item._id}
              Name={item.Name}
              Description={item.Description}
              Price={item.Price}
              Image={item.Image}
              Quantity={item.Quantity}
              addToCart={AddToCartHandler}
            />
          ))}
      </StoreItemContainer>
    </Alignment>
  );
};

export default Store;
