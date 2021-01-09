const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");
const hashPassMid = require("../Utils/hashPassword").hashPassMid;

router.get("/register", controller.registerGET);
router.post("/register",hashPassMid, controller.registerPOST);

router.get("/login", controller.loginGET);
router.post("/login", controller.loginPOST);

router.get("/logout", controller.logout);

module.exports = router;