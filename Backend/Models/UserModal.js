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
        default:'https://res.cloudinary.com/dcglxmssd/image/upload/v1645077067/ProfilePic/DefaultProfile_o0zbci.jpg'
    },
    "Description":{
        type:String,
        required:false,
        default:"Hi there!"
    },
    "Contacts":[
        {
            friend:{
                id:{
                    type:Schema.Types.ObjectId,
                    required:true,
                    ref:'User'
                }
            },
            conversationId:{
                type:Schema.Types.ObjectId,
                ref:"Conversation"
            },
            ref:this
        },
    ],
    "Notifications":{
        "notification":[
            {
                message:{
                    type:String,
                    required:false
                }
            }
        ],
        "Requests":[
            {
                from:{
                    type:Schema.Types.ObjectId,
                    ref:'User',
                    required:true
                }
            }
        ]
    },
    "Requested":[
        {
            To:{
                type:Schema.Types.ObjectId,
                required:true
            },
            Status:{
                type:String,
                default:"Pending",
                required:true
            }
        }
    ],
    IsOnline:{
        type:Boolean,
        required:false,
        default:false
    },
    socketId:{
        type:String,
        required:false
    },
    Type:{
        type:String,
        required:true,
        default:"Regular"
    },
    Inventory:[
        {
            Name:{
                type:String,
                required:true
            },
            Type:{
                type:String,
                required:true
            },
            Image:{
                type:String,
                required:false,
                default:"https://res.cloudinary.com/dcglxmssd/image/upload/v1648127476/Group_1_ot7swd.png"
            },
            Items:[]
        }
    ]
});

UserSchema.methods.AddNotification=function(data){
    console.log(data);
}


module.exports=Mongoose.model("User",UserSchema);