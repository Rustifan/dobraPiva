const User = require("../model/userModle");
const catchAsync = require("../errorManage/catchAssync");
const hashPassword = require("../Utils/hashPassword");
const ExpressError = require("../errorManage/ExpressError");
const session = require("express-session");
const { search } = require("../router/beerRouter");

module.exports.usersGET = catchAsync(async function(req, res){
    
    const userPerPage = 20;
    let sortCategory = "username";
    let sortOrder = 1;
    let search = "";
    let page = 1;
    if(req.query.sortCategory)
    {
        sortCategory = req.query.sortCategory;
    }
    if(req.query.sortOrder)
    {
        sortOrder = req.query.sortOrder;
    }
    if(req.query.search)
    {
        search = req.query.search;
    }
    if(req.query.page)
    {
        page = req.query.page;
    }
    const users = await User.find({username: {$regex: search, $options: "i"}})
        .sort([[sortCategory, sortOrder]])
        .limit(userPerPage)
        .skip(userPerPage*(page-1));
    const userNumber = await User.countDocuments({username: {$regex: search, $options: "i"}});
    let numOfPages = null;

    if(userNumber%userPerPage==0){numOfPages=userNumber/userPerPage;}
    else{numOfPages=Math.floor(userNumber/userPerPage)+1;}
    
    
    const title = "users";
    
    

    res.render(title,{title, users, page, numOfPages});
    

});

module.exports.registerGET = catchAsync(async function(req, res)
{   
    const title = "register";
    res.render(title, {title});
});

module.exports.registerPOST = catchAsync(async function(req, res)
{
    const user = new User(req.body);
    user.isAdmin = false;
    user.lastTimeActive = Date();
    user.numberOfComments = 0;

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
    
    
    user.lastTimeActive = Date(); 

    await user.save();

    req.session.userID = user._id;
    req.session.username = user.username;
    req.session.isAdmin = user.isAdmin;
    req.flash("sucess", "you sucessfully logged in as "+ user.username);
    if(req.session.originalUrl)
    {
        res.redirect(req.session.originalUrl)
    }
    else{
        res.redirect("/beer");

    }
})

module.exports.logout = function(req, res)
{
    req.flash("sucess", "you sucessfully logged out.\nGoodbye "+req.session.username);
    req.session.userID = null;
    req.session.username = null;
    req.session.isAdmin = null;

    let originalUrl = "/";
    if(req.session.originalUrl)
    {
       originalUrl = req.session.originalUrl; 
    }
    res.redirect(originalUrl);
}

module.exports.userEdit = catchAsync(async function(req, res){
    const userID = req.params.userID;
    const user = await User.findById(userID);


    const title = "editUser";

    res.render(title,{title, user});

});

module.exports.userEditPUT = catchAsync(async function(req, res){
    const userID = req.params.userID;
    const user = await User.findById(userID);
    user.username = req.body.username;
    user.email = req.body.email;

    await user.save();
    res.redirect("/");
});

module.exports.userPasswordGET = catchAsync(async function(req, res){
    const userID = req.params.userID;
    const user = await User.findById(userID);
    const title = "changePassword";

    res.render(title, {title, user});

});

module.exports.userPasswordPUT = catchAsync(async function (req, res) {
    const userID = req.params.userID;
    const user = await User.findById(userID);
    const {oldPassword} = req.body;

    if(await hashPassword.compare(oldPassword, user.password)!==true)
    {
        req.flash("err", "incorect information, acces denied");
        res.redirect("/users/"+userID);
        return;
    }

    user.password = await hashPassword.hash(req.body.newPassword, 12);

    await user.save();
    req.flash("sucess", "you sucessfully changed your password " + user.username);
    res.redirect("/users/"+userID);
    
});
