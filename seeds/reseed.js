const mongooseConnect = require("../Core/mongoInit");
const Beer = require("../model/beerModel");
const User = require("../model/userModle");
const Comment = require("../model/commentModel");
const hash = require("../Utils/hashPassword");

mongooseConnect();

const names = ["brzo", "dlakavo", "lijepo", "slatko", "bugarsko", "smrdeće", "crno", "bijelo", "tribunjsko",
"sretno", "poljansko", "drago", "naše", "satrano", "kuhinjsko", "stolno", "okruglo",
"ponosno", "sveto", "beskrajno", "mrkopaljsko", "mrko", "dugo", "dostojno", "pravedno", "otpjevano",
"kokos", "žuto", "kvrgavo", "pokošeno", "ne diraj", "korisno", "isusovo", "buničko", "bolničko", "nosorog" ];

const locations =["Split", "Zagreb", "Šibenik", "Benkovac", "Tisno", "Prvić Luka",
"Prvić Šepurina", "Oklaj", "Vukovar", "Zaton", "Velika Gorica", "Dubrovnik", "Donji Miholjac", "Požega",
"Zlarin", "Blato", "Crikvenica", "Niš"];

const beerStyles = ["bohemiam lager", "porter", "lager", "IPA", "APA", "stout",
"chocolate stout", "pilsner", "blonde ale", "dark lager", "hoppy lager", "wheat beer",
"weisse beer", "lagerčina"];

const images = ["https://besthqwallpapers.com/Uploads/8-2-2017/13407/thumb2-beer-hops-beer-glasses.jpg",
"https://wallpaperaccess.com/full/1105642.jpg", "https://wallpapercave.com/wp/1RRe30T.jpg",
"https://cdn.hipwallpaper.com/i/86/51/S9MEYQ.jpg",
"https://wallpaperaccess.com/full/1105647.jpg", 
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR716pHF6h2zphje2bHqXRXGPm_o6xIQaDpPA&usqp=CAU",
"https://images.pexels.com/photos/1727829/pexels-photo-1727829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
"https://hdwallpaperim.com/wp-content/uploads/2017/08/23/458806-alcohol-drinking_glass-beer-748x468.jpg",
"https://i.pinimg.com/originals/65/fb/37/65fb37abb5ba7714e03ddcb75f0bb0c9.jpg",
"https://images.all-free-download.com/images/wallpapers_thum/beer_wallpaper_miscellaneous_other_wallpaper_3316.jpg",
"https://cdn.wallpapersafari.com/73/20/gyxUTl.jpg",
"https://images.pexels.com/photos/1025113/pexels-photo-1025113.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDxezRmwkSe_ewLGcFjhspf3G1by_L60y0qg&usqp=CAU"
];



String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis euismod mi, ut varius dolor. Phasellus a tristique massa. Duis pharetra quam a nisi fringilla, ac laoreet nulla pretium. Sed tincidunt facilisis fringilla. Quisque ac est ut arcu maximus mollis. Suspendisse potenti. Duis in lorem ultrices, vulputate ex nec, luctus purus. Nulla molestie, massa sed luctus interdum, enim metus iaculis purus, mollis aliquet velit ante vel ex. Cras luctus vehicula diam, id sodales tellus luctus quis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla aliquam risus nisl, sed vulputate dolor convallis nec. Pellentesque id turpis id augue consequat tincidunt nec sit amet dui. Curabitur ut ipsum porta, tempor ex et, sollicitudin dui. Nam et lacinia massa, vel ultrices sem.";

let beerNum = 10;

if(process.argv[2])
{
    
    beerNum = parseInt(process.argv[2]);
}





async function DeleteAll()
{
    await Beer.deleteMany({});
    await Comment.deleteMany({});
    await User.deleteMany({});
    console.log("Deleting all");

}

let user = null;

async function CreateUser()
{
    user = new User();
    user.username = "rustifan";
    user.email = "ja@gmail.com";
    user.password = await hash.hash("1234", 12);
    await user.save();
}

async function CreateBeer() 
{
    let nameIndex1 = Math.floor(Math.random() * names.length);
    let nameIndex2 = Math.floor(Math.random() * names.length);
    if(nameIndex1 === nameIndex2)
    {
        nameIndex2++;
        if(nameIndex2 === names.lenght)
        {
            nameIndex2 = 0;
        }
    }
    const name = `${names[nameIndex1].capitalize()} ${names[nameIndex2]} pivo`;

    const locationIndex = Math.floor(Math.random() * locations.length);
    const location = locations[locationIndex];

    const styleIndex = Math.floor(Math.random() * beerStyles.length);
    const beerStyle = beerStyles[styleIndex];

    const imageIndex = Math.floor(Math.random() * images.length);
    const image = {
        filename: "image",
        path: images[imageIndex],
        originalName: "Image"        
    }

    const beer = new Beer();
    beer.name = name;
    beer.location = location;
    beer.beerStyle = beerStyle;
    beer.description = description;
    beer.image = image;
    beer.rating = 0;
    beer.user = user;
    await beer.save();
    console.log("new beer created");
}

async function Reseed()
{
    await DeleteAll();
    await CreateUser();
    for(let i = 0; i < beerNum; i++)
    {
        CreateBeer();
    }   
}

Reseed();