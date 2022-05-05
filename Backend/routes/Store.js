const Express=require("express");
const Router=Express.Router();

const ShopController=require("../Controllers/ShopController");

Router.post("/GetProducts",ShopController.GetProducts);

Router.post("/GetProductData",ShopController.GetProductData);

Router.post("/AddToCart",ShopController.AddToCart);

Router.post("/GetCart",ShopController.GetCartHanlder);

Router.post("/SetQuantity",ShopController.setQuantity);

Router.post("/RemoveFromCart",ShopController.RemoveItemFromCart);


module.exports=Router;