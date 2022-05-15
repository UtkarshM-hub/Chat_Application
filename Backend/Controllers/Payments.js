const Razorpay=require("razorpay");
const UserModal = require("../Models/UserModal");
const Analytics = require("../Models/Analytics");
const Product=require("../Models/Product");
const { Mongoose, Schema } = require("mongoose");
const {v4}=require('uuid');

var instance = new Razorpay({
    key_id: 'rzp_test_6gYjHzxKBzZ5wm',
    key_secret: 'SURc9bDR9mkCt4DoVLPLjJHP',
  });
let dayArray=['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

const date=new Date();
const today=date.getDate();
const month=date.getMonth();
const day=date.getDay();

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
  let analytics;
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
   
      let analytics=await Analytics.findOne({"Creator":user.Cart.Items[i].ProductId.Creator});
        let week
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
            analytics.currentMonth.Orders.Items[week-1].data[day]=1;
            let sum=analytics.currentMonth.Orders.Items[week-1].data.reduce((prev,curr)=>{prev+=curr},0)
            analytics.currentMonth.Orders.data[week-1]=sum;

            let addedValue=analytics.currentMonth.Revenue.Items[week-1].data[day]=+user.Cart.Items[i].ProductId.Price*user.Cart.Items[i].Quantity;
            console.log(addedValue)
            let totalRevenue=analytics.currentMonth.Revenue.Items[week-1].data.reduce((prev,curr)=>{prev+=curr},0);
            analytics.currentMonth.Revenue.data[week-1]=totalRevenue;

            await Analytics.updateOne({"Creator":user.Cart.Items[i].ProductId.Creator},{"currentMonth":analytics.currentMonth});
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
            analytics.currentMonth.Orders.Items[week-1].data[day]=analytics.currentMonth.Orders.Items[week-1].data[day]+1;
            let sumOfWeek=analytics.currentMonth.Orders.Items[week-1].data.reduce((prev,curr)=>prev+=curr,0);
            analytics.currentMonth.Orders.data[week-1]=sumOfWeek;
            let totalPrice=+user.Cart.Items[i].ProductId.Price*user.Cart.Items[i].Quantity;
            analytics.currentMonth.Revenue.Items[week-1].data[day]=analytics.currentMonth.Revenue.Items[week-1].data[day]+totalPrice;
            let sumOfRevenueCollected=analytics.currentMonth.Revenue.Items[week-1].data.reduce((previous,current)=>{
              return previous+=current
            },0);
            analytics.currentMonth.Revenue.data[week-1]=sumOfRevenueCollected;
            console.log(totalPrice,sumOfRevenueCollected)

            await Analytics.updateOne({"Creator":user.Cart.Items[i].ProductId.Creator},{"currentMonth":analytics.currentMonth});
          }
        }
        
        

      await Product.updateOne({"_id":user.Cart.Items[i].ProductId._id},{$inc:{"Quantity":-(user.Cart.Items[i].Quantity===0?0:user.Cart.Items[i].Quantity)}});
    }
   
    await UserModal.updateOne({"_id":userId},{"Cart.Items":[],$push:{"MyOrders":{Items:newArr,TotalAmount:TotalAmount,Status:"In-Progress"}}});
    res.send(user.Cart.Items);
  }
  catch(err){
    console.log(err);
  }
}