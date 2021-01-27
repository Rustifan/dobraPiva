const Beer = require("../model/beerModel")
const Comment = require("../model/commentModel");
const User = require("../model/userModle");
const catchAsync = require("../errorManage/catchAssync");
const findID = require("../Utils/findID");
const beerSort = require("../model/beerSortBy");
const ExpressError = require("../errorManage/ExpressError");
const Rating = require("../model/ratingModel");
const cloudinary = require("../Utils/imgUploadConfig").cloudinary;


module.exports.beerHome = catchAsync(async function(req, res)
{
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

    
    let page = 1;
    if(req.query.page){page= req.query.page;}
    const beerNumber = await Beer.countDocuments({});
    const beerPerPage = 10;
    let numOfPages = null;
    
    
    if(beerNumber%beerPerPage==0){numOfPages=beerNumber/beerPerPage;}
    else{numOfPages=Math.floor(beerNumber/beerPerPage)+1;}
    
    
    
    let beers = await Beer.find().sort([[sortCategory, sortOrder]])
        .limit(beerPerPage).skip(beerPerPage*(page-1));
    
    const title = "beer";
    const passObject = {beers, title, sortCategory, 
        sortOrder, page, beerPerPage, numOfPages}
    
    res.render(title, passObject);
});

module.exports.beerMakeGET = function(req, res)
{
    
    const title = "beerMake";
    res.render(title, {title});
    
}

module.exports.beerFind = catchAsync(async function(req, res){
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
    
    

    
    
    res.render(title, {beers, title, sortCategory, sortOrder, numOfPages, page, beerPerPage});

    
    

})


module.exports.beerMakePOST = catchAsync(async function(req, res)
{
    
    
    const beer = new Beer(req.body);
    
    const user = await User.findById(req.session.userID);
    

    beer.user = user;

    if(req.files.length)
    {
        for(let file of req.files)
        {
            const path = file.path;
            const filename = file.filename;
            const originalName = file.originalname;
            image = {path, filename, originalName};
            beer.image.push(image);
        }
        
    }
    beer.rating = 0;
    await beer.save();
    res.redirect("/beer");
});

module.exports.beerView = catchAsync(async function(req, res)
{
    const id = req.params.id;
    const beer = await findID(id, Beer);
    const comments = await Comment.find({beer}).populate("user");
    const title = "beerView";
    let userRating = 0;
    if(req.session.userID)
    {
        const rating = await Rating.findOne({user: req.session.userID, beer});
        if(rating)
        {
            userRating = rating;
        }
    }

    res.render(title, {beer, title, comments, userRating});

});

module.exports.beerEditGET = catchAsync(async function(req, res)
{
    const id = req.params.id;
    const beer = await findID(id, Beer);

    const title = "beerEdit";
    
    
    res.render(title, {beer, title});
});

module.exports.beerEditPUT = catchAsync(async function(req, res)
{
    const id = req.params.id;
    const beer = await findID(id, Beer);

    beer.name = req.body.name;
    beer.beerStyle = req.body.beerStyle;
    beer.location = req.body.location;
    beer.description = req.body.description;

    await beer.save();
    res.redirect("/beer");
});

module.exports.beerDELETE = catchAsync(async function(req, res)
{
    const id = req.params.id;
    const beer = await findID(id, Beer);
    
    await beer.remove();

    res.redirect("/beer");
    
});

module.exports.beerJson = catchAsync(async function(req, res)
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

module.exports.imagesGET = catchAsync(async function(req, res)
{
    const id = req.params.id;
    const beer = await findID(id, Beer);
    const images = beer.image;

    
    
    const title = "editImages";
    res.render(title,{title, beer, images});
});

module.exports.imagesDELETE = catchAsync(async function(req, res)
{
    const checked = req.body.checked;
    const beer = await Beer.findById(req.params.id);

    let images = beer.image;
    if(checked)
    {
        for(let i = checked.length-1; i >=0; i--)
        {
            const index = parseInt(checked[i]);
            await cloudinary.uploader.destroy(beer.image[index].filename, (err, res )=>{
            if(err)
            {
                console.log("error deleting image from cloudinary: ");
                console.log(res);
            }
            })

            images.splice(index, 1);
        }
        await beer.save();
    }
    else{
        req.flash("err", "you must check at least one image");
    }
    
    res.redirect(`/beer/${req.params.id}/images`);
});

module.exports.imagePOST = catchAsync(async function (req, res)
{
    const beer = await Beer.findById(req.params.id);

    if(req.files.length)
    {
        for(let file of req.files)
        {
            const path = file.path;
            const filename = file.filename;
            const originalName = file.originalname;
            image = {path, filename, originalName};
            beer.image.push(image);
        }
        
    }else{
        req.flash("err","error uploading images");
    }
    await beer.save();
    res.redirect(`/beer/${req.params.id}/images`);

    
});