const Click = require("../model/clicks");


module.exports = (req, res, next)=>
{
    if(req.originalUrl =="/beer/json")
    {
        return next();
    }
    const click = new Click();
    click.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    click.page =req.originalUrl;
    click.time = Date();
    if(req.session.username)
    {
        click.username = req.session.username;
    }
    else{
        click.username = "unknown";
    }
    click.save();
    next();
}