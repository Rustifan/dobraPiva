const express = require("express");
const commentController = require("../controller/controller").commentController;
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("id = " + req.routerParams.id);
})



router.post("/", commentController.POST);

module.exports = router;