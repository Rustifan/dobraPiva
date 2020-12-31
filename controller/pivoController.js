const Pivo = require("../model/pivoModel")

module.exports.pivoHome = async function(req, res)
{
    const beers = await Pivo.find();

    res.render("pivo", {beers});
}

module.exports.pivoMakeGET = function(req, res)
{
    res.render("pivoMake");
}

module.exports.pivoMakePOST = async function(req, res)
{
    const pivo = new Pivo(req.body);
    await pivo.save();
    res.redirect("/pivo");
}

module.exports.pivoView = async function(req, res)
{
    const id = req.params.id;
    const pivo = await Pivo.findById(id);
    res.render("pivoView", {pivo});
}

module.exports.pivoEditGET = async function(req, res)
{
    const id = req.params.id;
    const pivo = await Pivo.findById(id);
    res.render("pivoEdit", {pivo});
}

module.exports.pivoEditPUT = async function(req, res)
{
    const id = req.params.id;
    const pivo = await Pivo.findById(id);
    pivo.name = req.body.name;
    pivo.beerSyle = req.body.beerSyle;
    pivo.location = req.body.location;
    pivo.description = req.body.description;

    await pivo.save();
    res.redirect("/pivo");
}

module.exports.pivoDELETE = async function(req, res)
{
    const id = req.params.id;
    await Pivo.findByIdAndDelete(id);
    res.redirect("/pivo");
}

