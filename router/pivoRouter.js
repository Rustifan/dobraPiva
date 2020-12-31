const express = require("express");
const router = express.Router();
const controller = require("../controller/controller").pivoController;

router.get("/", controller.pivoHome);


router.get("/make", controller.pivoMakeGET);

router.post("/make", controller.pivoMakePOST);

router.get("/:id/edit", controller.pivoEditGET);

router.put("/:id/edit", controller.pivoEditPUT);

router.delete("/:id", controller.pivoDELETE);

router.get("/:id", controller.pivoView);


module.exports = router;