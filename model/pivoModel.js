const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pivoScheema = new Schema({
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

const Pivo = mongoose.model("Pivo", pivoScheema);
module.exports = Pivo;