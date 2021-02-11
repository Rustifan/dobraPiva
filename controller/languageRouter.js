const express = require("express");

const router = express.Router();

router.get("/en", (req, res)=>{
    req.session.language = "english";
    let msg = "you selected english as your language";
    req.flash("sucess", msg);
    res.redirect("/");
})

module.exports = router;

router.get("/hr", (req, res)=>{
    req.session.language = "croatian";
    let msg = "odabrali ste hrvatski za svoj jezik";
    req.flash("sucess", msg);
    res.redirect("/");
})