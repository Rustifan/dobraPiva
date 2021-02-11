const Beer = require("../model/beerModel");
const { beerMakePOST } = require("./beerController");


module.exports = async function(req, res)
{
    const language = req.language;

    const title = `Dobra piva`; 
    const path = `${language}/home.ejs`
    
    res.render(path, {title});
}

