const ExpressError = require("./ExpressError");
const Beer = require("../model/beerModel");
const User = require("../model/userModle");
const catchAsync = require("./catchAssync");


module.exports.make = function(req, res, next)
{
    if(!req.session.userID)
    {
        const errorMsg = "you dont have permission to add new beer. You have to login first";
        throw(new ExpressError(errorMsg, 401));
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
        throw(new ExpressError(errorMessage,401));
    }
    const beer = await Beer.findById(req.params.id).populate("user");
    console.log(beer.user._id);
    console.log(req.session.userID);

    const user = req.session.userID;

    if(req.session.userID == beer.user._id)
    {
        next();
    }
    else
    {
        const errorMessage = "you dont have permission to edit or delete this beer";
        throw(new ExpressError(errorMessage,401));
    }

})