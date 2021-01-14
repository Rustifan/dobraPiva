const Beer = require("../model/beerModel")
const Comment = require("../model/commentModel");
const User = require("../model/userModle");
const catchAssync = require("../errorManage/catchAssync");
const findID = require("../Utils/findID");
const beerSort = require("../model/beerSortBy");
const ExpressError = require("../errorManage/ExpressError");

module.exports.beerHome = catchAssync(async function(req, res)
{
    let page = 1;
    if(req.query.page){page= req.query.page;}
    const beerNumber = await Beer.countDocuments({});
    const beerPerPage = 10;
    let numOfPages = null;
    
    
    if(beerNumber%beerPerPage==0){numOfPages=beerNumber/beerPerPage;}
    else{numOfPages=Math.floor(beerNumber/beerPerPage)+1;}
    
    
    
    let beers = await Beer.find().sort({rating: -1})
        .limit(beerPerPage).skip(beerPerPage*(page-1));
    const href = "/beer?";
    const title = "beer";
    const passObject = {beers, title, sortCategory: "rating", 
        sortOrder: "-1", page, beerPerPage, numOfPages, href}
    
    res.render(title, passObject);
});

module.exports.beerMakeGET = function(req, res)
{
    
    const title = "beerMake";
    res.render(title, {title});
    
}

module.exports.beerFind = catchAssync(async function(req, res){
    let search = req.query.q;
    let sortCategory = req.query.sortCategory;
    let sortOrder = parseInt(req.query.sortOrder);
    
    switch(sortCategory)
    {
        case "0":
        sortCategory = "name";
        break;
        case "1":
        sortCategory = "rating";
        break;
        case "2":
        sortCategory = "beerStyle";
        break;
        case "3":
        sortCategory = "location";
        break;
        case undefined:
        sortCategory = "name"
        break;
        default:
        throw(new ExpressError("Wrong sorting category",404));
    }
    if(!sortOrder)
    {
        sortOrder = "1";
    }


    const category = req.query.category;
    const title = "beer";
    if(!search)
    {
        search = "";
    }
    let beers = null;
    
    
    let page = 1;
    if(req.query.page){page= req.query.page;}
    let beerNumber = null;
    const beerPerPage = 10;
    


    switch(category)
    {
        case "location":
        beerNumber = await Beer.countDocuments({"location.name" : {$regex: search, $options:'i'}});
        beers = await Beer.find({"location.name" : {$regex: search, $options:'i'}})
        .sort([[sortCategory,sortOrder]]).limit(beerPerPage).skip(beerPerPage*(page-1));
        break;
        case "beerStyle":
        beerNumber = await Beer.countDocuments({beerStyle : {$regex: search, $options:'i'}});
        beers = await Beer.find({beerStyle: {$regex: search, $options:'i'}})
        .sort([[sortCategory,sortOrder]]).limit(beerPerPage).skip(beerPerPage*(page-1));
        break;
        default:
        beerNumber = await Beer.countDocuments({name : {$regex: search, $options:'i'}});
        beers = await Beer.find({name: {$regex: search, $options:'i'}})
        .sort([[sortCategory,sortOrder]]).limit(beerPerPage).skip(beerPerPage*(page-1));
        break;
    }
    
    let numOfPages = null;
    if(beerNumber%beerPerPage==0){numOfPages=beerNumber/beerPerPage;}
    else{numOfPages=Math.floor(beerNumber/beerPerPage)+1;}
    let href = req.originalUrl+"&";
    if(req.originalUrl.indexOf("&page")!==-1)
    {
        href = req.originalUrl.substr(0, req.originalUrl.indexOf("&page"))+"&";
    }

    
    
    res.render(title, {beers, title, sortCategory, sortOrder,href, numOfPages, page, beerPerPage});

    
    

})


module.exports.beerMakePOST = catchAssync(async function(req, res)
{
    
    
    const beer = new Beer(req.body);
    
    const user = await User.findById(req.session.userID);
    

    beer.user = user;

    if(req.file)
    {
        const path = req.file.path;
        const filename = req.file.filename;
        const originalName = req.file.originalname;
        image = {path, filename, originalName};
        beer.image = image;
    }
    beer.rating = 0;
    await beer.save();
    res.redirect("/beer");
});

module.exports.beerView = catchAssync(async function(req, res)
{
    const id = req.params.id;

    const beer = await findID(id, Beer);
    
    const comments = await Comment.find({beer}).populate("user");
    const title = "beerView";
    
    res.render(title, {beer, title, comments});

});

module.exports.beerEditGET = catchAssync(async function(req, res)
{
    const id = req.params.id;
    const beer = await findID(id, Beer);

    const title = "beerEdit";
    
    res.render(title, {beer, title});
});

module.exports.beerEditPUT = catchAssync(async function(req, res)
{
    const id = req.params.id;
    const beer = await findID(id, Beer);

    beer.name = req.body.name;
    beer.beerSyle = req.body.beerSyle;
    beer.location = req.body.location;
    beer.description = req.body.description;

    await beer.save();
    res.redirect("/beer");
});

module.exports.beerDELETE = catchAssync(async function(req, res)
{
    const id = req.params.id;
    const beer = await findID(id, Beer);
    
    await beer.remove();

    res.redirect("/beer");
    
});

module.exports.beerJson = catchAssync(async function(req, res)
{
    const geoObj = {
        type : "featureCollection",
        features: []
    }


    const beers = await Beer.find();
    for(let beer of beers)
    {
        const obj = {type : "feature", geometry : beer.location.geometry, properties : {
            name: beer.name,
            id: beer._id,
            rating: beer.rating
        }};
        geoObj.features.push(obj);
    }
     
    const geoJson = JSON.stringify(geoObj);
    res.send(geoJson);
});