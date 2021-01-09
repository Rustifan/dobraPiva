const { required } = require("joi");
const mongoose = require("mongoose");
const Beer = require("./beerModel");

const Schema = mongoose.Schema;

const CommentScheema = new Schema({
    
    beer:{
        type: Schema.Types.ObjectId,
        ref: "Beer",
        required: true
    },
    rating:{
        type: Number,
        min: 1,
        max: 5,
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
    }     
})

const Comment = mongoose.model("Comment", CommentScheema);
module.exports = Comment;