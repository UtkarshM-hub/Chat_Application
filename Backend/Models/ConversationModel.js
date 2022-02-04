const Mongoose=require("mongoose");
const Schema=Mongoose.Schema;

const ConversationSchama=new Schema({
    messages:[
        {
            _id:Schema.Types.ObjectId,
            from:{
                type:Schema.Types.ObjectId,
                required:true
            },
            to:{
                type:Schema.Types.ObjectId,
                required:true
            },
            message:{
                type:String,
                required:true
            }
        }
    ]
});

module.exports=Mongoose.model("Conversation",ConversationSchama);