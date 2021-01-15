module.exports = function(req, res, next)
{
    if(!req.session.userID)
    {
        const errorMsg = "you dont have permission to add rate this beer. You have to login first";
        req.flash("err", errorMsg);
        return res.redirect("/login");;
    }
    else
    {
        next();
    }
}