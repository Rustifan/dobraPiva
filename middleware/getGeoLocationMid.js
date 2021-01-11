const getGeoCoords = require("../Utils/getGeoCoordinates");
const catchAsync = require("../errorManage/catchAssync");
const ExpressError = require("../errorManage/ExpressError");

module.exports = catchAsync(async function(req, res, next)
{
    if(!req.body.location)
    {
        throw(new ExpressError("Location is required"), 401);
    }
    const name = req.body.location;
    const geometry = await getGeoCoords(name);
    
    const locationObj = {name, geometry};
    req.body.location = locationObj;

    next();


});


