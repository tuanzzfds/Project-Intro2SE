const cloudinary = require('cloudinary').v2
const crypto = require("crypto")
const multer = require("multer")
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const { uploadCoverPicture } = require('../middlewares/uploadCoverPicture')
const { saveSongToMongo } = require('../middlewares/saveSongToMongo')
const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: async (req, file) => {
      return new Promise((resolve, reject) => {
         crypto.randomBytes(16, (err, buf) => {
            if (err) {
               return reject(err)
            }
            const public_id = buf.toString("hex")
            const fileInfo = {
               public_id: public_id,
               folder: 'ChillnFree/music/',
               resource_type: 'video'
            }
            req.file = file
            
            resolve(fileInfo)
         })
      })
   }
})

const upload = multer({ storage })

module.exports = {
   upload: upload
}
