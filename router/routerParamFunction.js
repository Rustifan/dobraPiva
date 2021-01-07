const paramFunction = function(req, res, next)
{
    req.routerParams = req.params;
    next();
}

module.exports = paramFunction;