const express = require("express");
const router = express.Router();
const controller = require("../controller/controller").beerController;
const validateBeer = require("../errorManage/validateBeer");
const upload = require("../Utils/imgUploadConfig").upload("beer");

router.get("/", controller.beerHome);


router.get("/make", controller.beerMakeGET);

router.post("/make",upload.single("image"), validateBeer, controller.beerMakePOST);

router.get("/:id/edit", controller.beerEditGET);

router.put("/:id/edit",validateBeer, controller.beerEditPUT);

router.delete("/:id", controller.beerDELETE);

router.get("/:id", controller.beerView);


module.exports = router;