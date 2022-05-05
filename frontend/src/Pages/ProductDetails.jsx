import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Alignment from "../Components/Inventory/Alignment/JS/Alignment";
import ProductDetailsComponent from "../Components/ProductDetails/JS/ProductDetailsComponent";
import axios from "axios";

const ProductDetails = () => {
  const { ProductId } = useParams();
  const userId = localStorage.getItem("userId");
  const [ProductInfo, setProductInfo] = useState({});
  const history = useHistory();
  useEffect(() => {
    const getProductDataHandler = async () => {
      await axios
        .post(
          "http://localhost/Shop/GetProductData",
          JSON.stringify({ ProductId: ProductId.substring(1), _id: userId }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) =>
          setProductInfo({
            _id: res.data._id,
            Name: res.data.Name,
            Description: res.data.Description,
            Price: res.data.Price,
            Quantity: res.data.Quantity,
            Image: res.data.Image,
          })
        );
    };
    getProductDataHandler();
  }, [ProductId, userId]);

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
      <ProductDetailsComponent
        _id={ProductInfo._id}
        Image={ProductInfo.Image}
        Name={ProductInfo.Name}
        Description={ProductInfo.Description}
        Price={ProductInfo.Price}
        Quantity={ProductInfo.Quantity}
        AddToCart={AddToCartHandler}
      />
    </Alignment>
  );
};

export default ProductDetails;
