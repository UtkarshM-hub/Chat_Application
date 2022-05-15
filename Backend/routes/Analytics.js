const express=require("express");
const route=express.Router();

const AnalyticsController=require("../Controllers/AnalyticsController");

route.post("/GetAnalytics",AnalyticsController.GetAnalyticsHandler);

module.exports=route;