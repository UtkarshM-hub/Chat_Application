const express=require("express");
const route=express.Router();

const PaymentController=require("../Controllers/Payments");

route.post("/CreateOrder",PaymentController.CreateOrderHandler);

route.post("/Checkout",PaymentController.CheckoutHandler);

module.exports=route;