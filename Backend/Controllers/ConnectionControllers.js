const Online=require("../Models/OnlineUsers");
const User=require("../Models/UserModal");
const IO=require("../Socket").getIO();

exports.FriendRequest=async(req,res,next)=>{
    const { friendId,userId }=req.body;
    try{
        const Friend=await Online.findOne({userId:friendId});
        if(Friend.IsOnline===true){
            const user=await User.findByIdAndUpdate(userId,{Requested:{$push:{To:friendId,Status:"Pending"}}});
            IO.to(Friend.socketId).emit("notification",{_id:userId,Name:user.Name,UserName:user.UserName,ProfilePic:user.ProfilePic});
        }
        const user=await User.findByIdAndUpdate(friendId,{"Notifications.Requests":{$push:{from:req.userId}}});
    }catch(err){
        console.log(err);
    }
}