const express = require("express");
const commentController = require("../controller/controller").commentController;
const router = express.Router();
const authorizeComment = require("../errorManage/authorizeComment");


router.post("/",authorizeComment.make, commentController.POST);

router.delete("/:commentID",authorizeComment.delete ,commentController.DELETE);

module.exports = router;