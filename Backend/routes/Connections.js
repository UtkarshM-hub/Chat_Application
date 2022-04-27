const express=require("express");
const route=express.Router();

const ConnectionController=require("../Controllers/ConnectionControllers");

route.post("/friendRequest",ConnectionController.FriendRequest);

route.post("/getNotifications",ConnectionController.getNotification);

route.post("/DeleteRequest",ConnectionController.DeleteRequest);

route.post("/DenyRequest",ConnectionController.DenyRequest);

route.post("/AcceptRequest",ConnectionController.AcceptRequestHandler);

route.post("/getContacts",ConnectionController.getContacts);

route.post("/getMessages",ConnectionController.getMessages);

route.post("/SaveMessage",ConnectionController.SaveMessages);

route.post("/GetMsg",ConnectionController.getMessagesHandler);

route.post("/ForwardMessage",ConnectionController.ForwardMessageHandler);

module.exports=route;