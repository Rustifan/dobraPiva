module.exports = function(req, res, next)
{
    console.dir(req.query);
    console.dir(req.params);
    console.dir(req.body);

    res.locals.err = req.flash("err"); 
    res.locals.sucess = req.flash("sucess");
    res.locals.userID = req.session.userID || null;
    res.locals.username = req.session.username || null;
    res.locals.isAdmin = req.session.isAdmin || null;
    res.locals.mapBoxToken = process.env.MAPBOX_KEY;
    next();
}