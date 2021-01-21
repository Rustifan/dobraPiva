module.exports = function(err, req, res, next)
{
    console.log(req.originalUrl);
    
    let originalUrl = "/";
    if(req.session.originalUrl)
    {
       originalUrl = req.session.originalUrl; 
    }
    
    if(err.status)
    {
        req.flash("err", err.message);
       
        res.status(err.status).redirect(originalUrl);
        
    }
    else
    {
        req.flash("err", err.stack);
        res.redirect(originalUrl);
    }
}