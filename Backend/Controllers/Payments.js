const Razorpay=require("razorpay");
const UserModal = require("../Models/UserModal");
const Product=require("../Models/Product");

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
  const {userId,TotalAmount}=req.body;
  try{
    const user=await UserModal.findById(userId);
    console.log(user.Cart);
    for(let i=0;i<user.Cart.Items.length;i++){
      console.log(user.Cart.Items[i]._id)
      await Product.updateOne({"_id":user.Cart.Items[i].ProductId._id},{$inc:{"Quantity":-user.Cart.Items[i].Quantity}})
    }
    await UserModal.updateOne({"_id":userId},{"Cart.Items":[],$push:{"MyOrders":{Items:[...user.Cart.Items],TotalAmount:TotalAmount}}});
    res.send("success");
  }
  catch(err){
    console.log(err);
  }
}