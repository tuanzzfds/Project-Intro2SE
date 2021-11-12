const mongoose = require('mongoose')

const songsSchema = new mongoose.Schema({
    name: String,
    singer: String,
    idUploader: String,
    compositionDate: Date,
    uploadDate: Date,
})
const Song = mongoose.model("songs",  songsSchema);
module.exports = Song;