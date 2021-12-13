const Songs = require("../models/songs.model");
const Reports = require("../models/reports.model");
const Users = require("../models/users.model");

async function getAllSongsInJSON() {
  try {
    let result = [];
    const files = await Songs.find({});
    //check if the file exists
    if (!files || files.length === 0) {
      return result;
    } else {
      for (let i = 0; i < files.length; ++i) {
        item = {};
        item.picture_src = files[i].picture_src;
        item.title = files[i].title;
        item.artist = files[i].artist;
        item.genre = files[i].genre;

        const idUploader = files[i].idUploader;
        const user = await Users.findOne({ idUser: idUploader });

        if (user) {
          item.uploader = user.email;
        } else {
          item.uploader = "";
        }
        result.push(item);
      }
    }
    return result;
  } catch (err) {
    return {};
  }
}

async function getAllUsersInJSON() {
  try{
      const users = await Users.find({});
      return users;
  }catch(err){
      return [];
  }
}

async function getAllReportsInJSON() {
    try{
        const reports = await Reports.find({});
        return reports;
    }catch(err){
        return [];
    }
}
module.exports = {getAllSongsInJSON, getAllUsersInJSON,getAllReportsInJSON};
