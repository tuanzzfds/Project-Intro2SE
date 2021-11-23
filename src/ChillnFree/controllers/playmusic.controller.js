const Song = require('../models/songs.model');
const Users = require("../models/users.model");

const renderPlayMusicPage = (req, res, next) => {
   Song.find({}, async (err, songs) => {
      //check if the file exists
      if (!songs || songs.length === 0 || err) {
         res.json({ message: "there is no song"})
      }
      else {
         json = {
            title: "ChillnFree - Play music",
            user: false,
            songs: songs
         }
         if (req.user){
            json.user = req.user;
         }
         res.render('playmusic', json)
      }
   })
}

module.exports = {
   renderPlayMusicPage: renderPlayMusicPage
}