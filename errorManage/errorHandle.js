module.exports = function(err, req, res, next)
{
    if(err.status)
    {
        req.flash("err", err.message);
        res.status(err.status).redirect("/beer");
        
    }
    else
    {
        req.flash("err", err.stack);
        res.redirect("/beer");
    }
}