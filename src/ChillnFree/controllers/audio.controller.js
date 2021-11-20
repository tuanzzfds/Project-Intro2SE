//GFS stream config
const { createGFS } = require('../assets/gfs')
let gfs = false
createGFS
   .then((result) => { gfs = result })
   .catch((err) => { throw new Error("Cannot create gfs: " + err.message) })

const renderAudio = async (req, res, next) => {
   if (!gfs) next()
   let filesList = new Array()
   let rawResponse = await gfs.files.find()
   await rawResponse.toArray((err, files) => {
      //check if the file exists
      if (!files || files.length === 0) {
         res.status(404).json({
            error: 'File not found'
         })
      }
      else {
         filesList = files
      }
   })
   const file = await gfs.files.findOne({ filename: req.query.filename })
   res.render('audio', { file: file ?? false, filesList: filesList })
}

module.exports = {
   renderAudio
}