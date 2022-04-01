const User=require("../Models/UserModal");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cloudinary=require("cloudinary").v2;

cloudinary.config({
    cloud_name:'dcglxmssd',
    api_key:'794641158514839',
    api_secret:'2aJZb6u-QdkJV-HDb2MTTg5PtQ8'
})

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
                Inventory:[]
            });
            newUser.save();
            res.status(200).send({message:"Successfully Signed in",type:"Success"});
        })
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
        res.send({_id:user._id,Name:user.Name,ProfilePic:user.ProfilePic,Type:user.Type});
    }catch(err){
        console.log(err);
    }
}