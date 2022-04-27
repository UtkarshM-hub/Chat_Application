const Online=require("../Models/OnlineUsers");
const Conversation=require("../Models/ConversationModel");
const User=require("../Models/UserModal");
const Socket = require("../Socket");
const { getSocket } = require("../../frontend/src/socket");
const IO=require("../Socket").getIO();
const ObjectId=require("mongoose").Types.ObjectId;

exports.FriendRequest=async(req,res,next)=>{
    const { friendId,userId }=req.body;
    try{
        const Friend=await User.findById(friendId);
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
        const IsOnline=await User.findById(friendId);
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
        const IsOnline=await User.findById(friendId);
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
        const IsFriendOnline=await User.findById(friendId);
        const Friend=await User.findById(friendId)
        const MySelf=await User.findById(userId);
        if(Friend.IsOnline===true){
            FriendData={
                friend:{
                id:MySelf._id,
                Name:MySelf.Name,
                ProfilePic:MySelf.ProfilePic,
                SocketId:MySelf.socketId,
                IsOnline:true
            },conversationId:ConvoId}
            IO.to(Friend.socketId).emit("AddFriend",FriendData);
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
        console.log(Friend);
        res.send({friend:{id:Friend._id,Name:Friend.Name,ProfilePic:Friend.ProfilePic,socketId:Friend.socketId,IsOnline:Friend.IsOnline},conversationId:ConvoId});
    }
    catch(err){
        console.log(err);
    }
}

exports.getContacts=async(req,res,next)=>{
    const {userId}=req.body;
    try{
        const contacts=await User.findById(userId).populate("Contacts.friend.id");
        if(contacts!==null){
            console.log(contacts.Contacts)
            return res.send(contacts.Contacts);
        }
        return res.send([]);
    }
    catch(Err){
        console.log(Err);
    }
    
}

exports.getMessages=async(req,res,next)=>{
    const {id}=req.body;
    try{
        const messages=await Conversation.findById(id);
        if(messages.messages[0]===undefined){
            return res.send([]);
        }
        return res.send(messages.messages);
    }
    catch(err){
        console.log(err);
    }
    res.send("success");
}

exports.SaveMessages=async(req,res,next)=>{
    const { id,from,to,message } =req.body;
    try{
        await Conversation.findByIdAndUpdate(id,{$push:{"messages":{from:from,to:to,message:message}}});
        res.send("success");
    }
    catch(err){
        console.log(err);
    }
}

exports.getMessagesHandler=async(req,res,next)=>{
    const { userId }=req.body;
    console.log(userId);
    try{
        const messages=await User.findById(userId).populate("Contacts.conversationId");
        let updatedArray=messages.Contacts.map((item)=>{
            const data={_id:item.conversationId._id,messages:item.conversationId.messages};
            return data;
        });
        res.send(updatedArray);
    }
    catch(err){
        console.log(err);
    }
    // res.send("success");
}

exports.ForwardMessageHandler=async(req,res,next)=>{
    // {
    //     data: {
    //       id: ActiveContactState.id,
    //       userId: userId,
    //       friendId: ActiveContactState.friendId,
    //       message: data,
    //     },
    //     socketId: newSocketId[0].friend.id.socketId,
    //   }
    const {data,message,userId}=req.body;
    try{
        data.map(async(item)=>{
            await Conversation.findByIdAndUpdate(item.convoId,{$push:{"messages":{from:userId,to:item._id,message:message}}});
            if(item.IsOnline===true){
                IO.to(item.socketId).emit("getMsg",{data:{
                    id:item.convoId,
                    userId:userId,
                    friendId:item._id,
                    message:message
                }})
            }
        })
        res.send("success");
    }
    catch(err){
        console.log(err);
    }
}