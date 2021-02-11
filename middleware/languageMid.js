module.exports = (req, res, next)=>{

    if(!req.session.language)
    {
        req.session.language = "croatian";
    }
    req.language = req.session.language;
    next();
}