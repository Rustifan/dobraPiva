const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");
const hashPassMid = require("../Utils/hashPassword").hashPassMid;
const setOriginalUrl = require("../middleware/setOriginalUrl");
const userExist = require("../middleware/userExists");
const authorizeUser = require("../errorManage/authorizeUser");


router.get("/users", controller.usersGET);

router.get("/users/:userID", authorizeUser, controller.userEdit);
router.put("/users/:userID", authorizeUser, controller.userEditPUT);

router.get("/users/:userID/password", authorizeUser, controller.userPasswordGET);
router.put("/users/:userID/password", authorizeUser, controller.userPasswordPUT);

router.get("/register", controller.registerGET);
router.post("/register",userExist,hashPassMid, controller.registerPOST);

router.get("/login", controller.loginGET);
router.post("/login", controller.loginPOST);

router.get("/logout", controller.logout);

module.exports = router;