const Beer = require("../model/beerModel")
const catchAssync = require("../errorManage/catchAssync");
const findID = require("../Utils/findID");

module.exports.beerHome = catchAssync(async function(req, res)
{
    const beers = await Beer.find();
    const title = "beer";
    res.render(title, {beers, title});
});

module.exports.beerMakeGET = function(req, res)
{
    const title = "beerMake";
    res.render(title, {title});
}

module.exports.beerMakePOST = catchAssync(async function(req, res)
{

    const beer = new Beer(req.body);
    await beer.save();
    res.redirect("/beer");
});

module.exports.beerView = catchAssync(async function(req, res)
{
    const id = req.params.id;
    const beer = await findID(id, Beer);
    
    const title = "beerView";
    res.render(title, {beer, title});

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
    beer.remove();
    res.redirect("/beer");
});

