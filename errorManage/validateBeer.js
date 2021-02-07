const joi = require("joi");
const ExpressError=require("../errorManage/ExpressError");

module.exports = function(req, res, next)
{
    const beer = req.body;


    const schema = joi.object({
        name: joi.string().required(),
        beerStyle: joi.string().required(),
        location: joi.string().required(),
        description: joi.string().required(),
        abv: joi.number().required(),
        image: joi.string(),    
    });

    const {error, value} = schema.validate(beer);
    if(error)
    {
        throw(new ExpressError(`${error}`, 400));
    }
    
    next();
    
   
}