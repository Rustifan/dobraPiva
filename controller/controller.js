module.exports.home = require("./home");
module.exports.beerController = require("./beerController");
module.exports.commentController = require("./commentController");
module.exports.userController = require("../controller/userController");
module.exports.ratingController = require("../controller/ratingController");
module.exports.chat = function(req, res)
{
    const language = req.language;
   
    const title = "Chat"; 
    const path = `${language}/chat.ejs`;

    res.render(path,{title});
}