const Song = require('../models/songs.model')

const saveSongToMongo = (req, res, next) => {
   new Song({
      title: req.body.title,
      artist: req.body.artist,
      idUploader: req.user.id,
      picture_src: req.image.secure_url,
      path: req.file.path
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