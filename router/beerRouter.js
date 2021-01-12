const express = require("express");
const router = express.Router();
const controller = require("../controller/controller").beerController;
const validateBeer = require("../errorManage/validateBeer");
const upload = require("../Utils/imgUploadConfig").upload("beer");
const authorizeBeer = require("../errorManage/authorizeBeer");
const setOriginalUrl = require("../middleware/setOriginalUrl");
const getGeoLocationMid = require("../middleware/getGeoLocationMid");


router.get("/", controller.beerHome);

router.get("/json", controller.beerJson);
router.get("/make",authorizeBeer.make, controller.beerMakeGET);

router.post("/make",authorizeBeer.make, upload.single("image"), validateBeer, getGeoLocationMid, controller.beerMakePOST);

router.get("/:id/edit", authorizeBeer.edit,  controller.beerEditGET);

router.put("/:id/edit",authorizeBeer.edit, validateBeer,getGeoLocationMid, controller.beerEditPUT);
router.delete("/:id",authorizeBeer.edit, controller.beerDELETE);

router.get("/:id",setOriginalUrl, controller.beerView);


module.exports = router;