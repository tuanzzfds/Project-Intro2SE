const Song = require('../models/songs.model')
const { isAudioType } = require('../utils/audioType')

const showAllFilesInJSON = (req, res, next) => {
   Song.find({}, (err, files) => {
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
}

const deleteFileWithID = (req, res, next) => {
   Song.findOneAndRemove({ _id: req.params._id}, (err, song) => {
      if (err)
         res.status(404).json({ error: err })
      else {
         res.json({ 
            success: true,
            deletedSong: song
         })
      }
   })
}

module.exports = {
   showAllFilesInJSON,
   deleteFileWithID
}