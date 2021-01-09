const express = require("express");
const router = express.Router();
const controller = require("../controller/controller").beerController;
const validateBeer = require("../errorManage/validateBeer");
const upload = require("../Utils/imgUploadConfig").upload("beer");
const authorizeBeer = require("../errorManage/authorizeBeer");

router.get("/", controller.beerHome);


router.get("/make",authorizeBeer.make, controller.beerMakeGET);

router.post("/make",authorizeBeer.make, upload.single("image"), validateBeer, controller.beerMakePOST);

router.get("/:id/edit", authorizeBeer.edit,  controller.beerEditGET);

router.put("/:id/edit",authorizeBeer.edit, validateBeer, controller.beerEditPUT);

router.delete("/:id",authorizeBeer.edit, controller.beerDELETE);

router.get("/:id", controller.beerView);


module.exports = router;