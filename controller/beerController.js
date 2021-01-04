const Beer = require("../model/beerModel")

module.exports.beerHome = async function(req, res)
{
    const beers = await Beer.find();

    res.render("beer", {beers});
}

module.exports.beerMakeGET = function(req, res)
{
    res.render("beerMake");
}

module.exports.beerMakePOST = async function(req, res)
{
    const beer = new Beer(req.body);
    await beer.save();
    res.redirect("/beer");
}

module.exports.beerView = async function(req, res)
{
    const id = req.params.id;
    const beer = await Beer.findById(id);
    res.render("beerView", {beer});
}

module.exports.beerEditGET = async function(req, res)
{
    const id = req.params.id;
    const beer = await Beer.findById(id);
    res.render("beerEdit", {beer});
}

module.exports.beerEditPUT = async function(req, res)
{
    const id = req.params.id;
    const beer = await Beer.findById(id);
    beer.name = req.body.name;
    beer.beerSyle = req.body.beerSyle;
    beer.location = req.body.location;
    beer.description = req.body.description;

    await beer.save();
    res.redirect("/beer");
}

module.exports.beerDELETE = async function(req, res)
{
    const id = req.params.id;
    await Beer.findByIdAndDelete(id);
    res.redirect("/beer");
}

