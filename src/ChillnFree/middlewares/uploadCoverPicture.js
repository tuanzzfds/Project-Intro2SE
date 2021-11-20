const cloudinary = require('cloudinary').v2

const uploadCoverPicture = (req, res, next) => {
   if (!req.file || req.file.length === 0) {
      next()
   }
   else {
      cloudinary.uploader.upload(req.body.image, {
         folder: "ChillnFree/coverpicture/",
         overwrite: true,
         invalidate: true,
         
      }, function (error, result) {
         if (error) {
            next(error)
         }
         else {
            req.image = result
            

            next()
         }
      })
   }
}

module.exports = {
   uploadCoverPicture
}