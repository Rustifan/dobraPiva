const catchAssync = require("./catchAssync");


module.exports = catchAssync(async function(req, res, next){

    if(!req.session.userID)
    {
        req.flash("err", "permission denied, you need to login first");
        res.redirect("/login");
        return;
    }
    const loggedUserID = req.session.userID;
    const userID = req.params.userID;
   
    if(loggedUserID !==userID)
    {
        req.flash("err", "permission denied");
        res.redirect("/");
        return;
    }

    next();

});