const Analytics = require("../Models/Analytics");
const Product=require("../Models/Product");
const UserModal = require("../Models/UserModal");

const date=new Date();
const today=date.getDate();
const month=date.getMonth();
const day=date.getDay();

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
        await Product.updateOne({"_id":ProductId},{$inc:{"Visits":+1}})
        const data=await Product.findById(ProductId).then(async(result)=>{
            let creator=result.Creator;
            const analytics=await Analytics.findOne({"creator":creator});

            if(analytics!==undefined){
                if(analytics.currentMonth.MonthNo!==month){
                  if(today>=1 && today<=7){
                    week=1;
                  }
                  if(today>=8 && today<=15){
                    week=2;
                  }
                  if(today>=16 && today<=23){
                    week=3;
                  }
                  if(today>=24 && today<=31){
                    week=4;
                  }
                  console.log(day,today,week,month)
                  analytics.currentMonth.MonthNo=month;
                  analytics.currentMonth={
                      MonthNo:month,
                      Orders:{
                            data:[0,0,0,0],
                            Items:[
                            {
                                data:[0,0,0,0,0,0,0],
                            },
                            {
                                data:[0,0,0,0,0,0,0],
                            },
                            {
                                data:[0,0,0,0,0,0,0],
                            },
                            {
                                data:[0,0,0,0,0,0,0],
                            },
                        ]
                      },
                      Visits:{
                            data:[0,0,0,0],
                            Items:[
                            {
                                data:[0,0,0,0,0,0,0],
                            },
                            {
                                data:[0,0,0,0,0,0,0],
                            },
                            {
                                data:[0,0,0,0,0,0,0],
                            },
                            {
                                data:[0,0,0,0,0,0,0],
                            },
                        ]
                      },
                      Revenue:{
                            data:[0,0,0,0],
                            Items:[
                            {
                                data:[0,0,0,0,0,0,0],
                            },
                            {
                                data:[0,0,0,0,0,0,0],
                            },
                            {
                                data:[0,0,0,0,0,0,0],
                            },
                            {
                                data:[0,0,0,0,0,0,0],
                            },
                        ]
                      }
                  }
                  analytics.currentMonth.Visits.Items[week-1].data[day]=1;
                  let sum=analytics.currentMonth.Visits.Items[week-1].data.reduce((prev,curr)=>{prev+=curr},0)
                  analytics.currentMonth.Visits.data[week-1]=sum;
                  await Analytics.updateOne({"Creator":creator},{"currentMonth":analytics.currentMonth});
                }
                if(analytics.currentMonth.MonthNo===month){
                  if(today>=1 && today<=7){
                    week=1;
                  }
                  if(today>=8 && today<=15){
                    week=2;
                  }
                  if(today>=16 && today<=23){
                    week=3;
                  }
                  if(today>=24 && today<=31){
                    week=4;
                  }
                  console.log(day,today,week,month)
                  analytics.currentMonth.Visits.Items[week-1].data[day]=analytics.currentMonth.Visits.Items[week-1].data[day]+1;
                  let sumOfWeek=analytics.currentMonth.Visits.Items[week-1].data.reduce((prev,curr)=>prev+=curr,0);
                  analytics.currentMonth.Visits.data[week-1]=sumOfWeek;
                  await Analytics.updateOne({"Creator":creator},{"currentMonth":analytics.currentMonth});
                }
              }
              return res.send(result);
        });

        // return res.send(data);
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