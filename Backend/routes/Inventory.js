const Express=require("express");
const Router=Express.Router();
const multer=require("multer");

const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,`${file.originalname}`)
    },
    destination:(req,file,cb)=>{
        cb(null,"./public/UserData");
    }
});
const upload=multer({storage:storage})

const inventoryController=require("../Controllers/Inventory");

Router.post("/AddSection",upload.single("Image"),inventoryController.AddSectionHandler);

Router.post("/getInventory",inventoryController.GetInventory);

module.exports=Router;