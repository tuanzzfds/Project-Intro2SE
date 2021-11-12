const express = require('express')
const router = express.Router()
const GFS = require('../controllers/files.controller')

//@route GET /files
//@desc get all files in JSON format
router.get('/', GFS.showAllFilesInJSON)

//@route GET /file/:filename
//@desc get specified file with matched filename in JSON format
router.get('/:filename', GFS.showFileInJSON)

//@route DELETE /file/:filename
//@desc delete specified file with matched _id
router.delete('/:_id', GFS.deleteFileWithID)

//@route GET files/audio/:filename
//@desc get specified file in stream
router.get('/audio/:filename', GFS.getAudioStream)

module.exports = router
