const expressSession = require("express-session");
const MongoStore = require("connect-mongodb-session")(expressSession);

const mongoHost = process.env.MONGO_HOST || "localhost";

var store = new MongoStore({
    uri: `mongodb://${mongoHost}:27017/sessions`,
    collection: 'mySessions'
  });

store.on("error", error=>console.log(error));

const sessionConfig = {
    secret: "ZeldaDaBeast",
    resave: false,
    saveUninitialized: false,
    store,
    cookie : {
        maxAge: 1000* 60 * 60 *24 * 7
    },
};
const sessionMid = expressSession(sessionConfig);

module.exports = sessionMid;