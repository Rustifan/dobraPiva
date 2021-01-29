module.exports.home = require("./home");
module.exports.beerController = require("./beerController");
module.exports.commentController = require("./commentController");
module.exports.userController = require("../controller/userController");
module.exports.ratingController = require("../controller/ratingController");
module.exports.chat = function(req, res)
{
    const title = "chat";
    res.render(title,{title});
}