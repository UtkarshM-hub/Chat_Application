const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const OnlineSchema=new Schema({
    userId:{
        required:true,
        type:Schema.Types.ObjectId
    },
    socketId:{
        required:true,
        type:String
    },
    IsOnline:{
        required:true,
        type:Boolean
    }
});

module.exports=mongoose.model("Online",OnlineSchema);