const express = require("express");
const controller = require("../controller/ratingController"); 
const authorizeRating = require("../errorManage/authorizeRating")


const router = express.Router();

router.get("/", (req, res)=>{
    const beerId = req.routerParams.id;
    res.send(beerId);
})

router.post("/",authorizeRating, controller.post);



module.exports = router;