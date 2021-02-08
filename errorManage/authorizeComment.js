const catchAsync = require("./catchAssync");
const ExpressError = require("./ExpressError");
const Comment = require("../model/commentModel");
const Beer = require("../model/beerModel");
const User = require("../model/userModle");


module.exports.make = function(req, res, next)
{
    if(!req.session.userID)
    {
        const errorMsg = "you dont have permission to add new comment. You have to login first";
        req.flash("err", errorMsg);
        return res.redirect("/login");;
    }
    else
    {
        next();
    }
}

module.exports.delete = catchAsync(async function(req, res, next)
{
    if(!req.session.userID)
    {
        const errorMessage = "you must login first";
        req.flash("err", errorMsg);
        return res.redirect("/login");
    }
   

    if(req.session.userID.toString() == comment.user._id.toString() || req.session.isAdmin)
    {
        next();
    }
    else
    {
        const errorMessage = "you dont have permission to delete this comment";
        throw(new ExpressError(errorMessage, 401));
    }

})