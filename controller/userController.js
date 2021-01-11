const User = require("../model/userModle");
const catchAsync = require("../errorManage/catchAssync");
const hashPassword = require("../Utils/hashPassword");
const ExpressError = require("../errorManage/ExpressError");

module.exports.registerGET = catchAsync(async function(req, res)
{   
    const title = "register";
    res.render(title, {title});
});

module.exports.registerPOST = catchAsync(async function(req, res)
{
    const user = new User(req.body);
    await user.save();
    req.session.userID = user._id;
    req.session.username = user.username;
    req.flash("sucess", "you sucessfully registered.\nWelcome "+user.username);
    res.redirect("/beer");
});

module.exports.loginGET = function(req, res)
{
    
    const title = "login";
    res.render(title, {title});
    
}

module.exports.loginPOST = catchAsync(async function(req, res)
{

    

    const user = await User.findOne({username: req.body.username});
   
    if(user)
    {
        const correctPassword = await hashPassword.compare(req.body.password, user.password);
        if(!correctPassword){throw(new ExpressError("wrong password or username", 501));}
        
    }
    else{
        throw(new ExpressError("wrong password or username", 501));
    }
    
    
    
    req.session.userID = user._id;
    req.session.username = user.username;
    req.flash("sucess", "you sucessfully logged in as "+ user.username);
    res.redirect("/beer");
})

module.exports.logout = function(req, res)
{
    req.flash("sucess", "you sucessfully logged out.\nGoodbye "+req.session.username);
    req.session.userID = null;
    req.session.username = null;
    let originalUrl = "/";
    if(req.session.originalUrl)
    {
       originalUrl = req.session.originalUrl; 
    }
    res.redirect(originalUrl);
}