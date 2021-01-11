const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cloudinary = require("../Utils/imgUploadConfig").cloudinary;
const Comment = require("./commentModel");

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
        name: {
            type: String,
            required: true
        },
        geometry: {
            type: {
              type: String, 
              enum: ['Point'], 
              
            },
            coordinates: {
              type: [Number],
            }
          }
        
    },
    description: {
        type: String,
        required: true
    },
    image: {
        filename: String,
        path: String,
        originalName: String
    },
    rating: {
        type: Number,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});


beerScheema.post("remove", async (doc)=>{
    if(doc.image.filename)
    {
    
       const comments = Comment.find({beer: doc});
       
       await comments.remove();   
    
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

