const catchAsync = require("../errorManage/catchAssync");
const Rating = require("../model/ratingModel");
const ExpressError = require("../errorManage/ExpressError");
const updateBeerRating = require("../Utils/updateBeerRating");
const Beer = require("../model/beerModel");

module.exports.post = catchAsync(async function(req, res){

    const userID = req.session.userID;
    const beerID = req.routerParams.id;
    const rating = req.body.rating;
    const alreadyRated = await Rating.find({user: userID, beer: beerID});
    if(alreadyRated.length)
    {
        throw(new ExpressError("Rating failed. You already rated this beer",403));
        
    }

    const newRating = new Rating({user: userID, beer: beerID, rating});
    const beer = await Beer.findById(beerID);
    await newRating.save();
    await updateBeerRating(beer);

    let msg = "you sucesfully rated this beer";
    if(req.language == "croatian"){msg = "Uspješno ste ocjenili pivo";}
    req.flash("sucess", msg);
    

    res.redirect("/beer/"+beerID+"?rated=true");

})