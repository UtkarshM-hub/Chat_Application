const cloudinary=require("cloudinary").v2;
const User=require("../Models/UserModal");

cloudinary.config({
    cloud_name:'dcglxmssd',
    api_key:'794641158514839',
    api_secret:'2aJZb6u-QdkJV-HDb2MTTg5PtQ8'
})



exports.AddSectionHandler=async(req,res,next)=>{
    try{
        const {Name,Type,userId}=req.body;
        const file=req.file;
        let result;
        let filePath=undefined;
        if(file!==undefined){
            filePath=file.path;
        }
        if(filePath!==undefined){
            result=await cloudinary.uploader.upload(filePath,async(err,result)=>{
                if(err){
                    return res.status(500).send("error occured");
                }
            });
        }
        const user=await User.findByIdAndUpdate(userId,{$push:{"Inventory":{
            Name:Name,
            Type:Type,
            Image:result===undefined?"https://res.cloudinary.com/dcglxmssd/image/upload/v1648127476/Group_1_ot7swd.png":result.url,
            items:[]}}});
        console.log(user._id);
        res.send({Name:Name,Type:Type,Image:result===undefined?"https://res.cloudinary.com/dcglxmssd/image/upload/v1648127476/Group_1_ot7swd.png":result.url});

    }
    catch(err){
        console.log(err);
    } 
}

exports.GetInventory=async(req,res,next)=>{
    const {userId}=req.body;
    try{
        const user=await User.findById(userId);
        res.send(user.Inventory);
    }
    catch(err){
        console.log(err);
    }
}