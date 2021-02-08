const mongoose = require("mongoose");

const clickScheema = mongoose.Schema(
    {
        ip: String,
        page: String,
        time: Date,
        username: String
    }
) 

const Click = mongoose.model("Click", clickScheema);

module.exports = Click;

