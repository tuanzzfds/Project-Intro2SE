const Song = require('../models/songs.model')
const { isAudioType } = require('../utils/audioType')

const showAllSongsInJSON = async (req, res, next) => {
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


const showAllChillSongsInJSON = async (req, res, next) => {
   Song.find({genre: "Chill"}, (err, files) => {
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

const showAllStudySongsInJSON = async (req, res, next) => {
   Song.find({genre: "Study"}, (err, files) => {
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

// temp
const showAllSleepSongsInJSON = async (req, res, next) => {
   Song.find({genre: "Sleep"}, (err, files) => {
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
   showAllSongsInJSON,
   showAllChillSongsInJSON,
   showAllStudySongsInJSON,
   showAllSleepSongsInJSON,
   deleteFileWithID
}