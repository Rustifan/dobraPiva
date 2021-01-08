const express = require("express");
const commentController = require("../controller/controller").commentController;
const router = express.Router();



router.post("/", commentController.POST);

router.delete("/:commentID", commentController.DELETE);

module.exports = router;