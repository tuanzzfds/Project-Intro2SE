const Song = require('../models/songs.model')

const renderPlayMusicPage = (req, res, next) => {
   Song.find({}, (err, songs) => {
      //check if the file exists
      if (!songs || songs.length === 0 || err) {
         res.json({ message: "there is no song"})
      }
      else {
         res.render('playmusic', {
            title: "ChillnFree - Play music",
            nameOfAccount: req?.user?.name ?? false,
            songs: songs
         })
      }
   })
}

module.exports = {
   renderPlayMusicPage: renderPlayMusicPage
}