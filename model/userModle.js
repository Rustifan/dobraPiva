const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const isSameDay = require("../Utils/isSameDay");

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true
    },
    lastTimeActive:{
        type: Date
    },
    numberOfComments:{
        type: Number,
        required: true
    },
    resetPassToken:{
        type: String,
    },
    resetPassTokenExpiration:{
        type: Date
    }

});



userSchema.methods.getDate = function()
{
    let result = null;

    const lastTime = this.lastTimeActive;
    let month = lastTime.getMonth()+1;
    const date = lastTime.getDate();
    const year = lastTime.getFullYear();
    const yesterday = new Date(Date.now() - 864e5);

    const now = new Date();
    if(month < 10)
    {
        month = "0"+month.toString();
    }

    if(isSameDay(now, lastTime))
    {
       result = "today";
    }
    else if(isSameDay(yesterday, lastTime))
    {
        result = "yesterday";
    }
    else
    {
        result = `${date}-${month}-${year}`;
    }

        
    
    return result;
}

const User = mongoose.model("User", userSchema);

module.exports = User;

