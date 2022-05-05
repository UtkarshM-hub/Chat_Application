const Product=require("../Models/Product");
const UserModal = require("../Models/UserModal");

exports.GetProducts=async(req,res,next)=>{
    const {ItemName}=req.body;
    try{
        const regex = new RegExp(`${ItemName}`);
        const products=await Product.find({Name:{$regex:regex,$options:"i"}});
        res.send(products);
    }
    catch(err){
        console.log(err);
    }
}

exports.GetProductData=async(req,res,next)=>{
    const {_id,ProductId}=req.body;
    console.log(req.body)
    try{
        const data=await Product.findById(ProductId);
        res.send(data);
    }catch(err){
        console.log(err);
    }
}

exports.AddToCart=async(req,res,next)=>{
    const {_id,data}=req.body;
    try{
        const user=await UserModal.findByIdAndUpdate(_id,{$push:{"Cart.Items":{"ProductId":data.ProductId,"Quantity":data.Quantity}}});
        res.send("success");
    }
    catch(err){
        console.log(err);
    }
}

exports.GetCartHanlder=async(req,res,next)=>{
    const {userId}=req.body;
    try{
        const user=await UserModal.findById(userId).populate("Cart.Items.ProductId");
        res.send(user.Cart);
    }
    catch(err){
        console.log(err);
    }
}

exports.setQuantity=async(req,res,next)=>{
    const {userId,ProductId,Quantity}=req.body;
    console.log(userId,ProductId,Quantity);
    try{
        // UserModal.findByIdAndUpdate(userId,{"Cart.Items.ProductId":{"Quantity":Quantity}});
        await UserModal.updateOne({"_id":userId,"Cart.Items.ProductId":ProductId},{"Cart.Items.$.Quantity":Quantity})
        res.send("success");
    }
    catch(err){
        console.log(err);
    }
}

exports.RemoveItemFromCart=async(req,res,next)=>{
    const {userId,ProductId}=req.body;
    try{
        // await UserModal.updateOne({"_id":userId,"Cart.Items._id":ProductId},{$pull:{"Cart.Items":{"_id":ProductId}}})
        await UserModal.findByIdAndUpdate(userId,{$pull:{"Cart.Items":{"_id":ProductId}}});
        res.send("succes");
    }
    catch(err){
        console.log(err);
    }
}