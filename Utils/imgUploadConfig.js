const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require("multer");
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
  });

function uploadToCloud(folderName)
{
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: folderName
        }
    
      });
    
    return multer({storage});
}

module.exports.upload = uploadToCloud;
module.exports.cloudinary = cloudinary;


