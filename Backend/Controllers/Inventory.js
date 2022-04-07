const cloudinary=require("cloudinary").v2;
const { Mongoose } = require("mongoose");
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

exports.DeleteSectionHandler=async(req,res,next)=>{
    const {id,userId}=req.body;
    try{
        console.log(id,userId)
        await User.findByIdAndUpdate(userId,{$pull:{"Inventory":{_id:id}}});
        res.send("success");
    }
    catch(err){
        console.log(err);
    }
}

exports.getSectionDataHandler=async(req,res,next)=>{
    const {userId,sectionId}=req.body;
    try{
        const user=await User.findById(userId);
        console.log(user.Inventory,userId,sectionId)
        res.send(user.Inventory.filter(item=>item._id.toString()===sectionId));
    }
    catch(err){
        console.log(err);
    }
}

exports.EditSectionHandler=async(req,res,next)=>{
    const {Name,Type,userId,sectionId,Image,Items}=req.body;
        const file=req.file;
        let filePath={url:Image};
        try{
        if(file!==undefined){
            filePath=await cloudinary.uploader.upload(file.path,(err,result)=>{
                if(err){
                    return res.send("error occured while uploading the file");
                }
                return result.url;
            });
        }        
            await User.findByIdAndUpdate(userId,{"Inventory":{_id:sectionId,Name:Name,Type:Type,Image:filePath.url,Items:JSON.parse(Items)}});
            res.send({_id:sectionId,Name:Name,Type:Type,Image:filePath.url});
        }
        catch(err){
            console.log(err);
        }
}

exports.AddItemToSectionHandler=async(req,res,next)=>{
    const {Name,Price,Quantity,Description,UserId,SectionId}=req.body;
    const file=req.file;
    console.log(Name,Price,Quantity,Description,file);
    try{
        await cloudinary.uploader.upload(file.path,async(err,result)=>{
            if(err){
                return res.status(500).send("Error occured while uploading item image");
            }
            let data={
                Name:Name,
                Price:Price,
                Quantity:Quantity,
                Description:Description,
                Image:result.url
            }
            await User.updateOne({_id:UserId,"Inventory._id":SectionId},{$push:{"Inventory.$.Items":data}})
            return res.send(data);
        })
    }
    catch(err){
        console.log(err);
    }
}

exports.DeleteItemHandler=async(req,res,next)=>{
    const {_id,userId,SectionId}=req.body;
    try{
        await User.updateOne({_id:userId,"Inventory._id":SectionId},{$pull:{"Inventory.$.Items":{_id:_id}}})
        return res.send("success");
    }
    catch(err){
        console.log(err);
    }
}

exports.EditItemFromSectionHandler=async(req,res,next)=>{
    const {Name,Quantity,Price,Description,UserId,SectionId,Image,_id}=req.body;
        const file=req.file;
        let filePath={url:Image};
        try{
            if(file!==undefined){
                filePath=await cloudinary.uploader.upload(file.path,(err,result)=>{
                    if(err){
                        return res.send("error occured while uploading the file");
                    }
                    return result.url;
                });
            }
            const Ddata={
                Name:Name,
                Quantity:Quantity,
                Price:Price,
                Description:Description,
                Image:filePath.url
            }
            const user=await User.findById(UserId);
            let Inventory=user.Inventory;
            let index=Inventory.findIndex((item)=>item._id.toString()===SectionId);
            let ItemIndex=Inventory[index].Items.findIndex((item)=>item._id.toString()===_id);
            Inventory[index].Items[ItemIndex]=Ddata;
            console.log(Inventory[index].Items[ItemIndex]);
            await User.updateOne({"_id":UserId},{$set:{"Inventory":Inventory}});
            res.send(Ddata);
        }
        catch(err){
            console.log(err);
        }
}