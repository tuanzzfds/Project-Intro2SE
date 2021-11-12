const mongoose = require('mongoose')
const db = mongoose.connection
const Grid = require('gridfs-stream')
//GFS stream config

let gfs
db.on('open', () => {
   console.log("DB connection open in AudioRouter")

   //GFS stream config
   gfs = Grid(db.db, mongoose.mongo)
   gfs.collection('songs')

})

const renderAudio = async (req, res, next) => {
   let filesList = new Array()
   let rawResponse = await gfs.files.find()
   await rawResponse.toArray((err, files) => {
      //check if the file exists
      if (!files || files.length === 0) {
         res.status(404).json({
            error: 'File not found'
         })
      }
      else {
         filesList = files
      }
   })
   const file = await gfs.files.findOne({ filename: req.query.filename })
   res.render('audio', { file: file ?? false, filesList: filesList })
}

module.exports = {
   renderAudio
}