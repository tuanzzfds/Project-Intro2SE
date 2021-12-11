const Song = require('../models/songs.model')


module.exports.func = async function (keyword) { 
    return await Song.find({$or:[{title: {$regex:keyword,$options:'i'}},{artist: {$regex:keyword ,$options:'i'}},{genre: {$regex:keyword,$options:'i'}}]});
};

