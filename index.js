
//require
const dotenv = require("dotenv").config();
const express = require("express");
const mongoInit = require("./Core/mongoInit");
const controller = require("./controller/controller");
const path = require("path");
const beerRouter = require("./router/beerRouter");
const commentRouter = require("./router/commentRouter");
const userRouter = require("./router/userRouter");
const ratingRouter = require("./router/ratingRouter");
const languageRouter = require("./controller/languageRouter");
const methodOverride = require("method-override");
const ExpressError = require("./errorManage/ExpressError"); 
const errorHandle = require("./errorManage/errorHandle");
const engine = require("ejs-mate");
const sessionMid = require("./Core/sessionMid");
const flash = require("connect-flash");
const paramFunction = require("./router/routerParamFunction");
const setLocals = require("./middleware/setLocals");
const setOriginalUrl = require("./middleware/setOriginalUrl");
const chatControll = require("./controller/chatSocketControll");
const mustBeLogged = require("./middleware/mustBeLogged");
const clickMid = require("./middleware/clickMid");
const languageMid = require("./middleware/languageMid");
//security
const helmet = require("helmet");
const contentSecurityPolicy = require("./middleware/helmetContentSecurityPol");
const mongoSanitize = require("express-mongo-sanitize");
const htmlSanitazer = require("express-html-sanitizer");
//variables
const port = process.env.PORT || 3000;
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);



mongoInit();

//app.set
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware

io.use((socket, next)=>{
    sessionMid(socket.request, socket.request.res || {}, next);
});
app.use(helmet());
app.use(contentSecurityPolicy);

app.use(sessionMid);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));



app.use(flash());
app.use(mongoSanitize());
app.use(htmlSanitazer());
app.use(setLocals);
app.use(clickMid);
app.use(languageMid);

//routes
app.get("/",setOriginalUrl, controller.home);
app.use("/beer", beerRouter);
app.use("/beer/:id/ratings", paramFunction, ratingRouter);
app.use("/beer/:id/comments", paramFunction, commentRouter);
app.get("/chat", mustBeLogged, controller.chat);
app.use("/", userRouter);
app.use("/", languageRouter);
app.get("/*", (req, res)=>{throw(new ExpressError("Reqested page is not found. Error 404", 404));});


//error handeling

app.use(errorHandle);

//socket
chatControll(io);


//listening
http.listen(port, ()=>{
    console.log(`serving on port ${port}`);
});






