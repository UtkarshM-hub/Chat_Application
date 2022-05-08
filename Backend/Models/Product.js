const Mongoose=require("mongoose");
const Schema=Mongoose.Schema;

const ProductSchema=new Schema(
{
        Name:{
            type:String
        },
        Quantity:{
            type:Number
        },
        Price:{
            type:Number
        },
        Description:{
            type:String
        },
        Image:{
            type:String
        },
        Visits:{
            type:Number,
            default:0
        },
        Creator:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        type:Object

    },
);

module.exports=Mongoose.model("Product",ProductSchema);