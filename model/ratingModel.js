const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = Schema({
    beer:{
        type: Schema.Types.ObjectId,
        ref: "Beer",
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
});

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;