const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
    const header=req.get("Authorization");
    let token;
    if(header){
        token=req.get('Authorization');
    }
    let decodedToken;
    try{
        decodedToken=jwt.verify(token,'2e84dKZVTP')
    }catch(err){
        return res.status(403).json({message:"Error while validating"});
    }
    if(!decodedToken){
        return res.status(401).send("Not Authenticated!")
    }
    req.userId=decodedToken.userId;
    next();
}