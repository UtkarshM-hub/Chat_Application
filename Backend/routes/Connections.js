const express=require("express");
const route=express.Router();

const ConnectionController=require("../Controllers/ConnectionControllers");

route.post("/friendRequest",ConnectionController.FriendRequest);

route.post("/getNotifications",ConnectionController.getNotification);

route.post("/DeleteRequest",ConnectionController.DeleteRequest);

route.post("/DenyRequest",ConnectionController.DenyRequest);

route.post("/AcceptRequest",ConnectionController.AcceptRequestHandler);

route.post("/getContacts",ConnectionController.getContacts);

module.exports=route;