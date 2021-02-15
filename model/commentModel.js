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

CommentScheema.methods.timeOfPosting = function(language = "english")
{
    const today = new Date();
    const yesterday = new Date(Date.now() - 864e5);
    const date = this.date;

    if(isSameDay(yesterday, date))
    {
        return language == "english" ?  "yesterday" : "jučer";
    }
    else if(isSameDay(today, date))
    {
        const hour = today.getHours();
        const commentHour = date.getHours();
        const diff = hour - commentHour;
        if(diff > 0)
        {
            let result = null;

            switch(language)
            {
                case "croatian":
                
                result ="prije "+ diff + hoursOnCroatian(diff);
                break;
                default:
                result = diff + " hours ago";
                break;
            }

            return result;
        }
        else
        {
            const minutes = today.getMinutes();
            const commentMinutes = date.getMinutes();
            const diff = minutes-commentMinutes;
            
            if(language == "english")
            {
                if(diff>0)
                {
                    return diff + " minutes ago";
                
                }
                else
                {
                    return "just now";
                }
            }
            else if(language == "croatian")
            {
                if(diff>0)
                {
                    
                    
                    return "prije " + diff + minutesOnCroatian(diff);
                }
                else
                {
                    return "malo prije";
                }
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

const minutesOnCroatian = (minutes)=>
{
    let result = null;
    if(minutes >4 && minutes <= 20)
    {
        result = " minuta";
    }
    else if(minutes % 10 == 1)
    {
        result = " minut";
    }
    else if(minutes % 10 <= 4)
    {
        result = " minute";
    }
    else{
        result = " minuta";
    }
    return result;
}

const hoursOnCroatian = (hours)=>
{
    let result = null;
    if(hours >4 && hours <= 20)
    {
        result = " sati";
    }
    else if(hours % 10 == 1)
    {
        result = " sat";
    }
    else if(hours % 10 <= 4)
    {
        result = " sata";
    }
    else{
        result = " sati";
    }
    return result;
}


const Comment = mongoose.model("Comment", CommentScheema);
module.exports = Comment;