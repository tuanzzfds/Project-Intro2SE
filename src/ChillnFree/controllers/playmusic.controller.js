const { json } = require('express');
const Song = require('../models/songs.model');
const Users = require("../models/users.model");
const {
   showAllSongsInJSON,
   showAllChillSongsInJSON,
   showAllStudySongsInJSON,
   showAllSleepSongsInJSON,
 } = require("../controllers/files.controller");

const renderPlayMusicPage = async (req, res, next) => {
   const album = req.query.album;
   const id_song = req.query.id;
   let required_songs;
   let jsons = {
      title: "ChillnFree - Play music",
      user: false,
   }
   if (req.user){
      jsons.user = req.user;
   }

   if (album){
      if (album === "top-music"){
         required_songs = await Song.find({});
      }
      if (album === "chill-music"){
         required_songs = await Song.find({genre:"Chill"});
      }
      if (album === "study-music"){
         required_songs = await Song.find({genre:"Study"});
      }
      if (album === "sleep-music"){
         required_songs = await Song.find({genre:"Sleep"});
      }
   }else{
      required_songs = await Song.find({_id:id_song})
   }
   jsons.songs = required_songs;
   res.render('playmusic',jsons);
}


module.exports = {
   renderPlayMusicPage: renderPlayMusicPage
}