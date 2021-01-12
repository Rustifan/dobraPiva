const Beer = require("../model/beerModel");
const { beerMakePOST } = require("./beerController");


module.exports = async function(req, res)
{
    const geoObj = {
        type : "featureCollection",
        features: []
    }


    const beers = await Beer.find();
    for(let beer of beers)
    {
        const obj = {type : "feature", geometry : beer.location.geometry};
        geoObj.features.push(obj);
    }
     
    const geoJson = JSON.stringify(geoObj);
    




    const title = "home";
    res.render(title, {title, geoJson});
}