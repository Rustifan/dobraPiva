const express = require("express");
const router = express.Router();
const controller = require("../controller/controller").beerController;
const validateBeer = require("../errorManage/validateBeer");
const upload = require("../Utils/imgUploadConfig").upload("beer");
const authorizeBeer = require("../errorManage/authorizeBeer");
const setOriginalUrl = require("../middleware/setOriginalUrl");
const getGeoLocationMid = require("../middleware/getGeoLocationMid");
const onlyAdmin = require("../middleware/onlyAdminMid");

router.get("/",setOriginalUrl, controller.beerHome);
router.get("/find",setOriginalUrl, controller.beerFind);

router.get("/pending",onlyAdmin, controller.beerPending);

router.get("/json", controller.beerJson);
router.get("/make", authorizeBeer.make, controller.beerMakeGET);

router.post("/make", authorizeBeer.make, upload.array("image"), validateBeer, getGeoLocationMid, controller.beerMakePOST);

router.get("/:id/edit", authorizeBeer.edit,  controller.beerEditGET);

router.put("/:id/edit", authorizeBeer.edit, validateBeer,getGeoLocationMid, controller.beerEditPUT);

router.get("/:id/images", authorizeBeer.edit, controller.imagesGET);
router.post("/:id/images", authorizeBeer.edit, upload.array("image"), controller.imagePOST);
router.delete("/:id/images",authorizeBeer.edit, controller.imagesDELETE);


router.delete("/:id",authorizeBeer.edit, controller.beerDELETE);

router.get("/:id",setOriginalUrl, controller.beerView);

router.put("/:id/approve",onlyAdmin, controller.approvePUT);
module.exports = router;