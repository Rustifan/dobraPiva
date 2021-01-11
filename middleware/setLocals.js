module.exports = function(req, res, next)
{
    res.locals.err = req.flash("err"); 
    res.locals.sucess = req.flash("sucess");
    res.locals.userID = req.session.userID || null;
    res.locals.username = req.session.username || null;
    res.locals.mapBoxToken = process.env.MAPBOX_KEY;
    next();
}