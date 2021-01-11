
//require
const dotenv = require("dotenv").config();
const express = require("express");
const mongoInit = require("./Core/mongoInit");
const controller = require("./controller/controller");
const path = require("path");
const beerRouter = require("./router/beerRouter");
const commentRouter = require("./router/commentRouter");
const userRouter = require("./router/userRouter");
const methodOverride=require("method-override");
const ExpressError = require("./errorManage/ExpressError"); 
const errorHandle = require("./errorManage/errorHandle");
const engine = require("ejs-mate");
const expressSession = require("express-session");
const flash = require("connect-flash");
const paramFunction = require("./router/routerParamFunction");
const setLocals = require("./middleware/setLocals");
const setOriginalUrl = require("./middleware/setOriginalUrl");


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
    saveUninitialized: false,
    cookie : {
        maxAge: 1000* 60 * 60 *24 * 7
    },
};
app.use(expressSession(sessionConfig));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(flash());
app.use(setLocals);


//routes
app.get("/",setOriginalUrl, controller.home);
app.use("/beer", beerRouter);
app.use("/beer/:id/comments", paramFunction, commentRouter);
app.use("/", userRouter);
app.get("/*", (req, res)=>{throw(new ExpressError("Reqested page is not found. Error 404", 404));});

//error handeling

app.use(errorHandle);

//listening
app.listen(port, ()=>{
    console.log(`serving on port ${port}`);
})





