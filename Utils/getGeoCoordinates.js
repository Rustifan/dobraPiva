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



async function  getGeoCoords(place)
{


    const location = replaceCroatianChars(place);
    

    

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+
    location+
    ".json?access_token="+
    process.env.MAPBOX_KEY;
   

    try{
        const data = await fetch(url);
        const json = await data.json();
        
        const geometry = json.features[0].geometry;
        

        return geometry;        
    }
    catch(err)
    {
        console.log("error: ", err);
        return null;
    }
}

module.exports = getGeoCoords;