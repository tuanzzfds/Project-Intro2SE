var express = require("express");
var router = express.Router();

var homePageRouter = require('./home.route');
var usersRouter = require('./users');
var libraryRouter = require('./library.route');
var accountRouter = require('./account.route');
var playmusicRouter = require('./playmusic.route');
var filesRouter = require('./files.route');
var uploadRouter = require('./upload.route');
var apiRouter = require('./api.route');


router.use('/', homePageRouter);
router.use('/users', usersRouter);
router.use('/library', libraryRouter);
router.use('/playmusic', playmusicRouter);
router.use('/account', accountRouter)
router.use('/router', router);
router.use('/upload', uploadRouter);
router.use('/files', filesRouter);
router.use('/api',apiRouter);

module.exports = router