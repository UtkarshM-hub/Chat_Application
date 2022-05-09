const Razorpay=require("razorpay");
const UserModal = require("../Models/UserModal");
const Product=require("../Models/Product");
const { Mongoose, Schema } = require("mongoose");
const {v4}=require('uuid');

var instance = new Razorpay({
    key_id: 'rzp_test_6gYjHzxKBzZ5wm',
    key_secret: 'SURc9bDR9mkCt4DoVLPLjJHP',
  });

exports.CreateOrderHandler=async(req,res,next)=>{
    const {userId,Amount}=req.body;
    try{
        let options = {
          amount: Amount*100,  // amount in the smallest currency unit
          currency: "INR",
            };
        await instance.orders.create(options, function(err, order) {
          if(err){
            return res.status(500).send(err);
          }
          res.send(order);
        });
    }
    catch(err){
      console.log(err);
    }
  
}

exports.CheckoutHandler=async(req,res,next)=>{
  const {userId,TotalAmount,Address,PhoneNumber}=req.body;
  let newArr;
  try{
    const user=await UserModal.findById(userId).populate("Cart.Items.ProductId").then(newUsr=>{
      newArr=newUsr.Cart.Items.map(item=>{
        return {ProductId:{...item.ProductId._doc},Quantity:item.Quantity,Status:"In-Progress"}
      });
      return newUsr;
    });
    for(let i=0;i<user.Cart.Items.length;i++){
      console.log(user.Cart.Items[i]._id)
      await UserModal.updateOne({"_id":user.Cart.Items[i].ProductId.Creator},{$push:{"SalesOrder":{
        Name:user.Name,
        Email:user.Email,
        Address:Address,
        PhoneNumber:PhoneNumber,
        Item:user.Cart.Items[i],
        Status:"Pending"
      }}})
      console.log(user.Cart.Items[i].ProductId.Creator)
      await Product.updateOne({"_id":user.Cart.Items[i].ProductId._id},{$inc:{"Quantity":-(user.Cart.Items[i].Quantity===0?0:user.Cart.Items[i].Quantity)}});
    }
    await UserModal.updateOne({"_id":userId},{"Cart.Items":[],$push:{"MyOrders":{Items:newArr,TotalAmount:TotalAmount,Status:"In-Progress"}}});
    res.send(user.Cart.Items);
  }
  catch(err){
    console.log(err);
  }
}