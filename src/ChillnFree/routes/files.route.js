const express = require('express')
const router = express.Router()
const { showAllSongsInJSON, deleteFileWithID } = require('../controllers/files.controller')
const Songs = require("../models/songs.model");

//@route GET /files
//@desc get all files in JSON format
router.get('/', showAllSongsInJSON)

//@route DELETE /file/:filename
//@desc delete specified file with matched _id
router.delete('/:_id', deleteFileWithID)
router.get('/nhactre', async function(req,res,next){
    const song = await Songs.find({genre: "Nhạc trẻ"});
    res.json(song);
})
module.exports = router
