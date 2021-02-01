

module.exports = (req, res, next)=>
{
    if(!req.session.username)
    {
        req.flash("err", "you must login first");
        res.redirect("/login");
    }
    else{
        next();
    }
};