const catchAsync = require("../errorManage/catchAssync");
const ExpressError = require("../errorManage/ExpressError");

module.exports = catchAsync(async function(req, res, next){
    if(!req.session.isAdmin)
    {
        throw(new ExpressError("You must be admin to have this permission ", 401 ));
        
    }
    else
    {
        next();
    }

});