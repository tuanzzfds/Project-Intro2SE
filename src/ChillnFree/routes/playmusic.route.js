const express = require("express")
const router = express.Router()
const { SignedInAllowed } = require("../middlewares/signedInAllowed")
const { renderPlayMusicPage } = require('../controllers/playmusic.controller')
/* GET Listening page. */

// router.get('/', function(req, res, next) {
//   res.render("listening_page",{title: "ChillnFree - Play music"})
// })
router.get("/", SignedInAllowed, renderPlayMusicPage,(req, res, next)=>{
   
})

//@route GET /playmusic/test/:filename
//@desc render testMp3 and send metadata tags to client side
router.get('/test/:filename', (req, res, next) => {
   console.log('REACH FINAL MIDDLEWARE')
   console.log('METADATA', req.metadata)
   res.render('testMp3', {
      metadata: req.metadata ?? false,
      user: req.user,
      src: req.protocol + '://' + req.get('host') + '/files/audio/' + req.params.filename
   })
})

module.exports = router