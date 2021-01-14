const Beer = require("./beerModel");


module.exports = async function (category, order, find="") 
{
    const sortedBeers = beers.sort({category, order});
    return sortedBeers;   
}