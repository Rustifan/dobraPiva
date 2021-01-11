const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");
const hashPassMid = require("../Utils/hashPassword").hashPassMid;
const setOriginalUrl = require("../middleware/setOriginalUrl");

router.get("/register",setOriginalUrl, controller.registerGET);
router.post("/register",hashPassMid, controller.registerPOST);

router.get("/login",setOriginalUrl, controller.loginGET);
router.post("/login", controller.loginPOST);

router.get("/logout", controller.logout);

module.exports = router;