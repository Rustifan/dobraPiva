const Beer = require("../model/beerModel")
const Comment = require("../model/commentModel");
const User = require("../model/userModle");
const catchAssync = require("../errorManage/catchAssync");
const findID = require("../Utils/findID");

module.exports.beerHome = catchAssync(async function(req, res)
{
    const beers = await Beer.find().sort({rating:-1});
    
    const title = "beer";
    
    res.render(title, {beers, title});
});

module.exports.beerMakeGET = function(req, res)
{
    
    const title = "beerMake";
    res.render(title, {title});
    
}

module.exports.beerFind = catchAssync(async function(req, res){
    let search = req.query.q;
    const category = req.query.category;
    const title = "beer";
    if(!search)
    {
        search = "";
    }
    let beers = null;

    switch(category)
    {
        case "location":
        beers = await Beer.find({"location.name" : {$regex: search, $options:'i'}});
        res.render(title, {beers, title});
        break;
        case "beerStyle":
        beers = await Beer.find({beerStyle: {$regex: search, $options:'i'}});
        res.render(title, {beers, title});
        break;
        default:
        beers = await Beer.find({name: {$regex: search, $options:'i'}});
        res.render(title, {beers, title});
        break;
        
        


        
    }
    
    

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