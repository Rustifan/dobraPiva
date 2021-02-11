const User = require("../model/userModle");
const Comment = require("../model/commentModel");
const catchAsync = require("../errorManage/catchAssync");
const hashPassword = require("../Utils/hashPassword");
const ExpressError = require("../errorManage/ExpressError");
const crypto = require("crypto");
const sendMail = require("../Utils/sendMail");
const { hash } = require("bcrypt");

module.exports.usersGET = catchAsync(async function(req, res){
    
    const userPerPage = 10;
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
    
    
   
    
    const language = req.language;

    const title = language == "croatian" ? `Korisnici` : `Users`; 
    const path = `${language}/users.ejs`

    res.render(path,{title, users, page, numOfPages});
    

});

module.exports.registerGET = catchAsync(async function(req, res)
{   
    
    const language = req.language;

    const title = language == "croatian" ? `Registracija` : `Registration`; 
    const path = `${language}/register.ejs`
    res.render(path, {title});
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
    let msg = "you sucessfully registered.\nWelcome "+user.username;
    if(req.language == "croatian"){msg = "Uspješno ste se registrirali.\n Dobrodošli " + user.username;}
    req.flash("sucess", msg);
    res.redirect("/beer");
});

module.exports.loginGET = function(req, res)
{
    const language = req.language;

    const title = language == "croatian" ? `Prijava` : `Login`; 
    const path = `${language}/login.ejs`
    
    res.render(path, {title});
    
}

module.exports.loginPOST = catchAsync(async function(req, res)
{

    

    const user = await User.findOne({username: req.body.username});
    
    
    let msg = "wrong password or username";
    if(req.language == "croatian"){msg = "pogrešno korisničko ime ili lozinka";}

    if(user)
    {
        const correctPassword = await hashPassword.compare(req.body.password, user.password);
        if(!correctPassword){
            
            throw(new ExpressError(msg, 401));
        }
        
    }
    else{
        throw(new ExpressError(msg, 401));
    }
    
    
    user.lastTimeActive = Date(); 

    await user.save();

    req.session.userID = user._id;
    req.session.username = user.username;
    req.session.isAdmin = user.isAdmin;
    let sucessMsg = "you sucessfully logged in as "+ user.username;
    if(req.language == "croatian"){sucessMsg = "Uspješno ste se prijavili kao " + user.username;}
    req.flash("sucess", sucessMsg);
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
    let msg = "you sucessfully logged out.\nGoodbye "+req.session.username;
    if(req.language == "croatian"){msg = "Uspješno ste se odjavili. \n Doviđenja "+ req.session.username;}
    req.flash("sucess", msg);
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


    
    const language = req.language;

    const title = language == "croatian" ? `Postavke` : `User settings`; 
    const path = `${language}/editUser.ejs`
    res.render(path,{title, user});

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
    
    const language = req.language;

    const title = language == "croatian" ? `Promjena lozinke` : `Change of password`; 
    const path = `${language}/changePassword.ejs`
    res.render(path, {title, user});

});

module.exports.userPasswordPUT = catchAsync(async function (req, res) {
    const userID = req.params.userID;
    const user = await User.findById(userID);
    const {oldPassword} = req.body;

    if(await hashPassword.compare(oldPassword, user.password)!==true)
    {
        let msg = "incorect information, acces denied";
        if(req.language == "croatian"){msg = "Netočne informacije, zabranjen pristup";}
        req.flash("err", msg);
        res.redirect("/users/"+userID);
        return;
    }

    user.password = await hashPassword.hash(req.body.newPassword, 12);

    await user.save();
    let msg = "you sucessfully changed your password ";
    if(req.language == "croatian"){msg = "Uspješno ste promijenili lozinku ";}
    req.flash("sucess",msg + user.username);
    res.redirect("/users/"+userID);
    
});


module.exports.userCommentsGET = catchAsync(async function(req, res)
{
    const user = await User.findById(req.params.userID);
    if(!user)
    {
        throw(new ExpressError("User not found", 404));
    }
    
    let page = 1;
    if(req.query.page)
    {
        page = req.query.page;
    }
    
    const numOfComments = 10;
    const commentsTotal = await Comment.countDocuments({user});
    let numOfPages = null;
    if(commentsTotal%numOfComments==0){numOfPages=commentsTotal/numOfComments;}
    else{numOfPages=Math.floor(commentsTotal/numOfComments)+1;}
    
    const comments = await Comment.find({user})
        .populate("beer")
        .sort([["date", 1]])
        .limit(numOfComments)
        .skip(numOfComments * (page-1));
        

       
    const language = req.language;

    const title = language == "croatian" ? `Komentari korisnika ${user.username}` : `Comments of ${user.username}`; 
    const path = `${language}/userComments.ejs`
    res.render(path, {title, comments, user, numOfPages, page});


});

module.exports.forgotPassGET = function(req, res)
{
    
    const language = req.language;

    const title = language == "croatian" ? `Zaboravljena lozinka` : `Forgotten password`; 
    const path = `${language}/forgotPass.ejs`
    res.render(path, {title});
}

module.exports.forgotPassPOST = catchAsync(async function(req, res){
    
    const {email} = req.body;
    const user = await User.findOne({email});
    
    if(user)
    {
        let token = await crypto.randomBytes(15);
        token = token.toString("hex");
        user.resetPassToken = await hashPassword.hash(token, 12);
        const now = new Date();
        const expire = new Date(now);
        expire.setMinutes(now.getMinutes()+10);
        user.resetPassTokenExpiration = expire;
        await user.save();

        const domain = process.env.MYDOMAIN || "http://localhost:3000";
        const subject = req.language ==  "croatian" ? "Zaboravljena lozinka" : "forgotten password";
        let message = `<h1>Forgotten password</h1>
        <p>For reset your password click on the link <a href="${domain}/login/reset-pass/${email}/${token}">link</p></a>
        <p>Token is valid only for short time.</p>`;
        if(req.language == "croatian")
        {
            message = `<h1>Zaboravljena lozinka</h1>
            <p>Za promjenu lozinke kliknite na <a href="${domain}/login/reset-pass/${email}/${token}">link</p></a>
            <p>Token za reset šifre kratko traje</p>`;
        }
        sendMail.send(email, subject, message);

    }

    let msg = "Check your mail to reset your password";
    if(req.language == "croatian"){msg = "Na mail smo vam poslali link za promjenu lozinke";}
    req.flash("sucess", msg);
    res.redirect("/");
});

module.exports.resetPassGET = catchAsync(async function(req, res)
{
    const token = req.params.token;
    const email = req.params.email;
    const language = req.language;

    const user = await User.findOne({email, resetPassTokenExpiration: {$gt: new Date()}});
    if(user && await hashPassword.compare(token, user.resetPassToken))
    {

        const title = language == "croatian" ? `Resetiraj lozinku` : `Reset Password`; 
        const path = `${language}/resetPass.ejs`
        return res.render(path, {title, token, email});
    }
    else{
        let msg = "token expired or invalid";
        if(req.language == "croatian"){msg = "token je istekao ili nije važeći";}
        req.flash("err", msg);
        res.redirect("/");
    }
});

module.exports.resetPassPOST = catchAsync(async function(req, res){
    const token = req.params.token;
    const email = req.params.email;
    const user = await User.findOne({email, resetPassTokenExpiration: {$gt: new Date()}});
    if(user && await hashPassword.compare(token, user.resetPassToken))
    {
        const {newPassword} = req.body;
        user.password = await hashPassword.hash(newPassword, 12);
        user.resetPassToken = null;
        user.resetPassTokenExpiration = null;
        await user.save();
        req.session.userID = user._id;
        req.session.username = user.username;
        req.session.isAdmin = user.isAdmin;

        let msg = " you sucesfully changed your password";
        if(req.language == "croatian"){msg = " uspješno ste promijenili lozinku";}
        req.flash("sucess", user.username+msg);
        res.redirect("/");
    }
    else{
        if(user)
        {
            user.resetPassToken = null;
            user.resetPassTokenExpiration = null;
            await user.save();
        }
        let msg = "token expired or invalid";
        if(req.language == "croatian"){msg = "token je istekao ili nije važeći";}
        req.flash("err", msg);
        res.redirect("/");
    }

});