const bcrypt = require("bcrypt");
const catchAsync = require("../errorManage/catchAssync");

module.exports.hash = async function(password, saltRounds)
{
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

module.exports.compare = async function(password, hashedPassword)
{
    const correct = await bcrypt.compare(password, hashedPassword);
    return correct;
};

module.exports.hashPassMid = catchAsync(async function(req, res, next){
    
    const inputPass = req.body.password;
    req.body.password = await module.exports.hash(inputPass,12);
    next();
});