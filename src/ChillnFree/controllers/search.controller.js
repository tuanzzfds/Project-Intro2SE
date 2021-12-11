const Song = require('../models/songs.model')


module.exports.func = async function (keyword) { 
    return await Song.find({$or:[{title: {$regex: '.*' + keyword + '.*'}},{artist: {$regex: '.*' + keyword + '.*'}},{genre: {$regex: '.*' + keyword + '.*'}}]});
};

