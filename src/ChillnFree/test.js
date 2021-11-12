var fs = require('fs');
var mm = require('music-metadata');

// create a new parser from a node ReadStream
var parser = mm(fs.createReadStream('../public/music/2.mp3'), function (err, metadata) {
  if (err) throw err;
  console.log(metadata);
});