const express=require("express");
const route=express.Router();

const ConnectionController=require("../Controllers/ConnectionControllers");

route.post("/friendRequest",ConnectionController.FriendRequest);

module.exports=route;