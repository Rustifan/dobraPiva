const catchAssync = require("../errorManage/catchAssync");
const Comment = require("../model/commentModel");
const Beer = require("../model/beerModel");
const updateAvgRating = require("../Utils/updateBeerRating");
const User = require("../model/userModle");


module.exports.POST = catchAssync(async function(req, res)
{
    const commentMsg = req.body.comment;
    const rating = req.body.rating;
    const beerID = req.routerParams.id;
    const beer = await Beer.findById(beerID);
    const user = await User.findById(req.session.userID);
    const comment = new Comment({beer, rating, comment:commentMsg, user});
    await comment.save();
    await updateAvgRating(beer);
    res.redirect("/beer/"+beerID);
});

module.exports.DELETE = catchAssync(async function(req, res)
{
    const beerID = req.routerParams.id;
    const beer = await Beer.findById(beerID);
    const commentID = req.params.commentID;
    await Comment.findByIdAndDelete(commentID);
    await updateAvgRating(beer);
    res.redirect("/beer/"+beerID);

})
