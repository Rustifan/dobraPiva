const catchAssync = require("../errorManage/catchAssync");
const Comment = require("../model/commentModel");
const Beer = require("../model/beerModel");
const updateAvgRating = require("../Utils/updateBeerRating");
const User = require("../model/userModle");


module.exports.POST = catchAssync(async function(req, res)
{
    const commentMsg = req.body.comment;
    
    const beerID = req.routerParams.id;
    const beer = await Beer.findById(beerID);
    const user = await User.findById(req.session.userID);
    user.numberOfComments++;
    await user.save();
    const comment = new Comment({beer, comment:commentMsg, user});
    comment.date = Date();
    
    await comment.save();
    
    res.redirect("/beer/"+beerID);
});

module.exports.DELETE = catchAssync(async function(req, res)
{
    const beerID = req.routerParams.id;

    const commentID = req.params.commentID;
    const comment = await Comment.findById(commentID);
    const user = await User.findById(comment.user);
    user.numberOfComments--;
    await user.save();
    
    await comment.deleteOne();

    res.redirect(req.session.originalUrl);

})
