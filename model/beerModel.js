const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cloudinary = require("../Utils/imgUploadConfig").cloudinary;

const beerScheema = new Schema({
    name: {
        type: String,
        required: true
    },
    beerStyle: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        filename: String,
        path: String,
        originalName: String
    }
});
beerScheema.post("remove", async (doc)=>{
    if(doc.image.filename)
    {
    
       await cloudinary.uploader.destroy(doc.image.filename, (err, res )=>{
            
            if(err)
            {
                console.dir(res);
                
            }    
            
        })
    }
})
const Beer = mongoose.model("beer", beerScheema);


module.exports = Beer;