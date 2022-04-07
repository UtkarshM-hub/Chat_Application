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

Router.post("/DeleteSection",inventoryController.DeleteSectionHandler);

Router.post("/GetSectionData",inventoryController.getSectionDataHandler);

Router.post("/EditSectionData",upload.single("Image"),inventoryController.EditSectionHandler);

Router.post("/AddItemToSection",upload.single("Image"),inventoryController.AddItemToSectionHandler);

Router.post("/EditItemFromSection",upload.single("Image"),inventoryController.EditItemFromSectionHandler);

Router.post("/DeleteItem",inventoryController.DeleteItemHandler);

module.exports=Router;