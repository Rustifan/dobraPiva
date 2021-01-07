const catchAssync = require("../errorManage/catchAssync");
const Comment = require("../model/commentModel");
const Beer = require("../model/beerModel");


module.exports.POST = catchAssync(async function(req, res)
{
    const commentMsg = req.body.comment;
    const rating = req.body.rating;
    const beerID = req.routerParams.id;
    
    const beer = await Beer.findById(beerID);
    const comment = new Comment({beer, rating, comment:commentMsg});

    await comment.save();
    res.redirect("/beer/"+beerID);
});
