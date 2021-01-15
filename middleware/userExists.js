const User = require("../model/userModle");
const catchAsync = require("../errorManage/catchAssync");

module.exports = catchAsync(async function(req, res, next)
{
    const{username} = req.body;
    const user = await User.findOne({username});
    if(user)
    {
        req.flash("err", "sorry, user with that name already exist. Try again");
        res.redirect("/register");
        return;
    }
    next();




});