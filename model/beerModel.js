const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const beerScheema = new Schema({
    name: {
        type: String,
        required: true
    },
    beerStyle: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: String
});

const Beer = mongoose.model("beer", beerScheema);
module.exports = Beer;