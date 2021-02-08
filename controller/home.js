const Beer = require("../model/beerModel");
const { beerMakePOST } = require("./beerController");


module.exports = async function(req, res)
{
    const title = "home";
    res.render(title, {title});
}

