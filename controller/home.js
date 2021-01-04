module.exports = function(req, res)
{
    const title = "home";
    res.render(title, {title});
}