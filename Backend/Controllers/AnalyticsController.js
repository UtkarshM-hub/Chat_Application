const Analytics=require("../Models/Analytics");

exports.GetAnalyticsHandler=async(req,res,next)=>{
    const {userId}=req.body;
    try {
        const data=await Analytics.findOne({"creator":userId});
        res.send(data);
    } catch (error) {
        console.log(err)
    }
}