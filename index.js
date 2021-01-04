
//require
const dotenv = require("dotenv").config();
const express = require("express");
const mongoInit = require("./Core/mongoInit");
const controller = require("./controller/controller");
const path = require("path");
const beerRouter = require("./router/beerRouter");
const methodOverride=require("method-override");
const ExpressError = require("./errorManage/ExpressError"); 
const errorHandle = require("./errorManage/errorHandle");
const engine = require("ejs-mate");
const expressSession = require("express-session");
const flash = require("connect-flash");

//variables
const port = 3000;
const app = express();
mongoInit();

//app.set
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware
const sessionConfig = {
    secret: "ZeldaDaBeast",
    resave: false,
    saveUninitialized: true,
};
app.use(expressSession(sessionConfig));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(flash());
app.use((req, res, next)=>{res.locals.err = req.flash("err"); next();});

//routes
app.get("/", controller.home);
app.use("/beer", beerRouter);
app.get("/*", (req, res)=>{throw(new ExpressError("Not Found 404", 404));});

//error handeling

app.use(errorHandle);

//listening
app.listen(port, ()=>{
    console.log(`serving on port ${port}`);
})





