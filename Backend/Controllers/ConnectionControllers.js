const Online=require("../Models/OnlineUsers");
const Conversation=require("../Models/ConversationModel");
const User=require("../Models/UserModal");
const Socket = require("../Socket");
const IO=require("../Socket").getIO();
const ObjectId=require("mongoose").Types.ObjectId;

exports.FriendRequest=async(req,res,next)=>{
    const { friendId,userId }=req.body;
    try{
        const Friend=await Online.findOne({userId:friendId});
        if(Friend.IsOnline===true){
            const user=await User.findByIdAndUpdate(userId,{$push:{"Requested":{To:friendId,Status:"Pending"}}});
            IO.to(Friend.socketId).emit("notification",{_id:userId,Name:user.Name,UserName:user.UserName,ProfilePic:user.ProfilePic,type:"Add"});
        }
        const user=await User.findByIdAndUpdate(friendId,{$push:{"Notifications.Requests":{"from":userId}}});
    }catch(err){
        console.log(err);
    }
}

exports.getNotification=async(req,res,next)=>{
    const { userId }=req.body;
    try{
        const notification=await User.findById(userId).populate('Notifications.Requests.from');
        const Requested=await User.findById(userId);
        res.send({notification:notification.Notifications.notification,Requests:notification.Notifications.Requests,Requested:Requested.Requested});
    }
    catch(err){
        console.log(err);
    }
    // res.send("success");
}

exports.DeleteRequest=async(req,res,next)=>{
    const { friendId,userId }=req.body;
    try{
        const self=await User.findByIdAndUpdate(userId,{$pull:{"Requested":{"To":friendId}}});
        const friend=await User.findByIdAndUpdate(friendId,{$pull:{"Notifications.Requests":{"from":userId}}});
        const IsOnline=await Online.findOne({userId:friendId});
        if(IsOnline.IsOnline===true){
            IO.to(IsOnline.socketId).emit("notification",{_id:userId,type:"Remove"});
        }
    }catch(err){
        console.log(err);
    }
    res.send("success");
}

exports.DenyRequest=async(req,res,next)=>{
    const { friendId,userId }=req.body;
    try{
        const self=await User.findByIdAndUpdate(friendId,{$pull:{"Requested":{"To":userId}}});
        const friend=await User.findByIdAndUpdate(userId,{$pull:{"Notifications.Requests":{"from":friendId}}});
        const IsOnline=await Online.findOne({userId:friendId});
        if(IsOnline.IsOnline===true){
            IO.to(IsOnline.socketId).emit("DenyRequested",{friendId:userId,type:"Remove"});
        }
    }catch(err){
        console.log(err);
    }
    res.send("success");
}

exports.AcceptRequestHandler=async(req,res,next)=>{
    const {friendId,userId}=req.body;
    let ConvoId,FriendData;
    try{
        const newConvo=await new Conversation({messages:[]});
        newConvo.save();
        ConvoId=newConvo._id;
        const IsFriendOnline=await Online.findOne({userId:friendId});
        const Friend=await User.findById(friendId)
        const MySelf=await User.findById(userId);
        if(IsFriendOnline.IsOnline===true){
            FriendData={
                friend:{
                id:MySelf._id,
                Name:MySelf.Name,
                ProfilePic:MySelf.ProfilePic,
                SocketId:IO.socketId
            },conversationId:ConvoId}
            IO.to(IsFriendOnline.socketId).emit("AddFriend",FriendData);
        }
        await User.findByIdAndUpdate(friendId,{$push:{"Contacts":{friend:{
            id:MySelf._id,
            Name:MySelf.Name,
            ProfilePic:MySelf.ProfilePic,
        },conversationId:ConvoId}},$pull:{"Requested":{"To":userId}}});
        await User.findByIdAndUpdate(userId,{$push:{"Contacts":{friend:{
            id:Friend._id,
            Name:Friend.Name,
            ProfilePic:Friend.ProfilePic,
        },conversationId:ConvoId}},$pull:{"Notifications.Requests":{"from":friendId}}});
        console.log(IsFriendOnline.socketId);
        res.send({friend:{id:Friend._id,Name:Friend.Name,ProfilePic:Friend.ProfilePic},conversationId:ConvoId});
    }
    catch(err){
        console.log(err);
    }
}

exports.getContacts=async(req,res,next)=>{
    const {userId}=req.body;
    try{
        const contacts=await User.findById(userId).populate("Contacts.friend");
        if(contacts!==null){
            return res.send(contacts.Contacts);
        }
        return res.send([]);
    }
    catch(Err){
        console.log(Err);
    }
    
}