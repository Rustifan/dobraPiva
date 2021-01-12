const fetch = require("node-fetch");


function replaceCroatianChars(str)
{   
    str = str.toLowerCase();
    let newStr = "";
    for(c of str)
    {
        
        let char = c;
        switch(c)
        {
            case "š":
                char = "s";
                break;
            case "č":
                char = "c";
                break;
            case "đ":
                char = "d";
                break;
            case "č":
                char = "c";
                break;
            case "ć":
                char = "c";
                break;
            case "ž":
                char = "z";
                break;
            default:
                break;

        }
        newStr+=char;
        

    }
    return newStr;
}

function randomNum(from, to)
{
    let num = Math.random();
    num *= (to-from);
    num = Math.floor(num);
    num+=from;
    return num;

}


async function  getGeoCoords(place, inCroatia = true ,addRandomCoords=true)
{


    let location = replaceCroatianChars(place);
    if(inCroatia)
    {
        location = location + " Croatia";
    }

    

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+
    location+
    ".json?access_token="+
    process.env.MAPBOX_KEY;
   

    try{
        const data = await fetch(url);
        const json = await data.json();
        
        let geometry = json.features[0].geometry;
        
        if(addRandomCoords)
        {
            let coords = geometry.coordinates;
            coords[0]+=(randomNum(-5,6)*0.0001);
            coords[1]+= (randomNum(-5,6)*0.0001);
            geometry.coordinates = coords;

        }


        return geometry;        
    }
    catch(err)
    {
        console.log("error: ", err);
        return null;
    }
}

module.exports = getGeoCoords;