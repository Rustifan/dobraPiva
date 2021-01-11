module.exports = function(req, res, next)
{
    req.session.originalUrl = req.originalUrl;
    next();
}