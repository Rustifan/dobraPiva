//mongoose conection
const mongoose = require('mongoose');

function mongoInit()
{
    const mongoAdress = "mongodb://localhost/dobraPiva"
    mongoose.connect(mongoAdress, {useNewUrlParser: true,  useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("Connnected to mongo database");
    });
}

module.exports = mongoInit;