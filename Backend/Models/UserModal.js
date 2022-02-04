const Mongoose=require("mongoose");
const Schema=Mongoose.Schema;

const UserSchema=new Schema({
    "UserName":{
        type:String,
        required:true,
    },
    "Name":{
        type:String,
        required:true,
    },
    "Email":{
        type:String,
        required:true,
    },
    "Password":{
        type:String,
        required:true
    },
    "ProfilePic":{
        type:String,
        required:false,
        default:'http://localhost/images/DefaultProfile.jpg'
    },
    "Description":{
        type:String,
        required:false,
        default:"Hi there!"
    },
    "Contacts":[
        {
            conversationId:{
                type:Schema.Types.ObjectId,
                ref:"Conversation"
            },
            ref:this
        },
    ]
});


module.exports=Mongoose.model("User",UserSchema);