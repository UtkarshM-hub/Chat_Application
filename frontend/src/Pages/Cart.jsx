import React, { useEffect, useState } from "react";
import CartContainer from "../Components/Cart/CartContainer/JS/CartContainer";
import CartItems from "../Components/Cart/CartItems/JS/CartItems";
import Checkout from "../Components/Cart/Checkout/JS/Checkout";
import Alignment from "../Components/Inventory/Alignment/JS/Alignment";
import CartItemComponent from "../Components/UI/CartItemComponent/JS/CartItemComponent";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ChatActions } from "../Store/store";
import useRazorpay from "react-razorpay";
import { useParams } from "react-router-dom";

const LoadRazorPay = async () => {
  return new Promise((resolve) => {
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://checkout.razorpay.com/v1/checkout.js";
    scriptTag.onload(resolve(true));
    scriptTag.onerror(resolve(false));
    document.body.appendChild(scriptTag);
  });
};

const Cart = ({ show, data }) => {
  const Razorpay = useRazorpay();
  const Name = localStorage.getItem("Name");
  const Email = localStorage.getItem("Email");
  const [CartItemsData, setCartItemsData] = useState();
  // const [TotalAmount, setTotalAmount] = useState(0);
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const TotalAmount = useSelector((state) => state.TotalAmount);
  const Settings = useSelector((state) => state.Settings);
  const [CurrentAddress, setCurrentAddress] = useState();
  const { BuyNow } = useParams();

  console.log(CurrentAddress);
  useEffect(() => {
    const getCartHandler = async () => {
      await axios
        .post(
          "http://localhost/Shop/GetCart",
          JSON.stringify({ userId: userId }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (res) => {
          dispatch(ChatActions.setCart(res.data.Items));
        });
    };
    getCartHandler();
  }, []);

  const IncreaseQtyHandler = async (id, qty) => {
    console.log(id, qty);
    await axios
      .post(
        "http://localhost/Shop/SetQuantity",
        JSON.stringify({ userId: userId, ProductId: id, Quantity: qty }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => console.log(res));
    dispatch(ChatActions.IncreaseProductQty({ ProductId: id }));
  };

  const ReduceQtyHandler = async (id, qty) => {
    await axios
      .post(
        "http://localhost/Shop/SetQuantity",
        JSON.stringify({ userId: userId, ProductId: id, Quantity: qty }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => console.log(res));
    dispatch(ChatActions.DecreaseProductQty({ ProductId: id }));
  };

  const RemoveFromCartHandler = async (id) => {
    await axios
      .post(
        "http://localhost/Shop/RemoveFromCart",
        JSON.stringify({ userId: userId, ProductId: id }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => console.log(res));
    console.log("It is working");
    dispatch(ChatActions.RemoveFromCartHandler({ ProductId: id }));
  };

  // CHECKOUT SECTION

  const DisplayRazorPay = async () => {
    const res = await LoadRazorPay();

    if (!res) {
      alert("Razorpay SDK failed");
      return;
    }
    await axios
      .post(
        "http://localhost/Payment/CreateOrder",
        JSON.stringify({ userId: userId, Amount: TotalAmount }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        const options = {
          key: "rzp_test_6gYjHzxKBzZ5wm", // Enter the Key ID generated from the Dashboard
          amount: TotalAmount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: res.data.currency,
          name: "Checkout",
          description: "Thanks for buying",
          image:
            "https://res.cloudinary.com/dcglxmssd/image/upload/v1645168669/Logo_dw6nts.png",
          order_id: res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: async function (response) {
            console.log(response); //sace this info into database
            show(true);
            data({ type: "Success", message: "Payment Successful" });
            const time = setTimeout(() => {
              show(false);
              clearTimeout(time);
            }, 5000);

            if (CurrentAddress !== undefined) {
              await axios
                .post(
                  "http://localhost/Payment/Checkout",
                  JSON.stringify({
                    userId: userId,
                    TotalAmount: TotalAmount,
                    Address: `${CurrentAddress.Address},${CurrentAddress.District},${CurrentAddress.State},${CurrentAddress.PinCode}`,
                    PhoneNumber: CurrentAddress.Phone,
                  }),
                  { headers: { "Content-Type": "application/json" } }
                )
                .then((res) => {
                  if (res.status === 200) {
                    dispatch(ChatActions.clearCart());
                  }
                });
            }
          },
          prefill: {
            name: Name !== undefined ? Name : "Name",
            email: Email !== undefined ? Email : "Email",
          },
          // theme: {
          //   color: "#3399cc",
          // },
        };
        const PayOptions = new Razorpay(options);
        PayOptions.open();

        //
      });
  };

  useEffect(() => {
    if (Settings.GeneralDetails.Addresses !== undefined) {
      setCurrentAddress(
        Settings.GeneralDetails.Addresses.filter(
          (item) =>
            item._id.toString() ===
            Settings.GeneralDetails.SelectedAddress.toString()
        )[0]
      );
    }
  }, [Settings]);
  useEffect(() => {
    setCartItemsData(cart);
  }, [cart]);
  useEffect(() => {
    if (BuyNow !== undefined && BuyNow.substring(1) === "true") {
      setTimeout(() => {
        DisplayRazorPay();
      }, 3000);
    }
  }, [BuyNow, TotalAmount]);
  console.log(cart);
  return (
    <Alignment>
      <h1 style={{ marginBottom: "1em", color: "white" }}>CART</h1>
      {cart[0] === undefined && (
        <h3 style={{ color: "white" }}>Cart Is Empty!</h3>
      )}
      <CartContainer>
        <CartItems>
          {CartItemsData !== undefined &&
            CartItemsData.map((item) => (
              <CartItemComponent
                key={item.ProductId._id}
                _id={item.ProductId._id}
                objectId={item._id}
                Name={item.ProductId.Name}
                Image={item.ProductId.Image}
                Price={item.ProductId.Price}
                Quantity={item.Quantity}
                IncreaseItemQty={IncreaseQtyHandler}
                ReduceQtyHandler={ReduceQtyHandler}
                RemoveFromCartHandler={RemoveFromCartHandler}
              />
            ))}
        </CartItems>
        <Checkout
          Items={CartItemsData !== undefined ? CartItemsData.length : 0}
          TotalAmount={TotalAmount}
          display={DisplayRazorPay}
        />
      </CartContainer>
    </Alignment>
  );
};

export default Cart;
