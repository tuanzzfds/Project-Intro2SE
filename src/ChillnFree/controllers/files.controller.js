const mongoose = require('mongoose')
const db = mongoose.connection
const Grid = require('gridfs-stream')
const { isAudioType } = require('../assets/audioType')

//GFS stream config
let gfs
db.on('open', () => {
   console.log("DB connection open in FilesRouter")

   //GFS stream config
   gfs = Grid(db.db, mongoose.mongo)
   gfs.collection('songs')

})

const GFS = {
   showAllFilesInJSON: (req, res, next) => {
      gfs.files.find().toArray((err, files) => {
         //check if the file exists
         if (!files || files.length === 0) {
            res.status(404).json({
               error: 'File not found'
            })
         }
         else {
            res.json(files)
         }
      })
   },

   showFileInJSON: (req, res, next) => {
      gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
         if (!file || file.length === 0) {
            res.status(404).json({
               error: 'File not found'
            })
         }
         res.json(file)
      })
   },

   deleteFileWithID: (req, res, next) => {
      gfs.remove({ _id: req.params._id, root: 'songs' }, (err, GridFsStorage) => {
         if (err)
            return res.status(404).json({ error: err })
         else {
            console.log('success')
            res.redirect('/audio')
         }
      })
   },

   getAudioStream: async (req, res, next) => {
      const file = await gfs.files.findOne({ filename: req.params.filename })

      if (!file || file.length === 0) {
         res.status(404).json({
            error: 'File not found'
         })
      }

      if (isAudioType(file.contentType)) {
         //read output from browser
         const readstream = gfs.createReadStream(file.filename)
         res.set('Content-Type', 'audio/mp3')
         res.set('accept-ranges', 'bytes')
         res.set('Content-Length', file.length)
         res.set('Content-Range', `bytes 0-${file.length - 1}/${file.length}`)

         readstream.on('data', (chunk) => {
            res.write(chunk)
         })

         readstream.on('error', (err) => {
            res.status(404).json({ error: "stream err" })
         })

         readstream.on('end', () => {
            res.end()
         })
      }
      else {
         res.status(404).json({
            error: 'Not a mpeg file'
         })
      }
   }
}

module.exports = GFS