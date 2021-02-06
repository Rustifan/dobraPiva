const helmet = require("helmet");

const scripts = ["https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.js"];


const styles=["https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css"];

const connects = ["https://api.mapbox.com/",
"https://events.mapbox.com/events/"
];


let seedImages = ["https://besthqwallpapers.com/",
"https://wallpaperaccess.com/full/1105642.jpg", "https://wallpapercave.com/wp/",
"https://cdn.hipwallpaper.com/i/86/51/",
"https://wallpaperaccess.com/full/", 
"https://encrypted-tbn0.gstatic.com/images",
"https://images.pexels.com/photos/1727829/",
"https://hdwallpaperim.com/wp-content/uploads/2017/08/23/",
"https://i.pinimg.com/originals/",
"https://images.all-free-download.com/images/",
"https://cdn.wallpapersafari.com/",
"https://images.pexels.com/photos/1025113/",
"https://encrypted-tbn0.gstatic.com/images"
];

if(process.env.NODE_ENV="production")
{
    seedImages = [];
}

const images = ["https://res.cloudinary.com/rustifan/"]

module.exports = helmet.contentSecurityPolicy({
   

    directives: {
        "default-src": [],
        "connect-src": ["'self'", ...connects],
        "script-src": ["'self'", "'unsafe-inline'", ...scripts],
        "style-src" : ["'self'","'unsafe-inline'", "https://fonts.googleapis.com/", ...styles],
        "worker-src":["'self'", "blob:"],
        "object-src" : ["'self'"],
        "img-src": ["'self'", "data:", "blob:", ...seedImages, ...images],
        "font-src":["'self'", "https://fonts.gstatic.com/"],

    }}
)