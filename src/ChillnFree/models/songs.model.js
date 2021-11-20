const mongoose = require("mongoose");

const songsSchema = new mongoose.Schema({
  title: String,
  artist: String,
  idUploader: String,
  picture_src: String,
  path: String,
});
const Song = mongoose.model("songs", songsSchema);
module.exports = Song;
