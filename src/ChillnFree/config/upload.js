const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
const fs = require('fs');
const mm = require('music-metadata');

const MONGODB_URI =
  "mongodb+srv://admin:QGZBWmMtgaCl8EyL@cluster0.0vzrk.mongodb.net/chillnfree?retryWrites=true&w=majority";

// create storage engine
const storage = new GridFsStorage({
  url: MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        console.log(file);
        // let infoSong = {}
        // var parser = mm(fs.createReadStream(path), function (err, metadata) {
        //   if (err) throw err;
        //   infoSong.title = metadata.title;
        //   infoSong.artist = metadata.artist;
        // });
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "songs",
          metadata:{idUploader: req.user.id}
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
module.exports = {
  upload: upload,
};
