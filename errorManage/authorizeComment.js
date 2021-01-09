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
        throw(new ExpressError(errorMsg, 401));
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
        throw(new ExpressError(errorMessage,401));
    }
    const commentID = req.params.commentID;
    const user = req.session.userID;

    if(req.session.userID == comment.user._id)
    {
        next();
    }
    else
    {
        const errorMessage = "you dont have permission to delete this comment";
        throw(new ExpressError(errorMessage,401));
    }

})