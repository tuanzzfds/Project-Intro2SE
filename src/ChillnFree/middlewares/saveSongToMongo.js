const Song = require('../models/songs.model')

const saveSongToMongo = (req, res, next) => {

   new Song({
      title: req.body.title,
      artist: req.body.artist,
      genre: req.body.genre,
      idUploader: req.user.id,
      picture_src: req.files.image[0].path,
      path: req.files.file[0].path
   })
      .save()
      .then((newSong) => {
         console.log("New song created", newSong)
         next()
      }).catch((err) => next(err))

}

module.exports = {
   saveSongToMongo
}