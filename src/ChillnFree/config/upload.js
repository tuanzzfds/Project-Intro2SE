const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
     return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
           if (err) {
              return reject(err);
           }
           console.log(file);
           const public_id = buf.toString("hex");
           let resource_type = 'video';
           let folder = 'ChillnFree/music/';
           if (file.mimetype === 'image/jpeg'){
              resource_type = 'image';
              folder = 'ChillnFree/coverpicture/';
           }
           const fileInfo = {
              public_id: public_id,
              folder: folder,
              resource_type: resource_type
           };

          //  if(!req.upload){
          //     req.upload = new Array();
          //     req.upload.push(file);
          //  }
          //  else {
          //     req.upload.push(file);
          //  }

           resolve(fileInfo);
        });
     });
  }
});

const upload = multer({ storage });

module.exports = {
  upload: upload,
};
