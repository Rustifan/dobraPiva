const dotenv = require("dotenv").config();
const express = require("express");
const mongoInit = require("./Core/mongoInit");
const controller = require("./controller/controller");
const path = require("path");
const beerRouter = require("./router/beerRouter");
const methodOverride=require("method-override");

const port = 3000;
const app = express();
mongoInit();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", controller.home);
  
app.use("/beer", beerRouter);

app.listen(port, ()=>{
    console.log(`serving on port ${port}`);
})





