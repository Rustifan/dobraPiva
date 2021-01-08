const { func } = require("joi");
const Beer = require("../model/beerModel");
const Comment = require("../model/commentModel");

function calculateAvgRating(comments) {
    
    if(comments.length)
    {
        let added = 0; 

        for(let comment of comments)
        {
            added+=comment.rating; 
        }
        const result = added/(comments.length);
        
        return result;
    }
    else{
        return 0;
    }
    
    
}

module.exports = async function(beer) {
    
    const comments = await Comment.find({beer});
    const newRating = calculateAvgRating(comments);
    beer.rating = newRating.toFixed(2);
    
    await beer.save();
}