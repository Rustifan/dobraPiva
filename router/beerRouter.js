const express = require("express");
const router = express.Router();
const controller = require("../controller/controller").beerController;

router.get("/", controller.beerHome);


router.get("/make", controller.beerMakeGET);

router.post("/make", controller.beerMakePOST);

router.get("/:id/edit", controller.beerEditGET);

router.put("/:id/edit", controller.beerEditPUT);

router.delete("/:id", controller.beerDELETE);

router.get("/:id", controller.beerView);


module.exports = router;