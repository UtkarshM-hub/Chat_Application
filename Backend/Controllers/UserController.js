const User=require("../Models/UserModal");
const bcrypt=require("bcrypt");

exports.SignUpHandler=async(req,res,next)=>{
    const file=req.file;
    let filePath=undefined;
    if(file!==undefined){
        filePath=file.path;
    }
    const {UserName,Email,Password,Name,Description}=req.body;
    try{
        const hashedPassword=await bcrypt.hash(Password,12);
        const newUser=await new User({
            UserName:UserName,
            Name:Name,
            Email:Email,
            Password:hashedPassword,
            ProfilePic:filePath,
            Description:Description,
            Contacts:[]
        });
        newUser.save();
        res.status(200).send({message:"Successfully Signed in",type:"Success"});
    }
    catch(err){
        console.log(err);
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