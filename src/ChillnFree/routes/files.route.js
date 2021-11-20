const express = require('express')
const router = express.Router()
const { showAllFilesInJSON, deleteFileWithID } = require('../controllers/files.controller')

//@route GET /files
//@desc get all files in JSON format
router.get('/', showAllFilesInJSON)

//@route DELETE /file/:filename
//@desc delete specified file with matched _id
router.delete('/:_id', deleteFileWithID)

module.exports = router
