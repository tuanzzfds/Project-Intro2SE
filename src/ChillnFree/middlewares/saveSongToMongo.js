const Song = require("../models/songs.model");

const saveSongToMongo = (req, res, next) => {
  let json = {
    title: req.body.title,
    artist: req.body.artist,
    genre: req.body.genre,
    idUploader: req.user.id,
  };
  if (req.files) {
    json.picture_src = req.files.image[0].path;
    json.path = req.files.file[0].path;
  } else {
    json.picture_src =
      "https://res.cloudinary.com/chillnfree/image/upload/v1640229901/ChillnFree/chill_logo_vwbdjq.png";
    json.path = req.file.path;
  }
  new Song(json)
    .save()
    .then((newSong) => {
      console.log("New song created", newSong);
      next();
    })
    .catch((err) => next(err));
};

module.exports = {
  saveSongToMongo,
};
