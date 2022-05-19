const User=require("../Models/UserModal");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cloudinary=require("cloudinary").v2;
const fs=require("fs");
const UserModal = require("../Models/UserModal");
const Analytics = require("../Models/Analytics");
const { Mongoose } = require("mongoose");

cloudinary.config({
    cloud_name:'dcglxmssd',
    api_key:'794641158514839',
    api_secret:'2aJZb6u-QdkJV-HDb2MTTg5PtQ8'
})


const date=new Date();
const month=date.getMonth();

exports.SignUpHandler=async(req,res,next)=>{
    const file=req.file;
    let filePath=undefined;
    if(file!==undefined){
        filePath=file.path;
    }
    const {UserName,Email,Password,Name,Description,Type}=req.body;
    try{
        const hashedPassword=await bcrypt.hash(Password,12);
        cloudinary.uploader.upload(filePath,async(err,result)=>{
            if(err){
                return res.status(500).send({message:"Error uploading image",type:"Error"});
            }
            const newUser=await new User({
                UserName:UserName,
                Name:Name,
                Email:Email,
                Password:hashedPassword,
                ProfilePic:result.url,
                Description:Description,
                Contacts:[],
                Notifications:{
                    notification:[],
                    Requests:[]
                },
                Requested:[],
                IsOnline:false,
                socketId:"",
                Type:Type,
                Inventory:[],
                Cart:{},
                MyOrders:[],
                Settings:{
                    Profile:{
                        ProfilePic:result.url,
                        UserName:UserName,
                        Name:Name,
                        Description:Description,
                        Email:Email
                    },
                    GeneralDetails:{
                        Addresses:[],
                    },
                    Payments:{}
                },
                SalesOrders:[]
            });
            await newUser.save();

            console.log(newUser._id)

            const analytics=await new Analytics(
                {
                    creator:newUser._id,
                    currentMonth:{
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
                }
            )
            await analytics.save();
            if(file.path!==undefined){
                fs.unlinkSync(filePath);
            }
            res.status(200).send({message:"Successfully Signed in",type:"Success"});
        })
    }
    catch(err){
        console.log("This is "+err);
    }
    
}

exports.checkCred=async(req,res,next)=>{
    const {Email,UserName}=req.body;
    try{
        const EmailExists=await User.find({Email:Email});
        const UserNameExists=await User.find({UserName:UserName});
        if(EmailExists[0]!==undefined && UserNameExists[0]!==undefined){
            return res.send({message:"Email and UserName already Exists",inValidOptions:"Both",type:"Error"});
        }
        else if(EmailExists[0]!==undefined && UserNameExists[0]===undefined){
            return res.send({message:"Email already Exists",inValidOptions:"Email",type:"Error"});
        }
        else if(EmailExists[0]===undefined && UserNameExists[0]!==undefined){
            return res.send({message:"UserName already Exists",inValidOptions:"UserName",type:"Error"});
        }
        else{
            return res.send({message:"You have Successfully Signed In",inValidOptions:"",type:"Success"});
        }
    }
    catch(err){
        console.log(err);
    }
}

exports.LoginController=async(req,res,next)=>{
    const { Email,Password,Remember } =req.body;
    let expiresIn={};
    if(Remember===true){
        expiresIn={expiresIn:"1h"}
    }
    try{
        const user=await User.findOne({"Email":Email});
        if(!user){
            return res.send({message:"User does not exists!",inValidOptions:"",type:"Error"});
        }
        const PasswordIsValid=await bcrypt.compare(Password,user.Password);
        if(!PasswordIsValid){
            return res.send({message:"Invalid Password",inValidOptions:"Password",type:"Error"})
        }
        const token=jwt.sign({Email:Email,userId:user._id.toString()},'2e84dKZVTP',expiresIn);
        
        res.status(200).json({message:"You Logged in successfully",inValidOptions:"",type:"Success",token:token,userId:user._id.toString()})
    }
    catch(err){
        console.log(err)
    }
    
}

exports.findUsersHandler=async(req,res,next)=>{
    const { Name,userId }=req.body;
    try{
        const regex=new RegExp(`${Name}`,'i');
        const isUserExists=await User.find({"Name":{$regex:regex}});
        if(isUserExists[0]===undefined){
            return res.status(200).json({Data:"User Not Found"})
        }
        return res.status(200).json({Data:isUserExists})
    }
    catch(err){
        console.log(err);
    }
}

exports.GetUserData=async(req,res,next)=>{
    const { userId }=req.body;
    try{
        const user=await User.findById(userId);
        console.log({_id:user._id,Name:user.Name,ProfilePic:user.ProfilePic});
        res.send({_id:user._id,Name:user.Name,ProfilePic:user.ProfilePic,Type:user.Type,Email:user.Email,Description:user.Description,UserName:user.UserName});
    }catch(err){
        console.log(err);
    }
}

exports.getSettingsHandler=async(req,res,next)=>{
    const {userId}=req.body;
    try{
        const user=await User.findById(userId);
        res.send(user.Settings);
    }
    catch(err){
        console.log(err);
    }
}

exports.AddAddressHandler=async(req,res,next)=>{
    const {userId,data}=req.body;
    try{
        await User.findByIdAndUpdate(userId,{$push:{"Settings.GeneralDetails.Addresses":data}});
        const address=await User.findById(userId);
        let currentElement=address.Settings.GeneralDetails.Addresses[address.Settings.GeneralDetails.Addresses.length-1];
        res.send(currentElement)
    }   
    catch(err){
        console.log(err);
    }
}

exports.SetSelectedAddressHandler=async(req,res,next)=>{
    const {userId,_id}=req.body;
    try{
        console.log(userId,_id)
        await User.findByIdAndUpdate(userId,{$set:{"Settings.GeneralDetails.SelectedAddress":_id}});
        res.send("success");
    }   
    catch(err){
        console.log(err);
    }
}

exports.GetOrdersHandler=async(req,res,next)=>{
    const {userId}=req.body;
    try{
        const user=await UserModal.findOne({_id:userId}).populate("MyOrders.Items.ProductId");
        res.send(user.MyOrders);
    }   
    catch(err){
        console.log(err);
    }
}

exports.GetSalesHandler=async(req,res,next)=>{
    const {userId}=req.body;
    try{
        const user=await UserModal.findOne({_id:userId}).populate("SalesOrder.Item.ProductId");
        // console.log(user);
        res.send(user.SalesOrder);
    }   
    catch(err){
        console.log(err);
    }
}


exports.EditUserDataHandler=async(req,res,next)=>{
    const {userId,data}=req.body;
    try{
        const user=await UserModal.findByIdAndUpdate({_id:userId},{
            Name:data.Name,
            Email:data.Email,
            Description:data.Description,
            UserName:data.UserName
        })
        // console.log(user);
        setTimeout(()=>{
            res.send({
                Name: data.Name,
                ProfilePic: user.ProfilePic,
                _id: user._id,
                Type: user.Type,
                Description: data.Description,
                Email: data.Email,
                UserName: data.UserName,
              });
        },2000)
        
    }   
    catch(err){
        console.log(err);
    }
}

exports.RemoveUserProfilePic=async(req,res,next)=>{
    const {userId}=req.body;
    try{
        const user=await UserModal.findByIdAndUpdate({_id:userId},{
            ProfilePic:'https://res.cloudinary.com/dcglxmssd/image/upload/v1645077067/ProfilePic/DefaultProfile_o0zbci.jpg'
        })
        res.send({ProfilePic:'https://res.cloudinary.com/dcglxmssd/image/upload/v1645077067/ProfilePic/DefaultProfile_o0zbci.jpg'});
    }   
    catch(err){
        console.log(err);
    }
}

exports.UpdateUserProfilePic=async(req,res,next)=>{
    const {userId}=req.body;
    const file=req.file;
    let filePath=undefined;
    if(file!==undefined){
        filePath=file.path;
    }
    try{
        await cloudinary.uploader.upload(filePath,async(err,result)=>{
            if(err){
                return res.status(500).send({message:"Error uploading image",type:"Error"});
            }
            await UserModal.findByIdAndUpdate(userId,{ProfilePic:result.url});
            if(file.path!==undefined){
                fs.unlinkSync(filePath);
            }
            res.send({ProfilePic:result.url});
        })
    }   
    catch(err){
        console.log(err);
    }
}

