module.exports = function(err, req, res, next)
{
    if(err.status)
    {
        res.status(err.status).send(err.message);
        
    }
    else
    {
        next(err);
    }
}