const mongoose = require("mongoose");
const Beer = require("./beerModel");

const Schema = mongoose.Schema;
const isSameDay = require("../Utils/isSameDay");

const CommentScheema = new Schema({
    
    beer:{
        type: Schema.Types.ObjectId,
        ref: "beer",
        required: true
    },
  
    comment:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date:{
        type: Date,
        required: true
    }     
})

CommentScheema.methods.timeOfPosting = function()
{
    const today = new Date();
    const yesterday = new Date(Date.now() - 864e5);
    const date = this.date;

    if(isSameDay(yesterday, date))
    {
        return "yesterday";
    }
    else if(isSameDay(today, date))
    {
        const hour = today.getHours();
        const commentHour = date.getHours();
        const diff = hour - commentHour;
        if(diff > 0)
        {
            return diff + " hours ago";
        }
        else
        {
            const minutes = today.getMinutes();
            const commentMinutes = date.getMinutes();
            const diff = minutes-commentMinutes;
            if(diff>0)
            {
                return diff + " minutes ago";
                
            }
            else
            {
                return "just now";
            }
        }
    }
    else
    {
        const day = date.getDate();
        let month = date.getMonth()+1;
        if(month < 10)
        {
            month = "0"+month;
        }
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }
    

}

const Comment = mongoose.model("Comment", CommentScheema);
module.exports = Comment;