var express = require('express');
var router = express.Router();

const userController=require("../Controllers/UserController");
const multer=require("multer");

const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,`${file.originalname}`)
    },
    destination:(req,file,cb)=>{
        cb(null,"./public/UserData");
    }
});

// const fileFilter=(req,file,cb)=>{
//     if(file.mimetype=== 'image/png' || 'image/jpg' || 'image/jpeg'){
//         cb(null,true);
//     }
//     else{
//         cb(null,false);
//     }
// }

const upload=multer({storage:storage})

/* GET users listing. */
router.post('/signup',upload.single("picture"),userController.SignUpHandler);

router.post('/CheckCred',userController.checkCred);

router.post('/login',userController.LoginController);

router.post('/findUsers',userController.findUsersHandler);

router.post('/GetUserData',userController.GetUserData);

router.post('/getSettingsHandler',userController.getSettingsHandler);

router.post("/AddAddress",userController.AddAddressHandler)

router.post("/SetSelectedAddress",userController.SetSelectedAddressHandler)

router.post("/GetMyOrders",userController.GetOrdersHandler)

module.exports = router;
