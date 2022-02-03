var express = require('express');
var router = express.Router();

const userController=require("../Controllers/UserController");

/* GET users listing. */
router.post('/signup',userController.SignUpHandler);

module.exports = router;
