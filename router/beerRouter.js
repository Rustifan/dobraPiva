const express = require("express");
const router = express.Router();
const controller = require("../controller/controller").beerController;
const validateBeer = require("../errorManage/validateBeer");

router.get("/", controller.beerHome);


router.get("/make", controller.beerMakeGET);

router.post("/make",validateBeer, controller.beerMakePOST);

router.get("/:id/edit", controller.beerEditGET);

router.put("/:id/edit",validateBeer, controller.beerEditPUT);

router.delete("/:id", controller.beerDELETE);

router.get("/:id", controller.beerView);


module.exports = router;