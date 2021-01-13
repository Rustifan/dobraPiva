const ExpressError = require("./ExpressError");
const Beer = require("../model/beerModel");
const User = require("../model/userModle");
const catchAsync = require("./catchAssync");
const session = require("express-session");


module.exports.make = function(req, res, next)
{
    if(!req.session.userID)
    {
        const errorMsg = "you dont have permission to add new beer. You have to login first";
        req.flash("err", errorMsg);
        req.session.originalUrl = req.originalUrl;
        return res.redirect("/login");
    }
    else
    {
        next();
    }
}

module.exports.edit = catchAsync(async function(req, res, next)
{
    if(!req.session.userID)
    {
        const errorMessage = "you must login first";
        req.flash("err", errorMessage);
        req.session.originalUrl = req.originalUrl;
        
        return res.redirect("/login");
        
    }

    const beer = await Beer.findById(req.params.id).populate("user");
   

    if(req.session.userID == beer.user._id)
    {
        next();
    }
    else
    {
        const errorMessage = "you dont have permission to edit or delete this beer";
        throw(new ExpressError(errorMessage, 401));
    }

})