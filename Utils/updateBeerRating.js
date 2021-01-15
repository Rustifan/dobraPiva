const Beer = require("../model/beerModel");
const Comment = require("../model/commentModel");
const Rating = require("../model/ratingModel");

function calculateAvgRating(ratings) {
    
    if(ratings.length)
    {
        let added = 0; 

        for(let rating of ratings)
        {
            added+=rating.rating; 
        }
        const result = added/(ratings.length);
        
        return result;
    }
    else{
        return 0;
    }
    
    
}

module.exports = async function(beer) {
    
    const ratings = await Rating.find({beer});
    console.dir(ratings);
    const newRating = calculateAvgRating(ratings);
    beer.rating = newRating.toFixed(2);
    
    await beer.save();
}