const ExpressError = require("../errorManage/ExpressError");

module.exports = async function(id, model)
{
    try{
        
        const obj = await model.findById(id);
        return obj;
    }
    catch(err){
        

        throw(new ExpressError("Could not find ID", 400));

    }
    
}